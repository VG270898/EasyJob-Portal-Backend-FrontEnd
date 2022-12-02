import React from "react";
import logo from "../images/easyjob-purple-logo.png";
import { Button } from "semantic-ui-react";

const Footer = () => {
  return (
    <div>
      <footer
        className="bg-light text-center text-lg-start"
        style={{ position: "fixed", left: 0, bottom: 0, right: 0 }}
      >
        <div
          className="text p-3"
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>Copyright ⓒ2022, EasyJob | All Rights Reserved.</div>
          <div>
            <img
              src={logo}
              alt="logo"
              style={{ width: "117px", height: "30px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "15%",
            }}
          >
            <Button circular color="facebook" icon="facebook" />
            <Button circular color="twitter" icon="twitter" />
            <Button circular color="linkedin" icon="linkedin" />
            <Button circular color="google plus" icon="google plus" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
