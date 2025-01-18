import React from "react";
import { ChatPartner } from "@/data/useGetChatPartners";

interface UserListProps {
  users: ChatPartner[];
  onSelectUser: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSelectUser }) => {
  console.log(users);
  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-xl font-bold p-4 border-b">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.partnerId}
            onClick={() => onSelectUser(user.partnerId)}
            className="p-4 hover:bg-gray-100 cursor-pointer"
          >
            {user.partner.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
