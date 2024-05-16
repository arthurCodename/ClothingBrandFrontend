import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { Link } from "react-router-dom";

const ItemStyles = styled.div`
  .item-ctnr {
    width: 390px;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
    border: white 1px solid;
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  .items-ctnr {
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  a:link {
    text-decoration: none;
  }

  .item-ctnr:hover {
    border: grey 1px solid;
    border-radius: 5px;
    box-sizing: border-box;
    text-decoration: none;
  }
  .brightness {
    filter: brightness(50%);
  }

  img {
    width: 100%;
  }

  .item-content {
    text-align: center;
    margin-top: 1rem;
    font-size: 1rem;
  }

  .item-name {
    line-height: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .item-desc {
    line-height: 1.2rem;
    max-width: 16.666rem;
    min-height: 3rem;
    margin: 0px auto;
  }

  .grid-ctnr {
    background-color: white;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 10px;
    padding-top: 20px;
    text-align: center;
  }

  .ctnr-btn {
    margin-top: 10px;
    padding: 13px 0px;
    width: 100%;
    text-align: center;
    border: 1px solid transparent;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.1rem;
    font-family: "URW DIN", sans-serif;
    background-color: black;
    color: white;
    cursor: pointer;
  }

  .intro-txt {
    font-size: 2.5rem;
    font-family: "URW DIN Cond", Arial, Helvetica, sans-serif;
    padding: 25px 100px 0px;
  }

  .item {
    display: flex;
    justify-content: center;
  }

  .add-btn {
    cursor: pointer;
  }

  .lower-hr {
    width: 100%;
    height: 3px;
    background-color: gray;
  }

  .categories-ctnr {
    font-size: 1.3rem;
    font-weight: 600;
    width: 90vw;
    font-family: "URW DIN SemiCond", sans-serif;
  }

  /* .categories-pstn {
    
  }

 
  } */
  @keyframes categorieslide {
    100% {
      z-index: 1;
      height: 220px;
      overflow: hidden;
    }
  }

  .categories-mdl {
    position: absolute;
    top: 567px;
    right: 0px;
    z-index: 0;
    overflow: hidden;
    animation: categorieslide 1s forwards;
    height: 0px;
    background-color: white;
    padding: 0px 50px;
    display: grid;
    width: 100%;
    grid-column-gap: 20px;
    grid-template-columns: repeat(2, 1fr);
    font-size: 0.9rem;
    font-family: "URW DIN", sans-serif;
    font-weight: 400;
  }

  #ctgr-click {
    cursor: pointer;
  }

  .ctgr {
    margin-top: 10px;
    cursor: pointer;
  }

  .lower-brt {
    filter: brightness(50%);
  }
  @media (max-width: 1550px) {
    .grid-ctnr {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 1366px) {
    .item-ctnr {
      width: 360px;
      padding: 40px;
    }
    .grid-ctnr {
      padding: 20px 75px 50px;
    }
  }
  @media (max-width: 1050px) {
    .grid-ctnr {
      padding: 20px 50px 50px;
    }
    .item-ctnr {
      width: 310px;
      padding: 5px;
    }
  }

  @media (max-width: 950px) {
    .grid-ctnr {
      grid-template-columns: repeat(2, 1fr);
    }

    .item-ctnr {
      width: 360px;
      padding: 20px;
    }
  }

  @media (max-width: 710px) {
    .item-ctnr {
      width: 300px;
      padding: 20px;
    }
    .grid-ctnr {
      padding: 25px 10px 50px;
    }

    .item-content {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 550px) {
    .item-ctnr {
      width: 380px;
      padding: 20px;
    }
    .grid-ctnr {
      padding: 50px 25px;
      grid-template-columns: repeat(1, 1fr);
    }
    .item-content {
      font-size: 1rem;
    }
  }

  @media (max-width: 410px) {
    .item-ctnr {
      width: 330px;
      padding: 0px;
    }
    .grid-ctnr {
      padding: 50px 10px;
    }
  }
`;

