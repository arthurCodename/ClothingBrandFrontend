import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

const CreateItemStyles = styled.div`
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

  textarea {
    width: 100%;
    font-size: 1.2rem;
    font-family: "URW DIN", arial, sans-serif;
    font-weight: 500;
  }

  textarea:focus {
    outline: none;
  }

  input:focus {
    outline: none;
    font-size: 1.2rem;
    font-family: "URW DIN", arial, sans-serif;
    font-weight: 500;
  }

  #desc {
    border: 1px solid black;
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
    padding: 20px 0px;
    width: 100%;
    text-align: center;
    border-radius: 10px;
    border: 1px solid transparent;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.1rem;
    font-family: "URW DIN", sans-serif;
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

const CreateItem = (props) => {
  const [product, setProduct] = useState({
    id: null,
    name: "",
    path: "",
    price: null,
    desc: "",
    bigDesc: "",
    category: "",
  });

  const ItemCreate = () => {
    setProduct({ ...product });

    console.log(product);

    axios
      .post("https://clothingbrandbackend.onrender.com/addtoProducts", product)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <CreateItemStyles>
      <div>
        <div>
          <div className="log-pstn">
            <div className="log-ctnr">
              <div className="log-name-exit">
                <div className="log-name">ADD ITEM</div>
                <IoMdClose
                  className="close-btn"
                  onClick={() => props.showCreate()}
                  style={{ fontSize: "1.7rem" }}
                />
              </div>
              <hr></hr>
              <div className="main-input-fld">
                <div className="log-intro-txt">
                  Please provide the data of the given product
                </div>
                <div className="input-fld">
                  <div>Product name:</div>
                  <input
                    type="text"
                    placeholder=""
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
                    onChange={(e) =>
                      setProduct({ ...product, desc: e.target.value })
                    }
                  />
                </div>
                <div className="input-fld">
                  <div>Product Category:</div>
                  <input
                    type="text"
                    placeholder=""
                    onChange={(e) =>
                      setProduct({ ...product, category: e.target.value })
                    }
                  />
                </div>
                <div className="input-fld">
                  <div>Product Description</div>
                  <textarea
                    rows={5}
                    style={{ resize: "none" }}
                    id="desc"
                    type="text"
                    placeholder=""
                    onChange={(e) =>
                      setProduct({ ...product, bigDesc: e.target.value })
                    }
                  ></textarea>
                </div>
                <button className="ctnr-btn" onClick={ItemCreate}>
                  ADD ITEM
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CreateItemStyles>
  );
};

export default CreateItem;
