import { graphqlRequest } from "../../services/api";
import { getTowns } from "../../services/towns";
import { TOWNS } from "../../utils/constants/uri";
import { completeFetching, hasError, startFetching } from "./towns.slice";

export const fetchTowns = () => (dispatch, getState) => {
  const user = getState().user;

  dispatch(startFetching());

  graphqlRequest(user.accessToken)
    .post(TOWNS, "{allGasStations {town}}")
    .then((res) => {
      if (res.data.errors.length === 0 && res.data.data != null) {
        const towns = getTowns(res.data.data.allGasStations);
        dispatch(completeFetching(Array.from(towns)));
      } else {
        dispatch(hasError({ message: "Unexpected error occured" }));
      }
    })
    .catch((err) => dispatch(err.message));
};
