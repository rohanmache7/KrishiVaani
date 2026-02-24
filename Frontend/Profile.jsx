  import React, { useState, useEffect, useCallback } from 'react';
  import { useAuth } from './contexts/AuthContext.jsx';
  import OnBoarding from "./OnBoarding.jsx";
  import Profile from './Profile.jsx';
  import ChatInterface from './components/ChatInterface.jsx';
  import WeatherModal from './components/modals/WeatherModal';
  import MarketModal from './components/modals/MarketModal';
  import PestModal from './components/modals/PestModal';
  import SubsidiesModal from './components/modals/SubsidiesModal';
  import CropCalendarModal from './components/modals/CropCalendarModal';
  import SoilHealthDashboard from './components/modals/SoilHealthDashboard';
  import ExpertConnectModal from './components/modals/ExpertConnectModal';
  import ModernFarmDashboard from "./ModernFarmDashboard"; 
  import { Toaster } from 'react-hot-toast';

  import {
    Menu,
    X,
    MessageCircle,
    Camera,
    CloudSun,
    Gift,
    Sprout,
    Users,
    MapPin,
    Bell,
    User,
    Home,
    BarChart3,
    FileText,
  } from 'lucide-react';

  import { 
  
 
  Calendar,
 
  Leaf,
 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Eye,
  Zap,
  Tractor,
  Wheat,
  Droplets,
  Sun,
  Shield,
  ListTodo,
  CheckSquare
} from 'lucide-react';

// new code added 
const currentUser = {
  displayName: "Ram Kumar",
  // avatar: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
};

const user = {
  landArea: 5, // in acres (typical for Indian farmers)
  cropsToPlant: ['Rice', 'Wheat', 'Pulses'],
  // location: 'Punjab, India'
};

// Mock data relevant to Indian farming
const recentActivities = [
  { id: 1, action: 'Irrigation completed in Field A-3', time: '2 hours ago', status: 'completed', icon: 'droplet' },
  { id: 2, action: 'Fertilizer applied to wheat field', time: '1 day ago', status: 'completed', icon: 'leaf' },
  { id: 3, action: 'Pesticide spraying scheduled', time: '2 days ago', status: 'pending', icon: 'alert' },
  { id: 4, action: 'Rice harvesting planned', time: '3 days ago', status: 'scheduled', icon: 'calendar' }
];

const quickStats = [
  { label: 'Crop Health', value: '94%', change: '+2%', trend: 'up', color: 'green' },
  { label: 'Water Usage', value: '2,340L', change: '-8%', trend: 'down', color: 'blue' },
  { label: 'Equipment Status', value: '4/5', change: '+1', trend: 'up', color: 'purple' },
  { label: 'Seed Stock', value: '85%', change: '+5%', trend: 'up', color: 'orange' }
];



