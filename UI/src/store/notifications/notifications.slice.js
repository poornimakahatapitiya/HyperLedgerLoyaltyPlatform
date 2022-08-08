import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.items = [];
      state.isLoading = true;
      state.error = null;
    },
    completeFetching: (state, action) => {
      state.items = action.payload;
      console.log(action.payload.data)
      state.isLoading = false;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { startLoading, completeFetching, hasError } = slice.actions;

export default slice.reducer;
