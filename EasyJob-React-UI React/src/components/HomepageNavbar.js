import { useState } from "react";
import { useDispatch } from "react-redux";
import { json, useNavigate } from "react-router";
import { Menu } from "semantic-ui-react";
import logo from "../images/easyjob-logo.png";
import { logout } from "../redux/user/userSlice";

function HomepageNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem("jwt", JSON.stringify(""));
    localStorage.setItem("user", JSON.stringify(""));
    navigate("/");
  };
  return (
    <Menu secondary style={{ backgroundColor: "#6C63FF" }}>
      <Menu.Item>
        <img src={logo} alt="logo" style={{ width: "25%", height: "25%" }} />
      </Menu.Item>

      <Menu.Menu
        position="right"
        style={{ marginRight: "15px", fontSize: "16px" }}
      >
        <Menu.Item
          name="logout"
          onClick={handleLogout}
          style={{ color: "white" }}
        />
      </Menu.Menu>
    </Menu>
  );
}

export default HomepageNavbar;
