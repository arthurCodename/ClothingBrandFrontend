import React from "react";
import bg from "../src/assets/ShopBG.avif";
import styled from "styled-components";
import Item from "./Item";

import ".//index.css";

const ShopStyles = styled.div`
  .top-ctnr {
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-position: 25% 55%;
    background-size: cover;
    height: 350px;
  }

  .top-ctnr-content {
    padding: 40px 320px;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .ctnr-btn {
    padding: 13px 0px;
    width: 210px;
    border: 1px solid transparent;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.1rem;
    font-family: "URW DIN", sans-serif;
    background-color: black;
    color: white;
    cursor: pointer;
  }

  .items-ctnr {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
  }

  .ttl-text {
    font-size: 2rem;
  }
  .brightness {
    filter: brightness(50%);
  }
`;

const Shop = (props) => {
  return (
    <ShopStyles>
      <div>
        <div className="top-ctnr"></div>
        <div className="items-ctnr">
          <Item {...props} />
        </div>
      </div>
    </ShopStyles>
  );
};

export default Shop;
