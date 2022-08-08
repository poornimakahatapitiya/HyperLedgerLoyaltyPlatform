import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  Button,
  MenuItem,
  Select,
  Typography,
  TextField
} from "@mui/material";
import CustomSnackbar from "../../components/CustomSnackbar";
import SuccessDialog from "../../components/SuccessDialog";
import { fetchVehicles } from "../../store/vehicle/vehicle.actions";
import useStations from "./useStations";
import { fetchNotifications } from "../../store/notifications/notifications.actions";

function ConsumerHomePage() {
  const [selectedPoint ,setSelectedPoint] = useState("");
  const[rate,setRate]=useState("");
  const[available,setAvailable]=useState("");
  const[redeemAmount,setRedeemAmount]=useState("")
  const[convertAmount,setConvertAmount]=useState("")
  const[converted,setConverted]=useState("")
  const[remaining,setRemaining]=useState("")

  const [errorVehicle, setErrorVehicle] = useState(null);
  const [errorAmount, setErrorAmount] = useState("");


  const notifications = useSelector((state) => state.notifications);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const {
    fuelStations,
    token,
    isLoading,
    isUpdating,
    updateFailed,
    updateCompleted,
    updateError,
    setUpdateFailed,
    setUpdateCompleted,
    requestToken,
  } = useStations();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleSelectVehicleChange = (event) => {
    const selected = event.target.value;
    setSelectedPoint(event.target.value)
    setErrorVehicle(null);
    if (selected.Type=== "Sysco-Shop-Points") {
      
      setRate(selected.rate)
      setAvailable(selected.amount)
    }else if (selected.Type=== "Chicken-Shop-Points") {
      setRate(selected.rate)
      setAvailable(selected.amount)
    }
  };

  const redeemAmountChange = (event) => {
    setRedeemAmount(event.target.value);
    if(redeemAmount<1){
      setErrorAmount("Redemption amount should be greater than or equal to 1");
   
    }
    
  };
  const convertAmountChange = (event) => {
    setConvertAmount(event.target.value);
    if(convertAmount<1){
      setErrorAmount("Redemption amount should be greater than or equal to 1");
   
    }
    
  };

  const handleConvert = (_) => {
    if( selectedPoint.Type==="Chicken-Shop-Points"){
      setConverted(convertAmount/10)
    }else if(selectedPoint.Type==="Sysco-Shop-Points")
    setConverted(convertAmount/100)
  };
  const handleRedeem = (_) => {
    let hasErrors = false;

    if (selectedPoint.Type === "") {
      setErrorVehicle("Point Type has to be selected");
      hasErrors = true;
    } else if (selectedPoint.Type=== "Sysco-Shop-Points") {
      setRemaining(converted-redeemAmount)
    }else if (selectedPoint.Type=== "Chicken-Shop-Points") {
      setRemaining(converted-redeemAmount)
    }


  };

console.log(converted)
  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        minHeight="100vh"
        textAlign="center"
        px={3}
      >
        <Typography
          variant="h4"
          sx={{ textTransform: "uppercase", fontWeight: 600, mb: 2}}
        >
          Convert Your Loyalty Points
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ textTransform: "uppercase", fontWeight: 600, mb: 2 }}
        >
          Select Loyalty Point
        </Typography>
        {!notifications.isLoading ? (
          <FormControl fullWidth>
            <InputLabel id="vehicle-select-label">Loyalty Point Type</InputLabel>
            <Select
              labelId="vehicle-select-label"
              id="vehicle-select"
              value={selectedPoint}
              label="Loyalty Point Type"
              disabled={notifications.items.length < 1}
              onChange={handleSelectVehicleChange}
            >
              {notifications.items.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item.Type}
                </MenuItem>
              ))}
            </Select>
            <Typography
              mt={1}
              display={errorVehicle === null ? "none" : "block"}
              color="red"
            >
              {`*${errorVehicle}`}
            </Typography>
          </FormControl>
        ) : (
          <CircularProgress status="loading" />
        )}
        <Typography> Rate: {rate}</Typography>
        <Typography> Available Points: {available}</Typography>
        <Typography
          variant="subtitle1"
          sx={{ textTransform: "uppercase", fontWeight: 600, mt: 4, mb: 2 }}
        >
          Enter Amount You want to Convert
        </Typography>
        <TextField
              id="standard-basic"
              required
              label="How many loyalty points to convert?"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              type="number"
              name="xonvertAmount"
              value={convertAmount}
              // error={errorAmount}
              // helperText={errorAmount}
              onChange={convertAmountChange}
            />
<Button
              onClick={handleConvert}
              variant="contained"
              fullWidth
              sx={{ width: 1, marginTop: "15px" }}
            >
              Submit
            </Button>

<Typography
          variant="h5"
          sx={{ textTransform: "uppercase", fontWeight: 600, mt: 4, mb: 2 }}
        >
           Amount of Sysco Tokens: {converted}
        </Typography>
        <Box sx={{ width: "100%", mt: 10 }}>
          
          <Typography
          variant="h4"
          sx={{ textTransform: "uppercase", fontWeight: 600, mb: 5 }}
        >
          Redeem your loyalty Tokens
        </Typography>
          {/* <FuelQuotaProgressBar value={quotaLeft} /> */}
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ textTransform: "uppercase", fontWeight: 600, mt: 4, mb: 2 }}
        >
          Enter Amount You want to redeem
        </Typography>
        <TextField
              id="standard-basic"
              required
              label="Redemption Amount"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              type="number"
              name="redeemAmount"
              value={redeemAmount}
              // error={errorAmount}
              // helperText={errorAmount}
              onChange={redeemAmountChange}
            />
            

        <Button
          loading={isUpdating}
          onClick={handleRedeem}
          variant="contained"
          sx={{ mt: 2, fontWeight: 600 }}
        >
          Redeem
        </Button>
        <Typography
          variant="h5"
          sx={{ textTransform: "uppercase", fontWeight: 600, mt: 4, mb: 2 }}
        >
          Remaining Sysco Tokens: {remaining}
        </Typography>
        
      </Box>
      <CustomSnackbar
        open={updateFailed}
        setOpen={setUpdateFailed}
        autoHideDuration={3500}
        severity="error"
        message={updateError}
      />

      <SuccessDialog
        open={updateCompleted}
        setOpen={setUpdateCompleted}
        token={token}
      />
    </Container>
  );
}

export default ConsumerHomePage;
