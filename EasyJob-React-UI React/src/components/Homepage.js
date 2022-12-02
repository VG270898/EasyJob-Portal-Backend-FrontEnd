import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchEmployer } from "../redux/employer/employerSlice";
import { fetchUser } from "../redux/user/userSlice";
import EmployerPage from "./EmployerPage";
import Userpage from "./Userpage";

const Homepage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const employer = useSelector((state) => state.employer.employer);
  useEffect(() => {
    if (props.data.length) {
      dispatch(fetchUser(props.data));
      dispatch(fetchEmployer(props.data));
    }
  }, []);

  return (
    <div>
      {user.user.role === "USER" ? (
        <Userpage data={props.data} />
      ) : user.user.role === "EMPLOYER" ? (
        <EmployerPage data={props.data} employer={employer}/>
      ) : (
        <h2>Not a valid user</h2>
      )}
    </div>
  );
};

export default Homepage;
