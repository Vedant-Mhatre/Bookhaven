import type { OrderDetails } from "../types";

type AppActions = {
  type: string;
  orderDetails?: OrderDetails;
};

export const OrderTypes = {
  SET_DETAILS: "SET_DETAILS",
  CLEAR_DETAILS: "CLEAR_DETAILS",
};

export const orderReducer = (
  state: OrderDetails,
  action: AppActions
): OrderDetails => {
    
  switch (action.type) {
    case OrderTypes.SET_DETAILS:
      return action.orderDetails ? action.orderDetails : state;

    case OrderTypes.CLEAR_DETAILS:
      return {} as OrderDetails;
    default:
      return state;
  }
};
