import HeaderDropdown from "./HeaderDropdown";
import "../assets/css/global.css";
import "../assets/css/AppHeader.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartStore } from "../contexts/CartContext";

function AppHeader() {
  const { cart } = useContext(CartStore);
  const cartQuantity = Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <header className="container">
      <section className="bookstore-logo">
        <Link to="/">
          <img
            src={require("../assets/images/site/BH-logo.png")}
            alt="Bookhaven Logo"
            width="100px"
            height="auto"
          />
        </Link>
      </section>

      <section className="header-buttons">
        <section className="home-and-category-buttons">
          <Link to="/">
            {" "}
            <p className="button">Home</p>{" "}
          </Link>

          <HeaderDropdown />
        </section>

        <section className="title-and-search-bar">
          <form action="">
            <input type="text" placeholder="Search" id="searchQuery" />
            <button
              type="submit"
              id="searchButton"
              aria-label="Search"
            ></button>
          </form>
        </section>

        <section className="header-dropdown-and-cart">
          <Link to="/">
            {" "}
            <p className="button">Login</p>{" "}
          </Link>
          <Link to="/cart">
            <div className="cart-container">
              <img
                src={require("../assets/images/site/shopping-cart.png")}
                alt="Cart"
              />
              <span className="cart-count">{cartQuantity}</span>
            </div>
          </Link>
        </section>
      </section>
    </header>
  );
}

export default AppHeader;
