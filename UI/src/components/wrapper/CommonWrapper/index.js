import { Box } from "@mui/material";
import BottomNav from "../../navigation/BottomNav";
import NavBar from "../../navigation/NavBar";

function CommonWrapper(props) {
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <NavBar role={props.role} />
      <Box sx={{ mt: 2 }}>{props.children}</Box>
      <BottomNav
        sx={{
          position: "sticky",
          bottom: 0,
          display: { xs: "block", sm: "none" },
        }}
        items={props.bottomNavItems}
      />
    </Box>
  );
}

export default CommonWrapper;
