import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

const UserStyles = styled.div`
  .ctnr {
    padding: 75px 150px;
    background-color: white;
  }
  .user-ctnr {
    text-align: center;
  }
  .acc {
    font-family: "URW DIN Cond", Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 2rem;
    padding-bottom: 20px;
    padding-top: 20px;
  }

  .user-ctnt {
    display: flex;
    justify-content: space-between;
  }

  .box {
    height: 60px;
    width: 100px;
    text-align: center;
    display: flex;
    font-size: 1.1rem;
  }

  .box:hover {
    cursor: pointer;
  }
  .data-grid {
    width: 1300px;
    height: 60vh;
    overflow-y: scroll;
  }

  #order-name {
    width: 250px;
  }
  #sum {
    display: flex;
    justify-content: end;
  }

  .order-item {
    display: grid;
    grid-template-columns: 125px 270px auto;
    grid-template-rows: 100px 60px;

    margin-bottom: 20px;
  }

  .order-img > img {
    height: 160px;
    object-fit: contain;
  }
  .order-name {
    justify-self: start;
    align-self: end;
    padding-bottom: 10px;
    font-family: "URW DIN Cond", Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 1.4rem;
    grid-column: 2 / span 3;
  }

  .order-color {
    grid-column: 2;
    justify-self: start;
    font-weight: 300;
  }

  .order-quant {
  }
  .order-price {
    grid-column: 3 / span 2;
    grid-row: 2;
    font-family: "URW DIN Cond", Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 1.3rem;
    align-self: end;
    justify-self: end;
    padding-right: 20px;
  }

  @media screen and (max-width: 947px) {
    .ctnr {
      padding: 75px 80px;
    }
  }

  @media screen and (max-width: 828px) {
    .ctnr {
      padding: 75px 20px;
    }
  }

  @media screen and (max-width: 768px) {
    .order-img > img {
      height: 130px;
    }
    .order-name {
      font-size: 1.2rem;
      padding-bottom: 2px;
    }
    .order-item {
      grid-template-columns: 100px 230px auto;
      grid-template-rows: 100px 30px;
    }
    .order-color {
      font-size: 0.9rem;
    }
    .order-price {
      font-size: 1.1rem;
      padding-right: 0px;
    }
  }

  @media screen and (max-width: 616px) {
    .user-ctnt {
      display: flex;
      flex-direction: column;
    }
    .data-grid {
      width: 100%;
      height: 60vh;
      overflow-y: scroll;
    }
  }

  @media screen and (max-width: 520px) {
    .order-item {
      grid-template-columns: 100px 130px 100px auto;
    }

    .order-name {
      grid-column: 2 / span 3;
    }
    .order-price {
      font-size: 1rem;
      padding-right: 5px;
      grid-column: 3 / span 2;
    }
  }

  @media screen and (max-width: 414px) {
    .ctnr {
      padding: 75px 10px;
    }
    .order-name {
      font-size: 1.1rem;
    }
    .order-img > img {
      height: 120px;
    }
    .order-item {
      grid-template-rows: 100px 20px;
      grid-template-columns: ;
    }
    .order-color {
      font-size: 0.8rem;
    }
  }
`;

const UserProfile = (props) => {
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const getOrders = useCallback(() => {
    const userId = props.userLogged()._id;

    axios
      .post("https://clothingbrandbackend.onrender.com/getUserOrders", {
        userId: userId,
      })
      .then((res) => setOrder(res.data))

      .catch((err) => console.log(err));
    axios
      .post("https://clothingbrandbackend.onrender.com/getOrderItemsPrice", {
        userId: userId,
      })
      .then((res) => setTotal(res.data))

      .catch((err) => console.log(err));
  }, [props]);
  useEffect(() => {
    getOrders();
  }, [0]);

  const transNum = (number) => {
    const options = {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return "PLN " + number.toLocaleString("en-US", options);
  };

  const logOut = () => {
    props.userLogOut();
    window.location = "/";
  };

  return (
    <UserStyles>
      <div className="ctnr">
        <div className="acc">MY ACCOUNT</div>
        <div className="user-ctnr">
          <div className="user-ctnt">
            <div className="categories">
              <div className="box">MY ORDERS</div>
              <div className="box" onClick={() => logOut()}>
                SIGN OUT
              </div>
            </div>
            <div className="data-grid">
              {order?.map((o, key) => (
                <div key={key} className="order-item">
                  <div className="order-img">
                    <img src={o.path} alt="order-img" />
                  </div>
                  <div className="order-name">{o.name}</div>

                  <div className="order-color">
                    {" "}
                    {o.color}, {o.size}
                  </div>

                  <div className="order-price">
                    {transNum(o.price)} x {o.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="acc" id="sum">
          ORDER SUM: {transNum(total)}
        </div>
      </div>
    </UserStyles>
  );
};

export default UserProfile;
