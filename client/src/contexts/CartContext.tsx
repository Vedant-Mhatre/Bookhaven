import { createContext, Dispatch, useReducer } from "react";
import { ShoppingCartItem } from "../types";
import { cartReducer } from "../reducers/CartReducer";

const initialCartState: ShoppingCartItem[] = [];
export const CartStore = createContext<{
  cart: ShoppingCartItem[];
  dispatch: Dispatch<any>;
}>({
  cart: initialCartState,
  dispatch: () => null,
});

const storageKey = "cart";
CartStore.displayName = "CartContext";

function CartContext({ children }: any) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    (initialState: ShoppingCartItem[]) => {
      try {
        const storedCart = localStorage.getItem(storageKey);
        return storedCart ? JSON.parse(storedCart) : initialState;
      } catch (error) {
        return initialState;
      }
    }
  );

  return (
    <CartStore.Provider value={{ cart, dispatch }}>
      {children}
    </CartStore.Provider>
  );
}

export default CartContext;
