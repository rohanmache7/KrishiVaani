// // import React, { useState } from 'react';
// // import { AuthProvider, useAuth } from './contexts/AuthContext';
// // import HomePage from './HomePage.jsx';
// // import KrishiVaaniDashBoard from './KrishiVaaniDashBoard.jsx';
// // import AdminDashboard from './AdminDashboard.jsx';
// // import LoginModal from './components/modals/LoginModal';
// // import SignupModal from './components/modals/SignUpModal';
// // import AdminLoginModal from './components/modals/AdminLoginModal';
// // import AdminSignupModal from './components/modals/AdminSignupModal';

// // function AppContent() {
// //   // --- FIX #1: Get the 'logout' function from the context ---
// //   const { currentUser, loading, logout } = useAuth();
// //   const [openModal, setOpenModal] = useState(null);

// //   const handleCloseModal = () => setOpenModal(null);
// //   const handleOpenLogin = () => setOpenModal('login');
// //   const handleOpenSignup = () => setOpenModal('signup');
// //   const handleOpenAdminLogin = () => setOpenModal('adminLogin');
// //   const handleOpenAdminSignup = () => setOpenModal('adminSignup');
// //   const handleSwitchToLogin = () => setOpenModal('login');
// //   const handleSwitchToAdminLogin = () => setOpenModal('adminLogin');

// //   const renderModal = () => {
// //     if (currentUser) return null;
// //     switch (openModal) {
// //       case 'login':
// //         return <LoginModal isOpen={true} onClose={handleCloseModal} onSwitchToSignup={() => setOpenModal('signup')} />;
// //       case 'signup':
// //         return <SignupModal isOpen={true} onClose={handleCloseModal} onSwitchToLogin={handleSwitchToLogin} />;
// //       case 'adminLogin':
// //         return <AdminLoginModal isOpen={true} onClose={handleCloseModal} onSwitchToSignup={handleOpenAdminSignup} />;
// //       case 'adminSignup':
// //         return <AdminSignupModal isOpen={true} onClose={handleCloseModal} onSwitchToLogin={handleSwitchToAdminLogin} />;
// //       default:
// //         return null;
// //     }
// //   };

// //   const renderContent = () => {
// //     if (loading) {
// //       return <div className="h-screen flex items-center justify-center font-bold text-xl">Loading Krishivaani...</div>;
// //     }

// //     if (!currentUser) {
// //       return (
// //         <HomePage 
// //           onOpenLogin={handleOpenLogin}
// //           onOpenSignup={handleOpenSignup}
// //           onOpenAdminLogin={handleOpenAdminLogin}
// //           onOpenAdminSignup={handleOpenAdminSignup}
// //         />
// //       );
// //     }
    
// //     // --- FIX #2: Pass the 'logout' function as a prop to your dashboards ---
// //     if (currentUser.role === 'admin') {
// //       return <AdminDashboard logout={logout} />;
// //     }
    
// //     return <KrishiVaaniDashBoard logout={logout} />;
// //   };

// //   return (
// //     <div className="min-h-screen">
// //       {renderModal()}
// //       {renderContent()}
// //     </div>
// //   );
// // }

// // function App() {
// //   return (
// //     <AuthProvider>
// //       <AppContent />
// //     </AuthProvider>
// //   );
// // }

// // export default App;

// // ew-----------------------------------------------------------


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import HomePage from "./HomePage.jsx";
// import KrishiVaaniDashBoard from "./KrishiVaaniDashBoard.jsx";
// import AdminDashboard from "./AdminDashboard.jsx";
// import LoginModal from "./components/modals/LoginModal";
// import SignupModal from "./components/modals/SignUpModal";
// import AdminLoginModal from "./components/modals/AdminLoginModal";
// import AdminSignupModal from "./components/modals/AdminSignupModal";

// function AppContent() {
//   const { currentUser, loading, logout } = useAuth();
//   const [openModal, setOpenModal] = useState(null);

//   const handleCloseModal = () => setOpenModal(null);
//   const handleOpenLogin = () => setOpenModal("login");
//   const handleOpenSignup = () => setOpenModal("signup");
//   const handleOpenAdminLogin = () => setOpenModal("adminLogin");
//   const handleOpenAdminSignup = () => setOpenModal("adminSignup");
//   const handleSwitchToLogin = () => setOpenModal("login");
//   const handleSwitchToAdminLogin = () => setOpenModal("adminLogin");

