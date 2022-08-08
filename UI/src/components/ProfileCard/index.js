import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import PhoneIcon from "@mui/icons-material/Phone";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/user/user.actions";

export default function ProfileCard({ user }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Paper
      elevation={2}
      sx={{
        paddingTop: "20px",
        paddingBottom: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "20px",
      }}
    >
      <Box>
        <Avatar
          sx={{
            width: { xs: 100, sm: 100, md: 150, xl: 150 },
            height: { xs: 100, sm: 100, md: 150, xl: 150 },
            fontSize: { xs: "50px", sm: "50px", md: "70px", xl: "70px" },
            backgroundColor: "primary.main",
          }}
        >
          {`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
        </Avatar>
      </Box>
      <Box
        minWidth={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography //user fname lname
          fontSize={32}
        >{`${user.firstName} ${user.lastName}`}</Typography>

        <Box
          mb={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AlternateEmailIcon color="primary" sx={{ marginRight: "5px" }} />

          <Typography>{`${user.email}`}</Typography>
        </Box>
        <Box
          mb={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BadgeIcon color="primary" sx={{ marginRight: "5px" }} />

          <Typography>{`${user.nic}`}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PhoneIcon color="primary" sx={{ marginRight: "5px" }} />

          <Typography>{`${user.phone}`}</Typography>
        </Box>
      </Box>
      <Box
        mt={2}
        width={0.5}
        sx={{
          display: { xs: "flex", sm: "none", md: "none", xl: "none" },
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          sx={{ width: "80%" }}
          onClick={handleLogout}
        >
          logout
        </Button>
      </Box>
    </Paper>
  );
}
