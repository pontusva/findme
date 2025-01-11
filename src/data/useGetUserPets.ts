import { gql } from '@apollo/client'
import { useGetUserPetsQuery } from '@/generated/graphql'

interface UseGetUserPetsProps {
  userId: string
}

gql`
  query getUserPets($userId: String!) {
    getUserPets(userId: $userId) {
      type
      lostReports {
        status
      }
      id
      name
      photoUrl
    }
  }
`

export const useGetUserPets = ({
  userId
}: UseGetUserPetsProps) => {
  const { data, loading, error } = useGetUserPetsQuery({
    variables: {
      userId
    }
  })
  return { data, loading, error }
}

export type UserPets = NonNullable<
  ReturnType<typeof useGetUserPets>['data']
>['getUserPets']
