import React from 'react'

function Message({message}) {
  return (
    <div className="p-2">
      <div className="bg-gray-100 rounded-md p-2">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message