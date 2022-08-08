import { userRequest } from "../../services/api";
import { FUEL_STATION_MANAGER } from "../../utils/constants/uri";
import { completeFetching, hasError, startLoading } from "./station.slice";

export const fetchStation = () => (dispatch, getState) => {
  const user = getState().user;
  dispatch(startLoading());

  userRequest(user.accessToken)
    .get(FUEL_STATION_MANAGER(user.userID))
    .then((response) => dispatch(completeFetching(response.data)))
    .catch((e) => dispatch(hasError(e.message)));
};
