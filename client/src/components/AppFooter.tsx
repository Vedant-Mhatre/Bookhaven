import "../assets/css/AppFooter.css";
import "../assets/css/global.css";
import { Link } from "react-router-dom";

function AppFooter() {
  return (
    <footer className="footer">
      <section className="navigation-links">
        <Link to="/">Directions</Link>
        <Link to="/">Contact us</Link>
      </section>
      <div className="company-info">© 2024 Bookhaven, Inc</div>
      <div className="right-section">
        <ul className="social-media-icons">
          <li>
            <a href="https://www.facebook.com">
              <img
                src={require("../assets/images/site/meta.png")}
                alt="Facebook"
              />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com">
              <img
                src={require("../assets/images/site/twitter.png")}
                alt="Twitter"
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com">
              <img
                src={require("../assets/images/site/instagram.png")}
                alt="Instagram"
              />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com">
              <img
                src={require("../assets/images/site/youtube.png")}
                alt="YouTube"
              />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com">
              <img
                src={require("../assets/images/site/whatsapp.png")}
                alt="WhatsApp"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default AppFooter;
