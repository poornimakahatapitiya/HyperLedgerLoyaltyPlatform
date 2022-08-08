import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConsumerLoginPage from "../../../pages/ConsumerLoginPage";
import ConsumerSignupPage from "../../../pages/ConsumerSignupPage";
import FuelStationLoginPage from "../../../pages/FuelStationLoginPage";
import FuelStationSignupPage from "../../../pages/FuelStationSignupPage";
import LandingPage from "../../../pages/LandingPage";
import {
  CONSUMER_LOGIN,
  CONSUMER_REGISTER,
  HOME,
  STATION_LOGIN,
  STATION_REGISTER,
} from "../../../utils/constants/routes";

function PublicRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME} element={<LandingPage />} />
        <Route path={CONSUMER_LOGIN} element={<ConsumerLoginPage />} />
        <Route path={CONSUMER_REGISTER} element={<ConsumerSignupPage />} />
        <Route path={STATION_LOGIN} element={<FuelStationLoginPage />} />
        <Route path={STATION_REGISTER} element={<FuelStationSignupPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default PublicRouter;
