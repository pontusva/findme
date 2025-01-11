import { gql } from '@apollo/client'
import { useGetLostPetReportQuery } from '@/generated/graphql'

gql`
  query GetLostPetReport($id: String!) {
    getLostPetReport(id: $id) {
      id
      pet {
        id
        ownerId
        owner {
          id
        }
      }
    }
  }
`

export const useGetLostPetReport = (id: string) => {
  const { data, loading, error } = useGetLostPetReportQuery(
    {
      variables: { id }
    }
  )

  return {
    lostPetReport: data?.getLostPetReport,
    loading,
    error
  }
}
