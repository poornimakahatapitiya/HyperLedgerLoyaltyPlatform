import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      type: "light",
      primary: {
        main: "#0B421A",
      },
      secondary: {
        main: "#00676A",
      },
      background: {
        default: "#F5FCFF",
      },
    },
  })
);
