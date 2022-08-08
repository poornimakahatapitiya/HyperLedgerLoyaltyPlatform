import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "towns",
  initialState: {
    items: JSON.parse(localStorage.getItem("towns")),
    isLoading: false,
    isAvailable: localStorage.getItem("towns") === null ? false : true,
    error: null,
  },
  reducers: {
    startFetching: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    completeFetching: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.isAvailable = true;

      localStorage.setItem("towns", JSON.stringify(action.payload));
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { startFetching, completeFetching, hasError } = slice.actions;

export default slice.reducer;
