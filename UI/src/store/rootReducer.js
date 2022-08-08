import { combineReducers } from "redux";
import notifications from "./notifications/notifications.slice";

import vehicle from "./vehicle/vehicle.slice";

import user from "./user/user.slice";

import towns from "./towns/towns.slice";

import fuel from "./fuel/fuel.slice";

import station from "./station/station.slice";

export const reducer = combineReducers({
  user,
  notifications,
  vehicle,
  towns,
  fuel,
  station,
});
