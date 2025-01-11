import { gql } from '@apollo/client'
import { useCreateNotificationMutation } from '@/generated/graphql'

gql`
  mutation CreateNotification(
    $userId: String!
    $name: String!
    $email: String!
    $phone: String!
    $message: String!
  ) {
    createNotification(
      userId: $userId
      name: $name
      email: $email
      phone: $phone
      message: $message
    ) {
      id
      message
      read
      userId
    }
  }
`

export const useCreateNotification = () => {
  const [createNotification, { loading, error }] =
    useCreateNotificationMutation()

  return { createNotification, loading, error }
}
