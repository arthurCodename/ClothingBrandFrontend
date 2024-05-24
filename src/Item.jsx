import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
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
    width: 100vw;
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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 10px;
    padding-top: 20px;
    text-align: center;
    padding: 0px 75px;
    justify-content: ;
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
    height: 3px;
    background-color: gray;
    width: 100%;
  }

  .categories-ctnr {
    font-size: 1.2rem;
    font-weight: 600;
    width: fit-content;
    padding: 5px 20px;
    font-family: "URW DIN SemiCond", sans-serif;
    width: 100vw;
  }

  /* .categories-pstn {
    
  }

 
  } */

  .categories-mdl {
    overflow: hidden;

    background-color: white;

    font-size: 0.9rem;
    font-family: "URW DIN", sans-serif;
    font-weight: 400;
  }
  .categories-grid {
    display: grid;
    width: fit-content;
    grid-column-gap: 50px;
    grid-template-columns: auto auto;
    grid-template-rows: repeat(6, auto);
  }
  #ctgr-click {
    cursor: pointer;
  }

  .ctgr {
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 3px;
  }

  input[type="checkbox"] {
    color: black;
    background-color: black;
    cursor: pointer;
  }
  label {
    cursor: pointer;
  }

  .brightness {
    filter: brightness(50%);
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .ctgr-ttl-ctnr {
    width: 100%;
    display: flex;
  }

  @media (max-width: 1710px) {
    .grid-ctnr {
      padding: 0 0px;
    }
  }

  @media (max-width: 1550px) {
    .grid-ctnr {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 1350px) {
    /* .item-ctnr {
      width: 360px;
      padding: 40px;
    }
    .grid-ctnr {
      padding: 20px 75px 50px;
    } */
    .grid-ctnr {
      padding: 0 0px;
    }
  }
  @media (max-width: 1240px) {
    .item-ctnr {
      padding: 20px;
      width: 340px;
    }
  }

  @media (max-width: 1050px) {
    .grid-ctnr {
      padding: 20px 0px;
    }
    .item-ctnr {
      width: 310px;
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
      width: 280px;
      padding: 10px;
    }
    .grid-ctnr {
      padding: 25px 0px;
    }

    .item-content {
      font-size: 0.9rem;
    }
    .categories-grid {
      grid-template-columns: auto auto;
    }
    .categories-mdl {
      padding: 0 10px 10px;
      font-size: 1.1rem;
      font-weight: 300;
    }
  }

  @media (max-width: 550px) {
    .item-ctnr {
      width: 380px;
      padding: 20px;
    }
    .grid-ctnr {
      padding: 25px 25px;
      grid-template-columns: repeat(1, 1fr);
    }
    .item-content {
      font-size: 1rem;
    }
    .categories-grid {
      grid-template-columns: auto;
    }
  }

  @media (max-width: 410px) {
    .item-ctnr {
      width: 330px;
      padding: 0px;
    }
    .grid-ctnr {
      padding: 25px 10px;
    }
  }
`;

const Item = (props) => {
  const [data, setData] = useState();
  const [showCategories, setShowCategories] = useState(false);
  const [category, setCategory] = useState("");
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
    let ctgr = category;
    if (category.length === 0 || category === "View All") {
      axios
        .post("https://clothingbrandbackend.onrender.com/getProducts")
        .then((products) => setData(products.data))
        .catch((err) => console.log(err));
    } else {
      axios
        .post("https://clothingbrandbackend.onrender.com/getProductsByTag", {
          ctgr,
        })
        .then((product) => setData(product.data))

        .catch((err) => console.log(err));
    }

    console.log(category);
  }, [category, showCategories]);

  useEffect(() => {
    if (props.isCategory()) {
      document.querySelector(".grid-ctnr").classList.add("brightness");
      // document.querySelector(".items-ctnr").classList.remove("disable-scroll");
    } else {
      document.querySelector(".grid-ctnr").classList.remove("brightness");
    }
  }, [props]);

  return (
    <ItemStyles>
      <div>
        <div className="categories-ctnr">
          <div className="ctgr-ttl-ctnr">
            <div id="ctgr-click" onClick={() => props.showCategory()}>
              CATEGORIES
            </div>
          </div>
          <hr className="lower-hr" />
          {props.isCategory() ? (
            <div className="categories-mdl">
              <div className="categories-grid">
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr1"
                    onClick={() =>
                      document.getElementById("ctgr1").checked
                        ? setCategory("Packs")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr1">Pack</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr2"
                    onClick={() =>
                      document.getElementById("ctgr2").checked
                        ? setCategory("Accessories")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr2">Accessories</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr3"
                    onClick={() =>
                      document.getElementById("ctgr3").checked
                        ? setCategory("Shell Jackets")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr3">Shell Jackets</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr4"
                    onClick={() =>
                      document.getElementById("ctgr4").checked
                        ? setCategory("Insulated Jacket")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr4">Insulated Jacket</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr5"
                    onClick={() =>
                      document.getElementById("ctgr5").checked
                        ? setCategory("Shirt and Tops")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr5">Shirt and Tops</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr6"
                    onClick={() =>
                      document.getElementById("ctgr6").checked
                        ? setCategory("Pants")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr6">Pants</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr7"
                    onClick={() =>
                      document.getElementById("ctgr7").checked
                        ? setCategory("Fleece")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr7">Fleece</label>
                </div>

                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr8"
                    onClick={() =>
                      document.getElementById("ctgr8").checked
                        ? setCategory("Footwear")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr8">Footwear</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr9"
                    onClick={() =>
                      document.getElementById("ctgr9").checked
                        ? setCategory("Climbing Gear")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr9">Climbing Gear</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr0"
                    onClick={() =>
                      document.getElementById("ctgr0").checked
                        ? setCategory("Base Layer")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr0">Base Layer</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr10"
                    onClick={() =>
                      document.getElementById("ctgr10").checked
                        ? setCategory("Shorts")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr10">Shorts</label>
                </div>
                <div className="ctgr">
                  <input
                    type="checkbox"
                    id="ctgr11"
                    onClick={() =>
                      document.getElementById("ctgr11").checked
                        ? setCategory("Apperal Accessories")
                        : setCategory("")
                    }
                  />
                  <label for="ctgr11">Apperal Accessories</label>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="items-ctnr">
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
