import { Link } from "react-router-dom";
import "../assets/css/global.css";
import "../assets/css/Home.css";
import BookCategoryList from "./BookCategoryList";
import {useContext} from "react";
import {Category} from "../contexts/CategoryContext";

function Home() {
    const {updateLastVisited } = useContext(Category);
  return (
    <div className="home-pages">
      <div className="welcome-text flow-content container dark-background">
        <h1 className="welcome-text-header">Read the Stories</h1>
        <h1 className="welcome-text-header">That Make Us Feel Alive</h1>
        <p>Get 10% off for a limited time</p>

        <Link to="/categories/New%20Releases">
          <button className="shop-now-button" onClick={() => updateLastVisited("New Releases")}>Shop now</button>
        </Link>
      </div>

      <div className="home-page-text">
        <section>
          <p>Editor's choice</p>
        </section>
      </div>

      <div className="home-page">
        <div className="book-category container">
          <BookCategoryList />
        </div>
      </div>
    </div>
  );
}

export default Home;
