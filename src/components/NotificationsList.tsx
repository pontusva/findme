import { useNotifications, PushMessage } from '../context/NotificationsContext'

export function NotificationsList() {
  const { messages, clearMessages } = useNotifications()

  if (messages.length === 0) {
    return <p>No notifications yet</p>
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <div className="notifications-list">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <button onClick={clearMessages}>Clear All</button>
      </div>
      <div className="notifications-container">
        {messages.map((message: PushMessage) => (
          <div key={message.id} className="notification-item">
            <h3>{message.title || 'No Title'}</h3>
            <p>{message.body || 'No Message'}</p>
            <small>Received at: {formatTime(message.timestamp)}</small>
          </div>
        ))}
      </div>

      <style>{`
        .notifications-list {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
        }

        .notifications-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .notification-item {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
          background: #f9f9f9;
        }

        .notification-item h3 {
          margin: 0 0 10px 0;
        }

        .notification-item p {
          margin: 0 0 10px 0;
        }

        .notification-item small {
          color: #666;
        }
      `}</style>
    </div>
  )
} 