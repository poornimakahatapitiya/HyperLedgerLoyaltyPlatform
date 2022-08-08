import { CardActionArea, Chip, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Box } from "@mui/system";
import React from "react";
import { useTranslation } from "react-i18next";

export default function FuelCard({ token }) {

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
          <Typography
          variant="subtitle1"
          color="text.secondary"
          component="div"
        >
          Name:{token.name} 
        </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
             Type: {token.tokenType}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Price:  {token.value}
            </Typography>
            
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Amount:{token.amount} 
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
          <Chip label={token.tokenType} color="success" />
        </Box>
      </Box>
    </Card>
  );
}
