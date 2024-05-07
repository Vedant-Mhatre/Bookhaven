package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}

	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}

	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		
		
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
	public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());

					// print to debug
			System.out.println("ccExpDate: " + ccExpDate);
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			// print to debug
			e.printStackTrace();

			throw new BookstoreDbException("Error during close connection for customer order", e);
		}

	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, item.getBookId(), customerOrderId,
						 item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}

	private Date getCardExpirationDate(String monthString, String yearString) {

		try {
			int month = Integer.parseInt(monthString);
			int year = Integer.parseInt(yearString);
			return new Date();
		} catch (NumberFormatException e) {
			throw new ApiException.ValidationFailure("ccExpiryMonth", "Invalid expiry month");
		} catch (DateTimeException e) {
			throw new ApiException.ValidationFailure("ccExpiryYear", "Invalid expiry year");
		}

	}

	private void validateCustomer(CustomerForm customerForm) {

		String name = customerForm.getName();
		if (name == null || name.isEmpty() || name.length() > 45 || name.length() < 4) {
			throw new ApiException.ValidationFailure("name", "Invalid name field");
		}

		String address = customerForm.getAddress();
		if (address == null || address.isEmpty() || address.length() > 45 || address.length() < 4) {
			throw new ApiException.ValidationFailure("address", "Invalid address field");
		}

		String phone = customerForm.getPhone();
		if (phone == null || phone.isEmpty()) {
			throw new ApiException.ValidationFailure("phone", "Invalid phone field");
		}
		phone = phone.replaceAll("[-()\\s]", "");
		if (phone.length() != 10) {
			throw new ApiException.ValidationFailure("phone", "Invalid phone field");
		}

		String email = customerForm.getEmail();
		if (email == null || email.isEmpty()) {
			throw new ApiException.ValidationFailure("email", "Invalid email field");
		}
		if (!email.contains("@") || email.contains(" ") || email.endsWith(".")) {
			throw new ApiException.ValidationFailure("email", "Invalid email field");
		}

		String creditCard = customerForm.getCcNumber();
		if (creditCard == null || creditCard.isEmpty()) {
			throw new ApiException.ValidationFailure("creditCard", "Invalid credit card field");
		}
		creditCard = creditCard.replace("-", "").replace(" ", "");
		if (creditCard.length() < 14 || creditCard.length() > 16) {
			throw new ApiException.ValidationFailure("creditCard", "Invalid credit card field");
		}

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("expiryDate", "Invalid expiry date");
		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		// TODO: return true when the provided month/year is before the current
		// month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		YearMonth expiryVal = YearMonth.of(Integer.parseInt(ccExpiryYear), Integer.parseInt(ccExpiryMonth));
		YearMonth currentVal = YearMonth.now();
		if (expiryVal.isBefore(currentVal)) {
			return true;
		}
		return false;

	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0 || cart.getItems() == null || cart.getItems().equals("")) {
			throw new ApiException.ValidationFailure("cart", "Cart is empty.");
		}

		cart.getItems().forEach(item -> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("quantity",
						"Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("price",
						"Book price does not match.");
			}
			if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("categoryId",
						"Book category Id does not match.");
			}
			// TODO: complete the required validations
		});
	}

}
