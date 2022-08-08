import { Close } from "@mui/icons-material";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

export default function QRCodeDialog(props) {

  const { t } = useTranslation("common");
  const handleClose = () => {
    props.setDialogOpen(false);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.addImage(props.vehicle.qrCode, "PNG", 15, 15, 120, 120);
    doc.text(
      15,
      145,
      `Vehicle number: ${props.vehicle.vehicleNumber}
      \nVehicle type: ${props.vehicle.vehicleType}
      \nFuel type: ${props.vehicle.fuelType}
      \nEngine capacity: ${props.vehicle.engineCapacity}
      \nFuel quota: ${props.vehicle.fuelQuota}`
    );
    const pdfURL = doc.output("bloburl");
    window.open(pdfURL, "_blank");
  };

  return (
    <Dialog Dialog fullScreen open={props.dialogOpen} onClose={handleClose}>
      <AppBar sx={{ position: "relative" }}>
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

      <Container
        maxWidth={"sm"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          mt={4}
          mr={4}
          ml={4}
          color="primary"
          display={props.vehicle === null ? "none" : "flex"}
        >
          {t("qr_code_dialog.your_qr_code")}
        </Typography>

        {props.vehicle === null ? (
          <Box width={300} mt={3}>
            <BrokenImageIcon sx={{ fontSize: 300 }} />
          </Box>
        ) : (
          <Box component={"img"} width={300} src={props.vehicle.qrCode} />
        )}

        {props.vehicle === null ? (
          <Typography variant="h3" mb={2} color="error" textAlign="center">
            {t("qr_code_dialog.qr_load_error")}
          </Typography>
        ) : (
          <Typography variant="h3" mb={2}>
            {props.vehicle.vehicleNumber}
          </Typography>
        )}

        <Button
          disabled={props.vehicle === null}
          variant={"contained"}
          onClick={handleDownloadPdf}
        >
          {t("qr_code_dialog.download_qr")}
        </Button>
      </Container>
    </Dialog>
  );
}
