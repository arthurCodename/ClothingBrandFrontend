import React from "react";
import styled from "styled-components";
import logo from "./assets/logo.svg";
import ".//index.css";

const FooterStyles = styled.div`
  .icon-sctn {
    display: flex;
    justify-content: center;
  }
  .icon-ctnr {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
    width: 90%;
    text-align: center;
  }

  .icon-div {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    grid-template-rows: 75px 25px 50px 50px;
  }

  .icon {
    max-width: 42px;

    grid-row: 1/2;
    grid-column: 1/-1;
    align-self: center;
    justify-self: center;
  }

  .icon-name {
    grid-row: 2/3;
    grid-column: 1 / span 3;
    font-family: "URW DIN";
    font-size: 1.1rem;
  }

  .icon-desc {
    grid-row: 3/4;
    grid-column: 1 / span 3;
    font-size: 0.9rem;
    color: #333333;
  }
  .icon-link {
    grid-row: 4 / end;
    grid-column: 1 / span 3;
    align-self: start;
  }

  .lower-info-section {
    padding-top: 60px;
    width: 100%;
    text-align: center;
    font-family: "URW DIN", arial, sans-serif;
    font-size: 14px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    row-gap: 10px;
    padding: 20px 50px;
    align-items: center;
  }
  .info-grid-clmn {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .logo {
    width: 100%;
    height: 100px;
  }

  @media screen and (max-width: 1250px) {
    .icon-div {
      grid-template-rows: 75px 25px 70px 50px;
    }
  }

  @media screen and (max-width: 920px) {
    .icon-ctnr {
      gap: 0px;
    }
    .info-grid {
      padding: 10px;
    }
    .logo {
      display: none;
    }
    .info-grid {
      grid-template-columns: repeat(5, 1fr);
      row-gap: 0px;
    }
  }

  @media screen and (max-width: 820px) {
    .icon-ctnr {
      gap: 0px;
    }
    .icon {
      max-width: 35px;
    }
    .icon-name {
      font-size: 1rem;
    }
    .icon-desc {
      font-size: 0.8rem;
    }
    .icon-link {
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 750px) {
    .icon {
      max-width: 50px;
      align-self: center;
    }

    .icon-div {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 72px auto;
    }
    .icon-name {
    }
    .icon-link {
      display: none;
    }
    .icon-desc {
      display: none;
    }
    .lower-info-section {
      padding-top: 10px;
    }
  }

  @media screen and (max-width: 666px) {
    .info-grid {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-row-gap: 20px;
    }

    .info-grid .socials {
      grid-column: 3;
      grid-row: 3;
    }
    .info-grid .orders {
      grid-column: 2;
      grid-row: 2;
    }
    .info-grid .faq {
      grid-column: 1;
      grid-row: 3;
    }

    .info-grid .company {
      grid-column: 3;
      grid-row: 1;
    }

    .lower-info-section {
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyles>
      <div style={{ backgroundColor: "white" }}>
        <div className="icon-sctn">
          <div className="icon-ctnr">
            <div className="icon-div">
              <img
                src="https://images-dynamic-arcteryx.imgix.net/foundation-ui/svgs/FindAStore.svg"
                className="icon"
                alt="icon"
              />
              <div className="icon-name">FIND AN ARC'TERYX STORE</div>
              <div className="icon-desc">
                Locate a brand store, partner store or retail partner in your
                area
              </div>
              <div className="icon-link">FIND A STORE</div>
            </div>
            <div className="icon-div">
              <img
                src="https://images-dynamic-arcteryx.imgix.net/foundation-ui/svgs/Email.svg"
                className="icon"
                alt="email"
              />
              <div className="icon-name">BE THE FIRST TO KNOW</div>
              <div className="icon-desc">
                Subscribe to receive new product releases, exclusive discount
                codes, invites to events and a chance to win.
              </div>
              <div className="icon-link">SIGN UP FOR EMAIL</div>
            </div>
            <div className="icon-div">
              <img
                src="https://images-dynamic-arcteryx.imgix.net/foundation-ui/svgs/CustomerServiceCentre.svg"
                className="icon"
                alt="help"
              />
              <div className="icon-name">CUSTOMER SUPPORT CENTRE</div>
              <div className="icon-desc">
                Need more information? Have a repair concern? No problem. We're
                here to help.
              </div>
              <div className="icon-link">FIND ANSWERS</div>
            </div>
          </div>
        </div>
        <div className="lower-info-section">
          <hr />
          <div className="info-grid">
            <div className="logo info-grid-clmn">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="contact info-grid-clmn">
              <div>Customer Support Centre</div>
              <div>Contact Us</div>
              <div>General FAQ</div>
            </div>
            <div className="orders info-grid-clmn">
              <div>Shipping & Delivery</div>
              <div>Order Tracking</div>
              <div>Returns & Refunds</div>
            </div>
            <div className="faq info-grid-clmn">
              <div>Sustainability</div>
              <div>Who We Are</div>
              <div>Pro Program</div>
            </div>
            <div className="company info-grid-clmn">
              <div>Gift Cards</div>
              <div>Careers</div>
              <div>Newsroom</div>
            </div>
            <div className="socials info-grid-clmn">
              <div>Sign-In | PL/EN</div>
              <div>iOS App / Android App</div>
              <div>othersocials</div>
            </div>
          </div>
        </div>
      </div>
    </FooterStyles>
  );
};

export default Footer;
