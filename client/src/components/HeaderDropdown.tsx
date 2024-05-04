import "../assets/css/global.css";
import "../assets/css/HeaderDropdown.css";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { Category } from "../contexts/CategoryContext";

function HeaderDropdown() {
  const { categories, updateLastVisited } = useContext(Category);
  return (
    <div className="header-dropdown">
  <p className="button categories-button">Categories &#9662;</p>
  <ul>
    {categories.map((category) => (
      <li key={category.name} onClick={() => updateLastVisited(category.name)}>
        <Link to={`/categories/${category.name}`}>
          {category.name}
        </Link>
      </li>
    ))}
  </ul>
</div>

  );
}

export default HeaderDropdown;
