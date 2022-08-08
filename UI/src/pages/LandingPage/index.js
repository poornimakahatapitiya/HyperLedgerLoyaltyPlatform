import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import {
  LANDING_LOGIN,
  LANDING_REGISTER,
  POLIMA_LOGO_NO_BG,
} from "../../assets/images";
import {
  CONSUMER_LOGIN,
  CONSUMER_REGISTER,
  STATION_LOGIN,
  STATION_REGISTER,
} from "../../utils/constants/routes";

export default function LandingPage() {
  const { i18n, t } = useTranslation("common");
  const [pageLogin, setPageLogin] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setSelectedLanguage(event.target.value);
  };

  return (
    <Container
      disableGutters
      sx={{
        height: "100vh",
        display: "flex",
      }}
      maxWidth="false"
    >
      <Grid container>
        <Grid //left image
          item
          xs={12}
          sm={6}
          md={6}
          lg={5}
          display={{ xs: "none", sm: "block", md: "block", lg: "block" }}
        >
          <Box
            component="img"
            src={pageLogin ? LANDING_LOGIN : LANDING_REGISTER}
            sx={{ objectFit: "cover", height: "100vh", width: 1 }}
          ></Box>
        </Grid>
        <Grid //right area
          item
          xs={12}
          sm={6}
          md={6}
          lg={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box //logo and text
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={POLIMA_LOGO_NO_BG}
              sx={{ width: "75px" }}
            />
            <Typography
              pr={"20px"}
              fontSize={{ xs: "50px", sm: "50px", md: "50px", lg: "70px" }}
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              {t("common.polima")}
            </Typography>
          </Box>

          <Box //buttons
            mt={"30px"}
            mb={"50px"}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: 1,
            }}
          >
            <Button
              variant={pageLogin ? "contained" : "outlined"}
              startIcon={<AccountCircle />}
              sx={{
                width: {
                  xs: 0.85,
                  sm: 0.8,
                  md: 0.6,
                  lg: 0.5,
                },
                fontSize: {
                  xs: "medium",
                  sm: "medium",
                  md: "medium",
                  lg: "large",
                },
                margin: "20px 0px",
                textAlign: "center",
              }}
              component={RouterLink}
              to={pageLogin ? CONSUMER_LOGIN : CONSUMER_REGISTER}
            >
              {pageLogin ? t("landing_page.login_as_consumer") : t("landing_page.signup_as_consumer")}
            </Button>
            <Button
              variant={pageLogin ? "contained" : "outlined"}
              startIcon={<LocalGasStationIcon />}
              sx={{
                width: {
                  xs: 0.85,
                  sm: 0.8,
                  md: 0.6,
                  lg: 0.5,
                },
                margin: "20px 0px",
                fontSize: {
                  xs: "medium",
                  sm: "medium",
                  md: "medium",
                  lg: "large",
                },
                textAlign: "center",
              }}
              component={RouterLink}
              to={pageLogin ? STATION_LOGIN : STATION_REGISTER}
            >
              {pageLogin ? t("landing_page.login_as_fuel_station") : t("landing_page.signup_as_fuel_station")}
            </Button>
            <Box mt={"10px"} display={"flex"}>
              <Typography>
                {pageLogin ? t("landing_page.new_to_polima") : t("landing_page.already_have_account")}{" "}
              </Typography>
              <Typography
                m={"0px 5px"}
                sx={{
                  cursor: "pointer",
                  fontSize: 16,
                  color: "primary.main",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  setPageLogin(!pageLogin);
                }}
              >
                {pageLogin ? "Sign up" : "Sign in"}
              </Typography>
            </Box>
            <FormControl sx={{ mt: 4, minWidth: 120 }} size="small">
              <Select value={selectedLanguage} onChange={handleLanguageChange}>
                <MenuItem value={"en"}>English</MenuItem>
                <MenuItem value={"si"}>සිංහල</MenuItem>
                <MenuItem value={"ta"}>தமிழ்</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
