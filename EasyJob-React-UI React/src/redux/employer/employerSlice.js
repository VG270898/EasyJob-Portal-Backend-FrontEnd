import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  employer: [],
  error: "",
};

export const fetchEmployer = createAsyncThunk(
  "employer/fetchEmployer",
  async (token) => {
    const response = await axios.get("http://localhost:7071/employer/getemp", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const addEmployerDetails = createAsyncThunk(
  "employer/addEmployerDetails",
  async (employer) => {
    const response = await axios.put(
      "http://localhost:7071/employer/addempdetails",
      employer,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
        },
      }
    );
    return response.data;
  }
);

const employerSlice = createSlice({
  name: "employer",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEmployer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployer.fulfilled, (state, action) => {
      state.loading = false;
      state.employer = action.payload;
      state.error = "";
    });
    builder.addCase(fetchEmployer.rejected, (state, action) => {
      state.loading = false;
      state.employer = [];
      state.error = action.error.message;
    });

    builder.addCase(addEmployerDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEmployerDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addEmployerDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default employerSlice.reducer;
