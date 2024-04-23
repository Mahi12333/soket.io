import React, { useState, useEffect } from 'react'
import Message from './Message';
import ChatInput from './ChatInput';
import UserList from './UserList';
import {io} from 'socket.io-client';


function Chat() {
  const [messages, setMessages] = useState([]);
  console.log(messages)
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  //console.log(socket)

  useEffect(() => {
    const newSocket = io('http://localhost:8008/');
    console.log("error", newSocket);
    setSocket(newSocket);
    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      newSocket.close();
    };
  }, []);


  useEffect(() => {
    if (socket) {
      socket.on('message', (newMessage) => {
        console.log("newMessage",newMessage)
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);


  const sendMessage = (message) => {
    console.log("mmgg", message);
    if (socket && message.trim() !== '') {
      socket.emit('sendMessages', message);
    }
  };

  return (
    <div className="flex">
      <div className="w-3/4">
        <div className="h-screen overflow-y-scroll">
          {/* Display messages */}
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
        </div>
        {/* Input to send message */}
        <ChatInput sendMessage={sendMessage} />
      </div>
      {/* Display list of online users */}
      <div className="w-1/4 bg-gray-200">
        <UserList users={users} />
      </div>
    </div>
  );
}


export default Chat