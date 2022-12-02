import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: [],
  error: "",
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (user) => {
    const response = await axios.post(
      "http://localhost:7071/user/register",
      user
    );
    return response.data;
  }
);
const registerSlice = createSlice({
  name: "register",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });
  },
});

export default registerSlice.reducer;
