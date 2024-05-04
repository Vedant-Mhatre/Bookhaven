import { CategoryItem } from "../types";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

interface CategoryContextType {
  categories: CategoryItem[];
  lastVisited: string;
  updateLastVisited: (categoryName: string) => void;
}

export const Category = createContext<CategoryContextType>({
  categories: [],
  lastVisited: "",
  updateLastVisited: () => {},
});

Category.displayName = "CategoryContext";

function CategoryContext({ children }: any) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [lastVisited, setLastVisited] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/VedantBookstoreReactTransact/api/categories")
      .then((result) => setCategories(result.data))
      .catch(console.error);
  }, []);

  const updateLastVisited = (categoryName: string) => {
    setLastVisited(categoryName);
  };

  const value = { categories, lastVisited, updateLastVisited };

  return <Category.Provider value={value}>{children}</Category.Provider>;
}

export default CategoryContext;
