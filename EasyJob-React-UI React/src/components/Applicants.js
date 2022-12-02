import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item, Button, Icon, Label, Header } from "semantic-ui-react";
import { fetchApplicants } from "../redux/employer/employerjobSlice";
import { fetchRecommendedJobs } from "../redux/job/jobSlice";
import ApplicantCard from "./ApplicantCard";
import JobCard from "./JobCard";

const Applicants = (props) => {
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.employerJob.applicants);

  useEffect(() => {
    dispatch(fetchApplicants(props.companyName));
  },[]);
  
  return (
    <div>
      <Header
        as="h2"
        style={{ width: "100%", padding: "10px", alignItems: "center" }}
      >
        <Header.Content>View Applicants</Header.Content>
        <hr />
      </Header>
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "350px",
          paddingTop: "10px",
        }}
      >
        {console.log(applicants)}
        {
          applicants.map((items) => {
            return <ApplicantCard applicants={items} companyName={props.companyName}/>;
          })}
      </div>
    </div>
  );
};

export default Applicants;
