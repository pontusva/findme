import { gql } from '@apollo/client'
import { useCreateLocationMutation } from '@/generated/graphql'
gql`
  mutation CreateLocation(
    $latitude: Float!
    $longitude: Float!
    $address: String
    $foundPetId: String
    $lostReportId: String
  ) {
    createLocation(
      latitude: $latitude
      longitude: $longitude
      address: $address
      foundPetId: $foundPetId
      lostReportId: $lostReportId
    ) {
      address
      id
      latitude
      longitude
    }
  }
`

export const useCreateLocation = () => {
  const [createLocation, { loading, error }] =
    useCreateLocationMutation()

  return { createLocation, loading, error }
}