// ok nigga

  const KrishiVaaniDashboard = ({ t, logout }) => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [onBoardingDone, setOnBoardingDone] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const userEmail = currentUser?.email;
    const API_URL = 'http://localhost:5001/api/KrishiVaani';

    const [activeSection, setActiveSection] = useState('dashboard');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Fetch user data
    const fetchUserData = useCallback(async () => {
      if (!userEmail) {
        setLoadingData(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}?email=${encodeURIComponent(userEmail)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUserData(data);
        setOnBoardingDone(data.onBoarding);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoadingData(false);
      }
    }, [userEmail]);

    useEffect(() => {
      fetchUserData();
    }, [fetchUserData]);

    // Profile update
    const handleProfileUpdate = () => {
      setActiveSection('dashboard');
      fetchUserData();
    };

    // Onboarding complete
    const handleOnboardingComplete = async (onboardingData) => {
      setLoadingData(true);
      const backendEndpoint = 'http://localhost:5001/api/KrishiVaani';
      try {
        const response = await fetch(backendEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Email: userEmail,
            onBoarding: true,
            ...onboardingData,
          }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setUserData(prev => ({ ...prev, ...onboardingData, onBoarding: true }));
        setOnBoardingDone(true);
      } catch (e) {
        console.error('Failed to complete onboarding:', e);
      } finally {
        setLoadingData(false);
      }
    };

    const user = userData || {};
    const tFunc = (key) => t?.[key] || key;

    const navigationItems = [
      { id: 'dashboard', name: 'Dashboard', icon: Home },
      { id: 'chatbot', name: 'AI Assistant', icon: MessageCircle },
      { id: 'pest', name: 'Disease Detection', icon: Camera },
      { id: 'weather', name: 'Weather', icon: CloudSun },
      { id: 'subsidies', name: 'Subsidies', icon: Gift },
      { id: 'market', name: 'Market Price', icon: BarChart3 },
      { id: 'crop-calendar', name: 'Crop Calendar', icon: Sprout },
      { id: 'soil-health', name: 'Soil Health', icon: FileText },
      { id: 'expert-connect', name: 'Expert Advice', icon: Users },
    ];

    const renderContent = () => {
      if (!userData) return null;

      const ContentContainer = ({ children }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[calc(100vh-14rem)]">
          {children}
        </div>
      );

    switch (activeSection) {
      case 'dashboard':
        return (
          // <div className="space-y-6">
          //   <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 text-white">
          //     <h1 className="text-2xl font-bold mb-2">Welcome, {currentUser.displayName}!</h1>
          //     <p className="text-green-100">
          //       Today is a good day for farming. Ready to take care of your farm.
          //     </p>
          //   </div>
          //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          //     {/* Dashboard Cards */}
          //     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 transform cursor-pointer">
          //       <div className="flex items-center justify-between">
          //         <div>
          //           <p className="text-sm text-gray-600">Land Area</p>
          //           <p className="text-2xl font-bold text-gray-900">{user.landArea} acres</p>
          //         </div>
          //         <MapPin className="h-8 w-8 text-green-600 transform transition-transform duration-300 hover:rotate-12" />
          //       </div>
          //     </div>
          //     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 transform cursor-pointer">
          //       <div className="flex items-center justify-between">
          //         <div>
          //           <p className="text-sm text-gray-600">Main Crops</p>
          //           <p className="text-lg font-semibold text-gray-900">
          //             {user.cropsToPlant?.join(', ') || 'N/A'}
          //           </p>
          //         </div>
          //         <Sprout className="h-8 w-8 text-green-600 transform transition-transform duration-300 hover:rotate-12" />
          //       </div>
          //     </div>
          //     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 transform cursor-pointer">
          //       <div className="flex items-center justify-between">
          //         <div>
          //           <p className="text-sm text-gray-600">Soil Type</p>
          //           <p className="text-lg font-semibold text-gray-900">{user.soilType}</p>
          //         </div>
          //         <BarChart3 className="h-8 w-8 text-green-600 transform transition-transform duration-300 hover:rotate-12" />
          //       </div>
          //     </div>
          //   </div>
          // </div>
            <div>
      <ModernFarmDashboard />
    </div>
        );
      case 'chatbot':
        return <ChatInterface t={t} userDataFromParent={userData} />;
      case 'profile':
        return <ContentContainer><Profile userEmail={userData.Email} onProfileUpdate={handleProfileUpdate} t={tFunc} /></ContentContainer>;
      case 'weather':
        return <ContentContainer><WeatherModal isOpen={true} onClose={() => setActiveSection('dashboard')} t={tFunc} locationF={userData.city} /></ContentContainer>;
      case 'market':
        return <ContentContainer><MarketModal isOpen={true} onClose={() => setActiveSection('dashboard')} t={tFunc} /></ContentContainer>;
      case 'pest':
        return <ContentContainer><PestModal isOpen={true} onClose={() => setActiveSection('dashboard')} t={tFunc} /></ContentContainer>;
      case 'subsidies':
        return <ContentContainer><SubsidiesModal isOpen={true} onClose={() => setActiveSection('dashboard')} t={tFunc} /></ContentContainer>;
      case 'crop-calendar':
        return <ContentContainer><CropCalendarModal isOpen={true} onClose={() => setActiveSection('dashboard')} t={tFunc} /></ContentContainer>;
      case 'soil-health':
  return (
    <ContentContainer>
      <SoilHealthDashboard
        isOpen={true}
        onClose={() => setActiveSection('dashboard')}
        t={tFunc}
      />
    </ContentContainer>
  );

      case 'expert-connect':
        return <ContentContainer><ExpertConnectModal isOpen={true} onClose={() => setActiveSection('dashboard')} t={tFunc} userName={currentUser.displayName} userEmail={user.Email} /></ContentContainer>;
      default:
        return null;
    }
  };

  if (loadingData) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!onBoardingDone) return <OnBoarding onComplete={handleOnboardingComplete} />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
     {/* Top Header */}
    {/* Top Header */}
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm border-b border-gray-200 z-40">
  <div className="flex justify-between items-center h-16 px-4 md:px-6">
    
    {/* Logo */}
    <div className="flex items-center">
      <Sprout className="h-8 w-8 text-green-600" />
      <span className="ml-2 text-2xl font-bold text-black">KrishiVaani</span>
    </div>

    {/* Mobile menu button */}
    <button className="md:hidden p-2 text-gray-600 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(true)}>
      <Menu className="h-6 w-6" />
    </button>

    {/* Desktop Right Section */}
    <div className="hidden md:flex items-center space-x-4">
      
      {/* Notification Bell */}
      <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900" />

      {/* Profile Button */}
          <button
      onClick={() => setActiveSection('profile')}
      className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm 
                bg-white text-gray-900 border-2 border-green-600
                bg-clip-padding
                transition-all duration-300
                hover:text-white
                hover:bg-gradient-to-r hover:from-green-600 hover:to-black"
    >
      <User className="h-6 w-6" />
      <div>
        <p className="text-sm font-medium">{currentUser.displayName || 'User'}</p>
        <p className="text-xs">{user.location || 'Location'}</p>
      </div>
    </button>


      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-white text-red-600 font-semibold border border-red-600 px-3 py-1 rounded-lg hover:bg-red-600 hover:text-white shadow-sm"
      >
        Logout
      </button>

    </div>
  </div>
