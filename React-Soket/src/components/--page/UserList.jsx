import React from 'react'

function UserList({users}) {
  return (
    <div>
      <h2 className="text-lg font-bold p-2">Online Users</h2>
      <ul className="list-none p-2">
        {/* Display list of online users */}
        {users.map((user, index) => (
          <li key={index} className="p-2">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList