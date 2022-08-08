import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Link as RouterLink } from "react-router-dom";
import {
  Grid,
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { LocalGasStation } from "@mui/icons-material";
import { POLIMA_LOGO_NO_BG } from "../../assets/images";
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validateNic,
  validatePhone,
  validatePassowrd,
  validateConfirmPassowrd,
} from "../../utils/validation/Signup";
import { STATION_LOGIN } from "../../utils/constants/routes";
import { register } from "../../store/user/user.actions";
import { ROLE_STATION } from "../../utils/constants/roles";
import { useTranslation } from "react-i18next";

export default function ConsumerSignupPage() {
  const user = useSelector((state) => state.user);

  const { t } = useTranslation("common");

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState(ROLE_STATION);
  const [phone, setPhone] = useState("");
  const [nic, setnic] = useState("");
  const [erroremail, seterrorEmail] = useState({});
  const [errorfirstName, seterrorFirstName] = useState({});
  const [errorlastName, seterrorLastName] = useState({});
  const [errorpassword, seterrorPassword] = useState({});
  const [errorconfirmPassword, seterrorConfirmPassword] = useState({});
  const [errorphone, seterrorPhone] = useState({});
  const [errornic, seterrornic] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    seterrorEmail(validateEmail(e.target.value));
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    seterrorFirstName(validateFirstName(e.target.value));
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    seterrorLastName(validateLastName(e.target.value));
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    seterrorPhone(validatePhone(e.target.value));
  };
  const handleNicChange = (e) => {
    setnic(e.target.value);
    seterrornic(validateNic(e.target.value));
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    seterrorPassword(validatePassowrd(e.target.value));
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    seterrorConfirmPassword(validateConfirmPassowrd(e.target.value));
  };
  const handleSubmit = () => {
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      nic === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setWarning(true);
      setError(false);
      setSuccess(false);
      seterrorPassword(validatePassowrd(password));
      seterrorConfirmPassword(validateConfirmPassowrd(password));
      seterrorEmail(validateEmail(email));
      seterrorFirstName(validateFirstName(firstName));
      seterrorLastName(validateLastName(lastName));
      seterrornic(validateNic(nic));
      seterrorPhone(validatePhone(phone));
    } else {
      dispatch(
        register(email, password, firstName, lastName, nic, phone, role)
      );
    }
  };
  useEffect(() => {
    if (!user.error && user.isregisterd) {
      setSuccess(true);
      setWarning(false);
      setError(false);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setPhone("");
      setnic("");
    } else if (user.error && !user.isregisterd) {
      setError(true);
      setWarning(false);
      setSuccess(false);
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setPhone("");
      setnic("");
    }
  }, [
    setSuccess,
    setError,
    setWarning,
    setFirstName,
    setLastName,
    setPassword,
    setPhone,
    setnic,
    user.error,
    user.isregisterd,
  ]);
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
            <LocalGasStation color="primary" sx={{ marginRight: 1 }} />
            <Typography
              sx={{
                fontSize: { sm: 50, lg: 70, md: 70, xs: 50 },
                fontWeight: "bold",
              }}
            >
              {t("common.signup_caps")}
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: 14, lg: 16, md: 16, xs: 14 },
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {t("fuel_station_signup_page.as_fuel_station_manager")}
            </Typography>
            <Typography sx={{ fontSize: { sm: 14, lg: 16, md: 16, xs: 14 } }}>
            {t("fuel_station_signup_page.please_fill_details")}
            </Typography>
            <TextField
              id="standard-basic"
              required
              label="First Name"
              name="firstName"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              value={firstName}
              error={errorfirstName.firstName}
              helperText={errorfirstName.firstName}
              onChange={handleFirstNameChange}
            />
            <TextField
              id="standard-basic"
              required
              label="Last Name"
              name="lastName"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              value={lastName}
              error={errorlastName.lastName}
              helperText={errorlastName.lastName}
              onChange={handleLastNameChange}
            />
            <TextField
              id="standard-basic"
              required
              label="Email Address"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              name="email"
              value={email}
              error={erroremail.email}
              helperText={erroremail.email}
              onChange={handleEmailChange}
            />
            <TextField
              id="standard-basic"
              required
              label="Phone Number"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              type="number"
              name="phoneNumber"
              value={phone}
              error={errorphone.phoneNumber}
              helperText={errorphone.phoneNumber}
              onChange={handlePhoneChange}
            />
            <TextField
              id="standard-basic"
              required
              label="NIC Number"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              name="nicNumber"
              value={nic}
              error={errornic.nic}
              helperText={errornic.nic}
              onChange={handleNicChange}
            />
            <TextField
              id="standard-basic"
              required
              label="Password"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              type="password"
              name="password"
              value={password}
              error={errorpassword.password}
              helperText={errorpassword.password}
              onChange={handlePasswordChange}
            />
            <TextField
              id="standard-basic"
              required
              label="Confirm Password"
              name="confirmPassword"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                marginTop: "20px",
                marginLeft: "20px",
                width: "75%",
              }}
              type="password"
              value={confirmPassword}
              error={errorconfirmPassword.confirmPassword}
              helperText={errorconfirmPassword.confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {warning && !error && !success ? (
              <Alert severity="warning">Please fill missing details</Alert>
            ) : !warning && error && !success && user.error ? (
              <Alert severity="error">{user.error.message}</Alert>
            ) : success && !warning && !error ? (
              <Alert severity="success"> User registered successfully</Alert>
            ) : !warning && error && !success ? (
              <Alert severity="error"> something went wrong</Alert>
            ) : (
              <></>
            )}

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                width: 1,
                marginTop: "15px",
                paddingBottom: "10px",
                paddingTop: "10px",
              }}
            >
              {t("common.signup_caps")}
            </Button>
            {success ? (
              <Alert severity="warning" Sx={{ marginTop: "10px" }}>
                {t("signup.confirm_email")}
              </Alert>
            ) : (
              <></>
            )}
            <Box sx={{ display: "flex", marginTop: "20px" }}>
              <Typography sx={{ fontSize: 16 }}>
              {t("signup.have_account")}
              </Typography>
              <RouterLink to={STATION_LOGIN} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{
                    fontSize: 16,
                    color: "primary.main",
                    fontWeight: "bold",
                    marginLeft: "5px",
                  }}
                >
                  {t("common.login")}
                </Typography>
              </RouterLink>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
