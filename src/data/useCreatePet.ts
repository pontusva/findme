import { gql } from '@apollo/client'
import { useCreatePetMutation } from '@/generated/graphql'

gql`
  mutation CreatePet(
    $name: String!
    $type: String!
    $ownerId: String!
    $breed: String
    $age: Int
    $gender: String
    $description: String
    $photoUrl: String
    $microchipId: String
  ) {
    createPet(
      name: $name
      type: $type
      ownerId: $ownerId
      breed: $breed
      age: $age
      gender: $gender
      description: $description
      photoUrl: $photoUrl
      microchipId: $microchipId
    ) {
      id
      name
    }
  }
`

export const useCreatePet = () => {
  const [createPet, { loading, error }] =
    useCreatePetMutation()

  return { createPet, loading, error }
}
