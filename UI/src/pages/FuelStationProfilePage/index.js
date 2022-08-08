import {
  Button,
  CircularProgress,
  Container,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStation } from "../../store/station/station.action";
import { logout } from "../../store/user/user.actions";
import { useTranslation } from "react-i18next";

function FuelStationProfilePage() {

  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const station = useSelector((state) => state.station);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (station.gasStationId === null) {
      dispatch(fetchStation());
    }
  }, [dispatch, station.gasStationId]);

  return (
    <Container
      sx={{ bgcolor: "background.default", height: "100vh", display: "flex" }}
      maxWidth="false"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        {station.isLoading ? (
          <CircularProgress status="loading" />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ImageList
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 100,
                alignItems: "center",
              }}
            >
              <ImageListItem>
                <img
                  src={
                    "https://icons.iconarchive.com/icons/icons8/ios7/512/City-Gas-Station-icon.png"
                  }
                  loading="lazy"
                />
              </ImageListItem>
            </ImageList>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: 20,
                  alignContent: "center",
                }}
              >
                {t("fuel_station_profle_page.station_name")}
              </Typography>
              <Typography sx={{ fontSize: 20, alignItems: "center" }}>
                {station.name}
              </Typography>
              <Typography
                sx={{
                  paddingTop: 2,
                  fontWeight: "bold",
                  fontSize: 20,
                  alignContent: "center",
                }}
              >
                {t("fuel_station_profle_page.telephone_no")}
              </Typography>
              <Typography sx={{ fontSize: 20, alignItems: "center" }}>
                {station.phone}
              </Typography>
              <Typography
                sx={{
                  paddingTop: 2,
                  fontWeight: "bold",
                  fontSize: 20,
                  alignContent: "center",
                }}
              >
                {t("fuel_station_profle_page.registartion_no")}
              </Typography>
              <Typography sx={{ fontSize: 20, alignItems: "center" }}>
                {station.acNumber}
              </Typography>
              <Typography
                sx={{
                  paddingTop: 2,
                  fontWeight: "bold",
                  fontSize: 20,
                  alignContent: "center",
                }}
              >
                {t("fuel_station_profle_page.address")}
              </Typography>
              <Typography sx={{ fontSize: 20, alignItems: "center" }}>
                {station.address}
              </Typography>
              <Typography
                sx={{
                  paddingTop: 2,
                  fontWeight: "bold",
                  fontSize: 20,
                  alignContent: "center",
                }}
              >
                {t("common.town")}
              </Typography>
              <Typography sx={{ fontSize: 20, alignItems: "center" }}>
                {station.town}
              </Typography>
              <Button
                color="error"
                onClick={handleLogout}
                variant="contained"
                sx={{
                  display: { sm: "none", lg: "none", md: "none" },
                  width: "90px",
                  marginTop: "50px",
                  marginBottom: "50px",
                  color: "white",
                }}
              >
                {t("common.logout_caps")}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default FuelStationProfilePage;
