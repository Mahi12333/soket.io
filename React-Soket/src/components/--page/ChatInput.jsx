import React, { useState } from 'react';

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  // Function to handle message input
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Function to handle message send
  const handleSend = () => {
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex justify-between p-2 bg-gray-200">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        className="w-full rounded-md p-2"
      />
      <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
