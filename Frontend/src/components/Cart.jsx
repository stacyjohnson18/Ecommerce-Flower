import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import Footer from './Footer';
import { useNavigate, useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom';
import './Cart.css';
import { useCart } from "../context/cart";
import { useAuth } from '../context/auth';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';

const Cart = () => {

  const [data, setData] = useState([]);

  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:8088/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://127.0.0.1:8088/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  return (
    <>
      <Header />

      <div class="cart-page">

        <div class="container1-items">
          <div class="items-list">
            {
              cart?.map((item) =>
                <div class="items">
                  <div class="items-img">
                    <img src={`http://127.0.0.1:8088/api/v1/product/product-photo/${item._id}`} />
                  </div>
                  <div class="items-details">
                    <p id="c1-details-text2">Delivery by Thu Apr 4 | <del>₹40</del>    Free</p>
                    <p id="c1-details-text1">{item.name}</p>

                    <p id="c1-details-text3"><del>₹1,995</del> ₹{item.price}</p>
                    {/* <button id="save">Save For Later</button> */}
                    <button id="remove" onClick={() => removeCartItem(item._id)}>Remove</button>
                  </div>
                </div>

              )
            }
          </div>
        </div>

        <div class="container2-amount">
          <h3>Price Detail</h3>
          <div class="c2-items">
            <p id="items-text">Price ({`${cart?.length}`} item)</p>
            {/* <p id="items-amount">{data.price}</p> */}
          </div>
          <div class="c2-discount">
            <p id="discount-text">Discount</p>
            <p id="discount-amount">0.00</p>
          </div>

          <div class="c2-total-amount">
            <p id="total-text"><b>Total Amount</b></p>
            <p id="amount-text"><b>{totalPrice()}</b></p>
          </div>

          {auth?.user?.address ? (
            <>
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.address}</h5>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            </>
          ) : (
            <div className="mb-3">
              {auth?.token ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              ) : (
                <button
                  className="btn btn-outline-warning"
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                >
                  Plase Login to checkout
                </button>
              )}
            </div>
          )}
          <div className="mt-2">
            {!clientToken || !cart?.length ? (
              ""
            ) : (
              <>
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />

                <button
                  className="btn btn-primary"
                  onClick={handlePayment}
                  disabled={loading || !instance || !auth?.user?.address}
                >
                  {loading ? "Processing ...." : "Make Payment"}
                </button>
              </>
            )}
          </div>

          {/* <p id="c2-text"><b>You will save {price.saved} on this order</b></p> */}
        </div>


      </div>


      <Footer />
    </>
  )
}


export default Cart