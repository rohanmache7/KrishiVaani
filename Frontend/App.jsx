// import React from "react";
// import { useAuth } from "./contexts/AuthContext";
// import { LogOut } from "lucide-react";
// import ChatBox from "./components/Chat/ChatBox"; // Hardcoded ChatBox

// const AdminDashboard = () => {
//   const { currentUser, logout } = useAuth();

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//           <h1 className="text-xl font-bold text-gray-800">
//             KrishiVaani Expert Panel
//           </h1>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-gray-600">
//               Welcome, {currentUser?.displayName || currentUser?.email}
//             </span>
//             <button
//               onClick={logout}
//               className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 flex items-center"
//             >
//               <LogOut className="inline mr-1" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex flex-1 max-w-7xl mx-auto mt-4 gap-4 px-4 sm:px-6 lg:px-8">
//         {/* Chat Box */}
//         <div className="flex-1 h-[70vh]">
//           {/* Hardcoded Expert side */}
//           <ChatBox currentUser="expert" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;








// import React, { useState } from "react";
// import { useAuth } from "./contexts/AuthContext";
// import { LogOut, ArrowLeft } from "lucide-react";
// import ChatBox from "./components/Chat/ChatBox"; // ✅ ensure path is correct

// const AdminDashboard = () => {
//   const { currentUser, logout } = useAuth();
//   const [showChat, setShowChat] = useState(false); // 👈 toggles dashboard/chat view

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
//           <h1 className="text-xl font-bold text-gray-800">
//             KrishiVaani Expert Panel
//           </h1>

//           <div className="flex items-center space-x-4">
//             <span className="text-sm text-gray-600">
//               Welcome, {currentUser?.displayName || currentUser?.email}
//             </span>
//             <button
//               onClick={logout}
//               className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 flex items-center"
//             >
//               <LogOut className="inline mr-1" /> Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Area */}
//       <main className="flex-1 max-w-6xl mx-auto p-6">
//         {!showChat ? (
//           // ---------- Default dashboard view ----------
//           <div className="flex flex-col justify-center items-center h-[70vh] text-center">
//             <h2 className="text-2xl font-semibold mb-4">
//               Welcome to Expert Dashboard
//             </h2>
//             <p className="text-gray-600 mb-6 max-w-md">
//               Manage farmer consultations and connect directly.
//             </p>
//             <button
//               onClick={() => setShowChat(true)} // 👈 switch to chat mode
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg shadow-md"
//             >
//               💬 Message Farmer
//             </button>
//           </div>
//         ) : (
//           // ---------- Chat view ----------
//           <div className="relative h-[80vh] bg-white shadow rounded-xl overflow-hidden">
//             {/* Back button */}
//             <button
//               onClick={() => setShowChat(false)} // 👈 back to dashboard
//               className="absolute top-3 left-3 bg-gray-200 hover:bg-gray-300 p-2 rounded-full z-10"
//             >
//               <ArrowLeft className="w-5 h-5 text-gray-700" />
//             </button>

//             {/* ChatBox fills remaining space */}
//             <div className="h-full w-full pt-12">
//               <ChatBox currentUser="expert" /> {/* ✅ props optional */}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import ChatBox from "./components/Chat/ChatBox"; 
import { 
  MessageCircle, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  LogOut,
  Bell,
  Search,
  Filter,
  Plus,
  MessageSquare,
  ArrowLeft
} from "lucide-react";
import { useAuth } from "./contexts/AuthContext";

