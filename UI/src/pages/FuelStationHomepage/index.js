import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Alert,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import InputAdornment from "@mui/material/InputAdornment";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useDispatch, useSelector } from "react-redux";
import useToken from "./useToken";
import CustomSnackbar from "../../components/CustomSnackbar";
import { fetchFuels } from "../../store/fuel/fuel.actions";
import FuelCard from "../../components/fuelCard";
import { fetchStation } from "../../store/station/station.action";
import { useTranslation } from "react-i18next";

function FuelStationHomePage() {
  const fuel = useSelector((state) => state.fuel);
  const station = useSelector((state) => state.station);
  const dispatch = useDispatch();
  const [scannedText, setScannedText] = useState("");
  const [pumpedAmount, setPumpedAmount] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [qrCodeClear, setQRCodeClear] = useState(false);
  const { isUpdating, updateComplete, error, setUpdateComplete, updateToken } =
    useToken();

  
  
  // useEffect(() => {
  //   if (station.gasStationId === null) {
  //     dispatch(fetchStation());
  //   }
  //   if (fuel.fuels === null && station.gasStationId !== null) {
  //     dispatch(fetchFuels());
  //   }
  // }, [dispatch, station, fuel, updateComplete]);

  const handleChangeFuelAmount = (e) => {
    setPumpedAmount(e.target.value);
  };
  const updateFuelAmount = () => {
    if (pumpedAmount > 1) {
      setIsInvalid(false);
      if (scanSuccess) {
        updateToken(pumpedAmount, scannedText);
        setScannedText("");
        setScanSuccess(false);
        setQRCodeClear(false);
        setPumpedAmount("");
      } else {
        setIsInvalid(true);
        setQRCodeClear(true);
        setUpdateError(true);
        setPumpedAmount("");
        setScanError(true);
      }
    }
  };
  return (
    <Container
      sx={{
        maxWidth: "md",
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
      maxWidth="false"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          Your Loyalty points
        </Typography>
  </Box>
      <Grid container maxWidth="md" spacing={{ xs: 1, sm: 1, md: 5, xl: 5 }}>
        <Grid
          item
          pt={3}
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{ alignItems: "center" }}
        >
          <Box
            mt={5}
            mb={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                marginTop: "30px",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
             Point Details
            </Typography>
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
            }}
          >
          </Typography>
          <Box
            mt={3}
            mb={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              mt={{ xs: "30px", sm: "30px", md: "50px", lg: "50px" }}
              mb={{ xs: "10px", sm: "10px", md: "20px", lg: "20px" }}
              sx={{
                fontSize: { xs: "20px", sm: "20px", md: "24px", lg: "24px" },
              }}
            >
              Redeem Amount
            </Typography>
            <TextField
              variant="outlined"
              type="number"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Points</InputAdornment>
                ),
              }}
              error={isInvalid}
              helperText={
                isInvalid ? "Amount should be greater than 1 Point" : ""
              }
              onChange={handleChangeFuelAmount}
              value={pumpedAmount}
            />
            
            <LoadingButton
              loading={isUpdating}
              onClick={updateFuelAmount}
              variant="contained"
              fullWidth
              sx={{ width: 1, marginTop: "15px" }}
            >
              Submit
            </LoadingButton>
          </Box>
          <CustomSnackbar
            open={updateComplete}
            setOpen={setUpdateComplete}
            autoHideDuration={3500}
            severity="success"
            message={"update successful"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          mt={{ xs: 0, sm: 0, md: 2, xl: 2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              marginTop: "30px",
              marginBottom: "5px",
              fontWeight: "bold",
              marginLeft: "30px",
            }}
          >
            Tokens Available
          </Typography>
          {updateComplete ? (
            window.location.reload()
          ) : fuel.fuels === null || isUpdating ? (
            <CircularProgress sx={{ marginLeft: "30px" }} />
          ) : (
            fuel.fuels.map((f) => <FuelCard key={f.fuelId} fuel={f} />)
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default FuelStationHomePage;
