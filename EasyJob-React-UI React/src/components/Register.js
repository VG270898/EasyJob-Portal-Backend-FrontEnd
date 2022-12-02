import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import register from "../images/register-logo.svg";
import { Button, Form, Input } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/register/registerSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [role, setRole] = useState("");

  const [msg, setMsg] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.register.user);
  const handleOnSubmit = () => {
    if (role === "") {
      setMsg("Please Select a Role");
    } else if (password === repassword) {
      dispatch(
        registerUser({
          username: username,
          email: email,
          password: password,
          role: role,
        })
      );
      navigate("/login", {
        state: { username: user.username, email: user.email, role: user.role },
      });
      notify();
    } else {
      setMsg("Password doesn't match, Try again!");
    }
  };
  const notify = () => {
    toast.success("User has been registered", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    document.title = "Register | EasyJob";
  });
  return (
    <section style={{ backgroundColor: "#eee", padding: "95px" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Register
                    </p>
                    <Form onSubmit={handleOnSubmit}>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4 text-danger">
                        <span>{msg}</span>
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
                          type={"email"}
                          style={{
                            fontSize: "18px",
                            width: "80%",
                          }}
                          placeholder="Email"
                          icon="mail"
                          iconPosition="left"
                          onChange={(e) => setEmail(e.target.value)}
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
                      <Form.Field className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <Input
                          type={"password"}
                          style={{
                            fontSize: "18px",
                            width: "80%",
                          }}
                          placeholder="Repeat your Password"
                          icon="key"
                          iconPosition="left"
                          onChange={(e) => setRepassword(e.target.value)}
                          required
                        />
                      </Form.Field>
                      <Form.Field className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <select
                          style={{ width: "80%", fontSize: "18px" }}
                          onChange={(e) => setRole(e.target.value)}
                          value={role}
                        >
                          <option value="">Select a Role</option>
                          <option value="USER">USER</option>
                          <option value="EMPLOYER">EMPLOYER</option>
                        </select>
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
                          <span style={{ fontSize: "20px" }}>Register</span>
                        </Button>
                        <label
                          style={{
                            fontSize: "14px",
                            paddingTop: "16px",
                            fontWeight: "400",
                          }}
                        >
                          <span>
                            Already Registered ? <a href="/login">Login</a>
                          </span>
                        </label>
                      </Form.Field>
                    </Form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={register}
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
