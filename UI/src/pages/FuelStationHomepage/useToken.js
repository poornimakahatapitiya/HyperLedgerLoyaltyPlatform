import { useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../services/api";
import { FUEL_STATION_TOKEN } from "../../utils/constants/uri";

const useToken = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [error, setError] = useState(null);

  const station = useSelector((state) => state.station);
  const user = useSelector((state) => state.user);

  const updateToken = (pumpedAmount, plateNumber) => {
    setIsUpdating(true);
    const pumpedFuelAmount = parseInt(pumpedAmount, 10);
    console.log(pumpedFuelAmount);
    const data = {
      pumpedFuelAmount: pumpedFuelAmount,
    };
    userRequest(user.accessToken)
      .patch(FUEL_STATION_TOKEN(station.gasStationId, plateNumber), data)
      .then((_) => {
        setIsUpdating(false);
        setUpdateComplete(true);
      })
      .catch((e) => {
        setIsUpdating(false);
        setError(e.response.data);
      });
  };

  return {
    isUpdating,
    updateComplete,
    error,
    setUpdateComplete,
    updateToken,
  };
};

export default useToken;
