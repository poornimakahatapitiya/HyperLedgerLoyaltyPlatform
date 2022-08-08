import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AccountCircle,
  ArrowDropDown,
  LocalGasStation,
} from "@mui/icons-material";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { logout } from "../../../store/user/user.actions";
import { ROLE_CONSUMER, ROLE_STATION } from "../../../utils/constants/roles";
import {
  HOME,
  NOTIFICATIONS,
  PROFILE,
  STATION_UPDATE,
} from "../../../utils/constants/routes";

function NavBar(props) {

  const { i18n, t } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const open = Boolean(anchorEl);
  const openLang = Boolean(anchorEl2);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLangClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleLangClose = () => {
    setAnchorEl2(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setAnchorEl2(null);
  };

  return (
    <Box>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            sx={{
              color: "common.white",
              mr: 1.5,
              display: { xs: "none", sm: "flex" },
            }}
            component={RouterLink}
            to={HOME}
          >
            <LocalGasStation fontSize="large" />
          </IconButton>

          <Typography variant="h6"> Sysco Loyalty application</Typography>
          <Box sx={{ flexGrow: 1 }} />


          
            <IconButton
              sx={{
                color: "common.white",
                display: { xs: "none", sm: "flex" },
              }}
              component={RouterLink}
              to={NOTIFICATIONS}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
  

          <IconButton
            sx={{ color: "common.white", display: { xs: "none", sm: "flex" } }}
            onClick={handleClick}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <AccountCircle fontSize="large" />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {props.role === ROLE_STATION && (
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to={STATION_UPDATE}
              >
                {t("nav_bar.update_stocks")}
              </MenuItem>
            )}
            <MenuItem onClick={handleClose} component={RouterLink} to={PROFILE}>
            {t("nav_bar.my_profile")}
            </MenuItem>
            <MenuItem onClick={handleLogout}>{t("common.logout")}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

export default NavBar;
