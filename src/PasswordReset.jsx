import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const PasswordResetStyles = styled.div`
  .pswrd-ctnr {
    padding: 50px 150px;
  }
  #reset-txt {
    font-family: "URW DIN Cond", Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: 2.5rem;
    padding-bottom: 20px;
  }

  .pswrd-ctnt {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-fld {
    display: inline-block;
    width: 600px;
    margin-bottom: 30px;
  }

  input {
    padding-block: 1px;
    padding-inline: 2px;
    width: 600px;
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

  .input-fld > div {
    font-size: 15px;
  }

  .choose-txt {
    font-size: 1.2rem;
    padding-top: 30px;
    padding-bottom: 20px;
  }

  .choose-txt-lower {
    font-size: 1rem;
    text-align: center;
    width: 700px;
    padding-bottom: 20px;
    font-weight: 300;
  }

  .ctnr-btn {
    display: block;
    margin-top: 10px;
    padding: 13px 0px;
    width: 600px;
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
`;

const PasswordReset = () => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    let url = new URL(document.URL);
    console.log(url);
    const params = url.pathname
      .substring(1)
      .replace("password-reset/", "")
      .split("/");

    setUserId(params[0]);
    setToken(params[1]);
  }, []);

  const ChangePassword = () => {
    if (password === confirmPassword) {
      const axiosURL = `http://localhost:3001/password-reset/${userId}/${token}`;
      console.log(axiosURL);
      axios
        .post(`${axiosURL}`, {
          password,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <PasswordResetStyles>
      <div className="pswrd-ctnr">
        <span id="reset-txt">RESET PASSWORD</span>
        <div className="pswrd-ctnt">
          <div className="choose-txt">CHOOSE A NEW PASSWORD</div>
          <div className="choose-txt-lower">
            Passwords must be between 8-15 characters and contain at least: one
            lower case letter, one upper case letter, one number, and one of the
            following special characters !, @, #, $, %, ^, &, *
          </div>
          <div className="input-fld">
            <div>Enter Password</div>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-fld">
            <div>Confirm Password</div>
            <input
              type="text"
              placeholder=""
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="ctnr-btn" onClick={ChangePassword}>
            SAVE NEW PASSWORD
          </button>
        </div>
      </div>
    </PasswordResetStyles>
  );
};

export default PasswordReset;
