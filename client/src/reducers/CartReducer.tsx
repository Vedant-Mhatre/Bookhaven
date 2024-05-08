import { ShoppingCartItem, BookItem } from "../types";

export const CartTypes = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
};

type AppActions = {
  id: number;
  type: "ADD" | "REMOVE" | "CLEAR";
  item: BookItem;
};
const SURCHARGE = 10;
const calculateSubtotal = (items: ShoppingCartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity * item.book.price, 0);
};

export const getSurcharge = (items: ShoppingCartItem[]): number => {
  return SURCHARGE;
};

export const getNumberOfItems = (items: ShoppingCartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const getSubtotal = (items: ShoppingCartItem[]): number => {
  return calculateSubtotal(items);
};

export const getTotal = (items: ShoppingCartItem[]): number => {
  return calculateSubtotal(items) + (SURCHARGE);
};

export const isEmpty = (items: ShoppingCartItem[]): boolean => {
  return items.length === 0;
};

export const cartReducer = (
  state: ShoppingCartItem[],
  action: AppActions
): ShoppingCartItem[] => {

  if (!Array.isArray(state)) {
    state = [];
  }

  switch (action.type) {
    case CartTypes.ADD:
      const existingIndex = state.findIndex((item) => item.id === action.id);
      if (existingIndex >= 0) {
        const newState = [...state];
        newState[existingIndex] = {
          ...newState[existingIndex],
          quantity: newState[existingIndex].quantity + 1,
        };
        localStorage.setItem("cart", JSON.stringify(newState));
        return newState;
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...state, { id: action.id, book: action.item, quantity: 1 }])
        );
        return [...state, { id: action.id, book: action.item, quantity: 1 }];
      }
    case CartTypes.REMOVE:
      const existingItem = state.find((item) => item.id === action.id);
      if (existingItem?.quantity === 1) {
        localStorage.setItem(
          "cart",
          JSON.stringify(state.filter((item) => item.id !== action.id))
        );
        return state.filter((item) => item.id !== action.id);
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify(
            state.map((item) =>
              item.id === action.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          )
        );
        return state.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    case CartTypes.CLEAR:
      localStorage.setItem("cart", JSON.stringify([]));
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }

};
