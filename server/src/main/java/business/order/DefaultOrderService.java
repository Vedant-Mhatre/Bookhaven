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
import java.util.GregorianCalendar;
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
        List<Book> books = lineItems.stream().map(lineItem -> bookDao.findByBookId(lineItem.bookId())).toList();
        return new OrderDetails(order, customer, lineItems, books);
    }

    @Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {
        validateCustomer(customerForm);
        validateCart(cart);
        try (Connection connection = JdbcUtils.getConnection()) {
            if (customerForm.getCcExpiryMonth() == null || customerForm.getCcExpiryMonth().trim().isEmpty() || customerForm.getCcExpiryYear() == null || customerForm.getCcExpiryYear().trim().isEmpty()) {
                throw new ApiException.ValidationFailure("ccExpiry", "Credit card expiration date is required.");
            }
            Date ccExpDate = getCardExpirationDate(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear());
            return performPlaceOrderTransaction(customerForm.getName(), customerForm.getAddress(), customerForm.getPhone(), customerForm.getEmail(), customerForm.getCcNumber(), ccExpDate, cart, connection);
        } catch (SQLException e) {
            throw new BookstoreDbException("Error during close connection for customer order", e);
        }
    }

    private long performPlaceOrderTransaction(String name, String address, String phone, String email, String ccNumber, Date date, ShoppingCart cart, Connection connection) {
        try {
            connection.setAutoCommit(false);
            long customerId = customerDao.create(connection, name, address, phone, email, ccNumber, date);
            long customerOrderId = orderDao.create(connection, cart.getComputedSubtotal() + cart.getSurcharge(), generateConfirmationNumber(), customerId);
            for (ShoppingCartItem item : cart.getItems()) {
                lineItemDao.create(connection, customerOrderId, item.getBookId(), item.getQuantity());
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

    private Date getCardExpirationDate(String monthString, String yearString) throws ApiException.ValidationFailure {
        try {
            int month = Integer.parseInt(monthString);
            int year = Integer.parseInt(yearString);
            if (month < 1 || month > 12) {
                throw new ApiException.ValidationFailure("ccExpiryMonth", "Month must be between 1 and 12.");
            }
            return new GregorianCalendar(year, month - 1, 1).getTime();
        } catch (Exception e) {
            throw new ApiException.ValidationFailure("expDate", "An error occurred while processing the credit card expiry date. Please check month and year values.");
        }
    }

    private void validateCustomer(CustomerForm customerForm) {
        String name = customerForm.getName();
        if (nameIsInvalid(name)) {
            throw new ApiException.ValidationFailure("name", "Invalid name field.");
        }

        String address = customerForm.getAddress();
        if (addressIsInvalid(address)) {
            throw new ApiException.ValidationFailure("address", "Invalid address field.");
        }

        String phone = customerForm.getPhone();
        if (phoneIsInvalid(phone)) {
            throw new ApiException.ValidationFailure("phone", "Invalid phone field.");
        }

        String email = customerForm.getEmail();
        if (emailIsInvalid(email)) {
            throw new ApiException.ValidationFailure("email", "Invalid email field.");
        }

        String ccNumber = customerForm.getCcNumber();
        ccNumber = ccNumber.replaceAll("[\\s-]", "");
        if (ccIsInvalid(ccNumber)) {
            throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number field.");
        }

        String ccExpiryMonth = customerForm.getCcExpiryMonth();
        String ccExpiryYear = customerForm.getCcExpiryYear();
        if (expiryDateIsInvalid(ccExpiryMonth, ccExpiryYear)) {
            throw new ApiException.ValidationFailure("ccExpiry", "Invalid credit card expiry date.");
        }
    }

    private boolean nameIsInvalid(String name) {
        return name == null || name.equals("") || name.length() > 45 || name.length() < 4;
    }

    private boolean addressIsInvalid(String address) {
        return address == null || address.equals("") || address.length() > 45 || address.length() < 4;
    }

    private boolean phoneIsInvalid(String phone) {
        phone = phone.replace("-", "").replace("(", "").replace(")", "").replace(" ", "");
        return phone == null || phone.equals("") || phone.length() != 10;
    }

    private boolean emailIsInvalid(String email) {
        return email == null || email.equals("") || !email.contains("@") || email.contains(" ") || email.endsWith(".");
    }

    private boolean ccIsInvalid(String cc) {
        cc = cc.replace("-", "").replace(" ", "");
        return cc == null || cc.equals("") || cc.length() < 14 || cc.length() > 16;
    }

    private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {
        try {
            YearMonth currentYearMonth = YearMonth.now();
            YearMonth expiryYearMonth = YearMonth.of(Integer.parseInt(ccExpiryYear), Integer.parseInt(ccExpiryMonth));
            if (expiryYearMonth.isBefore(currentYearMonth)) {
                throw new ApiException.ValidationFailure("expDate", "Credit card is expired.");
            }
            return false;
        } catch (Exception e) {
            throw new ApiException.ValidationFailure("expDate", "Invalid credit card expiry format.");
        }
    }

    private void validateCart(ShoppingCart cart) {
        if (cart.getItems() == null || cart.getItems().isEmpty() || cart.getItems().size() <= 0) {
            throw new ApiException.ValidationFailure("Cart is empty.");
        }

        cart.getItems().forEach(item -> {
            if (item.getQuantity() < 1 || item.getQuantity() > 99) {
                throw new ApiException.ValidationFailure("Invalid quantity.");
            }

            Book databaseBook = bookDao.findByBookId(item.getBookId());
            if (item.getBookForm().getPrice() != databaseBook.price()) {
                throw new ApiException.ValidationFailure("Book price does not match.");
            }

            if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
                throw new ApiException.ValidationFailure("Book category Id does not match.");
            }
        });
    }
}
