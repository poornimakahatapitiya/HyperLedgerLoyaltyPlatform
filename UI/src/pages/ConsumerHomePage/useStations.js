import { useState } from "react";
import { useSelector } from "react-redux";
import { graphqlRequest, userRequest } from "../../services/api";
import { TOWNS, REQUEST_TOKEN } from "../../utils/constants/uri";

const useStations = () => {
  const [fuelStations, setFuelStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [updateCompleted, setUpdateCompleted] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [token, setToken] = useState(null);

  const user = useSelector((state) => state.user);

  const fetchFuelStations = () => {
    setIsLoading(true);

    graphqlRequest(user.accessToken)
      .post(
        TOWNS,
        `{allGasStationsByTown(town: "${user.town}"){gasStationId name}}`
      )
      .then((res) => {
        if (res.data.errors.length === 0 && res.data.data != null) {
          setFuelStations(res.data.data.allGasStationsByTown);
        } else {
          setFetchError({ message: "Unexpected error occured" });
        }

        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setFetchError(e.message);
      });
  };

  const requestToken = (stationId, vehicleId) => {
    setIsUpdating(true);

    userRequest(user.accessToken)
      .post(REQUEST_TOKEN(stationId), { vehicleId: vehicleId })
      .then((res) => {
        setToken(res.data);

        setIsUpdating(false);
        setUpdateCompleted(true);
      })
      .catch((e) => {
        if (e.response.status === 409) {
          setUpdateError(e.response.data.message);
        } else {
          setUpdateError(e.message);
        }

        setUpdateFailed(true);
        setIsUpdating(false);
      });
  };

  return {
    fuelStations,
    token,
    isLoading,
    isUpdating,
    updateFailed,
    updateCompleted,
    fetchError,
    updateError,
    setUpdateFailed,
    setUpdateCompleted,
    fetchFuelStations,
    requestToken,
  };
};

export default useStations;
