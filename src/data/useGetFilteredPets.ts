import { gql } from '@apollo/client'
import { useGetFilteredPetsQuery } from '@/generated/graphql'

gql`
  query GetFilteredPets($searchTerm: String) {
    getFilteredPets(searchTerm: $searchTerm) {
      id # Lost pet report ID
      status
      reportedBy
      location {
        id
        address
      }
      pet {
        id
        name
        type
        breed
        photoUrl
        owner {
          id
          name
          email
        }
      }
    }
  }
`

export const useGetFilteredPets = (variables: {
  searchTerm: string
}) => {
  const { data, loading, error } = useGetFilteredPetsQuery({
    variables
  })

  return { data, loading, error }
}
