import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item, Button, Icon, Label, Header } from "semantic-ui-react";
import { fetchPendingJobs } from "../redux/job/jobSlice";
import ApplicantCard from "./ApplicantCard";
import JobCard from "./JobCard";
import UnlistedJobCard from "./UnlistedJobCard";

const UnlistedJobs = () => {
  const dispatch = useDispatch();
  const pendingJobs = useSelector((state) => state.job.pendingJobs);

  useEffect(() => {
    dispatch(fetchPendingJobs());
  }, []);
  return (
    <div>
      <Header
        as="h2"
        style={{ width: "100%", padding: "10px", alignItems: "center" }}
      >
        <Header.Content>Unlisted Jobs</Header.Content>
        <hr />
      </Header>
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "350px",
          paddingTop: "10px",
        }}
      >
        {pendingJobs.map((items) => {
          return <UnlistedJobCard pendingJobs={items} />;
        })}
      </div>
    </div>
  );
};

export default UnlistedJobs;
