import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

import {SIGN_IN_URL} from '../constants/Constants.js';

export default function Signin() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const [state, setState] = useState({
    username: "",
    password: "",
    showAlert: false,
    alertMessageContent: "",
    errors: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let validationErrors = {};

    let failed = false;
    if (state.username === "") {
      failed = true;
      validationErrors["username"] = "Cannot be empty";
    } else if (!state.username.match(/^[a-zA-Z0-9]+$/)) {
      failed = true;
      validationErrors["username"] = "Numbers and letters only";
    }

    if (state.password === "") {
      failed = true;
      validationErrors["password"] = "Cannot be empty";
    }

    if (failed === true) {
      setState((prevState) => ({
        ...prevState,
        errors: validationErrors,
        showAlert: false,
        alertMessageContent: "",
      }));
    } else {
      axios
        .post(SIGN_IN_URL, {
          username: state.username,
          password: state.password,
        })
        .then((res) => {
            console.log(res)
          if(res.status === 200){
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('userId', res.data.userId);
            navigate("/home");
        }
          
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setState((prevState) => ({
              ...prevState,
              showAlert: true,
              alertMessageContent: `ERR: Invalid username or password`,
              errors: validationErrors,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              showAlert: true,
              alertMessageContent: `ERR: Failed with error code ${err.response.status}`,
              errors: validationErrors
            }));
          }
        });
    }
  };

  return (
    <div>
      <form
        className="container my-5 p-5"
        style={{ borderRadius: "20px" }}
      >
        <Row>
          <Col sm={12} lg={6}>
            <h3 className="my-2">Sign In</h3>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
                name="username"
                onChange={handleChange}
                style={
                  state.errors["username"] !== undefined
                    ? {
                        borderWidth: "1px",
                        borderColor: "red",
                        borderStyle: "solid",
                      }
                    : null
                }
              />
              <span style={{ color: "red" }}>{state.errors["username"]}</span>
            </div>
            <div className="form-group my-2">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                style={
                  state.errors["password"] !== undefined
                    ? {
                        borderWidth: "1px",
                        borderColor: "red",
                        borderStyle: "solid",
                      }
                    : null
                }
              />
              <span style={{ color: "red" }}>{state.errors["password"]}</span>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline-dark  btn-md"
                onClick={handleSubmit}
              >
                Sign In
              </button>

              <NavLink
                to="/signup"
                style={{ display: "inline-block" }}
                className="btn btn-outline-dark btn-md"
              >
                Create an account
              </NavLink>
            </div>

            {state.showAlert ? (
              <Alert variant="danger" className="mt-3">
                {state.alertMessageContent}
              </Alert>
            ) : null}
          </Col>
        </Row>
      </form>

    </div>
  );
}
