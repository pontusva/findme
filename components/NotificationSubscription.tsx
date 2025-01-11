import { requestNotificationPermission } from '../src/firebase'

export async function subscribeToNotifications() {
  try {
    const fcmToken = await requestNotificationPermission()

    // Send the FCM token to your server
    await fetch('http://localhost:3000/send/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: fcmToken })
    })

    console.log('Successfully subscribed to notifications')
  } catch (error) {
    console.error(
      'Error subscribing to notifications:',
      error
    )
  }
}
