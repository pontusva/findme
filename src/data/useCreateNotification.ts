import { gql } from "@apollo/client";
import { useCreateNotificationMutation } from "@/generated/graphql";

gql`
  mutation CreateNotification(
    $userId: String!
    $message: String!
    $senderId: String!
    $showEmail: Boolean!
  ) {
    createNotification(
      userId: $userId
      message: $message
      senderId: $senderId
      showEmail: $showEmail
    ) {
      id
      message
      read
      userId
    }
  }
`;

export const useCreateNotification = () => {
  const [createNotification, { loading, error }] =
    useCreateNotificationMutation({
      refetchQueries: ["Notifications"],
    });

  return { createNotification, loading, error };
};
