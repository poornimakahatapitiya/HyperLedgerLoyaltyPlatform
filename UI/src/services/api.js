import axios from "axios";
import { BASE_URL } from "../utils/constants/uri";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export const userRequest = (accessToken) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const graphqlRequest = () =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/graphql",
    },
  });
