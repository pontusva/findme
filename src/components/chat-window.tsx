import { useState } from "react";
import { MessageCircle, Send, X, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Message = {
  id: string;
  text: string;
  sender: User;
  timestamp: Date;
};

const initialUsers: User[] = [
  { id: "1", name: "Alice", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Bob", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Charlie", avatar: "/placeholder.svg?height=40&width=40" },
  { id: "bot", name: "ChatBot", avatar: "/placeholder.svg?height=40&width=40" },
];

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! How can I help you today?",
    sender: initialUsers[3],
    timestamp: new Date(),
  },
];

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [users] = useState<User[]>(initialUsers);
  const [inputText, setInputText] = useState("");
  const [currentUser, setCurrentUser] = useState<User>(users[0]);

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleUserList = () => setShowUserList(!showUserList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: currentUser,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputText("");
      // Simulate a bot response
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! We'll get back to you soon.",
          sender: users[3], // Bot user
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button
          onClick={toggleChat}
          size="icon"
          className="rounded-full shadow-lg"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      {isOpen && (
        <div className="bg-background rounded-lg shadow-xl flex flex-col w-80 h-[32rem] max-w-full max-h-[calc(100vh-2rem)]">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Chat</h2>
            <div className="flex items-center space-x-2">
              <Button
                onClick={toggleUserList}
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Toggle user list"
              >
                <Users className="h-5 w-5" />
              </Button>
              <Button
                onClick={toggleChat}
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex-grow flex overflow-hidden">
            {showUserList && (
              <ScrollArea className="w-36 border-r p-4">
                <h3 className="font-semibold mb-2">Users</h3>
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setCurrentUser(user)}
                    className={`flex items-center space-x-2 w-full p-2 rounded-lg transition-colors ${
                      currentUser.id === user.id
                        ? "bg-accent"
                        : "hover:bg-accent"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </button>
                ))}
              </ScrollArea>
            )}
            <ScrollArea
              className={`flex-grow p-4 space-y-4 ${
                showUserList ? "w-1/3" : "w-full"
              }`}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender.id === currentUser.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender.id === currentUser.id
                        ? "flex-row-reverse space-x-reverse"
                        : "flex-row"
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={message.sender.avatar}
                        alt={message.sender.name}
                      />
                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-2 ${
                        message.sender.id === currentUser.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        {message.sender.name}
                      </p>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <form onSubmit={handleSubmit} className="border-t p-4 flex space-x-2">
            <Input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow"
            />
            <Button type="submit" size="icon" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
