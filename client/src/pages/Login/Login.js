import React, { useState } from "react";
import "./style.css";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [loaderTime, setLoaderTime] = useState(false);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      //this portion handles the loader
      setLoaderTime(true);
      const loaderTimeout = setTimeout(() => {
        window.location.assign('/');
      }, 2000);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="entire-background">
      {loaderTime? 
      <div className="loader">
        <div className="dog">
          <div className="dog-body">
            <div className="dog-tail">
              <div className="dog-tail">
                <div className="dog-tail">
                  <div className="dog-tail">
                    <div className="dog-tail">
                      <div className="dog-tail">
                        <div className="dog-tail">
                          <div className="dog-tail">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dog-torso">
          </div>
          <div className="dog-head">
            <div className="dog-ears">
              <div className="dog-ear">
              </div>
              <div className="dog-ear">
              </div>
            </div>
            <div className="dog-eyes">
              <div className="dog-eye">
                </div>
                <div className="dog-eye">
                </div>
              </div>
              <div className="dog-muzzle">
                <div className="dog-tongue">
              </div>
            </div>
          </div>
        </div>
      </div>
      : 
      <div className="splitMenu-container" id="login">
        <div className="login-container">
          <h1>Welcome</h1>

          {/* Call the login states */}
          <form onSubmit={handleFormSubmit} className="log-in">
            <h6 className="form-content">Username</h6>
            <input
              id="username-login"
              type="text"
              className="form-content input-content"
              placeholder="Username"
              name="username"
              required
              value={formState.username}
              onChange={handleChange}
            />
            <h6 className="form-content">Password</h6>
            <input
              id="password-login"
              type="password"
              className="form-content input-content"
              placeholder="Password"
              name="password"
              required
              value={formState.password}
              onChange={handleChange}
            />
            <button
                  id="login-submit"
                  classNameName="btn btn-block btn-info form-content"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Login
            </button>
            {error && (
              <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
            )}
          </form>

          <div
            className="fb-login-button"
            data-width="30"
            data-size="medium"
            data-button-type="login_with"
            data-layout="default"
            data-auto-logout-link="false"
            data-use-continue-as="true"
          ></div>
        </div>

        <div className="signUp-container">
          <h1>New Here?</h1>
          <p>Well then you should join us obviously</p>

          <Link to="/Signup">
            <button id="signUpBtn" className="sign-up-button" onClick={"/Signup"}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
      }
    </div>
  );
}
