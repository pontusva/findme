import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNotifications } from "@/data/useNotifications";
import { usePushNotifications } from "../hooks/usePushNotifications";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const { notifications } = useNotifications();

  const { subscription, error, requestNotificationPermission } =
    usePushNotifications({ userId: user?.id || "" });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="mb-4">
        Hello, {user?.firstName}! Here's your pet activity:
      </p>
      <div className="space-y-4">
        <div className="bg-blue-100 p-4 rounded-md">
          <h2 className="font-semibold">Your Reported Pets</h2>
          <p>You have no currently reported lost pets.</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md">
          <h2 className="font-semibold">Recent Searches</h2>
          <p>You haven't performed any searches yet.</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-md">
          <h2 className="font-semibold">Subscriptions</h2>
          {notifications.length > 0 ? (
            notifications.map((subscription, index) => (
              <div key={subscription.id + index}>
                <p>{subscription.id}</p>
                <p>{subscription.message}</p>
                <p>{subscription.sender?.name}</p>
                <p>{subscription.sender?.email}</p>
              </div>
            ))
          ) : (
            <p>No active subscriptions at this time.</p>
          )}
        </div>
      </div>

      {!subscription && (
        <button
          onClick={() => requestNotificationPermission(user?.id || "")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Enable Push Notifications
        </button>
      )}

      {error && <p className="text-red-500">Error: {error}</p>}

      {subscription && (
        <p className="text-green-500">Push notifications enabled!</p>
      )}
    </div>
  );
};

export default Dashboard;