</header>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        {/* Sidebar */}
        <aside
  className={`
    fixed top-16 left-0 z-30 w-64 h-[calc(100vh-4rem)]
    md:sticky md:top-16
    bg-gradient-to-br from-[#00A344] to-black
    shadow-lg border-r border-gray-200
    transform transition-transform duration-300 ease-in-out
    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
  `}
>
  {/* Mobile Header */}
  <div className="flex justify-between items-center h-16 p-4 md:hidden">
    <div className="flex items-center">
      <Sprout className="h-12 w-12 text-white" />
      <span className="ml-2 text-3xl font-bold text-white">KrishiVaani</span>
    </div>
    <button
      onClick={() => setIsMobileMenuOpen(false)}
      className="p-2 rounded-md text-white hover:bg-green-500"
    >
      <X className="h-6 w-6" />
    </button>
  </div>

  {/* Navigation Items */}
  <div className="p-4 space-y-2">
    {navigationItems.map((item) => {
      const Icon = item.icon;
      const isActive = activeSection === item.id;

      return (
        <button
          key={item.id}
          onClick={() => {
            setActiveSection(item.id);
            setIsMobileMenuOpen(false);
          }}
          className={`
            w-full flex items-center px-4 py-3 rounded-lg text-left text-lg
            transition-all duration-300 transform
            ${isActive
              ? 'bg-white text-black font-medium scale-105 shadow-lg'
              : 'text-white hover:bg-white hover:text-black hover:scale-105 hover:shadow-md'}
          `}
        >
          <Icon
            className={`h-6 w-6 mr-3 ${
              isActive ? 'text-black' : 'text-white group-hover:text-black'
            }`}
          />
          {item.name}
        </button>
      );
    })}
  </div>
</aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />}
      </div>
      <Toaster />
    </div>
  );
};

export default KrishiVaaniDashboard;


