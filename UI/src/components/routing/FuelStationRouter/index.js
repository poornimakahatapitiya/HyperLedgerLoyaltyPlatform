import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Home from "@mui/icons-material/Home";
import UpdateSharp from "@mui/icons-material/UpdateSharp";
import ErrorPage from "../../../pages/ErrorPage";
import FuelStationHomePage from "../../../pages/FuelStationHomepage";
import FuelStationProfilePage from "../../../pages/FuelStationProfilePage";
import LandingPage from "../../../pages/LandingPage";
import FuelStationUpdatePage from "../../../pages/FuelStationUpdatePage";
import {
  HOME,
  PROFILE,
  STATION_LOGIN,
  STATION_REGISTER,
  STATION_UPDATE,
} from "../../../utils/constants/routes";
import CommonWrapper from "../../wrapper/CommonWrapper";
import { useSelector } from "react-redux";
import { ROLE_STATION } from "../../../utils/constants/roles";

function FuelStationRouter() {
  const user = useSelector((state) => state.user);

  const bottomNavItems = [
    { label: "Home", icon: <Home />, to: HOME },
    { label: "Update", icon: <UpdateSharp />, to: STATION_UPDATE },
    { label: "Profile", icon: <AccountCircle />, to: PROFILE },
  ];

  const wrapCommonWrapper = (View, props) => {
    return (
      <CommonWrapper bottomNavItems={bottomNavItems} role={ROLE_STATION}>
        <View {...props} />
      </CommonWrapper>
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={STATION_REGISTER}
          element={user.isLoggedIn ? <Navigate to={HOME} /> : <LandingPage />}
        />
        <Route
          path={STATION_LOGIN}
          element={user.isLoggedIn ? <Navigate to={HOME} /> : <LandingPage />}
        />
        <Route
          path={STATION_UPDATE}
          element={wrapCommonWrapper(FuelStationUpdatePage)}
        />
        <Route
          path={PROFILE}
          element={wrapCommonWrapper(FuelStationProfilePage)}
        />
        <Route path={HOME} element={wrapCommonWrapper(FuelStationHomePage)} />
        <Route
          path="*"
          element={wrapCommonWrapper(ErrorPage, { home: HOME })}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default FuelStationRouter;
