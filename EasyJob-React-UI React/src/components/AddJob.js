import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  FormGroup,
  Header,
  Icon,
} from "semantic-ui-react";
import { addJobDetails } from "../redux/employer/employerjobSlice";
import {
  fetchProfile,
  updateUser,
} from "../redux/userProfile/userProfileSlice";

const AddJob = (props) => {
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

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userProfile.userProfile);
  const [skills, setskills] = useState([]);
  const [job, setJob] = useState({
    jobTitle: "",
    jobDescription: "",
    skillsRequired: [],
    expRequired: "",
  });

  useEffect(() => {
    if (props.data.length) {
      dispatch(fetchProfile(props.data));
    }
  }, []);

  const handleOnSkills = (e, { value }) => {
    setskills((skills) => [...skills, value]);
    setJob({
      ...job,
      skillsRequired: [...skills, value].at(skills.length),
    });
  };

  const handlePostJob = () => {
    dispatch(addJobDetails(job));
    notify();
  };

  const notify = () => {
    toast.success("Job Posted Successfully", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
      {  console.log(job)}
      <Header
        as="h2"
        style={{ width: "100%", padding: "10px", alignItems: "center" }}
      >
        <Header.Content>Post a New Job</Header.Content>
        <hr />
      </Header>
      <Form
        unstackable
        style={{ width: "85%", padding: "10px" }}
        onSubmit={handlePostJob}
      >
        <Form.Input
          label="Job Title"
          placeholder="Job Title"
          onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
        />

        <Form.TextArea
          label="Job Description"
          placeholder="Job Description"
          onChange={(e) => setJob({ ...job, jobDescription: e.target.value })}
        />
        <Form.Group widths={2}>
          <Form.Dropdown
            label="Skills Required"
            placeholder="Skills Required"
            multiple
            selection
            search
            options={options}
            onChange={handleOnSkills}
          />
          <Form.Input
            label="Experience Required"
            placeholder="Experience Required"
            type="number"
            onChange={(e) => setJob({ ...job, expRequired: e.target.value })}
          />
        </Form.Group>
        <Button
          style={{
            backgroundColor: "#6c63ff",
            color: "white",
            marginBottom: "12px",
          }}
          type="submit"
        >
          Submit
        </Button>
      </Form>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        theme="light"
      />
    </div>
  );
};

export default AddJob;