// import React, { useState } from "react";
// import { useAuth } from "./contexts/AuthContext";
// import {
//   CheckCircle,
//   Leaf,
//   Droplet,
//   Sun,
//   BarChart,
//   Tractor,
//   Users,
//   ShoppingCart,
//   Sprout,
//   Shield,
//   Zap,
// } from "lucide-react";
// // import OnboardingFlow from "./OnboardingFlow";
// // import ChatBot from "./ChatBot";
// // import ProfilePage from "./ProfilePage";
// // import FarmersMarket from "./FarmersMarket";
// // import SoilTestBooking from "./SoilTestBooking";
// // import DiseaseDetection from "./DiseaseDetection";

// /* -------------------------------
//    Simple UI component replacements
// ---------------------------------*/
// const Button = ({ children, variant = "default", className = "", ...props }) => {
//   const base =
//     "px-4 py-2 rounded-lg font-medium transition focus:outline-none text-sm";
//   const styles =
//     variant === "outline"
//       ? "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
//       : "bg-green-600 text-white hover:bg-green-700";
//   return (
//     <button className={`${base} ${styles} ${className}`} {...props}>
//       {children}
//     </button>
//   );
// };

// const Card = ({ children, className = "" }) => (
//   <div className={`bg-white rounded-xl shadow ${className}`}>{children}</div>
// );

// const CardHeader = ({ children, className = "" }) => (
//   <div className={`p-4 border-b ${className}`}>{children}</div>
// );

// const CardTitle = ({ children, className = "" }) => (
//   <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
// );

// const CardContent = ({ children, className = "" }) => (
//   <div className={`p-4 ${className}`}>{children}</div>
// );

// const Progress = ({ value }) => (
//   <div className="w-full h-2 bg-gray-200 rounded-full">
//     <div
//       className="h-2 bg-green-600 rounded-full"
//       style={{ width: `${value}%` }}
//     />
//   </div>
// );

// /* -------------------------------
//    Main Dashboard Component
// ---------------------------------*/
// const KrishiVaaniDashboard = () => {
//   const { currentUser } = useAuth();
//   const [activeSection, setActiveSection] = useState("dashboard");
//   const [showOnboarding, setShowOnboarding] = useState(false);
//   const [onboardingComplete, setOnboardingComplete] = useState(false);

//   const renderContent = () => {
//     switch (activeSection) {
//       case "dashboard":
//         return (
//           <div className="space-y-6">
//             {/* Hero Section */}
//             <div className="relative bg-green-700 text-white rounded-2xl p-8 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 opacity-90"></div>
//               <div className="relative z-10">
//                 <h1 className="text-4xl font-bold mb-2">Welcome back, Farmer!</h1>
//                 <p className="text-green-100 text-lg">
//                   Here's an overview of your farm activities and opportunities
//                 </p>
//               </div>
//               <div className="absolute -right-12 -bottom-12 opacity-20">
//                 <Leaf size={200} />
//               </div>
//             </div>

//             {/* Quick Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               <Card className="bg-gradient-to-br from-green-50 to-white border border-green-100">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium flex items-center gap-2">
//                     <Sprout className="h-4 w-4 text-green-600" />
//                     Active Crops
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-bold">12</p>
//                   <p className="text-xs text-gray-500">Across 3 fields</p>
//                 </CardContent>
//               </Card>

//               <Card className="bg-gradient-to-br from-blue-50 to-white border border-blue-100">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium flex items-center gap-2">
//                     <Droplet className="h-4 w-4 text-blue-600" />
//                     Water Usage
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-bold">2,450 L</p>
//                   <p className="text-xs text-gray-500">This week</p>
//                 </CardContent>
//               </Card>

//               <Card className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-100">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium flex items-center gap-2">
//                     <Sun className="h-4 w-4 text-yellow-600" />
//                     Weather Alert
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-bold">Rain</p>
//                   <p className="text-xs text-gray-500">Expected tomorrow</p>
//                 </CardContent>
//               </Card>

