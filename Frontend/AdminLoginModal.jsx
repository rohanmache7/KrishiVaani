// src/components/Admin/AdminChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useSocket } from '../../contexts/SocketContext';

const AdminChat = ({ roomName, adminName, onClose }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', { room: roomName, userName: adminName, userEmail: 'admin@example.com' });

    const handleReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket, roomName, adminName]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const msgData = {
      room: roomName,
      sender: adminName,
      senderEmail: 'admin@example.com',
      message: input,
      time: new Date().toISOString(),
    };

    socket.emit('sendMessage', msgData);
    setMessages((prev) => [...prev, msgData]);
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg flex flex-col">
      <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-t-xl">
        <h3 className="font-bold text-gray-900 dark:text-white">{roomName}</h3>
        <button onClick={onClose}><X className="h-5 w-5 text-gray-600 dark:text-gray-300" /></button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-xl max-w-[80%] ${msg.senderEmail === 'admin@example.com' ? 'bg-green-200 dark:bg-green-600 self-end' : 'bg-gray-200 dark:bg-gray-700 self-start'}`}
          >
            <span className="text-xs font-semibold">{msg.sender}</span>
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex p-2 space-x-2 border-t border-gray-300 dark:border-gray-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AdminChat;
