import { gql } from '@apollo/client'
import { useGetPetsForMapQuery } from '@/generated/graphql'

gql`
  query GetPetsForMap {
    getPets {
      lostReports {
        location {
          latitude
          longitude
        }
        pet {
          id
          name
          type
          photoUrl
          ownerId
        }
      }
    }
  }
`

export const useGetPetsForMap = () => {
  const { data, loading, error } = useGetPetsForMapQuery()

  const lostPets =
    data?.getPets
      .filter((pet) => pet.lostReports.length > 0)
      .flatMap((pet) => pet.lostReports) || []

  const lostPetsWithDetails =
    lostPets?.map((pet) => ({
      ...pet,
      pet: pet.pet
    })) || []

  return {
    data,
    loading,
    error,
    lostPets,
    lostPetsWithDetails
  }
}

export type LostPets = NonNullable<
  ReturnType<typeof useGetPetsForMap>['lostPets']
>
export type LostPetsWithDetails = NonNullable<
  ReturnType<typeof useGetPetsForMap>['lostPetsWithDetails']
>
