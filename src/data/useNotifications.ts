import { gql } from "@apollo/client";
import {
  useNotificationsSubscriptionSubscription,
  useNotificationsQuery,
} from "@/generated/graphql";
import { useAuth } from "@clerk/clerk-react";

gql`
  query Notifications($userId: String!) {
    notifications(userId: $userId) {
      id
      message
      senderId
      userId
      sender {
        email
        name
      }
    }
  }
`;

gql`
  subscription NotificationsSubscription($userId: String!) {
    notifications(userId: $userId) {
      latestNotifications {
        id
        message
        userId
        senderId
        sender {
          name
          email
        }
      }
      newNotification {
        message
        id
        userId
        senderId
        sender {
          name
          email
        }
      }
    }
  }
`;

export const useNotifications = () => {
  const { userId } = useAuth();

  // Fetch static notifications using useQuery
  const {
    data: notificationsData,
    loading: queryLoading,
    error: queryError,
  } = useNotificationsQuery({
    variables: { userId: userId || "" },
    skip: !userId,
  });

  // Fetch real-time notifications using useSubscription
  const {
    data: realTimeData,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useNotificationsSubscriptionSubscription({
    variables: { userId: userId || "" },
    skip: !userId,
    onSubscriptionData: ({ client, subscriptionData }) => {
      const newNotification =
        subscriptionData.data?.notifications?.newNotification;
      const latestNotifications =
        subscriptionData.data?.notifications?.latestNotifications;

      // Update the Apollo cache directly
      if (newNotification || latestNotifications) {
        client.cache.modify({
          fields: {
            notifications(existingNotifications = []) {
              let updatedNotifications = [...existingNotifications];

              // Add newNotification if available
              if (newNotification) {
                if (
                  !updatedNotifications.some(
                    (notif) => notif.id === newNotification.id
                  )
                ) {
                  updatedNotifications.push(newNotification);
                }
              }

              // Add latestNotifications if available
              if (latestNotifications) {
                latestNotifications.forEach((newNotif) => {
                  if (
                    !updatedNotifications.some(
                      (notif) => notif.id === newNotif.id
                    )
                  ) {
                    updatedNotifications.push(newNotif);
                  }
                });
              }

              return updatedNotifications; // Return the updated notifications list
            },
          },
        });

        // Optionally refetch the notifications query to ensure the latest data
        client.refetchQueries({
          include: ["Notifications"], // Replace with your query name
        });
      }
    },
  });

  // Combine static notifications with real-time notifications
  const notifications = [
    ...(notificationsData?.notifications || []),
    ...(realTimeData?.notifications?.latestNotifications || []),
  ];
  // Loading and error states
  const loading = queryLoading || subscriptionLoading;
  const error = queryError || subscriptionError;

  return { notifications, loading, error };
};
