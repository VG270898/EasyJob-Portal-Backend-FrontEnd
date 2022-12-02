import { Button, Icon } from "semantic-ui-react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../images/easyjob-logo.png";
import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#6C63FF" }}>
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="logo" style={{ width: "25%", height: "25%" }} />
        </Navbar.Brand>
        <div>
          <Link to="/login">
            <Button
              icon
              labelPosition="left"
              style={{ backgroundColor: "white" }}
            >
              <Icon name="sign-in" />
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              icon
              labelPosition="left"
              style={{ backgroundColor: "white" }}
            >
              Register
              <Icon name="user plus" />
            </Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default LandingNavbar;
