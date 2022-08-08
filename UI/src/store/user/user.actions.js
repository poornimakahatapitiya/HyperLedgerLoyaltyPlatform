import { publicRequest, userRequest } from "../../services/api";
import { CURRENT_USER, LOGIN, REGISTER } from "../../utils/constants/uri";
import {
  completeLogin,
  completeLogout,
  completeRegistering,
  loginFailure,
  registerFailure,
  startLogin,
  startLogout,
  startRegister
} from "./user.slice";

export const register =
  (email, password, firstName, lastName, nic, phone, role, town) =>
    (dispatch) => {
      dispatch(startRegister());
      const data = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        nic: nic,
        phone: phone,
        role: role,
        town: town,
      };
      publicRequest
        .post(REGISTER, data)
        .then((res) => {
          if (res.status === 201) {
            dispatch(
              completeRegistering({
                email: email,
                firstName: firstName,
                lastName: lastName,
                nic: nic,
                phone: phone,
                role: role,
                town: town,
              })
            );
          } else {
            dispatch(registerFailure({ message: "Unexpected Error occured" }));
          }
        })
        .catch((err) => {
          dispatch(registerFailure(err.response.data));
        });
    };

export const login = (email, password) => (dispatch) => {
  dispatch(startLogin());

  const data = {
    email: email,
    password: password,
  };

  publicRequest
    .post(LOGIN, data)
    .then((res) => {
      const accessToken = res.data.accessToken;
      const refreshToken = res.data.refreshToken;
      const user = res.data.user;

      dispatch(completeLogin({ accessToken, refreshToken, ...user }));
    })
    .catch((error) => {
      if (error.response) {
        dispatch(loginFailure(error.response.data));
      } else if (error.request) {
        dispatch(loginFailure(error.response.data));
      } else {
        dispatch(loginFailure({ message: "Unexpected error occurred" }));
      }
    });
};

export const logout = () => (dispatch) => {
  dispatch(startLogout());
  dispatch(completeLogout());
};

export const updateHomeTown = (homeTown) => (dispatch, getState) => {
  const user = getState().user;

  const reqBody = {
    town: homeTown,
  };

  userRequest(user.accessToken)
    .patch(CURRENT_USER, reqBody)
    .then((res) => {
      const updatedUser = res.data;
      updatedUser["accessToken"] = user.accessToken;
      updatedUser["refreshToken"] = user.refreshToken;

      dispatch(completeLogin(updatedUser));
    })
    .catch((error) => {});
};
