import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { markNotificationAsRead } from "../../store/notifications/notifications.actions";

function NotificationCard(props) {
  const dispatch = useDispatch();
  const parseDate = (timestamp) => moment.parseZone(timestamp);
  const { t } = useTranslation("common");

  const handleClick = (nid) => {
    dispatch(markNotificationAsRead(nid));
  };

  return (
    <Card variant="outlined" sx={{ minWidth: "70vw" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Loyalty Point Data
        </Typography>
        <Typography sx={{ fontSize: 14, mb: 1.5 }} color="text.secondary">
          {parseDate(props.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
        <Typography variant="body2"> POINT TYPE: {props.Type}</Typography>
        <Typography variant="body2"> ISSUED BY: {props.name}</Typography>
        <Typography variant="body2">RATE: {props.rate}</Typography>
        <Typography variant="body2">AMOUNT OF POINTS: {props.amount}</Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}

export default NotificationCard;
