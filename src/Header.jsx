import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "./assets/logo.svg";
import ".//index.css";
import { Link } from "react-router-dom";

const HeaderStyles = styled.div`
  .hdr1-container {
    height: 38.5px;
    background-color: #000000;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    padding: 0 30px;
    color: white;

    font-size: 0.8rem;
    gap: 7px;
  }

  .hdr2-container {
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #e9e9e9;

    font-size: 0.8rem;
    gap: 5px;
  }

  .hdr3-container {
    background-color: white;
    height: 100px;

    padding: 0 75px;
  }

  .hdr-atrbts {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    overflow: hidden;
    width: 100%;
  }

  .hdr-atrbts div {
    float: left;
  }

  .leftsd-ctnr {
    display: flex;
    flex-direction: row;
    justify-content: start;
    gap: 35px;
    align-items: end;
    width: 100vw;
  }
  .logo-container {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
  }
  .categories-container {
    display: flex;
    flex-direction: row;
    gap: 50px;
    padding-bottom: 17px;
  }

  .rightsd-ctnr {
    display: flex;
    flex-direction: row;
    gap: 35px;
  }

  .logo {
    width: 100px;
    height: 100px;
  }
  .dropdown {
    overflow: hidden;
  }
  .dropdown .d-btn {
    font-size: 16px;
    border: none;
    outline: none;
    padding: 14px 16px;
    background: inherit;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background: white;

    width: 100%;
    left: 0;
    z-index: 10;
    text-align: center;
  }

  .row {
    width: 100%;
  }

  .bg-column {
    width: (100/7);
    padding: 50px 20px;

    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .bg-column a {
    display: block;
    width: 100%;
    float: none;

    font-size: 12px;
    font-weight: 400;
    text-align: left;
    color: #000;
    text-decoration: none;
  }
  .bg-column h3 {
    color: #000;
    text-align: left;

    font-size: 13px;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .row:after {
    content: "";
    display: table;
    clear: both;
  }

  .btns {
    cursor: pointer;
    white-space: nowrap;
    color: #000;
  }

  a:link {
    text-decoration: none;
  }
  a:visited {
    color: black;
  }

  #pic {
    display: block;
  }

  .dropdown:hover .dropdown-content {
    display: flex;
    justify-content: center;
  }
  a:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .hamburger {
    display: none;
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }

  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #101010;
  }

  @media (max-width: 1370px) {
    #pic {
      display: none;
    }
  }

  @media (max-width: 1090px) {
    #giftguide {
      display: none;
    }

    .rightsd-ctnr {
      gap: 15px;
    }

    .categories-container {
      gap: 15px;
    }
  }

  @media only screen and (max-width: 920px) {
    .bg-column {
      padding: 40px 10px;
    }

    .bg-column a {
      font-size: 11px;
    }

    #explr {
      display: none;
    }
    .hdr3-container {
      padding-right: 20px;
      padding-left: 20px;
    }
  }

  @media only screen and (max-width: 768px) {
    .bg-column a {
      display: none;
    }
    .bg-column h3 {
      border-bottom: 1px solid black;
      padding: 20px 30px;
      font-size: 13px;
      font-weight: 000;
    }
    .row {
      display: flex;
      flex-direction: column;
    }
    #huh {
      gap: 0px;
      padding: 0px;
    }
    .bg-column {
      padding: 0px 20px;
      width: 100vw;
    }
    .dropdown-content {
      justify-content: start;
      width: 100%;
      padding-bottom: 10px;
    }

    .rightsd-ctnr {
      position: absolute;
      left: -100%;
      z-index: 1000;
      top: 184px;
      flex-direction: column;
      background-color: #fff;
      width: 100%;
      border-radius: 10px;
      text-align: center;
      transition: 0.1s;
      box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
      padding: 15px 0px;
    }

    .hdr-atrbts div {
      float: none;
    }

    .hamburger {
      display: block;
      cursor: pointer;
    }
    .rightsd-ctnr.active {
      left: 0px;
    }

    .btns {
      font-size: 17px;
    }

    .hamburger.active .bar:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
    .hdr3-container {
    }
    .right {
      padding: 12px 0px;
    }
  }

  @media screen and (max-width: 375px) {
    #wmn {
      display: none;
    }
    #men {
      display: none;
    }
    .right {
      padding: 12px 0px;
    }
  }
`;

