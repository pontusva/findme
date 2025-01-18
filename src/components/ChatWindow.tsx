import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  receiverId: string;
  senderId: string;
  content: string;
}

interface ChatWindowProps {
  user: { name: string };
  messages: Message[];
  onSendMessage: (text: string) => void;
  onBack: () => void;
  userId: string;
}

const ChatWindowNew: React.FC<ChatWindowProps> = ({
  user,
  messages,
  onSendMessage,
  onBack,
  userId,
}) => {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  console.log(user);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center">
        <button onClick={onBack} className="mr-2 text-blue-500">
          &larr;
        </button>
        <h2 className="text-xl font-bold">{user?.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages &&
          messages.map((message, index) => (
            <div
              key={message.id + index}
              className={`mb-2 flex ${
                message.senderId === userId ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`inline-block p-2 max-w-xs rounded-lg ${
                  message.senderId === userId
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                } overflow-wrap break-word break-all`}
              >
                {message.content}
              </span>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend}>
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 border rounded-l-lg p-2"
            placeholder="Type a message..."
          />
          <button className="bg-blue-500 text-white px-4 rounded-r-lg">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindowNew;
