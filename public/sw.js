self.addEventListener('install', (event) => {
  console.log('Service Worker installing.')
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.')
})

self.addEventListener('push', (event) => {
  console.log('Push event received in Firefox:', event)

  if (!event.data) {
    console.log('This push event has no data.')
    return
  }

  try {
    // Log raw data first
    console.log('Raw push data:', event.data.text())

    const data = event.data.json()
    console.log('Parsed push data:', data)

    const options = {
      body: data.body,
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now()
      },
      // Add a tag to prevent duplicate notifications
      tag: 'push-notification-' + Date.now()
    }

    console.log(
      'Showing notification with options:',
      options
    )

    event.waitUntil(
      self.registration
        .showNotification(data.title, options)
        .then(() =>
          console.log('Notification shown successfully')
        )
        .catch((error) =>
          console.error(
            'Error showing notification:',
            error
          )
        )
    )
  } catch (error) {
    console.error('Error processing push event:', error)
  }
})
