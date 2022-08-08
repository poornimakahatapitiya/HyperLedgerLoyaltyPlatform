import { userRequest } from "../../services/api";
import { VEHICLES } from "../../utils/constants/uri";
import {
  completeAddingVehicle,
  completeFetching,
  hasError,
  startAddingVehicle,
  startFetching,
} from "./vehicle.slice";

export const addVehicle = (vehicle) => (dispatch, getState) => {
  const user = getState().user;

  dispatch(startAddingVehicle());

  userRequest(user.accessToken)
    .post(VEHICLES(user.userID), vehicle)
    .then((res) => {
      if (res.status === 201) {
        dispatch(completeAddingVehicle(res.data));
      } else {
        dispatch(hasError({ message: "Unexpected Error occured" }));
      }
    })
    .catch((e) => dispatch(hasError(e.response.data)));
};

export const fetchVehicles = () => (dispatch, getState) => {
  const user = getState().user;

  dispatch(startFetching());

  userRequest(user.accessToken)
    .get(VEHICLES(user.userID))
    .then((res) => dispatch(completeFetching(res.data)))
    .catch((e) => dispatch(hasError(e.message)));
};
