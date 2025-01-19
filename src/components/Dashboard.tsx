import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNotifications } from "@/data/useNotifications";
import { usePushNotifications } from "../hooks/usePushNotifications";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import ChatInterface from "./ChatInterface";
import { useChat } from "@/context/ChatProvider";
import { useCreateChatPartner } from "@/data/useCreateChatPartner";
import { useGetChatPartners } from "@/data/useGetChatPartners";
import { useGetUserPets } from "@/data/useGetUserPets";
import { Badge } from "./ui/badge";
import { Link } from "react-router";
const Dashboard: React.FC = () => {
  const { user } = useUser();
  const { notifications } = useNotifications();
  const { toggleChat } = useChat();
  const [senderUser, setSenderUser] = useState<string | null>(null);
  const { createChatPartner } = useCreateChatPartner();
  const { subscription, error, requestNotificationPermission } =
    usePushNotifications({ userId: user?.id || "" });
  const { data: chatPartnersData } = useGetChatPartners();

  const { data } = useGetUserPets({
    userId: user?.id || "",
  });

  const handleStartChat = (senderId: string | undefined) => {
    setSenderUser(senderId || "");
    toggleChat(senderId || "");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="mb-4">
        Hello, {user?.firstName}! Here's your pet activity:
      </p>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Updates on your reported pets.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {data?.getUserPets.slice(0, 2).map((pet, index) => (
                <li key={index} className="flex justify-between items-center">
                  <div className="grid grid-cols-2 gap-4 w-[200px]">
                    <span>{pet.name}</span>
                  </div>
                  <div>
                    <Badge
                      variant={
                        pet.lostReports.map((report) =>
                          report.status === "OPEN" ? "default" : "destructive"
                        )[0]
                      }
                    >
                      {pet.lostReports.map((report) => report.status)}
                    </Badge>
                    <span className="text-sm text-muted-foreground ml-2">
                      {/* {pet.lostReports[0].lastSeenDate} */}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              to="/my-pets"
              className="text-sm text-primary hover:underline"
            >
              View all my pets
            </Link>
          </CardFooter>
        </Card>
        <div className="bg-green-100 p-4 rounded-md">
          <h2 className="font-semibold">Recent Searches</h2>
          <p>You haven't performed any searches yet.</p>
        </div>
        <div className="bg-yellow-100 p-4 max-h-80 overflow-y-auto rounded-md">
          <h2 className="font-semibold">Notifications</h2>
          {notifications.length > 0 ? (
            notifications.map((subscription, index) => (
              <Card className="mt-5" key={subscription.id + index}>
                <CardContent className="mt-5">
                  <CardDescription>
                    <p>
                      {subscription.showEmail && subscription.sender?.email}
                    </p>
                  </CardDescription>
                  <p>{subscription.message}</p>
                  <p>{subscription.sender?.name}</p>

                  <Button
                    className="mt-5"
                    onClick={async () => {
                      await createChatPartner({
                        variables: {
                          userId: user?.id || "",
                          partnerId: subscription.senderId || "",
                        },
                      });

                      await createChatPartner({
                        variables: {
                          userId: subscription.senderId || "",
                          partnerId: user?.id || "",
                        },
                      });
                      handleStartChat(subscription.senderId);
                    }}
                    disabled={chatPartnersData?.getChatPartners.some(
                      (partner) => partner.userId === subscription.userId
                    )}
                  >
                    Start chat
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p>No notifications at this time.</p>
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

      <ChatInterface receiverId={senderUser} />
    </div>
  );
};

export default Dashboard;
