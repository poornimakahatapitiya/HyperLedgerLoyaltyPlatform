import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import NotificationCard from "../../components/NotificationCard";
import { fetchNotifications } from "../../store/notifications/notifications.actions";

function ConsumerNotificationPage() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const unread = notifications.items.filter((item) => !item.read);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
  console.log(notifications)

  const renderNotifications = () => {
    if (unread.length > 0) {
      return (
        <Box>
          {unread.map((notification, key) => (
            <Box key={key} sx={{ my: 0.5 }}>
              <NotificationCard
                id={notification.notificationID}
                timestamp={notification.createdAt}
                Type={notification.Type}
                name={notification.name}
                rate={notification.rate}
                amount={notification.amount}
              />
            </Box>
          ))}
        </Box>
      );
    } else {
      return (
        <Box display="flex" flexDirection="column" alignItems="center">
          <NotificationsActiveIcon
            fontSize="large"
            color="secondary"
            sx={{ mb: 0.5 }}
          />
          <Typography variant="h5" color="text.secondary">
            {notifications.error === null
              ? "No New Notifications"
              : "Couldn't Load Loyalty point data"}
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        minHeight="90vh"
        justifyContent={unread.length > 0 ? null : "center"}
      >
        {notifications.isLoading ? (
          <CircularProgress status="loading" />
        ) : (
          renderNotifications()
        )}
      </Box>
    </Container>
  );
}

export default ConsumerNotificationPage;
