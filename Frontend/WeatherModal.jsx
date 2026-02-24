// import React, { useState } from "react";
// import { MapPin, Briefcase } from "lucide-react";
// import { useAuth } from "../../contexts/AuthContext";
// import ChatBox from "../Chat/ChatBox";

// const ExpertConnectModal = () => {
//   const { currentUser } = useAuth();
//   const [selectedExpert, setSelectedExpert] = useState(null);

//   const experts = [
//     {
//       name: "Dr. Ramesh Kumar",
//       email: "ramesh.kumar@agrihelp.com",
//       expertise: ["Banana", "Leaf Spot", "Pesticides"],
//       experience: 12,
//       location: "Thrissur, Kerala",
//       available: true,
//       avatar: "/images/default-avatar-1.jpg",
//     },
//     {
//       name: "Dr. Anitha Menon",
//       email: "anitha.menon@agrihelp.com",
//       expertise: ["Paddy", "Soil Fertility", "Water Management"],
//       experience: 8,
//       location: "Palakkad, Kerala",
//       available: true,
//       avatar: "/images/default-avatar-2.jpg",
//     },
//     {
//       name: "Dr. Suresh Patil",
//       email: "suresh.patil@agrihelp.com",
//       expertise: ["Sugarcane", "Organic Farming"],
//       experience: 15,
//       location: "Pune, Maharashtra",
//       available: true,
//       avatar: "/images/default-avatar-3.jpg",
//     },
//   ];

//   const getStatusColor = (isAvailable) =>
//     isAvailable ? "bg-green-500" : "bg-gray-400";

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//         Expert Connect
//       </h2>
//       <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//         Connect with agricultural experts for guidance
//       </p>

