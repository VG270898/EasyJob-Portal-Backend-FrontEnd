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
import { fetchActiveJobs } from "../redux/job/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const ListedJobs = (props) => {
  const dispatch = useDispatch();
  const activeJobs = useSelector((state) => state.job.activeJobs);
  useEffect(() => {
    if (props.data.length) {
      dispatch(fetchActiveJobs());
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
    <>
      <Header
        as="h2"
        style={{ width: "100%", padding: "10px", alignItems: "center" }}
      >
        <Header.Content>Listed Jobs</Header.Content>
        <hr />
      </Header>
      <div
        style={{
          overflowY: "scroll",
          maxHeight: "350px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
      >
        <Table basic padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Job Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Skills Required</Table.HeaderCell>
              <Table.HeaderCell>Experience Required</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {activeJobs.length > 0 ? (
              activeJobs.map((item) => {
                return (
                  <Table.Row verticalAlign="top">
                    <Table.Cell singleLine verticalAlign="middle">
                      {item.jobTitle}
                    </Table.Cell>
                    <Table.Cell verticalAlign="middle">
                      {item.jobDescription}
                    </Table.Cell>
                    <Table.Cell
                      verticalAlign="middle"
                      width="2"
                      textAlign="center"
                    >
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
                    <Table.Cell
                      verticalAlign="middle"
                      width="3"
                      textAlign="center"
                    >
                      {item.expRequired}
                    </Table.Cell>
                    <Table.Cell verticalAlign="middle" width="2">
                      {item.jobStatus}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Header
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  No Job Posted Yet.
                </Header>
              </div>
            )}
          </Table.Body>
        </Table>
          
      </div>
        
    </>
  );
};

export default ListedJobs;