const Header = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 768;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const mobileMenu = () => {
    document.querySelector(".rightsd-ctnr").classList.toggle("active");
    document.querySelector(".hamburger").classList.toggle("active");
  };

  const closeMenu = () => {
    document.querySelector(".rightsd-ctnr").classList.remove(".active");
    document.querySelector(".hamburger").classList.remove(".active");
  };

  const logOut = () => {
    props.userLogOut();
    window.location = "/";
  };

  return (
    <HeaderStyles>
      <div className="hdr1-container">
        <div>ARC'TERYX</div>
        <div>|</div>
        <div>OUTLET</div>
        <div>|</div>
        <div>VEILANCE</div>
      </div>
      <div className="hdr2-container">
        <div>Shop Holiday Gift Guide</div>
        <div>|</div>
        <div>Free Shipping</div>
        <div>|</div>
        <div>Free Returns</div>
      </div>
      <div className="hdr3-container">
        <div className="hdr-atrbts">
          <div className="leftsd-ctnr">
            <div className="logo-container">
              <Link to={"/"}>
                <img src={logo} alt="logo" className="logo btns" />
              </Link>
            </div>
            <div className="categories-container">
              <div className="dropdown">
                <span id="men" className="d-btn btns">
                  MEN
                </span>
                <div className="dropdown-content">
                  <div className="row-ctnr">
                    <div class="row">
                      <div className="bg-column">
                        <div className="column">
                          <h3>CLOTHING</h3>
                          <a href="/">Shell Jackets</a>
                          <a href="/">Insulated Jacket</a>
                          <a href="/">Pants</a>
                          <a href="/">Fleece</a>
                          <a href="/">Base Layer</a>
                          <a href="/">Shirts & Tops</a>
                          <a href="/">Shorts</a>
                        </div>
                      </div>
                      <div className="bg-column" id="huh">
                        <div className={`${isMobile ? "bg-column" : "column"}`}>
                          <h3>PACKS</h3>
                          <a href="/">Daypacks</a>
                          <a href="/">Multi-day</a>
                          <a href="/">Travel & Commute</a>
                        </div>
                        <div className={`${isMobile ? "bg-column" : "column"}`}>
                          <h3>FOOTWEAR</h3>
                          <a href="/">Boots</a>
                          <a href="/">Shoes</a>
                        </div>
                      </div>
                      <div className="bg-column" id="huh">
                        <div className={`${isMobile ? "bg-column" : "column"}`}>
                          <h3>ACCESSORIES</h3>
                          <a href="/">Gloves</a>
                          <a href="/">Toques & Beanies</a>
                          <a href="/">Hats & Caps</a>
                          <a href="/">Socks</a>
                          <a href="/">Product Care</a>
                          <a href="/">More..</a>
                          <a href="/">Shorts</a>
                        </div>
                        <div className={`${isMobile ? "bg-column" : "column"}`}>
                          <h3>CLIMBING GEAR</h3>
                          <a href="/">Harnesses</a>
                          <a href="/">Chalk Bags</a>
                        </div>
                      </div>

                      <div className="bg-column">
                        <h3>INTENDED USE</h3>
                        <a href="/">Alpine & Rock Climbing</a>
                        <a href="/">Hiking & Trekking</a>
                        <a href="/">Skiing & Snowboarding</a>
                        <a href="/">Trail Running</a>
                        <a href="/">Everyday</a>
                      </div>
                      <div className="bg-column">
                        <h3>COLLECTION</h3>
                        <a href="/">Veilance</a>
                        <a href="/">System_A</a>
                        <a href="/">Professional Use</a>
                      </div>
                      <div className="bg-column">
                        <h3>SHOP MORE</h3>
                        <a href="/">New Arrivas</a>
                        <a href="/">Ski & Snowboard Gear Guide</a>
                        <a href="/">Gift Guide</a>
                        <a href="/">Jacket Finder</a>
                        <a href="/">Footwear Finder</a>
                        <a href="/">Layering Guide</a>
                        <a href="/">Favourites</a>
                        <a href="/">Exclusives</a>
                        <a href="/">Travel Collection</a>
                        <a href="/">Dark Magic</a>
                        <a href="/">What's Your Warmest</a>
                      </div>
                      <div className="bg-column" id="pic">
                        <img
                          src="https://media.gq-magazine.co.uk/photos/5d13a6cbeef9210ba4a001d2/16:9/w_2560%2Cc_limit/fitness-hp-gq-13dec18_getty_b.jpg"
                          width={"250px"}
                          height={"250px"}
                          alt="coollookindude"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="wmn" className="dropdown btns">
                WOMEN
              </div>
              <div id="explr" className="dropdown btns">
                EXPLORE
              </div>
              <div id="giftguide" className="dropdown btns">
                GIFT GUIDE
              </div>
            </div>
          </div>
          <div className="right">
            <div className="rightsd-ctnr">
              {props.isLogged() ? (
                <div className="btns">
                  <div onClick={() => closeMenu()}>
                    <Link to="userProfile">
                      Hello {props.userLogged().userFirstName}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="btns" onClick={props.showLog}>
                  <div onClick={() => closeMenu}>Sign In</div>
                </div>
              )}

              {props.userLogged().userFirstName === "Admin" ? (
                <div className="btns" onClick={() => closeMenu()}>
                  <Link to="/admin">Admin Panel</Link>
                </div>
              ) : (
                ""
              )}
              <div className="btns" onClick={props.showcart}>
                <div onClick={() => closeMenu()}> Cart</div>
              </div>
              <div className="btns" onClick={() => logOut()}>
                {props.isLogged() ? (
                  <div onClick={() => closeMenu()}>Sign Out </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="hamburger" onClick={mobileMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
