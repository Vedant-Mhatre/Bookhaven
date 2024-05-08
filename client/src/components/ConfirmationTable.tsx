import React, { useContext } from "react";
import { CartStore } from "../contexts/CartContext";
import "../assets/css/confirmation.css";
import { OrderStore } from "../contexts/OrderDetailContext";
import { getSurcharge } from "../reducers/CartReducer";

const ConfirmationTable = () => {
  const { cart } = useContext(CartStore);
  const { orderDetails } = useContext(OrderStore);

  const asDollarsAndCents = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const calculateSubtotal = () => {
    return orderDetails.lineItems?.reduce((acc, item, index) => {
      return acc + orderDetails.books[index].price * item.quantity;
    }, 0);
  };

  return (
    <div>
      <div className="conf-confirmation-table">
      <h2 className="conf-header">Pricing Details</h2>
        <ul className="conf-confirmation-table-ul">
          <li className="conf-confirmation-table-li conf-heading-row">
            <div className="conf-heading-book-2">Book</div>
            <div className="conf-heading-quantity-2">Quantity</div>
            <div className="conf-heading-subtotal-2">Price</div>
          </li>
          {orderDetails.lineItems?.map((item, index) => (
            <li className="conf-confirmation-table-li" key={index}>
              <div className="conf-heading-book-2">
                {orderDetails.books[index].title}
              </div>
              <div className="conf-heading-quantity-2">{item.quantity}</div>
              <div className="conf-heading-subtotal-2">
                {asDollarsAndCents(
                  orderDetails.books[index].price * item.quantity
                )}
              </div>
            </li>
          ))}
          <li className="conf-line-sep-2"></li>
          <li className="conf-confirmation-table-li conf-gap">
              <div className="conf-heading-delivery">Subtotal</div>
              <div className="conf-heading-price-2">
                {asDollarsAndCents(calculateSubtotal())}
              </div>
          </li>
          <li className="conf-confirmation-table-li conf-gap">
            <div className="conf-heading-delivery">Surcharge</div>
            <div className="conf-heading-price-2">
              {asDollarsAndCents(getSurcharge(cart))}
            </div>
          </li>
          <li className="conf-line-sep-2"></li>

          <li className="conf-confirmation-table-li conf-total-row">
            <div className="conf-heading-delivery">
              <strong>Total</strong>
            </div>
            <div className="conf-heading-price-2">
              <strong>{asDollarsAndCents(orderDetails.order.amount)}</strong>
            </div>
          </li>
        </ul>
      </div>
      <br />
    </div>
  );
};

export default ConfirmationTable;
