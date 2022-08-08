export const BASE_URL = "http://localhost:4000";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const CURRENT_USER = "/user";
export const CONSUMERS = "/owners";

export const NOTIFICATIONS = (owner) => `channels/mychannel/chaincodes/loyaltyToken?args=["${owner}"]&peer=peer0.org1.example.com&fcn=queryTokensByOwner`;
export const NOTIFICATION = (id, nid) =>
  `${CONSUMERS}/${id}/notifications/${nid}`;
export const VEHICLES = (id) => `${CONSUMERS}/${id}/vehicles`;

export const FUEL_STATION_TOKEN = (id, vehicleNumber) =>
  `${FUEL_STATION}/${id}/tokens/${vehicleNumber}/invalidate`;

export const TOWNS = "/gql/gas-stations";
export const FUEL_STATION = "/gas-stations";
export const FUEL_STATION_FUEL = (id, fuelType) =>
  `${FUEL_STATION}/${id}/fuels/${fuelType}`;

export const FUEL_STATION_FUELS=`/channels/mychannel/chaincodes/loyaltyToken?args=["syscoUser1"]&peer=peer0.org1.example.com&fcn=queryTokensByOwner`
export const FUEL_STATION_MANAGER = (id) => `/gas-station-manager/${id}`;

export const REQUEST_TOKEN = (id) => `/tokens/gas-stations/${id}`;
