import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Home from "@mui/icons-material/Home";
import LoyaltyIcon from '@mui/icons-material/Loyalty'; 
import ConsumerHomePage from "../../../pages/ConsumerHomePage";
import ConsumerProfilePage from "../../../pages/ConsumerProfilePage";
import ConsumerVehicleRegisterPage from "../../../pages/ConsumerVehicleRegisterPage";
import LandingPage from "../../../pages/LandingPage";
import ErrorPage from "../../../pages/ErrorPage";
import CommonWrapper from "../../wrapper/CommonWrapper";
import { useSelector } from "react-redux";
import {
  HOME,
  CONSUMER_LOGIN,
  CONSUMER_REGISTER,
  VEHICLE_REGISTER,
  NOTIFICATIONS,
  PROFILE,
} from "../../../utils/constants/routes";
import ConsumerNotificationPage from "../../../pages/ConsumerNotificationPage";
import { ROLE_CONSUMER } from "../../../utils/constants/roles";

function ConsumerRouter() {
  const user = useSelector((state) => state.user);

  const bottomNavItems = [
    { label: "Home", icon: <Home />, to: HOME },
    { label: "Profile", icon: <AccountCircle />, to: PROFILE },
    {
      label: "Loyalty Points",
      icon: <LoyaltyIcon/>,
      to: NOTIFICATIONS,
    },
  ];

  const wrapCommonWrapper = (View, props) => {
    return (
      <CommonWrapper bottomNavItems={bottomNavItems} role={ROLE_CONSUMER}>
        <View {...props} />
      </CommonWrapper>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={CONSUMER_REGISTER}
          element={user.isLoggedIn ? <Navigate to={HOME} /> : <LandingPage />}
        />
        <Route
          path={CONSUMER_LOGIN}
          element={user.isLoggedIn ? <Navigate to={HOME} /> : <LandingPage />}
        />
        <Route path={HOME} element={wrapCommonWrapper(ConsumerHomePage)} />
        <Route
          path={PROFILE}
          element={wrapCommonWrapper(ConsumerProfilePage)}
        />
        <Route
          path={VEHICLE_REGISTER}
          element={wrapCommonWrapper(ConsumerVehicleRegisterPage)}
        />
        <Route
          path={NOTIFICATIONS}
          element={wrapCommonWrapper(ConsumerNotificationPage)}
        />
        <Route
          path="*"
          element={wrapCommonWrapper(ErrorPage, { home: HOME })}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default ConsumerRouter;
