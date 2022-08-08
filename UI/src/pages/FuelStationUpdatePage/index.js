import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Container } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import CustomSnackbar from "../../components/CustomSnackbar";
import { fetchStation } from "../../store/station/station.action";
import useFuelStock from "./useFuelStock";
import { useTranslation } from "react-i18next";

function FuelStationUpdatePage() {
  const [nextLoadDate, setNextLoadDate] = useState(new Date());
  const [fuelType, setFuelType] = useState("OCTANE95");
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);

  const { t } = useTranslation("common");
  
  const dispatch = useDispatch();
  const station = useSelector((state) => state.station);

  useEffect(() => {
    if (station.gasStationId === null) {
      dispatch(fetchStation());
    }
  }, [dispatch, station.gasStationId]);

  const {
    isUpdating,
    updateComplete,
    error,
    setUpdateComplete,
    updateFuelStock,
  } = useFuelStock();

  const handleDatePick = (pickedDate) => {
    setNextLoadDate(pickedDate);
  };

  const handleChangeType = (event) => {
    setFuelType(event.target.value);
  };

  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleClick = (_) => {
    if (amount > 1 && price > 0) {
      setIsInvalid(false);
      updateFuelStock({
        fuelType: fuelType,
        quota: amount,
        price: price,
        nextAvailableDate: moment(nextLoadDate).format("D-MM-YYYY"),
      });
    } else {
      setIsInvalid(true);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      maxWidth="false"
    >
      <Grid container maxWidth="sm" px={5}>
        <Grid item xs={12} sm={12} md={12} lg={12} alignItems="center">
          <Typography
            sx={{
              fontSize: { xs: "24px", md: "28px" },
              textAlign: "center",
              fontWeight: "bold",
            }}
            my={3}
          >
            {t("fuel_station_update_page.update_stocks")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <Typography
              mb={{ xs: "10px", sm: "10px", md: "20px", lg: "20px" }}
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "24px", lg: "24px" },
              }}
            >
              {t("fuel_station_update_page.fuet_type")}
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="OCTANE95"
                checked={fuelType}
                name="radio-buttons-group"
                mb={{ xs: "30px" }}
                onChange={handleChangeType}
              >
                <FormControlLabel
                  value="OCTANE95"
                  control={<Radio />}
                  label="Petrol 95"
                />
                <FormControlLabel
                  value="OCTANE92"
                  control={<Radio />}
                  label="Petrol 92"
                />
                <FormControlLabel
                  value="DIESEL"
                  control={<Radio />}
                  label="Diesel"
                />
                <FormControlLabel
                  value="SUPERDIESEL"
                  control={<Radio />}
                  label="Super Diesel"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <Typography
              mt={{ xs: "30px", sm: "30px", md: "0" }}
              mb={{ xs: "10px", sm: "10px", md: "20px", lg: "20px" }}
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "24px", lg: "24px" },
              }}
            >
              {t("fuel_station_update_page.date_of_next_load")}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                  justifyContent: "center",
                }}
              >
                <DesktopDatePicker
                  disablePast={true}
                  label="Date"
                  inputFormat="dd/MM/yyyy"
                  value={nextLoadDate}
                  onChange={handleDatePick}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
              <Box
                sx={{
                  display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
                  justifyContent: "center",
                }}
              >
                <MobileDatePicker
                  disablePast={true}
                  inputFormat="dd/MM/yyyy"
                  value={nextLoadDate}
                  onChange={handleDatePick}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography
              mt={{ xs: "30px", sm: "30px", md: "50px", lg: "50px" }}
              mb={{ xs: "10px", sm: "10px", md: "20px", lg: "20px" }}
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "24px", lg: "24px" },
              }}
            >
              {t("fuel_station_update_page.load_amount")}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Litres</InputAdornment>
                  ),
                }}
                error={isInvalid}
                helperText={
                  isInvalid ? "Amount should be greater than 1 Litre" : ""
                }
                onChange={handleChangeAmount}
                value={amount}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography
              mt={{ xs: "30px", sm: "30px", md: "50px", lg: "50px" }}
              mb={{ xs: "10px", sm: "10px", md: "20px", lg: "20px" }}
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "24px", lg: "24px" },
              }}
            >
              {t("fuel_station_update_page.price_per_liter")}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">LKR</InputAdornment>
                  ),
                }}
                error={isInvalid}
                helperText={
                  isInvalid ? "Price should be greater than 0 LKR" : ""
                }
                onChange={handleChangePrice}
                value={price}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} pt={2} pb={4}>
          <Typography
            mt={1}
            display={error === null ? "none" : "block"}
            color="red"
          >
            {error === null ? "" : `*${error.message}`}
          </Typography>
          <LoadingButton
            loading={isUpdating}
            onClick={handleClick}
            variant="contained"
            fullWidth
            sx={{ width: 1, marginTop: "15px" }}
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
      <CustomSnackbar
        open={updateComplete}
        setOpen={setUpdateComplete}
        autoHideDuration={3500}
        severity="success"
        message="Fuel Stock Updated Sucessfully"
      />
    </Container>
  );
}

export default FuelStationUpdatePage;