const FarmerDashboard = () => {
  const [showChat, setShowChat] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const {logout} = useAuth();

  // Mock farmer data
  const farmer = {
    name: "Krishnan Nair",
    email: "rohanmache1976@gmail.com",
    location: "Maharashtra, India"
  };

  // Mock experts/chats data
  const chats = [
  {
    id: 1,
    expertName: "Krishnan Nair",
    expertEmail: "krishnan.nair@farmerkerala.in",
    expertSpecialty: "Coconut & Pest Control",
    lastMessage: "My coconut trees have small insects on the leaves, what should I do?",
    timestamp: "1 hour ago",
    status: "active",
    issue: "Insects damaging coconut leaves",
    priority: "high",
    unreadCount: 1,
    avatar: "KN"
  },
  {
    id: 2,
    expertName: "Bindu K",
    expertEmail: "bindu.k@farmerkerala.in",
    expertSpecialty: "Paddy Cultivation & Soil Health",
    lastMessage: "The water in my paddy field is not draining properly",
    timestamp: "3 hours ago",
    status: "active",
    issue: "Poor drainage in paddy field",
    priority: "medium",
    unreadCount: 2,
    avatar: "BK"
  },
  {
    id: 3,
    expertName: "Manikandan P",
    expertEmail: "manikandan.p@farmerkerala.in",
    expertSpecialty: "Banana Farming",
    lastMessage: "How to prevent banana plant from bending during heavy rain?",
    timestamp: "1 day ago",
    status: "solved",
    issue: "Banana plant support issue",
    priority: "medium",
    unreadCount: 0,
    avatar: "MP"
  },
  {
    id: 4,
    expertName: "Saraswathi Amma",
    expertEmail: "saraswathi.amma@farmerkerala.in",
    expertSpecialty: "Organic Vegetable Farming",
    lastMessage: "Can I use cow dung compost for my tomato plants?",
    timestamp: "2 days ago",
    status: "solved",
    issue: "Organic fertilizer for vegetables",
    priority: "low",
    unreadCount: 0,
    avatar: "SA"
  }
];


  const stats = {
    totalChats: chats.length,
    activeCases: chats.filter(c => c.status === 'active').length,
    solvedIssues: chats.filter(c => c.status === 'solved').length,
    avgResponseTime: "2.5 hours"
  };

  const recentActivity = [
    { id: 1, action: "New message from Dr. Priya Sharma", time: "30 min ago", type: "message" },
    { id: 2, action: "Issue marked as solved: Leaf spots treatment", time: "2 hours ago", type: "solved" },
    { id: 3, action: "Started new consultation with Dr. Sunita Reddy", time: "1 day ago", type: "new" },
    { id: 4, action: "Audio message received from Dr. Amit Patel", time: "3 hours ago", type: "message" }
  ];

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.expertName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         chat.expertSpecialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || chat.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleChatStart = (expert) => {
    setSelectedExpert({
      name: expert.expertName,
      email: expert.expertEmail,
      specialty: expert.expertSpecialty,
      avatar: expert.avatar
    });
    setShowChat(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'solved': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            {showChat && (
              <button
                onClick={() => setShowChat(false)}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
            )}
            <h1 className="text-xl font-bold text-gray-800">
              {showChat ? `Chat with ${selectedExpert?.name}` : "KrishiVaani Farmer Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {!showChat && (
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chats.reduce((sum, chat) => sum + chat.unreadCount, 0)}
                </span>
              </button>
            )}
            <span className="text-sm text-gray-600">
              Welcome, Ramesh Kumar
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 max-w-6xl mx-auto p-6">
        {!showChat ? (
          // Dashboard view
          <div>
            {/* Navigation Tabs */}
            <div className="mb-6">
              <nav className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
                {[
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'chats', label: 'My Consultations', icon: MessageCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-green-500 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Total Consultations</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalChats}</p>
                      </div>
                      <div className="p-3 rounded-full bg-blue-50 text-blue-600">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Active Cases</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.activeCases}</p>
                      </div>
                      <div className="p-3 rounded-full bg-orange-50 text-orange-600">
                        <Clock className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Solved Issues</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.solvedIssues}</p>
                      </div>
                      <div className="p-3 rounded-full bg-green-50 text-green-600">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm font-medium">Avg Response Time</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgResponseTime}</p>
                      </div>
                      <div className="p-3 rounded-full bg-purple-50 text-purple-600">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'message' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'solved' ? 'bg-green-100 text-green-600' :
                          'bg-yellow-100 text-yellow-600'
                        }`}>
                          {activity.type === 'message' ? <MessageSquare className="w-4 h-4" /> :
                           activity.type === 'solved' ? <CheckCircle className="w-4 h-4" /> :
                           <Plus className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Chats Tab */}
            {activeTab === 'chats' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by expert, issue, or specialty..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="solved">Solved</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      New Consultation
                    </button>
                  </div>
                </div>

                {/* Chats List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    My Consultations ({filteredChats.length})
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredChats.map((chat) => (
                      <div 
                        key={chat.id}
                        className={`bg-white rounded-lg border-l-4 ${getPriorityColor(chat.priority)} shadow-sm hover:shadow-md transition-all cursor-pointer p-6`}
                        onClick={() => handleChatStart(chat)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {chat.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{chat.expertName}</h4>
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(chat.status)}`}>
                                  {chat.status}
                                </span>
                                {chat.unreadCount > 0 && (
                                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                                    {chat.unreadCount}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{chat.expertSpecialty}</p>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500">{chat.timestamp}</p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-800">{chat.issue}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{chat.lastMessage}</p>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            chat.priority === 'high' ? 'bg-red-100 text-red-800' :
                            chat.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {chat.priority} priority
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded">
                            <MessageCircle className="w-4 h-4" />
                            Continue Chat
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) :(
  <div className="h-[85vh] bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
    {/* Optional Header */}
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-xl font-semibold text-gray-700 mb-1">
        Chat with {selectedExpert?.name}
      </h3>
      <p className="text-sm text-gray-500">{selectedExpert?.specialty}</p>
      <p className="text-sm font-medium text-gray-800">{selectedExpert?.email}</p>
    </div>

    {/* ChatBox */}
    <div className="flex-1">
      <ChatBox
        currentUser="expert"
        chatPartner={selectedExpert?.email} // send selected expert email
        onClose={() => setSelectedExpert(null)} // optional close handler
      />
    </div>
  </div>
)
}
      </main>
    </div>
  );
};

export default FarmerDashboard;