import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Item, Button, Icon, Label, Header } from "semantic-ui-react";
import { fetchActiveJobs, fetchRecommendedJobs } from "../redux/job/jobSlice";
import JobCard from "./JobCard";

const RecommendedJobs = (props) => {
  const dispatch = useDispatch();
  const activeJobs = useSelector((state) => state.job.activeJobs);
  const user = useSelector((state)=>state.user.user);

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
       {
      activeJobs.map((job)=>{
        return(
          job.skillsRequired.map((skill)=>{
            return(
                props.userProfile.skills.map((reqSkill)=>{
                return(
                  skill===reqSkill?<JobCard activeJobs={job} />:null
                )
              })
            )
          })
        )
      })
     }

    </div>
  );
};

export default RecommendedJobs;
