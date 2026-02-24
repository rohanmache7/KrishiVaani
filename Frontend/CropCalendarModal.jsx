// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const ChatBox = ({ currentUser }) => {
//   // Hardcoded expert + farmer
//   const expertName = "Dr Ramesh Kumar";
//   const expertEmail = "rohanmache7@gmail.com";

//   const farmerName = "Rohan";
//   const farmerEmail = "rohanmache1976@gmail.com";

//   // Who is currently logged in? (pass either "expert" or "farmer" as prop)
//   const currentUserEmail =
//     currentUser === "expert" ? expertEmail : farmerEmail;

//   const [messages, setMessages] = useState([]);
//   const [newMsg, setNewMsg] = useState("");
//   const messagesEndRef = useRef(null);

//   // ✅ Always generate the same room ID
//   const roomId =
//     expertEmail < farmerEmail
//       ? `${expertEmail}-${farmerEmail}`
//       : `${farmerEmail}-${expertEmail}`;

//   // Create socket connection
//   const socket = useRef(io("http://localhost:5001"));

//   useEffect(() => {
//     const s = socket.current;

//     // Join room once connected
//     s.emit("joinRoom", { roomId });

//     // Listen for messages
//     s.on("receiveMessage", (msgData) => {
//       if (msgData.roomId === roomId) {
//         setMessages((prev) => [...prev, msgData]);
//       }
//     });

//     return () => {
//       s.off("receiveMessage");
//     };
//   }, [roomId]);

//   // Send message
//   const sendMessage = () => {
//     if (!newMsg.trim()) return;

//     const msgData = {
//       roomId,
//       message: newMsg,
//       sender: currentUserEmail,
//     };

//     socket.current.emit("sendMessage", msgData);
//     setMessages((prev) => [...prev, msgData]);
//     setNewMsg("");
//   };

//   // Scroll to latest
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-full border rounded-lg p-4 bg-white">
//       <h3 className="font-bold text-gray-800 mb-2">
//         Chat: {expertName} & {farmerName}
//       </h3>
//       <div className="flex-1 overflow-y-auto mb-2">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`my-1 p-2 rounded ${
//               msg.sender === currentUserEmail
//                 ? "bg-green-100 self-end"
//                 : "bg-gray-200 self-start"
//             }`}
//           >
//             <strong>
//               {msg.sender === expertEmail ? expertName : farmerName}:
//             </strong>{" "}
//             {msg.message}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 border rounded-l px-2 py-1"
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-green-500 text-white px-4 py-1 rounded-r hover:bg-green-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

//try--------------------------------------------------------------------


import React, { useState, useEffect, useRef } from "react";
import { Send, Users, Mic } from "lucide-react";
import io from "socket.io-client";
import dotenv from 'dotenv';
dotenv.config();

// Connect to backend server
const socket = io("http://localhost:5001");

const ChatBox = ({ currentUser }) => {
  // Hardcoded expert + farmer
  const expertName = "Dr Ramesh Kumar";
  const expertEmail = "rohanmache@gmail.com";

  const farmerName = "Krishnan Nair";
  const farmerEmail = "rohanmache1976@gmail.com";

  // Determine current user email
  const currentUserEmail =
    currentUser === "expert" ? expertEmail : farmerEmail;

  // --- State ---
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const messagesEndRef = useRef(null);

  // Generate same room ID
  const roomId =
    expertEmail < farmerEmail
      ? `${expertEmail}-${farmerEmail}`
      : `${farmerEmail}-${expertEmail}`;

  // --- Socket setup ---
  useEffect(() => {
    socket.emit("joinRoom", { roomId });
    socket.on("receiveMessage", (msgData) => {
      if (msgData.roomId === roomId) {
        setMessages((prev) => [...prev, msgData]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [roomId]);

  // --- Send text message ---
  const sendMessage = () => {
    if (!newMsg.trim()) return;

    const msgData = {
      roomId,
      message: newMsg,
      sender: currentUserEmail,
    };

    socket.emit("sendMessage", msgData);
    // setMessages((prev) => [...prev, msgData]);
    setNewMsg("");
  };

 // --- Recording functions ---
const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
      sendAudioMessage(audioBlob);
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  } catch (err) {
    console.error("Microphone access denied:", err);
    alert("Please allow microphone access!");
  }
};

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    setIsRecording(false);
  }
};

const toggleRecording = () => {
  if (isRecording) stopRecording();
  else startRecording();
};


  const sendAudioMessage = (audioBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = () => {
      const base64Audio = reader.result;
      const msgData = { roomId, sender: currentUserEmail, audio: base64Audio };
      socket.emit("sendMessage", msgData);
      // setMessages((prev) => [...prev, msgData]);
    };
  };

  // --- Auto scroll ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-gray-100 shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">
               {/* {farmerName}  */}
               Dr Ramesh Kumar & Krishnan Nair
            </h3>
            <p className="text-green-100 text-sm">Expert-Farmer Consultation</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white to-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">No messages yet</p>
        )}

        {messages.map((msg, idx) => {
          const isCurrentUser = msg.sender === currentUserEmail;
          const isAudio = !!msg.audio;

          return (
            <div
              key={idx}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md ${
                  isCurrentUser
                    ? "bg-green-500 text-white rounded-br-md"
                    : "bg-blue-500 text-white rounded-bl-md"
                }`}
              >
                {isAudio ? (
                  <audio controls src={msg.audio}></audio>
                ) : (
                  <p className="text-sm">{msg.message}</p>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4 flex gap-2">
        <textarea
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          rows="1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!newMsg.trim()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
        >
          <Send className="w-5 h-5" />
        </button>

        {/* Mic Button */}
        <button
          onClick={toggleRecording}
          className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full ${
            isRecording ? "bg-red-500 animate-pulse" : ""
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
