import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState:
    localStorage.getItem("userPolima") === null
      ? {
          userID: null,
          email: null,
          firstName: null,
          lastName: null,
          phone: null,
          nic: null,
          role: null,
          town: null,
          isLoading: false,
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
          error: null,
          isregisterd: false,
        }
      : JSON.parse(localStorage.getItem("userPolima")),
  reducers: {
    startLogin: (state) => {
      state.isLoading = true;
    },
    completeLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userID = action.payload.userID;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.nic = action.payload.nic;
      state.role = action.payload.role;
      state.town = action.payload.town;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.error = null;

      let loggedUser = action.payload;
      loggedUser["isLoading"] = false;
      loggedUser["isLoggedIn"] = true;
      loggedUser["error"] = null;

      localStorage.setItem("userPolima", JSON.stringify(loggedUser));
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    startLogout: (state) => {
      state.isLoading = true;
    },
    completeLogout: (state) => {
      localStorage.clear();
      state.accessToken = null;
      state.refreshToken = null;
      state.userID = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.phone = null;
      state.nic = null;
      state.role = null;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = null;
      state.town = null;

      window.location.reload();
    },
    logoutFailure: (state) => {
      state.isLoading = false;
    },
    startRegister: (state) => {
      state.isLoading = true;
    },
    completeRegistering: (state, action) => {
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.nic = action.payload.nic;
      state.role = action.payload.role;
      state.town = action.payload.town;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.error = null;
      state.isregisterd = true;
    },
    registerFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isregisterd = false;
    },
    hasError: (state, action) => {
      state.error = action.payload;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
});

export const {
  startLogin,
  completeLogin,
  loginFailure,
  logoutFailure,
  startLogout,
  completeLogout,
  startRegister,
  completeRegistering,
  registerFailure,
  updateTown,
  hasError,
  removeError,
} = slice.actions;

export default slice.reducer;
