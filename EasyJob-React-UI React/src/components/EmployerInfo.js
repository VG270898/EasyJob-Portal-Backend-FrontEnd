import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Header,
  Icon,
} from "semantic-ui-react";
import { fetchEmployer } from "../redux/employer/employerSlice";

const EmployerInfo = (props) => {
  const dispatch = useDispatch();
  const employer = useSelector((state) => state.employer.employer);

  useEffect(() => {
    if (props.data.length) {
      dispatch(fetchEmployer(props.data));
    }
  }, []);

  return (
    <div
      className="ui card"
      style={{
        borderRadius: "7px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Header
        as="h2"
        style={{
          width: "100%",
          padding: "10px",
          alignItems: "center",
          position: "absolute",
          top: "0",
        }}
      >
        <Header.Content>Organization Information</Header.Content>
        <hr />
      </Header>
      <form class="ui container form" style={{ width: "85%", padding: "10px" }}>
        <div class="two fields">
          <div class="field">
            <label>Company Name</label>
            <input
              type="text"
              readonly=""
              placeholder="Company Name"
              defaultValue={employer.companyName}
              style={{ padding: "10px", fontSize: "20px" }}
            />
          </div>
          <div class="field">
            <label>Phone Number</label>
            <input
              type="number"
              readonly=""
              placeholder="Phone Number"
              defaultValue={employer.ph}
              style={{ padding: "10px", fontSize: "20px" }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployerInfo;
