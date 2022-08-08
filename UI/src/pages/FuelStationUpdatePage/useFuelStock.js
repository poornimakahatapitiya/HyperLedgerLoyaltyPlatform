import { useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../services/api";
import { FUEL_STATION_FUEL } from "../../utils/constants/uri";

const useFuelStock = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateComplete, setUpdateComplete] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);
  const station = useSelector((state) => state.station);

  const updateFuelStock = (formValues) => {
    setIsUpdating(true);

    userRequest(user.accessToken)
      .patch(
        FUEL_STATION_FUEL(station.gasStationId, formValues.fuelType),
        formValues
      )
      .then((_) => {
        setIsUpdating(false);
        setUpdateComplete(true);
      })
      .catch((e) => {
        setIsUpdating(false);
        setError(e);
      });
  };

  return {
    isUpdating,
    updateComplete,
    error,
    setUpdateComplete,
    updateFuelStock,
  };
};

export default useFuelStock;
