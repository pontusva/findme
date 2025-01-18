import { gql } from "@apollo/client";
import { useCreateChatPartnerMutation } from "@/generated/graphql";
gql`
  mutation CreateChatPartner($userId: String!, $partnerId: String!) {
    createChatPartner(userId: $userId, partnerId: $partnerId) {
      partnerId
      userId
    }
  }
`;

export const useCreateChatPartner = () => {
  const [createChatPartner, { loading, error }] =
    useCreateChatPartnerMutation();
  return { createChatPartner, loading, error };
};
