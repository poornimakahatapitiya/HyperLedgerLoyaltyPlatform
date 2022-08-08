import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "vehicle",
  initialState: {
    vehicles: [],
    isLoading: false,
    error: null,
    completeAdding: false,
  },
  reducers: {
    startFetching: (state) => {
      state.isLoading = true;
    },
    completeFetching: (state, action) => {
      state.isLoading = false;
      state.error = null;

      if (action.payload !== "") {
        state.vehicles = action.payload;
      }
    },
    failedFetching: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    startAddingVehicle: (state) => {
      state.isLoading = true;
    },
    completeAddingVehicle: (state, action) => {
      state.vehicles.push(action.payload);
      state.isLoading = false;
      state.error = null;
      state.completeAdding = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.completeAdding = false;
    },
  },
});

export const {
  startAddingVehicle,
  completeAddingVehicle,
  hasError,
  completeFetching,
  startFetching,
  failedFetching,
} = slice.actions;

export default slice.reducer;
