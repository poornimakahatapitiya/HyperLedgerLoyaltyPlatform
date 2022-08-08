import { forwardRef, Fragment } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

function CustomSnackbar(props) {
  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpen(false);
  };

  const Alert = forwardRef(function Alert(p, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...p} />;
  });

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  if (props.severity == null) {
    return (
      <Snackbar
        open={props.open}
        autoHideDuration={props.autoHideDuration}
        onClose={handleClose}
        action={action}
        message={props.message}
      />
    );
  } else {
    return (
      <Snackbar
        open={props.open}
        autoHideDuration={props.autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={props.severity}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    );
  }
}

export default CustomSnackbar;
