import React, { useEffect } from "react";
import axisLogo from "../images/axis-logo.jpg";
import cognizantLogo from "../images/cognizant-logo.jpg";
import deliotteLogo from "../images/deloitte-logo.jpg";

import {
  Table,
  Icon,
  Button,
  Header,
  Image,
  Rating,
  Label,
} from "semantic-ui-react";
import { fetchAppliedJobs } from "../redux/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const AppliedJobs = (props) => {
  const dispatch = useDispatch();
  const job = useSelector((state) => state.job.userJob);
  useEffect(() => {
    if (props.data.length) {
      dispatch(fetchAppliedJobs(props.data));
    }
  }, []);
  const options = [
    { key: "angular", text: "Angular", value: 1 },
    { key: "css", text: "CSS", value: 2 },
    { key: "design", text: "Graphic Design", value: 3 },
    { key: "html", text: "HTML", value: 4 },
    { key: "javascript", text: "Javascript", value: 5 },
    { key: "node", text: "NodeJS", value: 6 },
    { key: "python", text: "Python", value: 7 },
    { key: "react", text: "React", value: 8 },
    { key: "ui", text: "UI Design", value: 9 },
  ];

  return (
    <Table basic padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Job Title</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Skills Required</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {job.map((item) => {
          return (
            <Table.Row>
              <Table.Cell singleLine verticalAlign="middle">
                {item.jobTitle}
              </Table.Cell>
              <Table.Cell verticalAlign="middle">
                {item.jobDescription}
              </Table.Cell>
              <Table.Cell verticalAlign="middle">
                {item.skillsRequired.map((itm) => {
                  return options.map((item) => {
                    return item.value === itm ? (
                      <Label
                        as="a"
                        content={item.text}
                        style={{ paddingTop: "5px" }}
                      />
                    ) : null;
                  });
                })}
              </Table.Cell>
              <Table.Cell positive textAlign="right" verticalAlign="middle">
                {item.applyStatus === false ?<div>Applied</div>:<div>ShorListed</div>}
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default AppliedJobs;
