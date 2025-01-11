export async function checkAndRenewSubscription() {
  try {
    if (!('serviceWorker' in navigator)) {
      console.error('Service Worker not supported')
      return null
    }

    // Wait for the service worker to be ready
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    )
    const registration = await navigator.serviceWorker.ready
    console.log('Service Worker ready')

    let subscription =
      await registration.pushManager.getSubscription()

    if (!subscription) {
      const response = await fetch(
        'http://localhost:3000/push/vapidPublicKey'
      )
      const { publicKey } = await response.json()
      const convertedVapidKey =
        urlBase64ToUint8Array(publicKey)

      subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        })

      await fetch('http://localhost:3000/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      })
    }

    return subscription
  } catch (error) {
    console.error('Service Worker error:', error)
    throw error
  }
}

function urlBase64ToUint8Array(base64String: string) {
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
