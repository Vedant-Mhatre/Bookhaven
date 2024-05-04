import "../assets/css/checkout.css";
import "../assets/css/CartTable.css";

import { isCreditCard, isMobilePhone, isvalidEmail } from "../utils";
import { BookItem, CustomerForm, months, OrderDetails, years } from "../types";
import { CartStore } from "../contexts/CartContext";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartTypes } from "../reducers/CartReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import { Category } from "../contexts/CategoryContext";
import axios from "axios";

function CheckoutPage() {
  function yearFrom(index: number) {
    return new Date().getFullYear() + index;
  }

  const { cart, dispatch } = useContext(CartStore);
  const { lastVisited } = useContext(Category);

  const navigate = useNavigate();
  const cartTotalPrice = cart.reduce(
    (total, item) => total + item.quantity * item.book.price,
    0
  );

  const cartQuantity = cart.length;
  const taxRate = 0.1;
  const taxAmount = cartTotalPrice * taxRate;
  const totalCost = cartTotalPrice + taxAmount;

  const [nameError, setNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [creditCardError, setCreditCardError] = useState("");
  const currentYear = new Date().getFullYear();
  const initialMonth = new Date().getMonth() + 1;
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    ccNumber: "",
    ccExpiryMonth: initialMonth,
    ccExpiryYear: currentYear,
  });

  const [checkoutStatus, setCheckoutStatus] = useState("");

  const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.jpeg`;
  };

  const isValidForm = (formData: any) => {
    let isFormValid = true;

    if (
      !formData.name ||
      formData.name.length < 4 ||
      formData.name.length > 45
    ) {
      setNameError("Name must be between 4 and 45 characters long!");
      isFormValid = false;
    } else {
      setNameError("");
    }

    if (
      !formData.address ||
      formData.address.length < 4 ||
      formData.address.length > 45
    ) {
      setAddressError("Address must be between 4 and 45 characters long!");
      isFormValid = false;
    } else {
      setAddressError("");
    }

    if (!formData.phone || !isMobilePhone(formData.phone)) {
      setPhoneError("Please enter a valid phone number!");
      isFormValid = false;
    } else {
      setPhoneError("");
    }

    if (!formData.email || !isvalidEmail(formData.email)) {
      setEmailError("Please enter a valid email!");
      isFormValid = false;
    } else {
      setEmailError("");
    }

    if (!formData.ccNumber || !isCreditCard(formData.ccNumber)) {
      setCreditCardError("Please enter a valid credit card number!");
      isFormValid = false;
    } else {
      setCreditCardError("");
    }

    if (!formData.ccExpiryMonth || !formData.ccExpiryYear) {
      isFormValid = false;
    }
    return isFormValid;
  };

  const placeOrder = async (customerForm: CustomerForm) => {
    const order = { customerForm: customerForm, cart: { itemArray: cart } };

    const orders = JSON.stringify(order);
    // console.log(orders); //you can uncomment this to see the orders JSON on the console
    const url = 'http://localhost:8080/VedantBookstoreReactTransact/api/orders';
    const orderDetails: OrderDetails = await axios
      .post(url, orders, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({ type: CartTypes.CLEAR });
        return response.data;
      })
      .catch((error) => console.log(error));
    console.log("order deatils: ", orderDetails);
    return orderDetails;
  };

  async function submitOrder(event: FormEvent) {
    event.preventDefault();
    console.log("Submit order");
    const isFormCorrect = isValidForm(formData);
    console.log(isFormCorrect);
    if (!isFormCorrect) {
      setCheckoutStatus("ERROR");
    } else {
      setCheckoutStatus("PENDING");
      const orders = await placeOrder({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        ccNumber: formData.ccNumber,
        ccExpiryMonth: formData.ccExpiryMonth,
        ccExpiryYear: formData.ccExpiryYear,
      });
      if (orders) {
        setCheckoutStatus("OK");
        navigate("/confirmation");
      } else {
        console.log("Error placing order");
      }
    }
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (value.length < 4 || value.length > 45) {
          setNameError("Name must be at least 4 characters long!");
        } else {
          setNameError("");
        }
        break;
      case "address":
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (value.length < 4 || value.length > 45) {
          setAddressError("Address must be between 4 and 45 characters long!");
        } else {
          setAddressError("");
        }
        break;
      case "phone":
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (!isMobilePhone(value)) {
          setPhoneError("Please enter a valid phone number");
        } else {
          setPhoneError("");
        }
        break;
      case "email":
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (!isvalidEmail(value)) {
          setEmailError("Please enter a valid Email");
        } else {
          setEmailError("");
        }
        break;
      case "ccNumber":
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        if (!isCreditCard(value)) {
          setCreditCardError("Please enter a valid credit card number");
        } else {
          setCreditCardError("");
        }
        break;
      case "ccExpiryMonth":
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: parseInt(value, 10),
        }));
        break;
      case "ccExpiryYear":
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: parseInt(value, 10),
        }));
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {cart.length === 0 ? (
        <>
          <div className="cart-table">
            <h1 className="your-bag-text">Checkout page</h1>
            <div className="cart-empty">
              <p>
                Once you add something to your cart, it will appear here. Ready
                to get started?
              </p>
            </div>
            <Link
              to={`/categories/${lastVisited || "New Releases"}`}
              className="cart-empty-continue-shopping-button"
            >
              GET STARTED
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="checkout-cart-table-view">
            <div className="checkout-page-body">
              <div>
                <form
                  className="checkout-form"
                  onSubmit={(event) => submitOrder(event)}
                  method="post"
                >
                  <div>
                    <label htmlFor="fname">Name</label>
                    <input
                      type="text"
                      size={20}
                      name="name"
                      id="fname"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <> {nameError && <div className="error"> {nameError}</div>}</>
                  <div>
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      size={20}
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <>
                    {" "}
                    {addressError && (
                      <div className="error"> {addressError}</div>
                    )}
                  </>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      size={20}
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <>
                    {" "}
                    {phoneError && <div className="error"> {phoneError}</div>}
                  </>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      size={20}
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <>
                    {" "}
                    {emailError && <div className="error"> {emailError}</div>}
                  </>
                  <div>
                    <label htmlFor="creditCard">Credit Card</label>
                    <input
                      type="text"
                      size={20}
                      name="ccNumber"
                      id="ccNumber"
                      value={formData.ccNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <>
                    {" "}
                    {creditCardError && (
                      <div className="error"> {creditCardError}</div>
                    )}
                  </>

                  <div>
                    <label htmlFor="ccExpiryMonth">Exp Date</label>
                    <select
                      style={{ color: "black" }}
                      name="ccExpiryMonth"
                      value={formData.ccExpiryMonth}
                      onChange={handleInputChange}
                    >
                      {months.map((month, i) => (
                        <option key={i} value={i + 1}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      style={{ color: "black" }}
                      name="ccExpiryYear"
                      value={formData.ccExpiryYear}
                      onChange={handleInputChange}
                    >
                      {years.map((year, i) => (
                        <option key={i} value={i + 1}>
                          {year + 2024}
                        </option>
                      ))}
                    </select>
                  </div>
                </form>
              </div>
              <div className="checkout-total-box">
                <div>
                  <p>Total Cost: ${cartTotalPrice.toFixed(2)}</p>
                  <p>Tax (10%): ${taxAmount.toFixed(2)}</p>
                  <p>Total (including tax): ${totalCost.toFixed(2)}</p>
                </div>
                <button
                  onClick={submitOrder}
                  className="complete-purchase-button"
                >
                  COMPLETE PURCHASE
                </button>
              </div>

              <div>
                {checkoutStatus !== "" ? (
                  <>
                    <section className="checkoutStatusBox">
                      {checkoutStatus === "ERROR" ? (
                        <div className="error_msg">
                          Error: Please fix the problems above and try again.
                        </div>
                      ) : checkoutStatus === "PENDING" ? (
                        <div>Processing...</div>
                      ) : checkoutStatus === "OK" ? (
                        <div>Order placed...</div>
                      ) : (
                        <div>
                          An unexpected error occurred, please try again.
                        </div>
                      )}
                    </section>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="checkout-page-right-part">
              {/*This displays the information about the items in the cart*/}
              <ul className="checkout-cart-info">
                {cart?.map((item, i) => (
                  <div className="checkout-cart-book-item">
                    <div className="checkout-cart-book-image" key={i}>
                      <img
                        src={require("../assets/images/books/" +
                          bookImageFileName(item.book))}
                        alt="title"
                        className="checkout-cart-info-img"
                        width="20%"
                        height="20%"
                      />
                    </div>

                    <div className="checkout-cart-book-info">
                      <div className="checkout-cart-book-title">
                        {item.book.title}
                      </div>

                      <div className="checkout-cart-book-subtotal">
                        ${item.book.price * item.quantity}
                      </div>
                      <div className="checkout-cart-book-quantity">
                        <button
                          className="checkout-icon-button inc-button"
                          onClick={() => {
                            dispatch({
                              type: CartTypes.ADD,
                              book: item.book,
                              id: item.book.bookId,
                            });
                          }}
                        >
                          <i className="fas fa-plus-circle">
                            <FontAwesomeIcon icon={faPlusCircle} />
                          </i>
                        </button>
                        <span className="checkout-num-button">
                          {item.quantity}
                        </span>
                        &nbsp;
                        <button
                          className="checkout-icon-button dec-button"
                          onClick={() => {
                            dispatch({
                              type: CartTypes.REMOVE,
                              book: item.book,
                              id: item.book.bookId,
                            });
                          }}
                        >
                          <i className="fas fa-minus-circle">
                            <FontAwesomeIcon icon={faMinusCircle} />
                          </i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CheckoutPage;
