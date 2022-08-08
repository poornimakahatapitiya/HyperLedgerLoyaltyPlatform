import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { POLIMA_LOGO_NO_BG } from "../../assets/images";
import { Link as RouterLink } from "react-router-dom";
import { CONSUMER_REGISTER, STATION_LOGIN } from "../../utils/constants/routes";
import { AccountCircle } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/user/user.actions";
import validator from "validator";
import { LoadingButton } from "@mui/lab";

function ConsumerLoginPage() {
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
              POLIMA
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
              LOG IN
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountCircle color="primary" sx={{ marginRight: 1 }} />
              <Typography sx={{ fontSize: { sm: 14, lg: 16, md: 16, xs: 14 } }}>
                Login as a <b>Consumer</b>
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
              Forgot password?
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
              LOGIN
            </LoadingButton>
            <Button
              component={RouterLink}
              to={STATION_LOGIN}
              variant="outlined"
              sx={{ width: 1, marginTop: "15px" }}
            >
              LOGIN AS FUEL STATION
            </Button>
            <Typography sx={{ fontSize: 14, margin: "5px" }}> Or</Typography>
            <Button
              variant="outlined"
              sx={{ width: 1 }}
              startIcon={<GoogleIcon />}
            >
              SIGN IN WITH GOOGLE
            </Button>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
              <Typography sx={{ fontSize: 16 }}>
                Don't have an account?
              </Typography>
              <Typography
                component={RouterLink}
                to={CONSUMER_REGISTER}
                sx={{
                  cursor: "pointer",
                  fontSize: 16,
                  color: "primary.main",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                Sign Up
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ConsumerLoginPage;
