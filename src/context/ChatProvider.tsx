// src/context/ChatContext.tsx
import { createContext, useContext, useState } from "react";

type ChatContextType = {
  openChat: { isOpen: boolean; userId: string | null };
  toggleChat: (userId: string | null) => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }) => {
  const [openChat, setOpenChat] = useState({ isOpen: false, userId: null });

  const toggleChat = (userId: string | null) => {
    console.log("Toggling chat for user:", userId);
    setOpenChat((prev) => {
      const newState = {
        isOpen: true, // Always open the chat when toggled
        userId: userId || "",
      };
      console.log("New chat state:", newState);
      return newState;
    });
  };
  console.log(openChat.isOpen, "openChat");
  return (
    <ChatContext.Provider value={{ openChat, toggleChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};
