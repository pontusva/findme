import { gql } from '@apollo/client'
import { useGetPetQuery } from '@/generated/graphql'

interface GetPetProps {
  getPetId: string
}

gql`
  query GetPet($getPetId: String!) {
    getPet(id: $getPetId) {
      type
      name
      breed
      age
      photoUrl
      description
      owner {
        name
        id
        email
      }
    }
  }
`

export const useGetPet = ({ getPetId }: GetPetProps) => {
  const { data, loading, error } = useGetPetQuery({
    variables: { getPetId }
  })

  return { data, loading, error }
}
