import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const LogInStyles = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  .log-pstn {
    position: absolute;
    top: 0px;
    right: -400px;
    animation: cartslide 0.4s forwards;
  }

  @keyframes cartslide {
    100% {
      right: 0;
    }
  }

  .log-ctnr {
    width: 400px;
    height: 100vh;
    background-color: white;
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
    padding-bottom: 30px;
    font-size: 1rem;
  }

  .input-fld {
    display: inline-block;
    width: 100%;
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

  .input-fld > div {
    font-size: 15px;
  }
  div > i {
    text-decoration: underline;
    cursor: pointer;
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

  .cre-acc-ctnr {
    margin-top: 40px;
    text-align: center;
  }

  .cre-acc-que {
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 300;
  }

  .err-msg {
    color: red;
    text-align: center;
    padding-top: 10px;
    text-transform: capitalize;
  }

  .cre-acc-btn {
    text-decoration: underline;
    cursor: pointer;
  }
  @media screen and (max-width: 476px) {
  }
  @media screen and (max-width: 476px) {
    .log-ctnr {
      width: 100%;
    }

    .log-intro-txt {
      padding-bottom: 5px;
    }
    .main-input-fld {
      padding: 20px 0;
    }
  }

  @media screen and (max-height: 900px) {
    .main-input-fld {
      overflow-y: scroll;
    }
    .log-intro-txt {
      padding-bottom: 20px;
    }
    .cre-acc-ctnr {
      padding-top: 15px;
      margin-top: 0px;
    }
    .cre-acc-que {
      margin-bottom: 0px;
      padding-bottom: 10px;
    }
    .input-fld {
      padding-bottom: 20px;
    }
  }

  @media screen and (max-height: 756px) {
    .input-fld {
      padding-bottom: 5px;
    }
  }

  @media screen and (max-height: 756px) {
    .input-fld {
      padding-bottom: 5px;
    }

    input {
      height: 40px;
    }
    .log-name-exit {
      padding-bottom: 5px;
    }

    .ctnr-btn {
      padding: 10px 0;
    }
  }
`;

const LogInSignUp = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userZip, setUserZip] = useState();
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState();

  const [createClicked, setCreateClicked] = useState(false);

  const handleRegSubmit = () => {
    console.log(userEmail + "  " + userPassword + "  " + userCountry);

    axios
      .post("https://clothingbrandbackend.onrender.com/registerUser", {
        userEmail,
        userFirstName,
        userLastName,
        userCountry,
        userZip,
        userPassword,
      })
      .then((result) => console.log(result))
      .then(() => props.showLog())
      .catch((err) => setErrorMessage(err.response.data.message));
  };

  const handleLogSubmit = async () => {
    await axios
      .post("https://clothingbrandbackend.onrender.com/logUser", {
        userEmail,
        userPassword,
      })
      .then((user) => setUser(user.data))

      .catch((err) => setErrorMessage(err.response.data.message));

    // window.location = "/";
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user.data);
      window.dispatchEvent(new Event("storage"));
    }

    console.log(props.userLogged());
  }, [user, props]);

  return (
    <LogInStyles>
      <div>
        <div className="log-pstn">
          <div className="log-ctnr">
            <div className="log-name-exit">
              {createClicked ? (
                <div className="log-name">CREATE AN ACCOUNT</div>
              ) : (
                <div className="log-name">SIGN IN</div>
              )}
              <IoMdClose
                className="close-btn"
                style={{ fontSize: "1.7rem" }}
                onClick={props.showLog}
              />
            </div>
            {createClicked ? (
              <div className="main-input-fld">
                <div>
                  <div className="log-intro-txt">
                    Please provide us with some additional information.
                  </div>
                  <div className="input-fld">
                    <div>Email address:</div>
                    <input
                      type="email"
                      placeholder=""
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-fld">
                    <div>First Name:</div>
                    <input
                      type="text"
                      placeholder=""
                      onChange={(e) => setUserFirstName(e.target.value)}
                    />
                  </div>
                  <div className="input-fld">
                    <div>Last Name:</div>
                    <input
                      type="text"
                      placeholder=""
                      onChange={(e) => setUserLastName(e.target.value)}
                    />
                  </div>
                  <div className="input-fld">
                    <div>Country:</div>
                    <input
                      type="text"
                      placeholder=""
                      onChange={(e) => setUserCountry(e.target.value)}
                    />
                  </div>
                  <div className="input-fld">
                    <div>Postal Code / Zip Code:</div>
                    <input
                      type="text"
                      placeholder=""
                      onChange={(e) => setUserZip(e.target.value)}
                    />
                  </div>
                  <div className="input-fld">
                    <div type="password">Password:</div>
                    <input
                      type="password"
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="ctnr-btn"
                    onClick={() => handleRegSubmit()}
                  >
                    SIGN UP
                  </button>
                  <div className="err-msg">
                    {errorMessage ? errorMessage : " "}
                  </div>
                </div>
                <div className="cre-acc-ctnr">
                  <div className="cre-acc-que">
                    Already have an Arc'teryx account?
                  </div>
                  <div
                    className="cre-acc-btn"
                    onClick={() => setCreateClicked(!createClicked)}
                  >
                    SIGN IN
                  </div>
                </div>
              </div>
            ) : (
              <div className="main-input-fld">
                <div className="log-intro-txt">
                  Sign in to manage email preferences, track orders and returns,
                  and check out faster.
                </div>
                <div className="input-fld">
                  <div>Email address:</div>
                  <input
                    type="email"
                    placeholder=""
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <div className="input-fld">
                  <div type="password">Password:</div>
                  <input
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                  <div>
                    <i onClick={props.showForgot}>Forgot your password?</i>
                  </div>
                </div>
                <button
                  type="submit"
                  className="ctnr-btn"
                  onClick={handleLogSubmit}
                >
                  SIGN IN
                </button>
                <div className="cre-acc-ctnr">
                  <div className="cre-acc-que">
                    Don't yet have an Arc'teryx account?
                  </div>
                  <div
                    className="cre-acc-btn"
                    onClick={() => setCreateClicked(!createClicked)}
                  >
                    CREATE AN ACCOUNT
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LogInStyles>
  );
};

export default LogInSignUp;
