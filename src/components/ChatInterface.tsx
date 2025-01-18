import React, { useEffect, useState } from "react";
import ChatButton from "./ChatButton";
import UserList from "./UserList";
import ChatWindow from "./ChatWindow";
import { useMessage } from "@/data/useMessage";
import { useGetChatPartners } from "@/data/useGetChatPartners";
import { useSendMessage } from "@/data/useSendMessage";
import { useAuth } from "@clerk/clerk-react";
import { useGetChatMessages } from "@/data/useGetChatMessages";
import { usePushNotifications } from "@/hooks/usePushNotifications";
interface ChatInterfaceProps {
  receiverId: string | null;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  receiverId,
}: ChatInterfaceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useAuth();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: any[] }>({});
  const { subscription } = usePushNotifications({ userId: selectedUser || "" });
  const getChatId = (userId1: string, userId2: string) => {
    return userId1 < userId2
      ? `${userId1}-${userId2}`
      : `${userId2}-${userId1}`;
  };

  const { data: subscriptionData } = useMessage(
    selectedUser || receiverId || "",
    userId || ""
  );

  const { data: chatMessagesData } = useGetChatMessages(
    selectedUser || receiverId || "",
    userId || ""
  );

  const { data: chatPartnersData } = useGetChatPartners();

  const toggleChat = () => setIsOpen(!isOpen);

  const selectUser = (userId: string) => setSelectedUser(userId);
  const { sendMessage } = useSendMessage();
  const sendMessages = async (text: string) => {
    console.log({ selectedUser, userId, text });
    if (selectedUser) {
      await sendMessage({
        variables: {
          content: text,
          receiverId: selectedUser,
          senderId: userId || "",
        },
      });
    }
    if (subscription) {
      await fetch("http://localhost:3000/push/sendMessageNotification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: userId, // Assuming this is the ID of the sender
          receiverId: selectedUser, // The recipient of the message
          message: text, // The actual message content
          chatId: getChatId(selectedUser || receiverId || "", userId || ""), // The ID of the chat
        }),
      });
    }
  };

  useEffect(() => {
    if (chatMessagesData) {
      const storedMessages = chatMessagesData.getChatMessages || [];
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser || receiverId || ""]: storedMessages, // Initialize with stored messages
      }));
    }
  }, [chatMessagesData, selectedUser, receiverId]); // Add selectedUser and receiverId as dependencies

  useEffect(() => {
    const newMessage = subscriptionData?.message;
    if (newMessage && selectedUser) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedUser]: [
          ...(prevMessages?.[selectedUser] || []), // Ensure it initializes if undefined
          newMessage,
        ],
      }));
    }
  }, [subscriptionData, selectedUser]);

  return (
    <div className="fixed bottom-4 right-4">
      <ChatButton onClick={toggleChat} />
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col">
          {selectedUser === null ? (
            <UserList
              users={chatPartnersData?.getChatPartners || []}
              onSelectUser={selectUser}
            />
          ) : (
            <ChatWindow
              user={
                chatPartnersData?.getChatPartners.find(
                  (u) => u.partnerId === selectedUser
                )!.partner || { name: "Unknown User" }
              }
              userId={userId || ""}
              messages={messages?.[selectedUser] || []}
              onSendMessage={sendMessages}
              onBack={() => setSelectedUser(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
