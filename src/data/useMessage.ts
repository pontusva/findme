import { gql } from "@apollo/client";
import { useMessageSubscription } from "@/generated/graphql";

gql`
  subscription Message($chatId: String!) {
    message(chatId: $chatId) {
      id
      content
      senderId
    }
  }
`;

export const useMessage = (receiverId: string, senderId: string) => {
  const getChatId = (userId1: string, userId2: string) => {
    return userId1 < userId2
      ? `${userId1}-${userId2}`
      : `${userId2}-${userId1}`;
  };
  const { data, loading, error } = useMessageSubscription({
    variables: { chatId: getChatId(receiverId, senderId) },
    skip: !receiverId && !senderId,
  });

  return { data, loading, error };
};
