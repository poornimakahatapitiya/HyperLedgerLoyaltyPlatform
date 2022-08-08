import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

function ErrorPage(props) {
  const { t } = useTranslation("common");

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "80vh", p: 2 }}
    >
      <Grid item xs={3}>
        <Typography variant="h1" sx={{ fontWeight: "400" }} color="primary">
          {t("error_page.error_404")}
        </Typography>
        <Typography
          variant="h4"
          color="secondary"
          sx={{ mt: { xs: 1, sm: 0 } }}
        >
          {t("error_page.error_message")} :(
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Link variant="body1" component={RouterLink} to={props.home}>
          {t("error_page.back_to_home")}
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ErrorPage;
