import { gql } from "@apollo/client";
import {
  GetChatPartnersQuery,
  useGetChatPartnersQuery,
} from "@/generated/graphql";
import { useUser } from "@clerk/clerk-react";

gql`
  query GetChatPartners($userId: String!) {
    getChatPartners(userId: $userId) {
      partner {
        name
      }
      user {
        name
      }
      partnerId
      userId
    }
  }
`;

export const useGetChatPartners = () => {
  const { user } = useUser();
  const { data, loading, error } = useGetChatPartnersQuery({
    variables: { userId: user?.id || "" },
  });

  return { data, loading, error };
};

export type ChatPartner = NonNullable<
  GetChatPartnersQuery["getChatPartners"]
>[number];
