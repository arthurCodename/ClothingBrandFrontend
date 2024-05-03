import React from "react";
import bg1 from "../src/assets/MainPage.avif";
import bg2 from "../src/assets/Sale.avif";
import bg3 from "../src/assets/HolidayGiftGuide.avif";
import bg4 from "../src/assets/AmongMountains.avif";
import bg5 from "../src/assets/ReadyToRide.avif";
import bg6 from "../src/assets/AltRoute.avif";
import bg7 from "../src/assets/NewArrival1.avif";
import bg8 from "../src/assets/NewArrival2.avif";
import styled from "styled-components";

const MainPageStyles = styled.div`
  .ctnr1 {
    background-image: url(${bg1});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;
  }

  .ctnr-content {
    line-height: 3.5rem;
    color: rgb(255, 255, 255);
    padding-top: 200px;
    z-index: 1000;
    letter-spacing: 0.1px;
    text-shadow: rgba(0, 0, 0, 0.5) 0px 3px 6px;
    padding-left: 20px;
  }

  .main-text {
    font-family: "URW DIN SemiCond", sans-serif;
    font-weight: 600;

    font-size: 3rem;
  }

  .sup-text {
    padding-top: 180px;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }

  .btns-ctnr {
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding-top: 10px;
  }

  .ctnr-btn {
    padding: 13px 0px;
    width: 150px;
    border: 1px solid transparent;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.1rem;
    font-family: "URW DIN", sans-serif;
    cursor: pointer;
  }

  .ctnr-btn:hover {
    background: rgb(50, 50, 50);
    color: rgb(255, 255, 255);
  }
  .ctnr2 {
    padding-top: 15px;
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
  .sale-ctnr {
    background-image: url(${bg2});
    background-repeat: no-repeat;
    background-size: cover;
    width: 50vw;
    height: 79vh;
  }

  .holiday-gift-guide-ctnr {
    background-image: url(${bg3});
    background-repeat: no-repeat;
    background-size: cover;
    width: 50vw;
    height: 79vh;
  }

  .ctnr3 {
    display: flex;
    flex-direction: row;
    gap: 4.6rem;
    justify-content: center;
    margin-top: 15px;
    padding: 45px;
    color: white;
  }

  .sml-ctnr-content {
    font-size: 2.3rem;
    font-family: "URW DIN SemiCond", sans-serif;
    z-index: 1000;
    letter-spacing: 0.1px;
    text-shadow: rgba(0, 0, 0, 0.5) 0px 3px 6px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 120px 100px auto;
    grid-gap: 20px;
    height: 100%;
    padding: 10px;
  }

  .sml-main-text {
    grid-row: 1/2;
    grid-column: 1 / -1;
    align-items: center;
    padding-top: 30px;
  }

  .sml-sup-text {
    font-size: 1.2rem;
    grid-column: span 3;
    align-self: end;
  }

  .sml-btns-ctnr {
    grid-column: span 3;
  }

  .mountains {
    background-image: url(${bg4});
    background-repeat: no-repeat;
    background-size: cover;
    width: 410px;
    height: 410px;
  }

  .readytoride {
    background-image: url(${bg5});
    background-repeat: no-repeat;
    background-size: cover;
    width: 410px;
    height: 410px;
  }

  .altroute {
    background-image: url(${bg6});
    background-repeat: no-repeat;
    background-size: cover;
    width: 410px;
    height: 410px;
  }

  .ctnr4 {
    display: grid;
    grid-template-columns: repeat (2, 1fr);
  }

  .newarrs1 {
    background-image: url(${bg7});
    background-repeat: no-repeat;
    background-size: cover;
    width: 50vw;
    height: 79vh;
    grid-column: 1/2;
  }

  .newarrs2 {
    background-image: url(${bg8});
    background-repeat: no-repeat;
    background-size: cover;
    width: 50vw;
    height: 78vh;
    grid-column: span 1;
  }
`;

const MainPage = () => {
  return (
    <MainPageStyles>
      <div>
        <div className="ctnr1">
          <div className="ctnr-content">
            <div className="main-text">Choose Your Line</div>
            <div className="sup-text">New Ski & Snowboard Collection</div>
            <div className="btns-ctnr">
              <button className="ctnr-btn">SHOP WOMEN'S</button>
              <button className="ctnr-btn">SHOP MEN'S</button>
            </div>
          </div>
        </div>
        <div className="ctnr2">
          <div className="sale-ctnr">
            <div
              className="ctnr-content"
              style={{ color: "black", textShadow: "none" }}
            >
              <div className="main-text">Black Friday Sale</div>
              <div className="sup-text">
                Big deals. Mountains of play. Score up to 30% off select outdoor
                gear.{" "}
              </div>
              <div className="btns-ctnr">
                <button className="ctnr-btn">WOMEN'S SALE</button>
                <button className="ctnr-btn">MEN'S SALE</button>
              </div>
            </div>
          </div>
          <div className="holiday-gift-guide-ctnr">
            <div className="ctnr-content">
              <div className="main-text">Holiday Gift Guide</div>
              <div className="sup-text">
                The best gifts for out there are right here.
              </div>
              <div className="btns-ctnr">
                <button className="ctnr-btn">SHOP NOW</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ctnr3">
          <div className="mountains">
            <div className="sml-ctnr-content">
              <div className="sml-main-text">Together among mountains</div>
              <div className="sml-sup-text">
                Rooted to community. Ready to move. Reimagining the outdoors.
              </div>
              <div className="sml-btns-ctnr">
                <button className="ctnr-btn">WHERE WE'RE GIVING</button>
              </div>
            </div>
          </div>
          <div className="readytoride">
            <div className="sml-ctnr-content">
              <div className="sml-main-text" style={{ alignSelf: "end" }}>
                Ready to Ride
              </div>
              <div className="sml-sup-text">
                The new relaxed-fit Sentinel kit.
              </div>
              <div className="sml-btns-ctnr">
                <button className="ctnr-btn">WOMEN'S FREERIDE</button>
              </div>
            </div>
          </div>
          <div className="altroute">
            <div className="sml-ctnr-content">
              <div className="sml-main-text " style={{ alignSelf: "end" }}>
                TAKE THE ALT ROUTE
              </div>
              <div className="sml-btns-ctnr" style={{ marginTop: "100px" }}>
                <button className="ctnr-btn">WATCH</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ctnr4">
          <div className="newarrs1"></div>
          <div className="newarrs2"></div>
        </div>
      </div>
    </MainPageStyles>
  );
};

export default MainPage;
