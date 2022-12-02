import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  jwt: "",
  error: "",
};

export const authenticateUser = createAsyncThunk(
  "authentication/authenticateUser",
  async (user) => {
    return await axios
      .post("http://localhost:7071/user/authenticate", user)
      .then((response) => {
        localStorage.setItem("jwt", JSON.stringify(response.data));
      });
  }
);
const authenticateSlice = createSlice({
  name: "authentication",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.jwt = action.payload;
      state.error = "";
    });
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.loading = false;
      state.jwt = "";
      state.error = action.error.message;
    });
  },
});

export default authenticateSlice.reducer;
