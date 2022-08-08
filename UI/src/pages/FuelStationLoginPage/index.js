import { LocalGasStation } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import validator from "validator";
import { POLIMA_LOGO_NO_BG } from "../../assets/images";
import { login } from "../../store/user/user.actions";
import { CONSUMER_LOGIN, STATION_REGISTER } from "../../utils/constants/routes";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

function FuelStationLoginPage() {
  
  const { t } = useTranslation("common");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasErrorEmail, setHasErrorEmail] = useState(false);
  const [hasErrorPassword, setHasErrorPassword] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setHasErrorPassword(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setHasErrorEmail(!validator.isEmail(event.target.value));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let hasErrors = false;
    if (validator.isEmpty(password)) {
      hasErrors = true;
      setHasErrorPassword(true);
    }
    if (validator.isEmpty(email)) {
      hasErrors = true;
      setHasErrorEmail(true);
    }

    if (!hasErrors) {
      dispatch(login(email, password));
    }
  };

  return (
    <Container
      sx={{ bgcolor: "background.default", height: "100vh", display: "flex" }}
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
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { sm: 400, lg: 400, md: 400, xs: "95%" },
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={POLIMA_LOGO_NO_BG}
              width="40%"
              display={{ xs: "block", sm: "none", md: "none", xl: "none" }}
            ></Box>
            <Typography
              sx={{
                fontSize: { sm: 50, lg: 70, md: 70, xs: 50 },
                fontWeight: "bold",
              }}
            >
              {t("common.login_caps")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalGasStation color="primary" sx={{ marginRight: 1 }} />
              <Typography sx={{ fontSize: { sm: 14, lg: 16, md: 16, xs: 14 } }}>
                {t("login.login_as_a")} <b>{t("login.station")}</b>
              </Typography>
            </Box>
            <TextField
              required
              error={hasErrorEmail}
              helperText={hasErrorEmail ? "Email is invalid" : ""}
              value={email}
              onChange={(e) => handleEmailChange(e)}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{ width: 1, marginTop: "20px" }}
            />
            <TextField
              required
              error={hasErrorPassword}
              helperText={hasErrorPassword ? "Password cannot be empty" : ""}
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              sx={{ width: 1, marginTop: "20px" }}
            />
            <Typography
              align="right"
              sx={{
                width: 1,
                fontSize: 14,
                fontWeight: "bold",
                marginTop: "15px",
              }}
            >
              {t("login.forgot_pass")}
            </Typography>
            <Typography
              mt={1}
              display={user.error === null ? "none" : "block"}
              color="red"
            >
              {user.error === null ? "" : `*${user.error.message}`}
            </Typography>
            <LoadingButton
              loading={user.isLoading}
              onClick={handleLogin}
              variant="contained"
              sx={{ width: 1, marginTop: "15px" }}
            >
              {t("common.login_caps")}
            </LoadingButton>
            <Button
              component={RouterLink}
              to={CONSUMER_LOGIN}
              variant="outlined"
              sx={{ width: 1, marginTop: "15px" }}
            >
              {t("login.login_as_consumer")}
            </Button>
            <Typography sx={{ fontSize: 14, margin: "5px" }}> Or</Typography>
            <Button
              variant="outlined"
              sx={{ width: 1 }}
              startIcon={<GoogleIcon />}
            >
              {t("login.login_with_google")}
            </Button>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
              <Typography sx={{ fontSize: 16 }}>
              {t("login.no_account")}
              </Typography>
              <Typography
                component={RouterLink}
                to={STATION_REGISTER}
                sx={{
                  fontSize: 16,
                  color: "primary.main",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                {t("common.signup")}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FuelStationLoginPage;
