import { useGetAllLostPetsQuery } from '@/generated/graphql'
import { gql } from '@apollo/client'

gql`
  query GetAllLostPets {
    getAllLostPets {
      id
      location {
        address
        id
      }
      status
      pet {
        age
        breed
        description
        gender
        id
        name
        type
        photoUrl
        owner {
          email
          id
          name
        }
      }
    }
  }
`

export const useGetAllLostPets = () => {
  const { data, loading, error } = useGetAllLostPetsQuery()
  return { data, loading, error }
}

export type LostPet = NonNullable<
  ReturnType<typeof useGetAllLostPetsQuery>['data']
>
