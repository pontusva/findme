import { gql } from "@apollo/client";
import { useSendMessageMutation } from "@/generated/graphql";
gql`
  mutation SendMessage(
    $content: String!
    $receiverId: String!
    $senderId: String!
  ) {
    sendMessage(
      content: $content
      receiverId: $receiverId
      senderId: $senderId
    ) {
      content
      id
      senderId
    }
  }
`;

export const useSendMessage = () => {
  const [sendMessage, { loading, error }] = useSendMessageMutation({
    refetchQueries: ["GetChatMessages"],
  });
  return { sendMessage, loading, error };
};
