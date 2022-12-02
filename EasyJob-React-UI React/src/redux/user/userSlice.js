import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  user: [],
  error: "",
  isLogged: false,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  const response = await axios.get("http://localhost:7071/user/getuser", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const applyJob = createAsyncThunk("user/applyJob", async (job) => {
  const response = await axios.put(
    "http://localhost:7072/profile/applyjob",
    job
  );
  console.log(response.data);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLogged = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
      state.isLogged = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
