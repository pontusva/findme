import { gql } from "@apollo/client";
import { useGetChatMessagesQuery } from "@/generated/graphql";

gql`
  query GetChatMessages($chatId: String!) {
    getChatMessages(chatId: $chatId) {
      content
      id
      senderId
    }
  }
`;

export const useGetChatMessages = (receiverId: string, senderId: string) => {
  const getChatId = (userId1: string, userId2: string) => {
    return userId1 < userId2
      ? `${userId1}-${userId2}`
      : `${userId2}-${userId1}`;
  };

  const { data, loading, error } = useGetChatMessagesQuery({
    variables: { chatId: getChatId(receiverId, senderId) },
  });
  return { data, loading, error };
};
