import moment from "moment";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  AppBar,
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

function SuccessDialog(props) {
  const { t } = useTranslation("common");
  const handleClose = () => {
    props.setOpen(false);
  };

  if (props.token === undefined || props.token === null) return null;

  return (
    <Dialog fullScreen open={props.open} onClose={handleClose}>
      <AppBar>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          minHeight="100vh"
          textAlign="center"
          px={2}
          py={5}
        >
          <Box width={200} mt={3}>
            <CheckCircleIcon sx={{ fontSize: 200 }} color="success" />
          </Box>
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", fontWeight: 600 }}
          >
            {t("success_dialog.request_success")}
          </Typography>

          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase", fontWeight: 600, mt: 5 }}
          >
            {t("success_dialog.token_no")}
          </Typography>

          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase", fontWeight: 600, mt: 4 }}
          >
            {props.token.queueNumber}
          </Typography>

          <Grid container mt={2} spacing={1}>
            <Grid item xs={5} textAlign="right">
              {t("success_dialog.vehicle_no")}
            </Grid>
            <Grid item xs={7} textAlign="left">
              {props.token.vehicle.vehicleNumber}
            </Grid>
            <Grid item xs={5} textAlign="right">
              {t("success_dialog.created_at")}
            </Grid>
            <Grid item xs={7} textAlign="left">
              {moment
                .parseZone(props.token.createdAt)
                .format("D-MM-YYYY, h:mm:ss a")}
            </Grid>
            <Grid item xs={5} textAlign="right">
              {t("success_dialog.expires_at")}
            </Grid>
            <Grid item xs={7} textAlign="left">
              {moment
                .parseZone(props.token.expiryDate)
                .format("D-MM-YYYY, h:mm:ss a")}
            </Grid>
            <Grid item xs={5} textAlign="right">
              {t("success_dialog.fuel_station")}
            </Grid>
            <Grid item xs={7} textAlign="left">
              {props.token.gasStation.name}
            </Grid>
            <Grid item xs={5} textAlign="right">
              {t("common.town")}
            </Grid>
            <Grid item xs={7} textAlign="left">
              {props.token.gasStation.town}
            </Grid>
            <Grid item xs={5} textAlign="right">
              {t("common.contact")}
            </Grid>
            <Grid item xs={7} textAlign="left">
              {props.token.gasStation.phone}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Dialog>
  );
}

export default SuccessDialog;
