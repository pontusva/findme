import { gql } from '@apollo/client'
import { useGetAllUsersQuery } from '@/generated/graphql'

gql`
  query GetAllUsers {
    getAllUsers {
      email
      id
    }
  }
`

export const useGetAllUsers = () => {
  const { data, loading, error } = useGetAllUsersQuery()
  console.log(data)
  return { data, loading, error }
}
