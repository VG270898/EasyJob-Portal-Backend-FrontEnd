import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  jobs: [],
  applicants: [],
  jobapplied:[],
  resume: null,
  error: "",
};

export const fetchJobs = createAsyncThunk("employerJob/fetchJobs", async () => {
  const response = await axios.get(
    "http://localhost:7071/job/getjobbyusername",
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      },
    }
  );
  return response.data;
});

export const addJobDetails = createAsyncThunk(
  "employerJob/addJobDetails",
  async (job) => {
    const response = await axios.put("http://localhost:7071/job/addjob", job, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      },
    });
    return response.data;
  }
);

export const fetchApplicants = createAsyncThunk(
  "employerJob/fetchApplicants",
  async (companyName) => {
    return await axios
      .get("http://localhost:7072/profile/applicants/" + companyName)
      .then((response) => response.data);
  }
);



export const getAppliedJob = createAsyncThunk(
  "employerJob/getAppliedJob",
  async (usernameCompanyName) => {
    return await axios
      .get("http://localhost:7072/profile/getappliedjob/" + usernameCompanyName.username + "/" + usernameCompanyName.companyName)
      .then((response) => response.data);
  }
);




export const shortListApplicants = createAsyncThunk(
  "employerJob/shortListApplicants",
  async (usernameJobId) => {
    return await axios
      .put("http://localhost:7072/profile/shortlist/" + usernameJobId.username + "/" + usernameJobId.jobId)
      .then((response) => response.data);
  }
);




export const downloadResume = createAsyncThunk(
  "employerJob/downloadResume",
  async (username) => {
    const response = await axios
      .get("http://localhost:7072/profile/" + username)
      .then(response => {
        console.log(response.data)
        const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
      });
    })

  }
);

const employerjobSlice = createSlice({
  name: "employerJob",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.loading = false;
      if (typeof action.payload === "string") {
        state.jobs = [];
      } else {
        state.jobs = action.payload;
      }
      state.error = "";
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.loading = false;
      state.jobs = [];
      state.error = action.error.message;
    });





    builder.addCase(fetchApplicants.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchApplicants.fulfilled, (state, action) => {
      state.loading = false;
      state.applicants = action.payload;
      state.error = "";
    });
    builder.addCase(fetchApplicants.rejected, (state, action) => {
      state.loading = false;
      state.applicants = [];
      state.error = action.error.message;
    });





    builder.addCase(downloadResume.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(downloadResume.fulfilled, (state, action) => {
      state.loading = false;
      state.resume = action.payload;
      state.error = "";
    });
    builder.addCase(downloadResume.rejected, (state, action) => {
      state.loading = false;
      state.resume = null;
      state.error = action.error.message;
    });



    
    builder.addCase(getAppliedJob.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAppliedJob.fulfilled, (state, action) => {
      state.loading = false;
      state.jobapplied = action.payload;
      state.error = "";
    });
    builder.addCase(getAppliedJob.rejected, (state, action) => {
      state.loading = false;
      state.jobapplied = [];
      state.error = action.error.message;
    });
  },
});

export default employerjobSlice.reducer;
