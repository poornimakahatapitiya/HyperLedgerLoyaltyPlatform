import {
  startLoading,
  completeFetching,
  hasError,
} from "./notifications.slice";
import { userRequest } from "../../services/api";
import { NOTIFICATIONS, NOTIFICATION } from "../../utils/constants/uri";

export const fetchNotifications = () => (dispatch, getState) => {
  const user = getState().user;

  dispatch(startLoading());

  userRequest("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjAwMTk0NDEsInVzZXJuYW1lIjoic3lzY29Vc2VyMSIsIm9yZ05hbWUiOiJPcmcxIiwiaWF0IjoxNjU5OTgzNDQxfQ.Cby65x8mWt56tup8RBUurOcI8T2XVEWLACZtJ398Gy8")
    .get(NOTIFICATIONS("syscoUser1"))
    .then((response) => dispatch(completeFetching(response.data))
    
    )
    .catch((e) => dispatch(hasError(e.message)));
};


export const markNotificationAsRead = (nid) => (dispatch, getState) => {
  const user = getState().user;
  dispatch(startLoading());

  userRequest(user.accessToken)
    .get(NOTIFICATION(user.userID, nid))
    .then((response) => dispatch(completeFetching(response.data)))
    .catch((e) => dispatch(hasError(e.message)));
};
