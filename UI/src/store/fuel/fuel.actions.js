import { startLoading, completeFetching, hasError } from "./fuel.slice";
import { userRequest } from "../../services/api";
import { FUEL_STATION_FUELS } from "../../utils/constants/uri";

export const fetchFuels = () => (dispatch, getState) => {
  const user = getState().user;
  const station = getState().station;
  dispatch(startLoading());

  userRequest(user.accessToken)
    .get(FUEL_STATION_FUELS("syscoUser1"))
    .then((res2) => dispatch(completeFetching(res2.data)))
    .catch((e) => dispatch(hasError(e.message)));
};
