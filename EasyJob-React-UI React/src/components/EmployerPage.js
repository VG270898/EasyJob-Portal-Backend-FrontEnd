import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Tab,
  Grid,
  Segment,
  Icon,
  Header,
  Image,
  Menu,
  MenuItem,
  HeaderSubheader,
} from "semantic-ui-react";
import { fetchUser } from "../redux/user/userSlice";
import EmployerInfo from "./EmployerInfo";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Jobs from "./Jobs";
import PersonalInfo from "./PersonalInfo";
import {
  addEmployerDetails,
  fetchEmployer,
} from "../redux/employer/employerSlice";
import AddJob from "./AddJob";
import AllJobs from "./AllJobs";
import AllPostedJobs from "./AllPostedJobs";
import Applicants from "./Applicants";

const EmployerPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [ph, setPh] = useState("");
  const employer = useSelector((state) => state.employer.employer);


  useEffect(() => {
    if (props.data.length) {
      dispatch(fetchUser(props.data));
      dispatch(fetchEmployer(props.data));
    }
  }, []);

  const handleAddDetails = () => {
    setShow(false);
    dispatch(
      addEmployerDetails({
        username: user.user.username,
        companyName: companyName,
        ph: ph,
      })
    );
  };
  const panes = [
    {
      menuItem: (
        <Menu.Item>
          <div>
            <Header as="h2" icon textAlign="center">
              <Icon name="users" circular />
              <Header.Content>{user.user.username}</Header.Content>
              <HeaderSubheader>{user.user.email}</HeaderSubheader>
              <h6 style={{ paddingTop: "10px" }}>{user.user.role}</h6>
            </Header>
          </div>
        </Menu.Item>
      ),
      render: () => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="https://cdn2.joinsuperset.com/students/static/media/homeScreenEmpty.87e58372cc7145d8f5ad4298c74b6830.svg"></img>
          <Header as="h2">
            Welcome to EasyJob
            <Header.Subheader>
              EasyJob helps you keep tab on your placement process right from
              building an attractive profile to bagging an offer from your dream
              company. Keep checking this space for the latest news this
              placement season! All the best!
            </Header.Subheader>
          </Header>
        </div>
      ),
    },

    {
      menuItem: (
        <Menu.Item>
          <a
            class="item"
            style={{ border: "0px", padding: "0px 0px 0px 10px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <i
                class="user icon"
                style={{ color: "#6c63ff", paddingRight: "10px" }}
              ></i>
              <span style={{ paddingTop: "3px", paddingLeft: "10px" }}>
                Profile
              </span>
            </div>
          </a>
        </Menu.Item>
      ),
      render: () => <EmployerInfo data={props.data} />,
    },
    {
      menuItem: (
        <Menu.Item>
          <a
            class="item"
            style={{ border: "0px", padding: "0px 0px 0px 10px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <i
                class="add square icon"
                style={{ color: "#6c63ff", paddingRight: "10px" }}
              ></i>
              <span style={{ paddingTop: "3px", paddingLeft: "10px" }}>
                Add Job
              </span>
            </div>
          </a>
        </Menu.Item>
      ),
      render: () => <AddJob data={props.data} />,
    },
    {
      menuItem: (
        <Menu.Item>
          <a
            class="item"
            style={{ border: "0px", padding: "0px 0px 0px 10px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <i
                class="briefcase icon"
                style={{ color: "#6c63ff", paddingRight: "10px" }}
              ></i>
              <span style={{ paddingTop: "3px", paddingLeft: "10px" }}>
                View Posted Jobs
              </span>
            </div>
          </a>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane style={{ width: "98%", marginLeft: "1%" }}>
          <AllPostedJobs data={props.data} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item>
          <a
            class="item"
            style={{ border: "0px", padding: "0px 0px 0px 10px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <i
                class="address card icon"
                style={{ color: "#6c63ff", paddingRight: "10px" }}
              ></i>
              <span style={{ paddingTop: "3px", paddingLeft: "10px" }}>
                View Applicants
              </span>
            </div>
          </a>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane style={{ width: "98%", marginLeft: "1%" }}>
          <Applicants data={props.data} companyName={props.employer.companyName}/>
        </Tab.Pane>
      ),
    },
  ];
  return (
    <div style={{ padding: "10px", marginLeft: "20px" }}>
      {employer.length < 1 ? (
        <Modal show={show} onHide={show}>
          <Modal.Header>
            <Modal.Title>Add Organization Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={(e) => setPh(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleAddDetails}>
              Add Details
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Grid columns={1} divided stretched>
          <Grid.Row stretched>
            <Grid.Column>
              <Segment
                style={{
                  paddingTop: "50px",
                  paddingBottom: "50px",
                  paddingRight: "30px",
                  borderRadius: "7px",
                }}
              >
                <Tab
                  menu={{
                    fluid: true,
                    vertical: true,
                    tabular: true,
                    secondary: true,
                    pointing: true,
                  }}
                  panes={panes}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </div>
  );
};

export default EmployerPage;
