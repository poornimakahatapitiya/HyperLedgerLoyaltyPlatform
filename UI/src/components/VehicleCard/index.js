import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { CardActionArea, Chip, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

export default function VehicleCard({
  vehicle,
  setDialogVehicle,
  setDialogOpen,
}) {
  const handleDialogOpen = () => {
    setDialogVehicle(vehicle);
    setDialogOpen(true);
  };
  const { t } = useTranslation("common");

  return (
    <Card
      elevation={2}
      sx={{ display: "flex", width: 1, marginTop: 1, marginBottom: 1 }}
    >
      <Box sx={{ display: "flex", width: 1 }}>
        <CardActionArea>
          <CardContent
            sx={{
              flex: "5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box display="flex" sx={{ alignitems: "center" }}>
              <Typography mr={1} component="div" variant="h5">
                {vehicle.vehicleNumber}
              </Typography>
              {vehicle.verified ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CancelIcon color="error" />
              )}
            </Box>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {t("common.type")}: {vehicle.vehicleType}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {t("vehicle_card.engine_capacity")}: {vehicle.engineCapacity}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            p: 2,
            width: 1,
          }}
        >
          <Chip label={vehicle.fuelType} color="success" />
          <IconButton
            aria-label="delete"
            sx={{ fontSize: 50 }}
            onClick={handleDialogOpen}
          >
            <QrCodeIcon fontSize="inherit" color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
