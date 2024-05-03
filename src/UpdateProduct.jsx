import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";

const UpdateProdStyles = styled.div`
  overflow-x: hidden;

  .log-pstn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    filter: brightness(100%);
    border-radius: 20px;
  }

  @keyframes cartslide {
    100% {
      right: 0;
    }
  }

  .log-ctnr {
    width: 800px;
    height: 800px;
    filter: brightness(100%);
    padding: 10px;
  }
  .log-ctnr::-webkit-scrollbar {
    display: none;
  }

  .log-name-exit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
  }

  .log-name {
    font-family: "URW DIN Cond";

    font-size: 1.5rem;
    vertical-align: center;
  }

  .close-btn {
    cursor: pointer;
    justify-self: right;
    align-self: end;
  }

  .main-input-fld {
    font-family: "URW DIN", arial, sans-serif;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .log-intro-txt {
    text-align: center;
    margin-bottom: 60px;
    font-size: 1rem;
  }

  .input-fld {
    display: inline-block;
    width: 100%;
    margin-bottom: 30px;
  }

  input {
    padding-block: 1px;
    padding-inline: 2px;
    width: 100%;
    height: 45px;
    border-radius: 0px;
    border: 1px solid;
    font-size: 1.2rem;
    font-family: "URW DIN", arial, sans-serif;
    font-weight: 500;
  }

  input#desc {
    height: 65px;
  }

  input:focus {
    outline: none;
    font-size: 1.2rem;
    font-family: "URW DIN", arial, sans-serif;
    font-weight: 500;
  }

  .input-fld > div {
    font-size: 15px;
    text-align: left;
  }
  div > i {
    text-decoration: underline;
    cursor: pointer;
  }

  hr {
    height: 3px;
    background-color: gray;
  }

  .ctnr-btn {
    display: block;
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

  .brightness {
  }
`;

const UpdateProduct = (props) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    try {
      window.addEventListener("storage2", () => {
        setProduct(JSON.parse(localStorage.getItem("edititem")));
      });
    } catch (error) {
      console.log(error);
    }

    if (localStorage.getItem("edititem")) {
      try {
        setProduct(JSON.parse(localStorage.getItem("edititem")));
      } catch (error) {
        console.log(error);
      }
    }
  }, [0]);

  const EditProduct = () => {
    setProduct({ ...product });
    console.log(product);
    const moddedProduct = { ...product };
    axios
      .post("http://localhost:3001/updateProduct", moddedProduct)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };
  return (
    <UpdateProdStyles>
      <div>
        <div className="log-pstn">
          <div className="log-ctnr">
            <div className="log-name-exit">
              <div className="log-name">UPDATE ITEM</div>
              <IoMdClose
                className="close-btn"
                onClick={() => props.showUpdate()}
                style={{ fontSize: "1.7rem" }}
              />
            </div>
            <hr></hr>
            <div className="main-input-fld">
              <form>
                <div className="log-intro-txt">
                  Please provide us with some additional information
                </div>
                <div className="input-fld">
                  <div>Product name:</div>
                  <input
                    type="text"
                    placeholder=""
                    defaultValue={product?.name}
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </div>
                <div className="input-fld">
                  <div>Product Image link</div>
                  <input
                    type="text"
                    placeholder=""
                    defaultValue={product.path}
                    onChange={(e) =>
                      setProduct({ ...product, path: e.target.value })
                    }
                  />
                </div>
                <div className="input-fld">
                  <div>Product Price:</div>
                  <input
                    type="text"
                    placeholder=""
                    defaultValue={product.price}
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                  />
                </div>
                <div className="input-fld">
                  <div>Product brief description</div>
                  <input
                    type="text"
                    placeholder=""
                    defaultValue={product.desc}
                    onChange={(e) =>
                      setProduct({ ...product, desc: e.target.value })
                    }
                  />
                </div>
                <div className="input-fld">
                  <div>Product Description</div>
                  <input
                    id="desc"
                    type="text"
                    placeholder=""
                    defaultValue={product.bigDesc}
                    onChange={(e) =>
                      setProduct({ ...product, bigDesc: e.target.value })
                    }
                  />
                </div>
                <button className="ctnr-btn" onClick={EditProduct}>
                  UPDATE PRODUCT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UpdateProdStyles>
  );
};

export default UpdateProduct;