//               <Card className="bg-gradient-to-br from-purple-50 to-white border border-purple-100">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium flex items-center gap-2">
//                     <BarChart className="h-4 w-4 text-purple-600" />
//                     Market Trends
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-2xl font-bold">+12%</p>
//                   <p className="text-xs text-gray-500">Crop prices rising</p>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Farm Overview */}
//               <Card className="lg:col-span-2">
//                 <CardHeader>
//                   <CardTitle>Farm Overview</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-green-50 p-4 rounded-xl">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Tractor className="h-5 w-5 text-green-600" />
//                         <h3 className="font-medium">Wheat Field</h3>
//                       </div>
//                       <Progress value={75} />
//                       <p className="text-xs text-gray-500 mt-2">
//                         75% growth stage
//                       </p>
//                     </div>
//                     <div className="bg-blue-50 p-4 rounded-xl">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Droplet className="h-5 w-5 text-blue-600" />
//                         <h3 className="font-medium">Rice Field</h3>
//                       </div>
//                       <Progress value={45} />
//                       <p className="text-xs text-gray-500 mt-2">
//                         Irrigation ongoing
//                       </p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Quick Actions */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Quick Actions</CardTitle>
//                 </CardHeader>
//                 <CardContent className="grid grid-cols-2 gap-4">
//                   <Button className="w-full flex flex-col items-center gap-2 p-4 h-auto">
//                     <ShoppingCart className="h-5 w-5" />
//                     <span>Sell Crops</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full flex flex-col items-center gap-2 p-4 h-auto"
//                   >
//                     <Users className="h-5 w-5" />
//                     <span>Hire Help</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full flex flex-col items-center gap-2 p-4 h-auto"
//                   >
//                     <Shield className="h-5 w-5" />
//                     <span>Soil Test</span>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="w-full flex flex-col items-center gap-2 p-4 h-auto"
//                   >
//                     <Zap className="h-5 w-5" />
//                     <span>Check Weather</span>
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Government Schemes */}
//               <Card className="lg:col-span-2">
//                 <CardHeader>
//                   <CardTitle>Government Schemes</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
//                     <div>
//                       <h4 className="font-medium">PM-Kisan Samman Nidhi</h4>
//                       <p className="text-sm text-gray-600">
//                         ₹6,000 annual support for small farmers
//                       </p>
//                     </div>
//                     <Button variant="outline" className="text-sm px-3 py-1">
//                       Apply
//                     </Button>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
//                     <div>
//                       <h4 className="font-medium">Crop Insurance Scheme</h4>
//                       <p className="text-sm text-gray-600">
//                         Protect your crops against natural calamities
//                       </p>
//                     </div>
//                     <Button variant="outline" className="text-sm px-3 py-1">
//                       Enroll
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Sidebar Widgets */}
//               <div className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Recent Activities</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     {[
//                       "Fertilizer applied to Wheat Field",
//                       "Irrigation completed for Rice Field",
//                       "New worker hired",
//                     ].map((activity, i) => (
//                       <div key={i} className="flex items-center gap-2 text-sm">
//                         <CheckCircle className="h-4 w-4 text-green-600" />
//                         {activity}
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Upcoming Tasks</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-3">
//                     <div className="flex items-center justify-between text-sm">
//                       <span>Harvest Wheat Field</span>
//                       <span className="text-gray-500">2 days</span>
//                     </div>
//                     <div className="flex items-center justify-between text-sm">
//                       <span>Apply Pesticides</span>
//                       <span className="text-gray-500">5 days</span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>

//             {/* Market Prices */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Market Prices</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {[
//                     { crop: "Wheat", price: "₹2,150/quintal" },
//                     { crop: "Rice", price: "₹1,950/quintal" },
//                     { crop: "Corn", price: "₹1,750/quintal" },
//                     { crop: "Soybean", price: "₹3,200/quintal" },
//                   ].map((item, i) => (
//                     <div
//                       key={i}
//                       className="p-4 bg-gray-100 rounded-lg text-center"
//                     >
//                       <h4 className="font-medium">{item.crop}</h4>
//                       <p className="text-sm text-gray-600">{item.price}</p>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         );

//       case "profile":
//         return <ProfilePage />;
//       case "market":
//         return <FarmersMarket />;
//       case "soil-test":
//         return <SoilTestBooking />;
//       case "disease-detection":
//         return <DiseaseDetection />;
//       default:
//         return null;
//     }
//   };

//   if (!currentUser) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p>Please login to access the dashboard</p>
//       </div>
//     );
//   }

