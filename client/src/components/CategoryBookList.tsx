import "../types";
import "../assets/css/CategoryBookList.css";
import CategoryBookListItem from "./CategoryBookListItem";
import CategoryNav from "./CategoryNav";
import "../types";
import { BookItem } from "../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function CategoryBookList() {
  const { id } = useParams();
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://webdev.cs.vt.edu:8080/VedantBookstoreReactTransact/api/categories/name/${id}/books/`
      )
      .then((result) => {
        setBookList(result.data);
      })
      .catch(console.error);
  }, [id]);

  return (
    <>
      <CategoryNav />
      <section className="category-book-list">
        <ul id="book-boxes">
          {bookList.map((book: BookItem) => (
            <CategoryBookListItem
              key={book.bookId}
              bookId={book.bookId}
              isPublic={book.isPublic}
              price={book.price}
              title={book.title}
              author={book.author}
              categoryId ={book.categoryId}
            />
          ))}
        </ul>
      </section>
    </>
  );
  
}

export default CategoryBookList;
