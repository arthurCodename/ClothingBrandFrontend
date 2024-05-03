import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const CartStyles = styled.div`
  overflow-x: hidden;
  .cart-pstn {
    position: absolute;
    top: 0px;
    right: -400px;
    animation: cartslide 0.4s forwards;
  }

  @keyframes cartslide {
    100% {
      right: 0;
    }
  }

  .cart-ctnr {
    width: 400px;
    height: 100vh;
    background-color: white;
    padding: 10px;
    overflow-y: scroll;
  }
  .cart-ctnr::-webkit-scrollbar {
    display: none;
  }

  .cart-name-exit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
  }

  .cart-name {
    font-family: "URW DIN Cond", Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: 1.9rem;
  }

  .close-btn {
    cursor: pointer;
    justify-self: right;
  }

  .hr-top {
    margin-bottom: 30px;
    height: 3px;
    background-color: gray;
  }

  .lower-hr {
    margin-bottom: 17px;
    height: 3px;
    background-color: gray;
  }
  .cart-item {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: 40px 30px 30px;
    padding-bottom: 30px;
  }
  img {
    object-fit: cover;
    width: auto;
    height: 120px;
  }
  .cart-item-img {
    grid-row: 1 / end;
    justify-self: center;
  }

  .cart-item-name {
    align-self: start;

    font-size: 1rem;
  }
  .cart-item-price {
    align-self: end;
    width: 100%;
    height: auto;
    grid-row: 3 / end;
    grid-column: 3 / end;
    font-family: "URW DIN", Arial, Helvetica, sans-serif;
  }

  .cart-item-quatity {
    align-self: center;
    grid-column: 2/3;
    font-weight: 300;
    font-size: smaller;
    display: flex;
    justify-content: start;
    gap: 10px;
  }

  .cart-item-size {
    align-self: flex-start;
    grid-column: 2/3;
    font-weight: 300;
    font-size: smaller;
    justify-self: start;
  }

  .chng-amnt {
    font-size: 25px;
    cursor: pointer;
    border: none;
    background-color: white;
  }

  .box {
    font-size: 15px;
    border: 1px solid black;
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
  }
  .item-summary {
    display: flex;
    justify-content: space-between;
  }

  .cart-item-close {
    grid-column: 3 / end;
    grid-row: start/1;
    justify-self: end;
  }

  .ctnr-btn {
    margin-top: 10px;
    padding: 13px 0px;
    width: 100%;
    text-align: center;
    border: 1px solid transparent;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2rem;
    font-family: "URW DIN", sans-serif;
    background-color: black;
    color: white;
    cursor: pointer;
  }

  .no-items {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 476px) {
    .cart-ctnr {
      width: 100%;
    }
  }

  @media screen and (max-width: 476px) {
    .cart-item-price {
      grid-column: 2 / span 2;
      grid-row: 4;
    }
  }
`;

const Cart = (props) => {
  const [cartItems, setcartItems] = useState([]);
  const [cost, setCost] = useState(0);

  const DeleteFromCart = async (cartitem) => {
    if (cartitem !== undefined || cartitem !== null) {
      const _id = cartitem._id;
      const userAdded = props.userLogged()._id;
      const data = { _id: _id, userAdded: userAdded };
      axios
        .post("http://localhost:3001/deletefromCart", data)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      getAllCartItems();
    }
  };

  const ChangeAmount = (e, _id) => {
    cartItems.map((cartitem) => {
      if (cartitem._id === _id && e.target.id === "plus") {
        const quantity1 = ++cartitem.quantity;
        axios
          .post("http://localhost:3001/updateQuantity", cartitem, quantity1)
          .then(() => console.log("hello"));
        getAllCartItems();
        return {
          ...cartitem,
          quantity: quantity1,
        };
      } else if (cartitem._id === _id && e.target.id === "minus") {
        const quantity2 = --cartitem.quantity;
        axios
          .post("http://localhost:3001/updateQuantity", cartitem, quantity2)
          .then(() => console.log("hello"));
        getAllCartItems();
        return {
          ...cartitem,
          quantity: quantity2,
        };
      } else {
        return cartitem;
      }
    });
    setcartItems(cartItems);
  };
  const getAllCartItems = useCallback(() => {
    let userId = props.userLogged()._id;
    console.log(userId);
    axios
      .post("http://localhost:3001/getCartItems", { userId })
      .then((items) => setcartItems(items.data))

      .catch((err) => console.log("hello " + err));

    axios
      .post("http://localhost:3001/getCartItemsPrice", { userId })
      .then((price) => setCost(price.data))
      .catch((err) => console.log(err));
  }, [0]);
  useEffect(() => {
    console.log("hello");
    getAllCartItems();
  }, [getAllCartItems]);

  const transNum = (number) => {
    const options = {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return "PLN " + number.toLocaleString("en-US", options);
  };

  const getOrder = async () => {
    setcartItems(cartItems);
    console.log(cartItems);
    await axios
      .post("http://localhost:3001/addtoOrders", cartItems)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <CartStyles>
      <div className="cart-pstn">
        <div className="cart-ctnr">
          <div className="cart-name-exit">
            <div className="cart-name">
              {props.isLogged()
                ? props.userLogged().userFirstName + "'s Cart"
                : "Cart"}
            </div>
            <IoMdClose
              className="close-btn"
              style={{ fontSize: "1.7rem", cursor: "pointer" }}
              onClick={props.showcart}
            />
          </div>
          {props.isLogged() ? (
            <>
              {cartItems.length !== 0 ? (
                <div>
                  <hr className="hr-top" />
                  {cartItems?.map((cartitem) => (
                    <div key={cartitem._id} className="cart-item">
                      <img
                        src={cartitem.path}
                        className="cart-item-img"
                        alt="cartitem"
                      />
                      <div className="cart-item-name">{cartitem.name}</div>
                      <div className="cart-item-size">
                        {cartitem.color + ", " + cartitem.size}
                      </div>
                      <div className="cart-item-quatity">
                        <button
                          className="chng-amnt"
                          id="minus"
                          disabled={cartitem.quantity === 1 ? true : false}
                          onClick={(e) => ChangeAmount(e, cartitem._id)}
                        >
                          {" "}
                          -{" "}
                        </button>
                        <div className="box">{cartitem.quantity}</div>

                        <button
                          className="chng-amnt"
                          id="plus"
                          onClick={(e) => ChangeAmount(e, cartitem._id)}
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                      <div className="cart-item-price">
                        {transNum(cartitem.price)}
                      </div>
                      <IoMdClose
                        className="cart-item-close"
                        style={{ fontSize: "1.7rem", cursor: "pointer" }}
                        onClick={() => DeleteFromCart(cartitem)}
                      />
                    </div>
                  ))}
                  <hr className="lower-hr" />
                  <div className="item-summary">
                    <div>Item Total</div>
                    <div>{cost ? transNum(cost) : "000"}</div>
                  </div>
                  <div className="ctnr-btn" onClick={getOrder}>
                    VIEW CAR
                  </div>
                </div>
              ) : (
                <div className="no-items">
                  <div>You currently have no items in your shopping cart.</div>
                </div>
              )}
            </>
          ) : (
            <div className="no-items">
              <div>You need to be logged in to add items to your cart</div>
            </div>
          )}
        </div>
      </div>
    </CartStyles>
  );
};

export default Cart;
