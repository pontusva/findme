import { gql } from '@apollo/client'
import { useNotificationsQuery } from '@/generated/graphql'
import { useAuth } from '@clerk/clerk-react'

gql`
  query Notifications($userId: String!) {
    notifications(userId: $userId) {
      id
      message
      userId
      senderId
      read
    }
  }
`

export const useNotifications = () => {
  const { userId } = useAuth()
  const { data, loading, error } = useNotificationsQuery({
    variables: {
      userId: userId || ''
    },
    skip: !userId
  })

  return { data, loading, error }
}
