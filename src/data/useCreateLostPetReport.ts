import { gql } from '@apollo/client'
import { useCreateLostPetReportMutation } from '@/generated/graphql'

gql`
  mutation CreateLostPetReport(
    $petId: String!
    $reportedBy: String!
    $description: String
    $locationId: String
  ) {
    createLostPetReport(
      petId: $petId
      reportedBy: $reportedBy
      description: $description
      locationId: $locationId
    ) {
      id
      reportedBy
      pet {
        id
        ownerId
      }
    }
  }
`

export const useCreateLostPetReport = () => {
  const [createLostPetReport, { loading, error }] =
    useCreateLostPetReportMutation({
      refetchQueries: ['GetPetsForMap']
    })

  return { createLostPetReport, loading, error }
}
