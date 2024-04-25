import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  loading: "idle",
};

const something = createAsyncThunk("user/fetchUser", async function () {
  await fetch;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});
