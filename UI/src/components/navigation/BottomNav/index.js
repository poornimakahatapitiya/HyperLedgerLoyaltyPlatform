import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Divider,
} from "@mui/material";

function BottomNav(props) {
  const [value, setValue] = useState(0);

  return (
    <Box sx={props.sx}>
      <Divider />
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        sx={{ backgroundColor: "background.default" }}
      >
        {props.items.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.label}
            icon={item.icon}
            component={RouterLink}
            to={item.to}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}

export default BottomNav;
