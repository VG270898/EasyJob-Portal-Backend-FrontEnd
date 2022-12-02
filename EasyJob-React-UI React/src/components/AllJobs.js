import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item, Button, Icon, Label, Header } from "semantic-ui-react";
import { fetchActiveJobs } from "../redux/job/jobSlice";
import JobCard from "./JobCard";

const AllJobs = () => {
  const dispatch = useDispatch();
  const activeJobs = useSelector((state) => state.job.activeJobs);

  useEffect(() => {
    dispatch(fetchActiveJobs());
  }, []);
  return (
    <div
      style={{
        overflowY: "scroll",
        maxHeight: "350px",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      {activeJobs.map((items) => {
        return <JobCard activeJobs={items} />;
      })}
    </div>
  );
};

export default AllJobs;
