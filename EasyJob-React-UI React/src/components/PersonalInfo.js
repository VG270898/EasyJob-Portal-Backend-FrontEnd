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
  Label,
} from "semantic-ui-react";
import { downloadResume } from "../redux/employer/employerjobSlice";
import userProfileSlice, {
  fetchProfile,
  updateUser,
  uploadResume,
} from "../redux/userProfile/userProfileSlice";

const PersonalInfo = (props) => {
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
  const [isVisible, setIsVisible] = useState(true);
  const [skills, setskills] = useState([]);
  const [resumeData, setResumeData] = useState({
    username: "",
    resume: null,
  });
  const formData = new FormData();
  const downloadedResume = useSelector((state) => state.employerJob.resume);

  const handleOnUpload = (e) => {
    console.log(e.target.files[0]);
    formData.append("application", e.target.files[0]);
    const newResumeData = () => {
      return {
        ...resumeData,
        username: props.data,
        resume: formData,
      };
    };
    setResumeData(newResumeData);
  };
  const handleOnDownload = () => {
    dispatch(downloadResume(props.data))
  };
  const [userDetails, setUserDetails] = useState({
    username: props.data,
    fullName: "",
    aadharNo: "",
    college: "",
    contactNo: "",
    highestQualification: "",
    skills: [],
    yearOfExperience: "",
    pastEmployer: "",
    address: "",
  });

  useEffect(() => {
    if (props.data.length) {
      dispatch(fetchProfile(props.data));
    }
  }, []);

  const handleOnUpdate = () => {
    dispatch(updateUser(userDetails));
    dispatch(uploadResume(resumeData));
    notify();
    console.log(userDetails);
    console.log(resumeData);
    setIsVisible(true);
  };

  const handleOnEdit = () => {
    setIsVisible(false);
    const newUserDetails = () => {
      return {
        ...userDetails,
        fullName: userProfile.fullName,
        aadharNo: userProfile.aadharNo,
        college: userProfile.college,
        contactNo: userProfile.contactNo,
        address: userProfile.address,
        skills: userProfile.skills,
        highestQualification: userProfile.highestQualification,
        yearOfExperience: userProfile.yearOfExperience,
        pastEmployer: userProfile.pastEmployer,
      };
    };
    setUserDetails(newUserDetails);
    console.log(userDetails);
  };

  const notify = () => {
    toast.success("Profile Details Updated", {
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

  const handleOnSkills = (e, { value }) => {
    setskills((skills) => [...skills, value]);
    setUserDetails({
      ...userDetails,
      skills: [...skills, value].at(skills.length),
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
      <Header
        as="h2"
        style={{ width: "100%", padding: "10px", alignItems: "center" }}
      >
        <Header.Content>Personal Information</Header.Content>
        <a onClick={handleOnEdit}>
          <Icon name="edit" style={{ float: "right" }} />
        </a>
        <hr />
      </Header>
      <Form
        unstackable
        style={{ width: "85%", padding: "10px" }}
        onSubmit={handleOnUpdate}
      >
        <Form.Group widths={2}>
          <Form.Input
            label="Full Name"
            placeholder="Full Name"
            defaultValue={userProfile.fullName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, fullName: e.target.value })
            }
            disabled={isVisible}
          />
          <Form.Input
            label="Aadhar Number"
            placeholder="Aadhar Number"
            defaultValue={userProfile.aadharNo}
            onChange={(e) =>
              setUserDetails({ ...userDetails, aadharNo: e.target.value })
            }
            disabled={isVisible}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="College Name"
            placeholder="College Name"
            defaultValue={userProfile.college}
            onChange={(e) =>
              setUserDetails({ ...userDetails, college: e.target.value })
            }
            disabled={isVisible}
          />
          <Form.Input
            label="Contact Number"
            placeholder="Contact Number"
            type="tel"
            defaultValue={userProfile.contactNo}
            onChange={(e) =>
              setUserDetails({ ...userDetails, contactNo: e.target.value })
            }
            disabled={isVisible}
          />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input
            label="Address"
            placeholder="Address"
            defaultValue={userProfile.address}
            onChange={(e) =>
              setUserDetails({ ...userDetails, address: e.target.value })
            }
            disabled={isVisible}
          />
          <Form.Input
            label="Highest Qualification"
            placeholder="Highest Qualification"
            defaultValue={userProfile.highestQualification}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                highestQualification: e.target.value,
              })
            }
            disabled={isVisible}
          />
        </Form.Group>

        <Form.Group widths={2}>
          {!isVisible ? (
            <Form.Dropdown
              label="Skills"
              placeholder="Skills"
              multiple
              selection
              search
              options={options}
              disabled={isVisible}
              onChange={handleOnSkills}
            />
          ) : (
            <Form.Field>
              {!userProfile.skills===[]?
                userProfile.skills.map((itm) => {
                  return options.map((item) => {
                    return item.value === itm ? (
                      <Label
                        as="a"
                        content={item.text}
                        style={{ paddingTop: "5px" }}
                      />
                    ) : null;
                  });
                }):null}
            </Form.Field>
          )}
          <Form.Input
            label="Years Of Experience"
            placeholder="Years Of Experience"
            type="number"
            defaultValue={userProfile.yearOfExperience}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                yearOfExperience: e.target.value,
              })
            }
            disabled={isVisible}
          />
        </Form.Group>

        <Form.Group widths={2}>
          <Form.Input
            label="Past Employer (If any)"
            placeholder="Past Employer"
            defaultValue={userProfile.pastEmployer}
            onChange={(e) =>
              setUserDetails({ ...userDetails, pastEmployer: e.target.value })
            }
            disabled={isVisible}
          />
          <Form.Input
            label="Resume"
            placeholder="Upload Resume"
            type="file"
            onChange={handleOnUpload}
            disabled={isVisible}
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: "#6c63ff", color: "white" }}
          type="submit"
          disabled={isVisible}
        >
          Submit
        </Button>
      </Form>
      <Button
        secondary
        onClick={handleOnDownload}
        disabled={isVisible}
      >
        View Uploaded Resume
      </Button>
    </div>
  );
};

export default PersonalInfo;