//   if (showOnboarding && !onboardingComplete) {
//     return <OnboardingFlow onComplete={() => setOnboardingComplete(true)} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <h1 className="text-xl font-bold text-green-700">KrishiVaani</h1>
//             <div className="flex space-x-4">
//               <Button
//                 variant={activeSection === "dashboard" ? "default" : "outline"}
//                 onClick={() => setActiveSection("dashboard")}
//               >
//                 Dashboard
//               </Button>
//               <Button
//                 variant={activeSection === "profile" ? "default" : "outline"}
//                 onClick={() => setActiveSection("profile")}
//               >
//                 Profile
//               </Button>
//               <Button
//                 variant={activeSection === "market" ? "default" : "outline"}
//                 onClick={() => setActiveSection("market")}
//               >
//                 Market
//               </Button>
//               <Button
//                 variant={activeSection === "soil-test" ? "default" : "outline"}
//                 onClick={() => setActiveSection("soil-test")}
//               >
//                 Soil Test
//               </Button>
//               <Button
//                 variant={
//                   activeSection === "disease-detection" ? "default" : "outline"
//                 }
//                 onClick={() => setActiveSection("disease-detection")}
//               >
//                 Disease Detection
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         {renderContent()}
//       </main>

//       {/* Chatbot always available */}
//       {/* <ChatBot /> */}
//     </div>
//   );
// };

// export default KrishiVaaniDashboard;



// import React, { useState, useEffect } from 'react';
// import { Activity, TrendingUp, AlertTriangle, Droplets, MapPin } from 'lucide-react';
// import SoilParameterCard from './SoilParameterCard';
// import SoilHealthScoreCard from './SoilHealthScoreCard';
// import CropRecommendations from './CropRecommendations';
// import IrrigationScheduler from './IrrigationScheduler';
// import AlertsPanel from './AlertsPanel';
// import { SoilHealthCalculator } from '../utils/soilHealthCalculator';
// import { mockSoilReadings } from '../data/soilData';

// const SoilHealthDashboard = ({
//   language,
//   translations: t
// }) => {
//   const [currentReading, setCurrentReading] = useState(null);
//   const [healthScore, setHealthScore] = useState(null);
//   const [alerts, setAlerts] = useState([]);

//   useEffect(() => {
//     // Simulate real-time data updates
//     const latest = mockSoilReadings[0];
//     setCurrentReading(latest);
    
//     if (latest) {
//       const score = SoilHealthCalculator.calculateHealthScore(latest);
//       setHealthScore(score);
//     }

//     // Generate alerts based on current conditions
//     generateAlerts(latest);
//   }, []);

//   const generateAlerts = (reading) => {
//     const newAlerts = [];

//     if (reading.moisture < 20) {
//       newAlerts.push({
//         id: '1',
//         type: 'Critical',
//         category: 'Moisture',
//         message: 'Soil moisture critically low',
//         action: 'Immediate irrigation required',
//         priority: 5,
//         timestamp: new Date(),
//         acknowledged: false
//       });
//     }

//     if (reading.pH < 5.5 || reading.pH > 8.5) {
//       newAlerts.push({
//         id: '2',
//         type: 'Warning',
//         category: 'pH',
//         message: 'Soil pH outside optimal range',
//         action: reading.pH < 5.5 ? 'Add lime to increase pH' : 'Add sulfur to reduce pH',
//         priority: 3,
//         timestamp: new Date(),
//         acknowledged: false
//       });
//     }

//     if (reading.nitrogen < 150) {
//       newAlerts.push({
//         id: '3',
//         type: 'Warning',
//         category: 'Nutrients',
//         message: 'Low nitrogen levels detected',
//         action: 'Apply nitrogen-rich fertilizer',
//         priority: 4,
//         timestamp: new Date(),
//         acknowledged: false
//       });
//     }

//     setAlerts(newAlerts);
//   };

