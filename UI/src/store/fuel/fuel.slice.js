import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "fuel",
  initialState: {
    fuels: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    completeFetching: (state, action) => {
      if (action.payload !== "") {
        state.fuels = action.payload;
      }
      state.isLoading = false;
      state.error = null;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { startLoading, completeFetching, hasError } = slice.actions;

export default slice.reducer;
