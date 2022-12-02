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
import UnlistedJobs from "./UnlistedJobs";
import ListedJobs from "./ListedJobs";

const Adminpage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (props.data.length) {
      dispatch(fetchUser(props.data));
    }
  }, []);
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
                class="briefcase icon"
                style={{ color: "#6c63ff", paddingRight: "10px" }}
              ></i>
              <span style={{ paddingTop: "3px", paddingLeft: "10px" }}>
                View Unlisted Jobs
              </span>
            </div>
          </a>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane style={{ width: "98%", marginLeft: "1%" }}>
          <UnlistedJobs data={props.data} />
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
                Listed Jobs
              </span>
            </div>
          </a>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane style={{ width: "98%", marginLeft: "1%" }}>
          <ListedJobs data={props.data} />
        </Tab.Pane>
      ),
    },
  ];
  return (
    <>
      {user.user.role === "ADMIN" ? (
        <div style={{ padding: "10px", marginLeft: "20px" }}>
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
        </div>
      ) : (
        <h1>You are not Admin!</h1>
      )}
    </>
  );
};

export default Adminpage;
