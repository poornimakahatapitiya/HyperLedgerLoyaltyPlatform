import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Grid,
  Radio,
  TextField,
  Typography,
  FormHelperText,
  Alert,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { addVehicle } from "../../store/vehicle/vehicle.actions";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import {
  CAR,
  LORRY,
  BUS,
  MOTORBIKE,
  SUV,
  TUKTUK,
} from "../../utils/constants/vehicleTypes";
import {
  OCTANE92,
  OCTANE95,
  DIESEL,
  SUPERDIESEL,
} from "../../utils/constants/fuelTypes";
import { POLIMA_LOGO_NO_BG } from "../../assets/images";
import {
  ValidateEngineCapacity,
  ValidateFuelType,
  ValidatePlateNumber,
  ValidateVehicleType,
} from "../../utils/validation/VehicleRegistration";

const vehicleTypes = {
  Car: CAR,
  Suv: SUV,
  Bus: BUS,
  Lorry: LORRY,
  TukTuk: TUKTUK,
  MotorBike: MOTORBIKE,
};
const fuelTypes = {
  petrol92: OCTANE92,
  petrol95: OCTANE95,
  diesel: DIESEL,
  superdiesel: SUPERDIESEL,
};
function ConsumerVehicleRegisterPage() {
  const dispatch = useDispatch();
  const vehicle = useSelector((state) => state.vehicle);

  const { t } = useTranslation("common");

  const [vehicleNumber, setPlateNumber] = useState("");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [fuelType, setFuelType] = useState(null);
  const [errorplate, setErrorPlate] = useState({});
  const [errorEngine, setErrorEngine] = useState({});
  const [errorVehicle, setErrorVehicle] = useState({});
  const [errorFuel, setErrorFuel] = useState({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const handlePlateChange = (event) => {
    setPlateNumber(event.target.value);
    setErrorPlate(ValidatePlateNumber(event.target.value));
  };
  const handleEngineCapacityChange = (event) => {
    setEngineCapacity(event.target.value);
    setErrorEngine(ValidateEngineCapacity(event.target.value));
  };
  const handleVehicleTypeChange = (event) => {
    setVehicleType(event.target.value);
    setErrorVehicle(ValidateVehicleType(event.target.value));
  };
  const handleFuelTypeChange = (event) => {
    setFuelType(event.target.value);
    setErrorFuel(ValidateFuelType(event.target.value));
  };

  const handleSubmit = () => {
    if (
      vehicleNumber === "" ||
      engineCapacity === "" ||
      vehicleType === "" ||
      fuelType === ""
    ) {
      setWarning(true);
      setError(false);
      setSuccess(false);

      setErrorEngine(ValidateEngineCapacity(engineCapacity));
      setErrorPlate(ValidatePlateNumber(vehicleNumber));
      setErrorVehicle(ValidateVehicleType(vehicleType));
      setErrorFuel(ValidateFuelType(fuelType));
    } else {
      dispatch(
        addVehicle({ vehicleNumber, engineCapacity, vehicleType, fuelType })
      );
    }
  };
  useEffect(() => {
    if (vehicle.completeAdding && !vehicle.error) {
      setSuccess(true);
      setError(false);
      setWarning(false);
      setPlateNumber("");
      setEngineCapacity("");
      setVehicleType("");
      setFuelType("");
    } else if (!vehicle.completeAdding && vehicle.error) {
      setError(true);
      setSuccess(false);
      setWarning(false);
      setPlateNumber("");
      setEngineCapacity("");
      setVehicleType({});
      setFuelType({});
    }
  }, [
    setSuccess,
    setError,
    setWarning,
    setPlateNumber,
    setEngineCapacity,
    setVehicleType,
    setFuelType,
    vehicle.completeAdding,
    vehicle.error,
  ]);
  return (
    <Container
      sx={{ bgcolor: "background.default", display: "flex" }}
      maxWidth="false"
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          lg={6}
          md={6}
          sx={{
            display: { sm: "none", lg: "flex", md: "flex", xs: "none" },
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={POLIMA_LOGO_NO_BG}
              width={{ md: "60%", xl: "50%" }}
            ></Box>
            <Typography
              sx={{
                fontSize: { md: 60, xl: 80 },
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              {t("common.polima")}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { sm: 400, lg: 500, md: 400, xs: "100%" },
              alignItems: "center",
            }}
          >
            <DirectionsCarIcon color="primary" fontSize="large" />
            <Typography
              sx={{
                fontSize: { sm: 30, lg: 50, md: 30, xs: 20 },
                fontWeight: "bold",
              }}
            >
              {t("vehicle_register.vehicle_details")}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { sm: 14, lg: 16, md: 16, xs: 14 },
                marginTop: 3,
              }}
            >
              {t("vehicle_register.enter_vehicle_no")}
            </Typography>
            <TextField
              id="outlined-basic"
              label="Plate Number"
              variant="outlined"
              value={vehicleNumber}
              helperText={errorplate ? errorplate.vehicleNumber : "CAW1234"}
              error={errorplate.vehicleNumber}
              onChange={handlePlateChange}
              sx={{
                width: 1,
                marginTop: "20px",
                textAlign: "center",
                input: { textAlign: "center" },
                marginBottom: { xs: 3 },
              }}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { sm: 14, lg: 16, md: 16, xs: 14 },
              }}
            >
              {t("vehicle_register.enter_eng_cap")}
            </Typography>
            <TextField
              id="outlined-basic"
              label="Engine Capacity"
              variant="outlined"
              type="number"
              helperText={errorEngine ? errorEngine.engineCapacity : "1500"}
              value={engineCapacity}
              error={errorEngine.engineCapacity}
              onChange={handleEngineCapacityChange}
              sx={{
                width: 1,
                marginTop: "20px",
                textAlign: "center",
                input: { textAlign: "center" },
              }}
            />

            <FormControl
              sx={{ m: 3 }}
              component="fieldset"
              error={errorVehicle.vehicleType}
              variant="standard"
            >
              <FormLabel
                sx={{
                  paddingTop: 5,
                  fontWeight: "bold",
                  fontSize: { sm: 14, lg: 16, md: 16, xs: 14 },
                }}
              >
                {t("vehicle_register.enter_vehicle_type")}
              </FormLabel>
              <RadioGroup
                sx={{ fontSize: { sm: 14, lg: 16, md: 16, xs: 14 } }}
                onChange={handleVehicleTypeChange}
              >
                <FormControlLabel
                  value={vehicleTypes.MotorBike}
                  control={<Radio />}
                  label="Motor Bike"
                />
                <FormControlLabel
                  value={vehicleTypes.TukTuk}
                  control={<Radio />}
                  label="Tuk Tuk"
                />
                <FormControlLabel
                  value={vehicleTypes.Car}
                  control={<Radio />}
                  label="Car"
                />
                <FormControlLabel
                  value={vehicleTypes.Suv}
                  control={<Radio />}
                  label="SUV"
                />
                <FormControlLabel
                  value={vehicleTypes.Lorry}
                  control={<Radio />}
                  label="Lorry"
                />
                <FormControlLabel
                  value={vehicleTypes.Bus}
                  control={<Radio />}
                  label="Bus"
                />
              </RadioGroup>
              <FormHelperText>{errorVehicle.vehicleType}</FormHelperText>
            </FormControl>

            <FormControl
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
              error={errorFuel.fuelType}
            >
              <FormLabel
                sx={{
                  paddingTop: 5,
                  fontWeight: "bold",
                  fontSize: { sm: 14, lg: 16, md: 16, xs: 14 },
                }}
              >
                {t("vehicle_register.enter_fuel_type")}
              </FormLabel>
              <RadioGroup
                sx={{ fontSize: { sm: 14, lg: 16, md: 16, xs: 14 } }}
                onChange={handleFuelTypeChange}
              >
                <FormControlLabel
                  value={fuelTypes.petrol92}
                  control={<Radio />}
                  label="Petrol 92"
                />
                <FormControlLabel
                  value={fuelTypes.petrol95}
                  control={<Radio />}
                  label="Petrol 95"
                />
                <FormControlLabel
                  value={fuelTypes.diesel}
                  control={<Radio />}
                  label="Diesel"
                />
                <FormControlLabel
                  value={fuelTypes.superdiesel}
                  control={<Radio />}
                  label="Super Diesel"
                />
              </RadioGroup>
              <FormHelperText>{errorFuel.fuelType}</FormHelperText>
            </FormControl>
            {warning && !error && !success ? (
              <Alert severity="warning">Please fill missing details</Alert>
            ) : !warning && error && !success ? (
              <Alert severity="error">
                {vehicle.error === null ? "" : vehicle.error.message}
              </Alert>
            ) : !warning && !error && success ? (
              <Alert severity="success"> Vehicle registered successfully</Alert>
            ) : (
              <></>
            )}

            <LoadingButton
              loading={vehicle.isLoading}
              onClick={handleSubmit}
              variant="contained"
              fullWidth
              sx={{ width: 1, marginTop: "15px" }}
            >
              {t("common.register_caps")}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ConsumerVehicleRegisterPage;