//   const renderModal = () => {
//     if (currentUser) return null;
//     switch (openModal) {
//       case "login":
//         return (
//           <LoginModal
//             isOpen={true}
//             onClose={handleCloseModal}
//             onSwitchToSignup={() => setOpenModal("signup")}
//           />
//         );
//       case "signup":
//         return (
//           <SignupModal
//             isOpen={true}
//             onClose={handleCloseModal}
//             onSwitchToLogin={handleSwitchToLogin}
//           />
//         );
//       case "adminLogin":
//         return (
//           <AdminLoginModal
//             isOpen={true}
//             onClose={handleCloseModal}
//             onSwitchToSignup={handleOpenAdminSignup}
//           />
//         );
//       case "adminSignup":
//         return (
//           <AdminSignupModal
//             isOpen={true}
//             onClose={handleCloseModal}
//             onSwitchToLogin={handleSwitchToAdminLogin}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center font-bold text-xl">
//         Loading Krishivaani...
//       </div>
//     );
//   }

//   return (
//     <>
//       {renderModal()}

//       <Routes>
//         {/* Public Home Page */}
//         <Route
//           path="/"
//           element={
//             !currentUser ? (
//               <HomePage
//                 onOpenLogin={handleOpenLogin}
//                 onOpenSignup={handleOpenSignup}
//                 onOpenAdminLogin={handleOpenAdminLogin}
//                 onOpenAdminSignup={handleOpenAdminSignup}
//               />
//             ) : currentUser.role === "admin" ? (
//               <Navigate to="/admin" />
//             ) : (
//               <Navigate to="/dashboard" />
//             )
//           }
//         />

//         {/* Farmer Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             currentUser && currentUser.role === "farmer" ? (
//               <KrishiVaaniDashBoard logout={logout} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />

//         {/* Admin Dashboard */}
//         <Route
//           path="/admin"
//           element={
//             currentUser && currentUser.role === "admin" ? (
//               <AdminDashboard logout={logout} />
//             ) : (
//               <Navigate to="/" />
//             )
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <AppContent />
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;












import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./HomePage.jsx";
import KrishiVaaniDashBoard from "./KrishiVaaniDashBoard.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import ChatBox from "./components/Chat/ChatBox.jsx"; // ✅ Import ChatBox
import LoginModal from "./components/modals/LoginModal";
import SignupModal from "./components/modals/SignUpModal";
import AdminLoginModal from "./components/modals/AdminLoginModal";
import AdminSignupModal from "./components/modals/AdminSignupModal";

function AppContent() {
  const { currentUser, loading, logout } = useAuth();
  const [openModal, setOpenModal] = useState(null);

  const handleCloseModal = () => setOpenModal(null);
  const handleOpenLogin = () => setOpenModal("login");
  const handleOpenSignup = () => setOpenModal("signup");
  const handleOpenAdminLogin = () => setOpenModal("adminLogin");
  const handleOpenAdminSignup = () => setOpenModal("adminSignup");
  const handleSwitchToLogin = () => setOpenModal("login");
  const handleSwitchToAdminLogin = () => setOpenModal("adminLogin");

  const renderModal = () => {
    if (currentUser) return null;

    switch (openModal) {
      case "login":
        return (
          <LoginModal
            isOpen={true}
            onClose={handleCloseModal}
            onSwitchToSignup={() => setOpenModal("signup")}
          />
        );
      case "signup":
        return (
          <SignupModal
            isOpen={true}
            onClose={handleCloseModal}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      case "adminLogin":
        return (
          <AdminLoginModal
            isOpen={true}
            onClose={handleCloseModal}
            onSwitchToSignup={handleOpenAdminSignup}
          />
        );
      case "adminSignup":
        return (
          <AdminSignupModal
            isOpen={true}
            onClose={handleCloseModal}
            onSwitchToLogin={handleSwitchToAdminLogin}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center font-bold text-xl">
        Loading Krishivaani...
      </div>
    );
  }

  return (
    <>
      {renderModal()}

      <Routes>
        {/* 🏡 Public Home Page */}
        <Route
          path="/"
          element={
            !currentUser ? (
              <HomePage
                onOpenLogin={handleOpenLogin}
                onOpenSignup={handleOpenSignup}
                onOpenAdminLogin={handleOpenAdminLogin}
                onOpenAdminSignup={handleOpenAdminSignup}
              />
            ) : currentUser.role === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        {/* 👨‍🌾 Farmer Dashboard */}
        <Route
          path="/dashboard"
          element={
            currentUser && currentUser.role === "farmer" ? (
              <KrishiVaaniDashBoard logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 🧑‍⚕️ Admin Dashboard */}
        <Route
          path="/admin"
          element={
            currentUser && currentUser.role === "admin" ? (
              <AdminDashboard logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 💬 Chat Route */}
        <Route
          path="/chat/:role"
          element={
            currentUser ? (
              <ChatBox />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;

