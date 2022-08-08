import { CarCrash } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import ProfileCard from "../../components/ProfileCard";
import QRCodeDialog from "../../components/QRCodeDialog";
import VehicleCard from "../../components/VehicleCard";
import { fetchTowns } from "../../store/towns/towns.actions";
import { updateHomeTown } from "../../store/user/user.actions";
import { fetchVehicles } from "../../store/vehicle/vehicle.actions";
import { VEHICLE_REGISTER } from "../../utils/constants/routes";
import { useTranslation } from "react-i18next";

export default function ConsumerProfilePage() {
  const user = useSelector((state) => state.user);
  const vehicle = useSelector((state) => state.vehicle);
  const towns = useSelector((state) => state.towns);

  const [homeTown, setHomeTown] = useState(user.town);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogVehicle, setDialogVehicle] = useState({});

  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  useEffect(() => {
    if (!towns.isAvailable) {
      dispatch(fetchTowns());
    }

    if (vehicle.vehicles.length < 1) {
      dispatch(fetchVehicles());
    }
  }, [dispatch, towns.isAvailable, vehicle.vehicles]);

  function HomeTownSelector(townItems, homeTownValue) {
    const flatProps = {
      options: towns.isAvailable ? townItems.map((t) => t) : [],
    };

    return (
      <Autocomplete
        {...flatProps}
        id="home-town"
        disableClearable
        disabled={towns.error != null || !towns.isAvailable}
        blurOnSelect
        value={homeTownValue}
        sx={{ width: 0.8 }}
        onChange={(_event, newHomeTown) => {
          handleHomeTownChange(newHomeTown);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Home town"
            variant="outlined"
            color="primary"
            focused
          />
        )}
      />
    );
  }

  function VehicleLoadError() {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <CarCrash fontSize="large" color="secondary" sx={{ mb: 0.5, mt: 2 }} />
        <Typography variant="h5" color="text.secondary">
          {vehicle.error === null
            ? t("consumer_profile.no_vehicle")
            : t("consumer_profile.couldnt_load")}
        </Typography>
      </Box>
    );
  }

  const handleHomeTownChange = async (newHomeTown) => {
    await dispatch(updateHomeTown(newHomeTown));
    setHomeTown(newHomeTown);
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
      <Grid container maxWidth="md" spacing={{ xs: 1, sm: 1, md: 5, xl: 5 }}>
        <Grid item pt={2} xs={12} sm={12} md={6} lg={6}>
          <ProfileCard user={user} />
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
            {!towns.isLoading ? (
              HomeTownSelector(towns.items, homeTown)
            ) : (
              <CircularProgress status="loading" />
            )}
          </Box>
          <Box
            mt={3}
            mb={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              width: 1,
            }}
          >
            <Button
              component={RouterLink}
              to={VEHICLE_REGISTER}
              variant="contained"
              startIcon={<AddCircleIcon />}
              sx={{ width: "80%" }}
            >
              {t("consumer_profile.add_new_vehicle")}
            </Button>
          </Box>
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
          {vehicle.vehicles.length === 0 || vehicle.error !== null
            ? VehicleLoadError()
            : vehicle.vehicles.map((v) => (
                <VehicleCard
                  key={v.vehicleNumber}
                  vehicle={v}
                  setDialogVehicle={setDialogVehicle}
                  setDialogOpen={setDialogOpen}
                />
              ))}
        </Grid>
      </Grid>
      <QRCodeDialog
        vehicle={dialogVehicle}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </Container>
  );
}
