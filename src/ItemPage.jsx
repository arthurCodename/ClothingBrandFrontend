import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import axios from "axios";

const ItemPageStyles = styled.div`
  .main-ctnr {
    padding-top: 70px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 200px;
    padding-bottom: 120px;
  }
  .img-ctnr {
    height: 650px;
  }

  img {
    height: 100%;
  }

  .info-ctnr {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    gap: 16px;
    height: 100%;
  }

  .item-name {
    font-family: "URW DIN SemiCond", sans-serif;
    font-weight: 600;
    font-size: 30px;
    text-align: center;
  }
  .item-desc {
    font-weight: 300;
    font-size: 18px;
    width: 700px;
    text-align: center;
  }

  .item-price {
    padding-top: 20px;
    font-size: 25px;
  }

  .color-slct {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }

  .clr-text {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .colours-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    text-align: center;
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgb(211, 211, 211);
    width: 45px;
    height: 45px;
    font-weight: 400;
    font-size: 15px;
    cursor: pointer;
  }
  .box:hover {
    border-color: black;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .add-btn {
    margin-top: 20px;
    text-align: center;
    padding: 13px 0px;
    width: 400px;
    border: 1px solid transparent;
    font-size: 1.1rem;
    line-height: 1.1rem;
    font-family: "URW DIN", sans-serif;
    background-color: black;
    color: white;
    cursor: pointer;
  }

  .message {
    color: red;
    font-size: 13px;
  }

  .brightness {
    filter: brightness(50%);
  }

  @media screen and (max-width: 1500px) {
    .main-ctnr {
      gap: 100px;
    }
  }

  @media screen and (max-width: 1368px) {
    .main-ctnr {
      gap: 10px;
    }
    .info-ctnr {
      width: 400px;
    }
    .item-desc {
      width: 475px;
    }
    img {
      height: 700px;
    }
  }
  @media screen and (max-width: 1050px) {
    img {
      height: 550px;
    }

    .info-ctnr {
      height: 550px;
    }
  }
  @media screen and (max-width: 900px) {
    .info-ctnr {
      width: 300px;
    }

    .item-name {
      font-size: 1.5rem;
    }
    .item-desc {
      width: 300px;
    }
    .add-btn {
      width: 300px;
    }
  }

  @media screen and (max-width: 768px) {
    .main-ctnr {
      flex-direction: column;
      align-items: center;
      padding-bottom: 50px;
    }
    .img-ctnr {
      height: 100%;
      width: 500px;
      text-align: center;
    }
    img {
      height: 600px;
    }
    .info-ctnr {
      width: 500px;
      gap: 5px;
      height: 100%;
    }
    .item-name {
      font-size: 1.7rem;
    }
    .add-btn {
      width: 400px;
    }
  }

  @media screen and (max-width: 500px) {
    img {
      height: 475px;
    }
    .info-ctnr {
      width: 475px;
    }
    .item-name {
      font-size: 1.5rem;
    }
    .item-price {
      padding-top: 0px;
    }
    .add-btn {
      width: 350px;
    }
  }

  @media screen and (max-width: 400px) {
    img {
      height: 400px;
    }
    .info-ctnr {
      width: 400px;
    }
    .item-name {
      font-size: 1.3rem;
    }
    .add-btn {
      width: 300px;
    }
  }
`;
const ItemPage = (props) => {
  const [itemData, setItemData] = useState();

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const transNum = (number) => {
    const options = {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return "PLN " + number.toLocaleString("en-US", options);
  };

  const AddToCart = (product) => {
    if (
      props.isLogged() &&
      color.length !== 0 &&
      quantity !== 0 &&
      size.length !== 0
    ) {
      console.log("hello from add");
      const userAdded = props.userLogged()._id;
      const userEmail = props.userLogged().userEmail;
      setMessage("");
      const moddedProduct = {
        ...product,
        size: size,
        color: color,
        quantity: quantity,
        userAdded: userAdded,
        userEmail: userEmail,
      };
      console.log(props.userLogged());
      axios
        .post("http://localhost:3001/addtoCart", moddedProduct)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      window.dispatchEvent(new Event("storage1"));
    } else {
      setMessage("ALL FIELDS HAVE TO BE CHECKED");
    }
  };

  useEffect(() => {
    try {
      window.addEventListener("storage1", () => {
        setItemData(JSON.parse(localStorage.getItem("product")));
      });
    } catch (error) {
      console.log(error);
    }

    if (localStorage.getItem("product")) {
      try {
        setItemData(JSON.parse(localStorage.getItem("product")));
      } catch (error) {
        console.log(error);
      }
    }
  }, [0]);

  console.log(color);
  console.log(size);

  return (
    <ItemPageStyles>
      <div style={{ background: "white" }}>
        <div className="main-ctnr">
          <div className="img-ctnr">
            <img src={itemData?.path} alt="itemforsale" />
          </div>
          <div className="info-ctnr">
            <div className="item-name">{itemData?.name}</div>
            <div className="item-desc">{itemData?.bigDesc}</div>
            <div className="item-price">
              {itemData ? transNum(itemData.price) : "priceless"}
            </div>
            <div className="color-slct">
              <span className="clr-text">SELECT A COLOUR:</span>
              <div className="colours-grid">
                <div
                  className="box"
                  style={{ background: "black" }}
                  onClick={() => setColor("STEEL BLACK")}
                ></div>
                <div
                  className="box"
                  style={{ background: "white" }}
                  onClick={() => setColor("SILK WHITE")}
                ></div>
                <div
                  className="box"
                  style={{ background: "gray" }}
                  onClick={() => setColor("SILVER GRAY")}
                ></div>
                <div
                  className="box"
                  style={{ background: "green" }}
                  onClick={() => setColor("OLIVE GREEN")}
                ></div>
                <div
                  className="box"
                  style={{ background: "brown" }}
                  onClick={() => setColor("BURNT UMBER")}
                ></div>
                <div
                  className="box"
                  style={{ background: "purple" }}
                  onClick={() => setColor("INDIGO PURPLE")}
                ></div>
              </div>
            </div>

            <div className="color-slct">
              <span className="clr-text">SELECT A SIZE:</span>
              <div className="colours-grid">
                <div className="box" onClick={() => setSize("XS")}>
                  XS
                </div>
                <div className="box" onClick={() => setSize("S")}>
                  S
                </div>
                <div className="box" onClick={() => setSize("M")}>
                  M
                </div>
                <div className="box" onClick={() => setSize("L")}>
                  L
                </div>
                <div className="box" onClick={() => setSize("XL")}>
                  XL
                </div>
                <div className="box" onClick={() => setSize("XXL")}>
                  XXL
                </div>
              </div>
            </div>
            <div className="add-btn" onClick={() => AddToCart(itemData)}>
              <PiShoppingCartSimpleBold />
              ADD TO CART
            </div>
            <div className="message">{message.length !== 0 ? message : ""}</div>
          </div>
        </div>
      </div>
    </ItemPageStyles>
  );
};

export default ItemPage;