//   const getParameterStatus = (parameter, value) => {
//     switch (parameter) {
//       case 'moisture':
//         if (value >= 25 && value <= 45) return 'optimal';
//         if (value >= 20 && value <= 55) return 'good';
//         if (value >= 15 && value <= 65) return 'attention';
//         return 'critical';
//       case 'pH':
//         if (value >= 6.5 && value <= 7.5) return 'optimal';
//         if (value >= 6.0 && value <= 8.0) return 'good';
//         if (value >= 5.5 && value <= 8.5) return 'attention';
//         return 'critical';
//       case 'temperature':
//         if (value >= 20 && value <= 30) return 'optimal';
//         if (value >= 15 && value <= 35) return 'good';
//         if (value >= 10 && value <= 40) return 'attention';
//         return 'critical';
//       case 'nitrogen':
//         if (value > 280) return 'optimal';
//         if (value > 200) return 'good';
//         if (value > 140) return 'attention';
//         return 'critical';
//       default:
//         return 'good';
//     }
//   };

//   if (!currentReading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <Activity className="animate-spin mx-auto mb-4" size={48} />
//           <p className="text-gray-600">Loading soil data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
//       {/* Header */}
//       <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
//                 <Activity className="text-white" size={24} />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
//                 <p className="text-sm text-gray-600">{t.subtitle}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <MapPin size={16} />
//               <span>{currentReading.location.state}, {currentReading.location.region}</span>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Alerts Section */}
//         {alerts.length > 0 && (
//           <div className="mb-8">
//             <AlertsPanel alerts={alerts} translations={t} />
//           </div>
//         )}

//         {/* Main Dashboard Grid */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Soil Parameters */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Current Conditions */}
//             <section>
//               <div className="flex items-center gap-2 mb-6">
//                 <TrendingUp className="text-green-600" size={24} />
//                 <h2 className="text-xl font-semibold text-gray-900">{t.currentConditions}</h2>
//                 <span className="text-sm text-gray-500">
//                   {t.lastUpdated}: {currentReading.timestamp.toLocaleTimeString()}
//                 </span>
//               </div>
              
//               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                 <SoilParameterCard
//                   title={t.moisture}
//                   value={currentReading.moisture}
//                   unit={t.percentage}
//                   status={getParameterStatus('moisture', currentReading.moisture)}
//                   icon="moisture"
//                   trend="down"
//                 />
//                 <SoilParameterCard
//                   title={t.temperature}
//                   value={currentReading.temperature}
//                   unit={t.celsius}
//                   status={getParameterStatus('temperature', currentReading.temperature)}
//                   icon="temperature"
//                   trend="up"
//                 />
//                 <SoilParameterCard
//                   title={t.pH}
//                   value={currentReading.pH}
//                   unit=""
//                   status={getParameterStatus('pH', currentReading.pH)}
//                   icon="ph"
//                   trend="stable"
//                 />
//                 <SoilParameterCard
//                   title={t.nitrogen}
//                   value={currentReading.nitrogen}
//                   unit={t.mgPerKg}
//                   status={getParameterStatus('nitrogen', currentReading.nitrogen)}
//                   icon="nutrients"
//                   trend="down"
//                 />
//               </div>
//             </section>

//             {/* Crop Recommendations */}
//             <section>
//               <CropRecommendations 
//                 soilReading={currentReading} 
//                 translations={t}
//               />
//             </section>

//             {/* Quick Actions */}
//             <section>
//               <div className="bg-white rounded-xl shadow-lg p-6">
//                 <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h3>
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors font-medium">
//                     {t.addReading}
//                   </button>
//                   <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors font-medium">
//                     {t.scheduleIrrigation}
//                   </button>
//                   <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors font-medium">
//                     {t.viewHistory}
//                   </button>
//                   <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-colors font-medium">
//                     {t.exportData}
//                   </button>
//                 </div>
//               </div>
//             </section>
//           </div>

//           {/* Right Column - Health Score & Irrigation */}
//           <div className="space-y-8">
//             {/* Soil Health Score */}
//             {healthScore && (
//               <SoilHealthScoreCard 
//                 healthScore={healthScore}
//                 translations={t}
//               />
//             )}

//             {/* Irrigation Scheduler */}
//             <IrrigationScheduler 
//               moisture={currentReading.moisture}
//               temperature={currentReading.temperature}
//               translations={t}
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SoilHealthDashboard;