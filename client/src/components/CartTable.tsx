import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartStore } from "../contexts/CartContext";
import "../assets/css/CartTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { BookItem } from "../types";
import { Category } from "../contexts/CategoryContext";

const getBookImageUrl = (book: BookItem): string => {
  let filename =
    book.title.toLowerCase().replace(/ /g, "-").replace(/'/g, "") + ".jpeg";
  try {
    return require(`../assets/images/books/${filename}`);
  } catch (_) {
    return require("../assets/images/books/1984.jpeg");
  }
};

function CartTable() {
  const { cart, dispatch } = useContext(CartStore);
  const { lastVisited } = useContext(Category);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  const clearCart = () => dispatch({ type: "CLEAR" });
  const incrementQuantity = (id: number) =>
    dispatch({ type: "ADD", item: {} as BookItem, id });
  const decrementQuantity = (id: number) => dispatch({ type: "REMOVE", id });

  return (
    <div className="cart-table">
      <h1 className="your-bag-text">
        {cart.length === 0 ? "YOUR CART IS EMPTY" : "YOUR CART"}
      </h1>
      {cart.length === 0 ? (
        <>
          <div className="cart-empty">
            <p>
              Once you add something to your cart, it will appear here. Ready to
              get started?
            </p>
          </div>
          <Link
            to={`/categories/${lastVisited || "New Releases"}`}
            className="cart-empty-continue-shopping-button"
          >
            GET STARTED
          </Link>
        </>
      ) : (
        <>
          <p className="cart-quantity-text">
            TOTAL: ({totalItems} {totalItems === 1 ? "book" : "books"}){" "}
            <strong>${subtotal}</strong>
          </p>

          <p onClick={clearCart} className="clear-cart-button">
            Clear Cart
          </p>
          <ul className="cart2">
            <li className="table-heading">
              <div className="heading-book">Book</div>
              <div className="heading-price">Price</div>
              <div className="heading-quantity">Quantity</div>
              <div className="heading-subtotal">Amount</div>
            </li>
            {cart.map((item) => (
              <li key={item.id}>
                <div className="cart-book-image">
                  <img
                    src={getBookImageUrl(item.book)}
                    alt={item.book.title}
                    className="cart-book-img"
                  />
                </div>
                <div className="cart-book-title">{item.book.title}</div>
                <div className="cart-book-price">${item.book.price}</div>
                <div className="cart-book-quantity">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="icon-button dec-button"
                  >
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="icon-button inc-button"
                  >
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </button>
                </div>
                <div className="cart-book-subtotal">
                  ${(item.book.price * item.quantity).toFixed(2)}
                </div>
                <ul className="line-sep"></ul>
              </li>
            ))}
          </ul>

          <p className="cart-subtotal-text">Total:</p>
          <p className="cart-subtotal-price">${subtotal}</p>

          <div className="additional-shopping-prompt">
            <p>
              Looking for something else?{" "}
              <button className="continue-shopping-button">
                <Link
                  className="continue-shopping-link"
                  to={`/categories/${lastVisited || "New Releases"}`}
                >
                  Continue Shopping
                </Link>
              </button>
            </p>
          </div>

          <Link to="/checkout" className="checkout-button">
            CHECKOUT
          </Link>
        </>
      )}
    </div>
  );
}

export default CartTable;
