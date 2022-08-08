import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "station",
  initialState:
    localStorage.getItem("station") === null
      ? {
          gasStationId: null,
          name: null,
          address: null,
          town: null,
          acNumber: null,
          phone: null,
          verified: null,
          fuels: [],
          isLoading: false,
          error: null,
        }
      : JSON.parse(localStorage.getItem("station")),
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    completeFetching: (state, action) => {
      state.gasStationId = action.payload.gasStationId;
      state.name = action.payload.name;
      state.address = action.payload.address;
      state.town = action.payload.town;
      state.acNumber = action.payload.acNumber;
      state.phone = action.payload.phone;
      state.fuels = action.payload.fuels;
      state.isLoading = false;
      state.error = null;

      let station = action.payload;
      localStorage.setItem("station", JSON.stringify(station));
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { startLoading, completeFetching, hasError } = slice.actions;

export default slice.reducer;
