import { Link } from "react-router-dom";

/*const categoryImageFileName = (category) => {
  let name = category.name.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};*/

function BookCategoryList() {
  return (
    <div className="book-items">
      <div className="book-item">
        <Link to="/">
          <img
            src={require("../assets/images/books/The Alchemist.jpeg")}
            alt="The Alchemist"
          />
        </Link>
        <span className="book-title">The Alchemist</span>
      </div>
      <div className="book-item">
        <Link to="/">
          <img
            src={require("../assets/images/books/The Book Thief.jpeg")}
            alt="The Book Thief"
          />
        </Link>
        <span className="book-title">The Book Thief</span>
      </div>
      <div className="book-item">
        <Link to="/">
          <img src={require("../assets/images/books/1984.jpeg")} alt="1984" />
        </Link>
        <span className="book-title">1984</span>
      </div>
      <div className="book-item">
        <Link to="/">
          <img
            src={require("../assets/images/books/To Kill a Mockingbird.jpeg")}
            alt="To Kill a Mockingbird"
          />
        </Link>
        <span className="book-title">To Kill A Mockingbird</span>
      </div>
    </div>
  );
}

export default BookCategoryList;
