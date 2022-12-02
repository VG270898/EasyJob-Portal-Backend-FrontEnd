import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Form, Input } from "semantic-ui-react";
import login from "../images/login-admin.svg";
import { authenticateUser } from '../redux/authentication/authenticateSlice';
import Adminpage from './Adminpage';

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Admin-Login | EasyJob";
  });

  const handleOnSubmit = () => {
    dispatch(authenticateUser({ username: username, password: password }));
    window.location.reload();
  };

  if (JSON.parse(localStorage.getItem("jwt")).length) {
    return <Adminpage data={JSON.parse(localStorage.getItem("jwt"))} />;
  }

  return (
    <section style={{ backgroundColor: "#eee", padding: "135px" }}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{ borderRadius: 25 }}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Administrator Login
                  </p>
                  <Form onSubmit={handleOnSubmit}>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 text-danger">
               
                    </div>
                    <Form.Field className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <Input
                        type={"text"}
                        style={{
                          fontSize: "18px",
                          width: "80%",
                        }}
                        placeholder="Username"
                        icon="user"
                        iconPosition="left"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Field>
                    <Form.Field className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <Input
                        type={"password"}
                        style={{
                          fontSize: "18px",
                          width: "80%",
                        }}
                        placeholder="Password"
                        icon="lock"
                        iconPosition="left"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Field>
                    <Form.Field
                      style={{ textAlign: "center", marginTop: "18px" }}
                    >
                      <Button
                        style={{
                          width: "30%",
                          borderRadius: "7px",
                          fontSize: "18px",
                          padding: "15px",
                          color: "white",
                          backgroundColor: "#6C63FF",
                        }}
                        className="ui primary button"
                        type="submit"
                      >
                        <span style={{ fontSize: "20px" }}>Login</span>
                      </Button>
                    </Form.Field>
                  </Form>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src={login} className="img-fluid" alt="Sample image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}

export default AdminLogin