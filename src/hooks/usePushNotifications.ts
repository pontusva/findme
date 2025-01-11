import { useState, useEffect } from 'react'

function urlBase64ToUint8Array(
  base64String: string
): Uint8Array {
  const padding = '='.repeat(
    (4 - (base64String.length % 4)) % 4
  )
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function arrayBufferToBase64(
  buffer: ArrayBuffer | null
): string {
  if (!buffer) return ''
  return btoa(
    String.fromCharCode(...new Uint8Array(buffer))
  )
}

export function usePushNotifications({
  userId
}: {
  userId: string
}) {
  const [subscription, setSubscription] =
    useState<PushSubscription | null>(null)
  const [error, setError] = useState<string | null>(null)

  const unsubscribeFromExistingSubscription = async (
    userId: string
  ) => {
    try {
      // Get current subscription from push manager
      const registration = await navigator.serviceWorker
        .ready
      const existingSubscription =
        await registration.pushManager.getSubscription()

      // Unsubscribe from push manager if subscription exists
      if (existingSubscription) {
        await existingSubscription.unsubscribe()
      }

      // Remove subscription from server
      await fetch(
        'http://localhost:3000/push/unsubscribe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId })
        }
      )

      // Clear subscription state
      setSubscription(null)
    } catch (err) {
      console.error('Error unsubscribing:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to unsubscribe'
      )
    }
  }

  const subscribeToNotifications = async (
    userId: string
  ) => {
    try {
      console.log('Attempting to subscribe user:', userId)

      const registration = await navigator.serviceWorker
        .ready

      // Get VAPID key
      const response = await fetch(
        'http://localhost:3000/push/vapidPublicKey'
      )
      const { publicKey } = await response.json()
      console.log('Got VAPID key:', publicKey)

      // Create subscription
      const pushSubscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            urlBase64ToUint8Array(publicKey)
        })
      console.log(
        'Created push subscription:',
        pushSubscription
      )

      // Create subscription object with user ID
      const subscriptionWithUser = {
        userId,
        endpoint: pushSubscription.endpoint,
        keys: {
          p256dh: arrayBufferToBase64(
            pushSubscription.getKey('p256dh')
          ),
          auth: arrayBufferToBase64(
            pushSubscription.getKey('auth')
          )
        }
      }
      console.log(
        'Sending subscription to server:',
        subscriptionWithUser
      )

      // Send to server
      const subscribeResponse = await fetch(
        'http://localhost:3000/push/subscribe',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscriptionWithUser)
        }
      )

      const result = await subscribeResponse.json()
      console.log('Server response:', result)

      // Set the subscription state
      setSubscription(pushSubscription)
    } catch (err) {
      console.error('Subscription error:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to subscribe to notifications'
      )
    }
  }

  const requestNotificationPermission = async (
    userId: string
  ) => {
    try {
      const permission =
        await Notification.requestPermission()
      if (permission === 'granted') {
        await subscribeToNotifications(userId)
      } else {
        setError('Notification permission denied')
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to request permission'
      )
      console.error(
        'Error requesting notification permission:',
        err
      )
    }
  }

  const sendTestNotification = async () => {
    try {
      if (!subscription) {
        throw new Error(
          'No active push notification subscription'
        )
      }

      const response = await fetch(
        'http://localhost:3000/push/send',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subscription,
            title: 'Test Notification',
            body: 'This is a test push notification!',
            userId
          })
        }
      )

      const result = await response.json()
      console.log('Server response:', result)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send test notification'
      )
      console.error('Error sending test notification:', err)
    }
  }

  const checkExistingSubscription = async () => {
    try {
      // First check if we have an active service worker registration
      const registration = await navigator.serviceWorker
        .ready
      const existingSubscription =
        await registration.pushManager.getSubscription()

      if (existingSubscription) {
        setSubscription(existingSubscription)
        return true
      }
      return false
    } catch (err) {
      console.error(
        'Error checking existing subscription:',
        err
      )
      return false
    }
  }

  useEffect(() => {
    if (userId) {
      checkExistingSubscription()
    }
  }, [userId])

  return {
    subscription,
    error,
    requestNotificationPermission,
    unsubscribeFromExistingSubscription,
    sendTestNotification
  }
}
