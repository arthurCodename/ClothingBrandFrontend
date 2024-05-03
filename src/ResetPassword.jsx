import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const Reset = styled.div`
  .reset-ctnr {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 2px;
    width: 500px;
  }
  .close-frgt {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    font-family: "URW DIN Cond";

    font-size: 1.2rem;
    vertical-align: center;
  }

  .input-fld {
    padding: 10px 10px 0px;
    display: inline-block;
    width: 100%;
    margin-bottom: 30px;
  }

  input {
    padding-block: 1px;
    padding-inline: 2px;
    width: 100%;
    height: 30px;
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

  .ctnr-btn {
    padding: 13px 0px;
    width: 100%;
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
`;

const ResetPassword = (props) => {
  const [userEmail, setUserEmail] = useState("");

  const emailSend = () => {
    axios
      .post("http://localhost:3001/forgotPassword", {
        userEmail: userEmail,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Reset>
      <div className="reset-ctnr">
        <div className="close-frgt">
          <div>PASSWORD RESET</div>
          <IoMdClose
            className="close-btn"
            style={{ fontSize: "1.7rem", cursor: "pointer" }}
            onClick={props.showForgot}
          />
        </div>
        <div className="input-fld">
          <div>Email address:</div>
          <input
            type="email"
            placeholder=""
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="ctnr-btn" onClick={emailSend}>
          UPDATE PASSWORD
        </div>
      </div>
    </Reset>
  );
};

export default ResetPassword;
