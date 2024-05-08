import { useContext } from "react";
import "../assets/css/confirmation.css";
import { Link, useNavigate } from "react-router-dom";
import ConfirmationTable from "./ConfirmationTable";
import { OrderStore } from "../contexts/OrderDetailContext";

const Cart = () => {
  const { orderDetails } = useContext(OrderStore);
  const navigate = useNavigate();
  return (
    <div>

      {!orderDetails || !orderDetails.order ? (
        <>
          <div className="conf-center-text">
            <p>We are sorry, the order you requested could not be found.</p>
          </div>
          <div className="conf-center-text">
            <button className="conf-button" onClick={() => navigate("/")}>
              Go to Home Page
            </button>
          </div>
        </>
      ) : (
        <div className="conf-center-text">
          <div className="confirmation-text">
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
                </ul>
                </div>

            <ConfirmationTable />
            <div className="cart-actions">
              <Link to={`/categories/New-Releases`}>
                <button className="confirmation-shopping-button">
                  Continue Shopping
                </button>
              </Link>
            </div>
          
        </div>
      )}
      <br />
    </div>
  );
};

export default Cart;
