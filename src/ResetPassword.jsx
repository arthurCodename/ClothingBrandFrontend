import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Reset = styled.div`
  .reset-ctnr {
    background-color: white;
    border-radius: 2px;
    padding: 75px 150px;
  }

  .ctnr-ttl {
    font-family: "URW DIN Cond", Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 2rem;
  }

  .email-ctnt {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .frgt-text {
    font-size: 1.2rem;
    padding-top: 30px;
    padding-bottom: 20px;
    font-family: "URW DIN SemiCond", sans-serif;
  }

  .frgt-text-lower {
    font-size: 1rem;
    text-align: center;
    width: 700px;
    padding-bottom: 20px;
    font-weight: 300;
  }

  .input-fld {
    display: inline-block;
    width: 600px;
    padding-bottom: 30px;
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

  input:focus {
    outline: none;
    font-size: 1.2rem;
    font-family: "URW DIN", arial, sans-serif;
    font-weight: 500;
  }
  a:link {
    text-decoration: none;
  }
  a:visited {
    color: black;
  }

  .ctnr-btn {
    padding: 13px 0px;
    width: 600px;
    text-align: center;
    border: 1px solid transparent;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.2rem;
    font-family: "URW DIN", sans-serif;
    background-color: black;
    color: white;
    cursor: pointer;
  }

  .lower-txt {
    font-size: 1rem;
    text-align: center;
    width: 700px;
    padding-top: 30px;
    padding-bottom: 20px;
    font-weight: 300;
  }

  @media screen and (max-width: 1000px) {
    .reset-ctnr {
      padding: 50px 50px;
    }
  }

  @media screen and (max-width: 756px) {
    #ctnr-ttl {
      font-size: 2rem;
    }

    .frgt-text-lower {
      width: 90%;
    }
    input {
      width: 100%;
    }

    .input-fld {
      width: 100%;
    }
    .email-ctnt {
      width: 100%;
    }
    .ctnr-btn {
      width: 100%;
    }

    .lower-txt {
      font-size: 1rem;
      padding-bottom: 10px;
      padding-top: 10px;
    }
  }

  @media screen and (max-width: 590px) {
    .input-fld {
      padding-bottom: 5px;
    }

    .reset-ctnr {
      padding: 50px 10px;
    }
  }
`;

const ResetPassword = (props) => {
  const [userEmail, setUserEmail] = useState("");

  const emailSend = () => {
    axios
      .post("https://clothingbrandbackend.onrender.com/forgotPassword", {
        userEmail: userEmail,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Reset>
      <div className="reset-ctnr">
        <div className="ctnr-ttl">PASSWORD RESET</div>

        <div className="email-ctnt">
          <div className="frgt-text">FORGOT YOUR PASSWORD?</div>
          <div className="frgt-text-lower">
            Enter your email address and we will send you a link to reset your
            password.
          </div>
          <div className="input-fld">
            <div>Email Address:</div>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="ctnr-btn" onClick={emailSend}>
            SEND ME A RESET LINK
          </button>

          <div className="lower-txt">Wait, I remember my password</div>
          <Link to="/">
            <div className="lower-txt">BACK TO MAIN PAGE</div>
          </Link>
        </div>
      </div>
    </Reset>
  );
};

export default ResetPassword;
