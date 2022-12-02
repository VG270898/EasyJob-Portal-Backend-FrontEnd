import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userJob: [],
  recommendedJobs: [],
  pendingJobs:[],
  activeJobs:[],
  error: "",
};

export const fetchAppliedJobs = createAsyncThunk(
  "job/fetchAppliedJobs",
  async (username) => {
    const response = await axios.get(
      "http://localhost:7072/profile/appliedJobs/" + username
    );
    return response.data;
  }
);

export const fetchRecommendedJobs = createAsyncThunk(
  "job/fetchRecommendedJobs",
  async () => {
    const response = await axios.get("http://localhost:7071/job/getjobs", {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
      },
    });
    return response.data;
  }
);

export const fetchPendingJobs = createAsyncThunk(
  "job/fetchPendingJobs",
  async () => {
    const response = await axios.get("http://localhost:7073/job/getpendingjobs");
    return response.data;
  }
);


export const fetchActiveJobs = createAsyncThunk(
  "job/fetchActiveJobs",
  async () => {
    const response = await axios.get("http://localhost:7073/job/getactivejobs");
    return response.data;
  }
);

export const verifyJob = createAsyncThunk(
  "job/verifyJob",
  async (jobId) => {
    const response = await axios.put("http://localhost:7073/job/verifyjob/"+jobId);
    return response.data;
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId) => {
    const response = await axios.delete("http://localhost:7073/job/deletejob/"+jobId);
    return response.data;
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAppliedJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAppliedJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.userJob = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAppliedJobs.rejected, (state, action) => {
      state.loading = false;
      state.userJob = [];
      state.error = action.error.message;
    });




    builder.addCase(fetchPendingJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPendingJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingJobs = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPendingJobs.rejected, (state, action) => {
      state.loading = false;
      state.pendingJobs = [];
      state.error = action.error.message;
    });



    builder.addCase(fetchRecommendedJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecommendedJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.recommendedJobs = action.payload;
      state.error = "";
    });
    builder.addCase(fetchRecommendedJobs.rejected, (state, action) => {
      state.loading = false;
      state.recommendedJobs = [];
      state.error = action.error.message;
    });



    builder.addCase(fetchActiveJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchActiveJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.activeJobs = action.payload;
      state.error = "";
    });
    builder.addCase(fetchActiveJobs.rejected, (state, action) => {
      state.loading = false;
      state.activeJobs = [];
      state.error = action.error.message;
    });
  },
});

export default jobSlice.reducer;
