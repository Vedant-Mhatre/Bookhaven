import { useContext } from "react";
import "../assets/css/confirmation.css";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationTable from "./ConfirmationTable";
import { OrderStore } from "../contexts/OrderDetailContext";
import { Category } from "../contexts/CategoryContext";

function displayMonth(month: number) {
  return month < 10 ? `0${month}` : `${month}`;
}

function maskCreditCard(number: string) {
  number = number.replace(/ |-/g, "");
  const lastFourDigits = number.slice(-4);
  return `**** **** **** ${lastFourDigits}`;
}

const Cart = () => {
  const { orderDetails } = useContext(OrderStore);
  const { lastVisited } = useContext(Category);
  const navigate = useNavigate();
  return (
    <div className="confirmation-page-container">
      <h1 className="confirmation-page-title">Confirmation Page</h1>
      {!orderDetails || !orderDetails.order ? (
        <>
          <div className="conf-center-text" style={{ marginBottom: "60vh" }}>
            <div className="confirmation-text">
              <h2 className="conf-header">
                Sorry, we couldn't find your order
              </h2>

              <button
                className="confirmation-shopping-button"
                onClick={() => navigate("/")}
                
              >
                Go to Home Page
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="conf-center-text">
          <div className="confirmation-text">
            <h2 className="conf-header">Order Details</h2>

            <ul className="conf-ul">
              <li className="conf-li">
                Your confirmation number is{" "}
                {orderDetails.order.confirmationNumber}
              </li>
              <br />
              <li className="conf-li">
                Date created:{" "}
                {new Date(orderDetails.order.dateCreated).toString()}
              </li>
              <br />
              <li className="conf-li">
                Customer Name: {orderDetails.customer.customerName}
              </li>
              <br />
              <li className="conf-li">Email: {orderDetails.customer.email}</li>
              <br />
              <li className="conf-li">
                Address: {orderDetails.customer.address}
              </li>
              <br />
              <li className="conf-li">Phone: {orderDetails.customer.phone}</li>
              <br />
              <li className="conf-li">
                Credit Card: {maskCreditCard(orderDetails.customer.ccNumber)} (
                {displayMonth(
                  1 + new Date(orderDetails.customer.ccExpDate).getUTCMonth()
                )}
                /{new Date(orderDetails.customer.ccExpDate).getUTCFullYear()})
              </li>
              <br />
            </ul>
          </div>

          <ConfirmationTable />
          <div className="cart-actions">
            <Link
              to={`/categories/${lastVisited || "New Releases"}`}
              className="confirmation-shopping-button"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
      <br />
    </div>
  );
};

export default Cart;
