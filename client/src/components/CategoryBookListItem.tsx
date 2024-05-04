import { Link } from "react-router-dom";
import "../types";
import { BookItem } from "../types";
import { useContext } from "react";
import { CartStore } from "../contexts/CartContext";
import { CartTypes } from "../reducers/CartReducer";

const bookImageFileName = (book: BookItem) => {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpeg`;
};

function CategoryBookListItem(props: BookItem) {
  const { dispatch } = useContext(CartStore);

  const addBookToCart = (book: BookItem) => () => {
    dispatch({ type: CartTypes.ADD, item: book, id: book.bookId });
  };

  return (
    <li className="book-box">
      <div className="book-image">
        <Link to="/">
          <div className="image-container">
            <img
              src={require("../assets/images/books/" +
                bookImageFileName(props))}
              alt={props.title}
            />
            {props.isPublic && <p>Read Now</p>}
          </div>
        </Link>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-author">{props.author}</div>
      <div className="book-price">${(props.price).toFixed(2)}</div>
      <button className="add-to-cart-button" onClick={addBookToCart(props)}>
        Add to Cart
      </button>
    </li>
  );
}

export default CategoryBookListItem;