const Item = (props) => {
  const [data, setData] = useState();
  const [showCategories, setShowCategories] = useState(false);

  const AddToCart = (product) => {
    if (props.isLogged()) {
      console.log("hello from add");
      const userAdded = props.userLogged()._id;

      const moddedProduct = {
        ...product,
        userAdded: userAdded,
      };
      axios
        .post(
          "https://clothingbrandbackend.onrender.com/addtoCart",
          moddedProduct
        )
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      window.dispatchEvent(new Event("storage1"));
    } else {
      console.log("u need to be logged in");
    }
  };

  const transNum = (number) => {
    const options = {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return "PLN " + number.toLocaleString("en-US", options);
  };

  useEffect(() => {
    axios
      .post("https://clothingbrandbackend.onrender.com/getProducts")
      .then((products) => setData(products.data))
      .catch((err) => console.log(err));

    if (showCategories) {
      document.querySelector(".items-ctnr").classList.add("lower-brt");
    }
  }, []);

  const DisplayItems = (ctgr) => {
    axios
      .post("https://clothingbrandbackend.onrender.com/getProductsByTag", {
        ctgr,
      })
      .then((product) => setData(product.data))
      .catch((err) => console.log(err));
  };

  return (
    <ItemStyles>
      <div>
        <div className="items-ctnr">
          <div className="categories-ctnr">
            <div
              id="ctgr-click"
              onClick={() => setShowCategories(!showCategories)}
            >
              CATEGORIES
            </div>
            <hr className="lower-hr" />
            {showCategories ? (
              <div className="categories-mdl">
                <div className="clmn1">
                  <div className="ctgr" onClick={DisplayItems("Packs")}>
                    Packs
                  </div>
                  <div className="ctgr" onClick={DisplayItems("Accessories")}>
                    Accessories
                  </div>
                  <div className="ctgr" onClick={DisplayItems("Shell Jackets")}>
                    Shell Jackets
                  </div>
                  <div
                    className="ctgr"
                    onClick={DisplayItems("Insulated Jackets")}
                  >
                    Insulated Jackets
                  </div>
                  <div
                    className="ctgr"
                    onClick={DisplayItems("Shirts and Tops")}
                  >
                    Shirts and Tops
                  </div>
                  <div className="ctgr" onClick={DisplayItems("Pants")}>
                    Pants
                  </div>
                  <div className="ctgr" onClick={DisplayItems("Fleece")}>
                    Fleece
                  </div>
                </div>
                <div className="clmn2">
                  <div className="ctgr" onClick={DisplayItems("Footwear")}>
                    Footwear
                  </div>
                  <div className="ctgr" onClick={DisplayItems("Climbing Gear")}>
                    Climbing Gear
                  </div>
                  <div className="ctgr" onClick={DisplayItems("Base Layer")}>
                    Base Layer
                  </div>
                  <div className="ctgr" onClick={DisplayItems("Shorts")}>
                    Shorts
                  </div>
                  <div
                    className="ctgr"
                    onClick={DisplayItems("Apperal Accessories")}
                  >
                    Apperal Accessories
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="grid-ctnr">
            {data?.map((product, key) => (
              <Link to={"/itemPage"} key={product.id} className="item">
                <div
                  className="item-ctnr"
                  onClick={() =>
                    localStorage.setItem("product", JSON.stringify(product))
                  }
                >
                  <div className="img-ctnr">
                    <img src={product.path} alt="itemforsale" />
                  </div>
                  <div className="item-content">
                    <div className="item-name">{product.name}</div>
                    <div className="item-desc">{product.desc}</div>
                    <div>{transNum(product.price)}</div>
                    <div className="add-btn" onClick={() => AddToCart(product)}>
                      Add To Cart
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </ItemStyles>
  );
};

export default Item;
