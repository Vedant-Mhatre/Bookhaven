import "../assets/css/global.css";
import "../assets/css/CategoryNav.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Category } from "../contexts/CategoryContext";


function CategoryNav() {
  const { categories, updateLastVisited } = useContext(Category);

  return (
    <nav className="category-nav">
      <ul className="category-buttons">
        {categories.map((category: { name: any; }) => (
          <li key={category.name}>
            <div
              onClick={() => updateLastVisited(category.name)}
              className="button-wrapper"
            >
              <NavLink
                to={`/categories/${category.name}`}
                className={({ isActive }) =>
                  isActive ? "button selected" : "button"
                }
              >
                {category.name}
              </NavLink>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}


export default CategoryNav;