//       <div className="space-y-4">
//         {experts.map((expert, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:shadow-lg"
//           >
//             {/* Avatar + Status */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <img
//                   src={expert.avatar}
//                   alt={expert.name}
//                   className="h-16 w-16 rounded-full object-cover"
//                 />
//                 <span
//                   className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-700 ${getStatusColor(
//                     expert.available
//                   )}`}
//                 ></span>
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                   {expert.name}
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {expert.expertise.map((item, i) => (
//                     <span
//                       key={i}
//                       className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-200"
//                     >
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
//                   <div className="flex items-center space-x-1">
//                     <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                     <span>{expert.location}</span>
//                   </div>
//                   <div className="flex items-center space-x-1 mt-1 md:mt-0">
//                     <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                     <span>{expert.experience} years</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="mt-4 md:mt-0 flex space-x-2">
//               <button
//                 onClick={() => setSelectedExpert(expert)}
//                 className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center
//                   ${
//                     expert.available
//                       ? "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                 disabled={!expert.available}
//               >
//                 💬 Message
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Modal */}
//       {selectedExpert && (
//         <ChatBox
//           expert={selectedExpert}
//           currentUser={currentUser}
//           onClose={() => setSelectedExpert(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default ExpertConnectModal;











// import React, { useState } from "react";
// import { MapPin, Briefcase } from "lucide-react";
// import { useAuth } from "../../contexts/AuthContext";
// import ChatBox from "../Chat/ChatBox";

// const ExpertConnectModal = () => {
//   const { currentUser } = useAuth();
//   const [selectedExpert, setSelectedExpert] = useState(null);

//   const experts = [
//     {
//       name: "Dr. Ramesh Kumar",
//       email: "ramesh.kumar@agrihelp.com",
//       expertise: ["Banana", "Leaf Spot", "Pesticides"],
//       experience: 12,
//       location: "Thrissur, Kerala",
//       available: true,
//       avatar: "/images/default-avatar-1.jpg",
//     },
//     {
//       name: "Dr. Anitha Menon",
//       email: "anitha.menon@agrihelp.com",
//       expertise: ["Paddy", "Soil Fertility", "Water Management"],
//       experience: 8,
//       location: "Palakkad, Kerala",
//       available: true,
//       avatar: "/images/default-avatar-2.jpg",
//     },
//     {
//       name: "Dr. Suresh Patil",
//       email: "suresh.patil@agrihelp.com",
//       expertise: ["Sugarcane", "Organic Farming"],
//       experience: 15,
//       location: "Pune, Maharashtra",
//       available: true,
//       avatar: "/images/default-avatar-3.jpg",
//     },
//   ];

//   const getStatusColor = (isAvailable) =>
//     isAvailable ? "bg-green-500" : "bg-gray-400";

//   return (
//     <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative">
//       <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//         Expert Connect
//       </h2>
//       <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//         Connect with agricultural experts for guidance
//       </p>

//       <div className="space-y-4">
//         {experts.map((expert, index) => (
//           <div
//             key={index}
//             className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:shadow-lg"
//           >
//             {/* Avatar + Info */}
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <img
//                   src={expert.avatar}
//                   alt={expert.name}
//                   className="h-16 w-16 rounded-full object-cover"
//                 />
//                 <span
//                   className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-700 ${getStatusColor(
//                     expert.available
//                   )}`}
//                 ></span>
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                   {expert.name}
//                 </h3>

//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {expert.expertise.map((item, i) => (
//                     <span
//                       key={i}
//                       className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-200"
//                     >
//                       {item}
//                     </span>
//                   ))}
//                 </div>

//                 <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
//                   <div className="flex items-center space-x-1">
//                     <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                     <span>{expert.location}</span>
//                   </div>
//                   <div className="flex items-center space-x-1 mt-1 md:mt-0">
//                     <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                     <span>{expert.experience} years</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Message Button */}
//             <div className="mt-4 md:mt-0 flex space-x-2">
//               <button
//                 onClick={() => setSelectedExpert(expert)}
//                 className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center ${
//                   expert.available
//                     ? "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 }`}
//                 disabled={!expert.available}
//               >
//                 💬 Message
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ✅ Chat Overlay Modal */}
//       {selectedExpert && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-900 w-full max-w-3xl h-[80vh] rounded-2xl shadow-xl relative">
//             <button
//               onClick={() => setSelectedExpert(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white text-xl font-bold"
//             >
//               ×
//             </button>

//             {/* ChatBox Container */}
//             <div className="h-full pt-10">
//               <ChatBox
//                 expert={selectedExpert}
//                 currentUser={currentUser}
//                 onClose={() => setSelectedExpert(null)}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExpertConnectModal;


import React, { useState } from "react";
import { MapPin, Briefcase } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import ChatBox from "../Chat/ChatBox";
import { ArrowLeft } from "lucide-react";
import {  Mail, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ExpertConnectModal = () => {
  const { currentUser } = useAuth();
  const userEmail = currentUser.email;
  const userName = currentUser.displayName;
  const [selectedExpert, setSelectedExpert] = useState(null);
  const experts = [
    {
      name: "Dr. Ramesh Kumar",
      email: "krishnannair1231@gmail.com",
      expertise: ["Banana", "Leaf Spot", "Pesticides"],
      experience: 12,
      location: "Thrissur, Kerala",
      available: true,
      avatar: "https://cdn-icons-png.flaticon.com/512/9815/9815472.png",
    },
    {
      name: "Dr. Anitha Menon",
      email: "anitha.menon@agrihelp.com",
      expertise: ["Paddy", "Soil Fertility", "Water Management"],
      experience: 8,
      location: "Palakkad, Kerala",
      available: true,
      avatar: "https://cdn-icons-png.flaticon.com/512/9815/9815472.png",
    },
    {
      name: "Dr. Suresh Patil",
      email: "suresh.patil@agrihelp.com",
      expertise: ["Sugarcane", "Organic Farming"],
      experience: 15,
      location: "Pune, Maharashtra",  
      available: true,
      avatar: "https://cdn-icons-png.flaticon.com/512/9815/9815472.png",
    },
  ];
  
  const handleSendEmail = async (expert) => {
    try {
      const loadingToast = toast.loading("Sending Email...");
      const response = await fetch("http://localhost:5001/api/experts", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            expertEmail: expert.email,
            userName,
            userEmail,
            userIssue:
              "Hello, Krishi sOfficer. I’ve noticed some dark spots appearing on the leaves of my rice plants, and they seem to be spreading quickly. The leaves are turning yellow and dying. What could be the problem, and how can I treat it ?",
          }),
        });
  
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            errorData = await response.text();
          }
          console.error("Failed to send email:", errorData);
          toast.error(`Failed: ${errorData.error || errorData}`);
          return;
        }
  
        toast.success("Email Sent Successfully ✅",{
          id:loadingToast,
        });
      } catch (error) {
        console.error("Error sending email:", error);
        toast.error("Network error. Please check your server.");
      }
    };

  const getStatusColor = (isAvailable) =>
    isAvailable ? "bg-green-500" : "bg-gray-400";

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative">
      <Toaster />
      {!selectedExpert ? (
        // ---------- Dashboard / Experts List ----------
        <>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Expert Connect
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Connect with agricultural experts for guidance
          </p>

          <div className="space-y-4">
            {experts.map((expert, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <span
                      className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-700 ${getStatusColor(
                        expert.available
                      )}`}
                    ></span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {expert.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {expert.expertise.map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-3 py-1 text-xs font-medium text-blue-800 dark:text-blue-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{expert.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1 md:mt-0">
                        <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>{expert.experience} years</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex space-x-2">
                  <button
                    onClick={() => setSelectedExpert(expert)}
                    className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors flex items-center justify-center ${
                      expert.available
                        ? "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!expert.available}
                  >
                    💬 Message
                  </button>
                                <button
                                  onClick={() => handleSendEmail(expert)}
                                  className="py-2 px-4 rounded-xl text-sm font-medium bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center"
                                >
                                  <Mail className="h-4 w-4 mr-0.5" />
                                
                                </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // ---------- Full-Page Chat ----------
        <div className="flex flex-col h-[90vh] w-full">
          {/* Back Button */}
          <button
            onClick={() => setSelectedExpert(null)}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold mb-2"
          >
            <ArrowLeft /> Back to Experts
          </button>

          {/* ChatBox */}
          <div className="flex-1">
            <ChatBox expert={selectedExpert} currentUser={currentUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertConnectModal;
