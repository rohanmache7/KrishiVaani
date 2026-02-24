// import React, { useState, useEffect } from 'react';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Initialize the Gemini API client
// const GEMINI_API_KEY = "AIzaSyD1SYGPfg6IZeiQVMLcZDVepQZLx4Te_u4"; // Replace with your actual key
// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// const monthNames = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const getMonthNumber = (monthName) => monthNames.indexOf(monthName);
// const getMonthName = (monthNumber) => monthNames[monthNumber];

// const CropCalendarModal = ({ location = "Kerala", userCrop = "Rice" }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [seasonsData, setSeasonsData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchSeasonsData = async () => {
//       setLoading(true);
//       setSeasonsData([]);
      
//       const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      
//       const prompt = `Provide all major cultivation seasons for ${userCrop} in ${location}.
//       Format the response as a single JSON array of objects.
//       Each object should have keys: "name" (string), "sowing_start_month" (string), "sowing_end_month" (string), 
//       "harvesting_start_month" (string), "harvesting_end_month" (string).
//       For year-round crops, use "All Year".
//       Ensure the response is ONLY the JSON array, with no extra text or markdown.`;
      
//       try {
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
        
//         const jsonString = response.text().replace(/```json|```/g, '').trim();
//         const parsedData = JSON.parse(jsonString);

//         if (Array.isArray(parsedData)) {
//             setSeasonsData(parsedData);
//         } else {
//             console.error("Gemini returned non-array data:", parsedData);
//             setSeasonsData([]);
//         }

//       } catch (error) {
//         console.error("Error fetching or parsing season data from Gemini:", error);
//         setSeasonsData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userCrop) {
//       fetchSeasonsData();
//     }
//   }, [userCrop, location]);

//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
//   const getStartingDay = (year, month) => new Date(year, month, 1).getDay();

//   const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
//   const startingDay = getStartingDay(currentDate.getFullYear(), currentDate.getMonth());
//   const monthDisplay = getMonthName(currentDate.getMonth());
//   const yearDisplay = currentDate.getFullYear();

//   const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

//   // Corrected function to handle four month string parameters
//   const checkMonthRange = (sowingStart, sowingEnd, harvestStart, harvestEnd, monthNum) => {
//     const sowingStartNum = getMonthNumber(sowingStart);
//     const sowingEndNum = getMonthNumber(sowingEnd);
//     const harvestStartNum = getMonthNumber(harvestStart);
//     const harvestEndNum = getMonthNumber(harvestEnd);
  
//     if (sowingStart === "All Year") {
//       return { isSowing: true, isHarvesting: true };
//     }
  
//     const isSowing = sowingStartNum <= sowingEndNum
//       ? (monthNum >= sowingStartNum && monthNum <= sowingEndNum)
//       : (monthNum >= sowingStartNum || monthNum <= sowingEndNum);
    
//     const isHarvesting = harvestStartNum <= harvestEndNum
//       ? (monthNum >= harvestStartNum && monthNum <= harvestEndNum)
//       : (monthNum >= harvestStartNum || monthNum <= harvestEndNum);
  
//     return { isSowing, isHarvesting };
//   };

//   const renderDays = () => {
//     const dayElements = [];
//     const blankDays = startingDay === 0 ? 6 : startingDay - 1;

//     for (let i = 0; i < blankDays; i++) {
//       dayElements.push(<div key={`blank-${i}`} className="p-2"></div>);
//     }

//     if (loading) {
//         dayElements.push(<div key="loading" className="col-span-7 text-center p-4 text-gray-500">Loading crop data...</div>);
//     } else if (seasonsData.length === 0) {
//         dayElements.push(<div key="no-data" className="col-span-7 text-center p-4 text-red-500">Could not find data for this crop.</div>);
//     } else {
//         for (let i = 1; i <= daysInMonth; i++) {
//             const hasSowing = seasonsData.some(season => 
//               checkMonthRange(season.sowing_start_month, season.sowing_end_month, season.harvesting_start_month, season.harvesting_end_month, currentDate.getMonth()).isSowing
//             );
//             const hasHarvesting = seasonsData.some(season => 
//               checkMonthRange(season.sowing_start_month, season.sowing_end_month, season.harvesting_start_month, season.harvesting_end_month, currentDate.getMonth()).isHarvesting
//             );

//             let dayClass = "p-2 rounded-full";
//             let tooltip = "";
//             let hasEvent = false;

//             seasonsData.forEach(season => {
//               const { isSowing, isHarvesting } = checkMonthRange(
//                 season.sowing_start_month, season.sowing_end_month, 
//                 season.harvesting_start_month, season.harvesting_end_month, 
//                 currentDate.getMonth()
//               );

//               if (isSowing || isHarvesting) {
//                   hasEvent = true;
//                   tooltip += `${season.name}: ${isSowing ? 'Sowing' : ''}${isSowing && isHarvesting ? ' & ' : ''}${isHarvesting ? 'Harvesting' : ''}\n`;
//               }
//             });
            
//             if (hasEvent) {
//                 dayClass += ` relative font-bold text-white transition-all duration-200`;
//                 dayClass += hasSowing && hasHarvesting ? ' bg-green-500' : hasSowing ? ' bg-blue-500' : ' bg-yellow-500';
//             } else {
//                 dayClass += ' text-gray-800 hover:bg-gray-100';
//             }

//             dayElements.push(
//                 <div 
//                     key={i} 
//                     className={dayClass}
//                     title={tooltip}
//                 >
//                     {i}
//                 </div>
//             );
//         }
//     }
//     return dayElements;
//   };

//   return (
//     <div className="flex-1 bg-white rounded-2xl shadow p-6 mr-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-extrabold text-green-600">
//           Crop Calendar for {location}
//         </h1>
//         <div className="flex space-x-2">
//             <button onClick={handlePrevMonth} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
//                 &lt;
//             </button>
//             <h2 className="text-xl font-semibold w-36 text-center">{monthDisplay} {yearDisplay}</h2>
//             <button onClick={handleNextMonth} className="p-2 text-gray-600 hover:bg-gray-200 rounded-full">
//                 &gt;
//             </button>
//         </div>
//       </div>
//       <hr className="mb-4" />
//       <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-gray-500 mb-2">
//           <span>Mon</span>
//           <span>Tue</span>
//           <span>Wed</span>
//           <span>Thu</span>
//           <span>Fri</span>
//           <span>Sat</span>
//           <span>Sun</span>
//       </div>
//       <div className="grid grid-cols-7 gap-2 text-center">
//         {renderDays()}
//       </div>

//       <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
//         <h3 className="text-xl font-bold mb-4 text-green-700">Legend</h3>
//         <div className="flex flex-wrap gap-4 text-sm text-gray-800">
//             <div className="flex items-center">
//                 <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div> Sowing
//             </div>
//             <div className="flex items-center">
//                 <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div> Harvesting
//             </div>
//             <div className="flex items-center">
//                 <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div> Both Sowing & Harvesting
//             </div>
//         </div>
        
//         {seasonsData.length > 0 && (
//             <div className="mt-4">
//                 <h4 className="text-lg font-bold text-gray-700 mb-2">Seasons for {userCrop} in {location}:</h4>
//                 <ul className="list-disc list-inside text-gray-600">
//                     {seasonsData.map((season, index) => (
//                         <li key={index}>
//                             <span className="font-semibold">{season.name}:</span>
//                             <span className="ml-1">
//                                 Sowing: {season.sowing_start_month} - {season.sowing_end_month}, 
//                                 Harvesting: {season.harvesting_start_month} - {season.harvesting_end_month}
//                             </span>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CropCalendarModal;


//mew------------------------------------------------------------------------------------------------------------------------



// import React, { useState, useEffect } from 'react';
// import { Calendar, MapPin, Sprout, Wheat, CloudRain, Sun, Thermometer, Droplets, Wind } from 'lucide-react';

// // Mock Gemini API for demo (replace with actual implementation)
// const mockGeminiAPI = {
//   getGenerativeModel: () => ({
//     generateContent: async (prompt) => ({
//       response: {
//         text: () => {
//           const crops = {
//             rice: [
//               {
//                 name: "Kharif Season",
//                 sowing_start_month: "June",
//                 sowing_end_month: "July",
//                 harvesting_start_month: "November",
//                 harvesting_end_month: "December"
//               },
//               {
//                 name: "Rabi Season", 
//                 sowing_start_month: "December",
//                 sowing_end_month: "January",
//                 harvesting_start_month: "April",
//                 harvesting_end_month: "May"
//               }
//             ],
//             wheat: [
//               {
//                 name: "Rabi Season",
//                 sowing_start_month: "November",
//                 sowing_end_month: "December",
//                 harvesting_start_month: "March",
//                 harvesting_end_month: "April"
//               }
//             ],
//             tomato: [
//               {
//                 name: "Winter Season",
//                 sowing_start_month: "October",
//                 sowing_end_month: "November",
//                 harvesting_start_month: "January",
//                 harvesting_end_month: "March"
//               },
//               {
//                 name: "Summer Season",
//                 sowing_start_month: "February",
//                 sowing_end_month: "March",
//                 harvesting_start_month: "May",
//                 harvesting_end_month: "June"
//               }
//             ]
//           };
          
//           const cropKey = prompt.toLowerCase().includes('rice') ? 'rice' : 
//                          prompt.toLowerCase().includes('wheat') ? 'wheat' :
//                          prompt.toLowerCase().includes('tomato') ? 'tomato' : 'rice';
          
//           return JSON.stringify(crops[cropKey]);
//         }
//       }
//     })
//   })
// };

// const monthNames = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const getMonthNumber = (monthName) => monthNames.indexOf(monthName);
// const getMonthName = (monthNumber) => monthNames[monthNumber];

// const CropCalendarDashboard = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [seasonsData, setSeasonsData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedCrop, setSelectedCrop] = useState("Rice");
//   const [selectedLocation, setSelectedLocation] = useState("Kerala");
//   const [weatherData, setWeatherData] = useState({
//     temp: 28,
//     humidity: 75,
//     rainfall: 12,
//     windSpeed: 8
//   });
//   const [selectedDay, setSelectedDay] = useState(null);
//   const [viewMode, setViewMode] = useState('calendar'); // calendar, analytics, tips

//   const cropOptions = ["Rice", "Wheat", "Tomato", "Cotton", "Maize", "Sugarcane"];
//   const locationOptions = ["Kerala", "Punjab", "Maharashtra", "Tamil Nadu", "Karnataka", "Gujarat"];

//   useEffect(() => {
//     const fetchSeasonsData = async () => {
//       setLoading(true);
//       setSeasonsData([]);
      
//       const model = mockGeminiAPI.getGenerativeModel();
      
//       const prompt = `Provide all major cultivation seasons for ${selectedCrop} in ${selectedLocation}.`;
      
//       try {
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
        
//         const jsonString = response.text().replace(/```json|```/g, '').trim();
//         const parsedData = JSON.parse(jsonString);

//         if (Array.isArray(parsedData)) {
//             setSeasonsData(parsedData);
//         } else {
//             setSeasonsData([]);
//         }

//       } catch (error) {
//         console.error("Error fetching season data:", error);
//         setSeasonsData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeasonsData();
//   }, [selectedCrop, selectedLocation]);

//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
//   const getStartingDay = (year, month) => new Date(year, month, 1).getDay();

//   const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
//   const startingDay = getStartingDay(currentDate.getFullYear(), currentDate.getMonth());
//   const monthDisplay = getMonthName(currentDate.getMonth());
//   const yearDisplay = currentDate.getFullYear();

//   const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

//   const checkMonthRange = (sowingStart, sowingEnd, harvestStart, harvestEnd, monthNum) => {
//     const sowingStartNum = getMonthNumber(sowingStart);
//     const sowingEndNum = getMonthNumber(sowingEnd);
//     const harvestStartNum = getMonthNumber(harvestStart);
//     const harvestEndNum = getMonthNumber(harvestEnd);
  
//     if (sowingStart === "All Year") {
//       return { isSowing: true, isHarvesting: true };
//     }
  
//     const isSowing = sowingStartNum <= sowingEndNum
//       ? (monthNum >= sowingStartNum && monthNum <= sowingEndNum)
//       : (monthNum >= sowingStartNum || monthNum <= sowingEndNum);
    
//     const isHarvesting = harvestStartNum <= harvestEndNum
//       ? (monthNum >= harvestStartNum && monthNum <= harvestEndNum)
//       : (monthNum >= harvestStartNum || monthNum <= harvestEndNum);
  
//     return { isSowing, isHarvesting };
//   };

//   const renderDays = () => {
//     const dayElements = [];
//     const blankDays = startingDay === 0 ? 6 : startingDay - 1;

//     for (let i = 0; i < blankDays; i++) {
//       dayElements.push(<div key={`blank-${i}`} className="p-3"></div>);
//     }

//     if (loading) {
//         for (let i = 1; i <= daysInMonth; i++) {
//           dayElements.push(
//             <div key={i} className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
//               <div className="w-6 h-6 bg-gray-300 rounded"></div>
//             </div>
//           );
//         }
//     } else {
//         for (let i = 1; i <= daysInMonth; i++) {
//             const { isSowing, isHarvesting } = seasonsData.length > 0 
//               ? seasonsData.reduce((acc, season) => {
//                   const result = checkMonthRange(
//                     season.sowing_start_month, 
//                     season.sowing_end_month, 
//                     season.harvesting_start_month, 
//                     season.harvesting_end_month, 
//                     currentDate.getMonth()
//                   );
//                   return {
//                     isSowing: acc.isSowing || result.isSowing,
//                     isHarvesting: acc.isHarvesting || result.isHarvesting
//                   };
//                 }, { isSowing: false, isHarvesting: false })
//               : { isSowing: false, isHarvesting: false };

//             let dayClass = "p-3 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 relative group";
//             let bgClass = "";
//             let hasEvent = isSowing || isHarvesting;

//             if (hasEvent) {
//                 if (isSowing && isHarvesting) {
//                   bgClass = "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 text-white shadow-lg";
//                 } else if (isSowing) {
//                   bgClass = "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg";
//                 } else {
//                   bgClass = "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg";
//                 }
//                 dayClass += ` ${bgClass} font-bold`;
//             } else {
//                 dayClass += ' text-gray-700 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:shadow-md';
//             }

//             if (selectedDay === i) {
//               dayClass += ' ring-4 ring-purple-500 ring-opacity-50';
//             }

//             dayElements.push(
//                 <div 
//                     key={i} 
//                     className={dayClass}
//                     onClick={() => setSelectedDay(selectedDay === i ? null : i)}
//                 >
//                     <div className="text-center font-semibold">{i}</div>
//                     {hasEvent && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-80 animate-pulse"></div>
//                     )}
//                     {hasEvent && (
//                       <div className="absolute inset-0 bg-white bg-opacity-20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                     )}
//                 </div>
//             );
//         }
//     }
//     return dayElements;
//   };

//   const WeatherWidget = () => (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg border border-blue-200">
//       <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
//         <CloudRain className="mr-2" size={24} />
//         Weather Today
//       </h3>
//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex items-center space-x-3">
//           <Thermometer className="text-red-500" size={20} />
//           <div>
//             <p className="text-sm text-gray-600">Temperature</p>
//             <p className="font-bold text-lg">{weatherData.temp}°C</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Droplets className="text-blue-500" size={20} />
//           <div>
//             <p className="text-sm text-gray-600">Humidity</p>
//             <p className="font-bold text-lg">{weatherData.humidity}%</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-3">
//           <CloudRain className="text-gray-500" size={20} />
//           <div>
//             <p className="text-sm text-gray-600">Rainfall</p>
//             <p className="font-bold text-lg">{weatherData.rainfall}mm</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Wind className="text-green-500" size={20} />
//           <div>
//             <p className="text-sm text-gray-600">Wind Speed</p>
//             <p className="font-bold text-lg">{weatherData.windSpeed} km/h</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CropTips = () => (
//     <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-green-200">
//       <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
//         <Sprout className="mr-2" size={24} />
//         Crop Tips for {selectedCrop}
//       </h3>
//       <div className="space-y-3 text-sm text-green-700">
//         <div className="flex items-start space-x-2">
//           <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
//           <p>Ensure proper soil drainage before sowing season</p>
//         </div>
//         <div className="flex items-start space-x-2">
//           <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
//           <p>Monitor weather conditions for optimal planting time</p>
//         </div>
//         <div className="flex items-start space-x-2">
//           <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
//           <p>Apply organic fertilizers 2 weeks before sowing</p>
//         </div>
//         <div className="flex items-start space-x-2">
//           <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
//           <p>Regular pest monitoring during growing season</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             Smart Crop Calendar
//           </h1>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Intelligent farming guidance powered by AI - optimize your crop cycles for maximum yield
//           </p>
//         </div>

//         {/* Controls */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                 <Wheat className="mr-2" size={16} />
//                 Select Crop
//               </label>
//               <select 
//                 value={selectedCrop}
//                 onChange={(e) => setSelectedCrop(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300"
//               >
//                 {cropOptions.map(crop => (
//                   <option key={crop} value={crop}>{crop}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                 <MapPin className="mr-2" size={16} />
//                 Select Location
//               </label>
//               <select 
//                 value={selectedLocation}
//                 onChange={(e) => setSelectedLocation(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300"
//               >
//                 {locationOptions.map(location => (
//                   <option key={location} value={location}>{location}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">View Mode</label>
//               <div className="flex space-x-2">
//                 {['calendar', 'analytics', 'tips'].map(mode => (
//                   <button
//                     key={mode}
//                     onClick={() => setViewMode(mode)}
//                     className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 ${
//                       viewMode === mode 
//                         ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
//                         : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                     }`}
//                   >
//                     {mode}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button 
//                 onClick={handlePrevMonth}
//                 className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
//               >
//                 ←
//               </button>
//               <button 
//                 onClick={handleNextMonth}
//                 className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md"
//               >
//                 →
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
//           {/* Main Calendar */}
//           <div className="xl:col-span-3">
//             <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
//               <div className="flex justify-between items-center mb-8">
//                 <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center">
//                   <Calendar className="mr-3 text-green-600" size={32} />
//                   {monthDisplay} {yearDisplay}
//                 </h2>
//                 <div className="text-right">
//                   <p className="text-sm text-gray-600">Showing calendar for</p>
//                   <p className="font-bold text-lg text-gray-800">{selectedCrop} in {selectedLocation}</p>
//                 </div>
//               </div>

//               {/* Days of week header */}
//               <div className="grid grid-cols-7 gap-2 mb-4">
//                 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
//                   <div key={day} className="p-3 text-center text-sm font-bold text-gray-500 uppercase tracking-wider">
//                     {day}
//                   </div>
//                 ))}
//               </div>

//               {/* Calendar Days */}
//               <div className="grid grid-cols-7 gap-2 mb-8">
//                 {renderDays()}
//               </div>

//               {/* Legend */}
//               <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
//                 <h4 className="text-lg font-bold mb-4 text-gray-800">Legend</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-md"></div>
//                     <span className="font-medium">Sowing Season</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md"></div>
//                     <span className="font-medium">Harvesting Season</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-md"></div>
//                     <span className="font-medium">Both Sowing & Harvesting</span>
//                   </div>
//                 </div>

//                 {seasonsData.length > 0 && (
//                   <div className="mt-6 pt-6 border-t border-gray-300">
//                     <h5 className="font-bold text-gray-700 mb-3">Cultivation Seasons:</h5>
//                     <div className="space-y-2">
//                       {seasonsData.map((season, index) => (
//                         <div key={index} className="bg-white p-3 rounded-lg shadow-sm border">
//                           <div className="font-semibold text-green-700">{season.name}</div>
//                           <div className="text-sm text-gray-600 mt-1">
//                             <span className="inline-block mr-4">
//                               🌱 Sowing: {season.sowing_start_month} - {season.sowing_end_month}
//                             </span>
//                             <span className="inline-block">
//                               🌾 Harvesting: {season.harvesting_start_month} - {season.harvesting_end_month}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             <WeatherWidget />
//             <CropTips />
            
//             {/* Quick Stats */}
//             <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl shadow-lg border border-purple-200">
//               <h3 className="text-xl font-bold text-purple-800 mb-4">Quick Stats</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-purple-700">Total Seasons</span>
//                   <span className="font-bold text-lg bg-purple-200 px-3 py-1 rounded-lg">{seasonsData.length}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-purple-700">Current Month Activity</span>
//                   <span className="font-bold text-lg bg-purple-200 px-3 py-1 rounded-lg">
//                     {seasonsData.some(season => 
//                       checkMonthRange(season.sowing_start_month, season.sowing_end_month, season.harvesting_start_month, season.harvesting_end_month, currentDate.getMonth()).isSowing
//                     ) ? '🌱' : seasonsData.some(season => 
//                       checkMonthRange(season.sowing_start_month, season.sowing_end_month, season.harvesting_start_month, season.harvesting_end_month, currentDate.getMonth()).isHarvesting
//                     ) ? '🌾' : '🔄'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CropCalendarDashboard;



// egnjkbkjbv-----------------------------------

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Sprout, Wheat, CloudRain, Sun, Thermometer, Droplets, Wind, TrendingUp, BarChart3, AlertCircle, CheckCircle, Target, Award, Users, DollarSign } from 'lucide-react';

// Mock Gemini API for demo (replace with actual implementation)
const mockGeminiAPI = {
  getGenerativeModel: () => ({
    generateContent: async (prompt) => ({
      response: {
        text: () => {
          const crops = {
            rice: [
              {
                name: "Kharif Season",
                sowing_start_month: "June",
                sowing_end_month: "July",
                harvesting_start_month: "November",
                harvesting_end_month: "December"
              },
              {
                name: "Rabi Season", 
                sowing_start_month: "December",
                sowing_end_month: "January",
                harvesting_start_month: "April",
                harvesting_end_month: "May"
              }
            ],
            wheat: [
              {
                name: "Rabi Season",
                sowing_start_month: "November",
                sowing_end_month: "December",
                harvesting_start_month: "March",
                harvesting_end_month: "April"
              }
            ],
            tomato: [
              {
                name: "Winter Season",
                sowing_start_month: "October",
                sowing_end_month: "November",
                harvesting_start_month: "January",
                harvesting_end_month: "March"
              },
              {
                name: "Summer Season",
                sowing_start_month: "February",
                sowing_end_month: "March",
                harvesting_start_month: "May",
                harvesting_end_month: "June"
              }
            ]
          };
          
          const cropKey = prompt.toLowerCase().includes('rice') ? 'rice' : 
                         prompt.toLowerCase().includes('wheat') ? 'wheat' :
                         prompt.toLowerCase().includes('tomato') ? 'tomato' : 'rice';
          
          return JSON.stringify(crops[cropKey]);
        }
      }
    })
  })
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const getMonthNumber = (monthName) => monthNames.indexOf(monthName);
const getMonthName = (monthNumber) => monthNames[monthNumber];

const CropCalendarDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [seasonsData, setSeasonsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("Rice");
  const [selectedLocation, setSelectedLocation] = useState("Kerala");
  const [weatherData, setWeatherData] = useState({
    temp: 28,
    humidity: 75,
    rainfall: 12,
    windSpeed: 8
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const [viewMode, setViewMode] = useState('calendar');
  const [animateStats, setAnimateStats] = useState(false);

  const cropOptions = ["Rice", "Wheat", "Tomato", "Cotton", "Maize", "Sugarcane"];
  const locationOptions = ["Kerala", "Punjab", "Maharashtra", "Tamil Nadu", "Karnataka", "Gujarat"];

  // Mock analytics data
  const analyticsData = {
    yieldTrends: [
      { month: 'Jan', yield: 45, rainfall: 20 },
      { month: 'Feb', yield: 52, rainfall: 15 },
      { month: 'Mar', yield: 48, rainfall: 25 },
      { month: 'Apr', yield: 61, rainfall: 40 },
      { month: 'May', yield: 55, rainfall: 60 },
      { month: 'Jun', yield: 67, rainfall: 85 },
      { month: 'Jul', yield: 72, rainfall: 120 },
      { month: 'Aug', yield: 68, rainfall: 110 },
      { month: 'Sep', yield: 64, rainfall: 90 },
      { month: 'Oct', yield: 58, rainfall: 45 },
      { month: 'Nov', yield: 51, rainfall: 30 },
      { month: 'Dec', yield: 47, rainfall: 22 }
    ],
    marketData: {
      currentPrice: 2850,
      priceChange: 5.2,
      demand: 'High',
      supply: 'Moderate'
    },
    farmStats: {
      totalFarmers: 12500,
      activeFarms: 8900,
      avgYield: 58.3,
      profitMargin: 23.7
    }
  };

  // Tips data for different crops
  const tipsData = {
    Rice: [
      { 
        category: "Soil Preparation", 
        icon: "🌱", 
        tips: [
          "Maintain soil pH between 5.5-7.0 for optimal growth",
          "Ensure proper field leveling to prevent water stagnation",
          "Apply organic matter 2-3 weeks before transplanting",
          "Test soil for nutrient deficiencies annually"
        ]
      },
      { 
        category: "Water Management", 
        icon: "💧", 
        tips: [
          "Maintain 2-5cm water level during vegetative growth",
          "Drain field 10 days before harvest",
          "Use alternate wetting and drying technique to save water",
          "Monitor water quality regularly for salinity"
        ]
      },
      { 
        category: "Pest Control", 
        icon: "🐛", 
        tips: [
          "Scout fields weekly for pest presence",
          "Use pheromone traps for stem borer monitoring",
          "Apply neem-based pesticides for organic control",
          "Maintain beneficial insects habitat around fields"
        ]
      },
      { 
        category: "Harvesting", 
        icon: "🌾", 
        tips: [
          "Harvest when 80% grains turn golden yellow",
          "Cut crops early morning to reduce grain shattering",
          "Dry grains to 14% moisture content before storage",
          "Use proper cleaning methods to maintain quality"
        ]
      }
    ],
    Wheat: [
      { 
        category: "Sowing", 
        icon: "🌱", 
        tips: [
          "Sow when soil temperature is 10-12°C",
          "Use certified seeds with 85% germination rate",
          "Maintain row spacing of 20-25cm",
          "Apply starter fertilizer at sowing time"
        ]
      },
      { 
        category: "Irrigation", 
        icon: "💧", 
        tips: [
          "First irrigation 20-25 days after sowing",
          "Apply light frequent irrigations during grain filling",
          "Avoid irrigation during flowering to prevent lodging",
          "Stop irrigation 10-15 days before harvest"
        ]
      }
    ],
    Tomato: [
      { 
        category: "Transplanting", 
        icon: "🌱", 
        tips: [
          "Transplant seedlings at 4-6 week age",
          "Choose disease-free, sturdy seedlings",
          "Transplant during cool hours of the day",
          "Water immediately after transplanting"
        ]
      },
      { 
        category: "Support Systems", 
        icon: "🏗️", 
        tips: [
          "Install stakes or cages early in growth",
          "Use soft ties to avoid stem damage",
          "Prune suckers regularly for better fruit quality",
          "Maintain 60cm spacing between plants"
        ]
      }
    ]
  };

  useEffect(() => {
    setAnimateStats(true);
    const timer = setTimeout(() => setAnimateStats(false), 1000);
    return () => clearTimeout(timer);
  }, [selectedCrop, selectedLocation, viewMode]);

  useEffect(() => {
    const fetchSeasonsData = async () => {
      setLoading(true);
      setSeasonsData([]);
      
      const model = mockGeminiAPI.getGenerativeModel();
      
      const prompt = `Provide all major cultivation seasons for ${selectedCrop} in ${selectedLocation}.`;
      
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        const jsonString = response.text().replace(/```json|```/g, '').trim();
        const parsedData = JSON.parse(jsonString);

        if (Array.isArray(parsedData)) {
            setSeasonsData(parsedData);
        } else {
            setSeasonsData([]);
        }

      } catch (error) {
        console.error("Error fetching season data:", error);
        setSeasonsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonsData();
  }, [selectedCrop, selectedLocation]);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getStartingDay = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const startingDay = getStartingDay(currentDate.getFullYear(), currentDate.getMonth());
  const monthDisplay = getMonthName(currentDate.getMonth());
  const yearDisplay = currentDate.getFullYear();

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const checkMonthRange = (sowingStart, sowingEnd, harvestStart, harvestEnd, monthNum) => {
    const sowingStartNum = getMonthNumber(sowingStart);
    const sowingEndNum = getMonthNumber(sowingEnd);
    const harvestStartNum = getMonthNumber(harvestStart);
    const harvestEndNum = getMonthNumber(harvestEnd);
  
    if (sowingStart === "All Year") {
      return { isSowing: true, isHarvesting: true };
    }
  
    const isSowing = sowingStartNum <= sowingEndNum
      ? (monthNum >= sowingStartNum && monthNum <= sowingEndNum)
      : (monthNum >= sowingStartNum || monthNum <= sowingEndNum);
    
    const isHarvesting = harvestStartNum <= harvestEndNum
      ? (monthNum >= harvestStartNum && monthNum <= harvestEndNum)
      : (monthNum >= harvestStartNum || monthNum <= harvestEndNum);
  
    return { isSowing, isHarvesting };
  };

  const renderDays = () => {
    const dayElements = [];
    const blankDays = startingDay === 0 ? 6 : startingDay - 1;

    for (let i = 0; i < blankDays; i++) {
      dayElements.push(<div key={`blank-${i}`} className="p-3"></div>);
    }

    if (loading) {
        for (let i = 1; i <= daysInMonth; i++) {
          dayElements.push(
            <div key={i} className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse">
              <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
          );
        }
    } else {
        for (let i = 1; i <= daysInMonth; i++) {
            const { isSowing, isHarvesting } = seasonsData.length > 0 
              ? seasonsData.reduce((acc, season) => {
                  const result = checkMonthRange(
                    season.sowing_start_month, 
                    season.sowing_end_month, 
                    season.harvesting_start_month, 
                    season.harvesting_end_month, 
                    currentDate.getMonth()
                  );
                  return {
                    isSowing: acc.isSowing || result.isSowing,
                    isHarvesting: acc.isHarvesting || result.isHarvesting
                  };
                }, { isSowing: false, isHarvesting: false })
              : { isSowing: false, isHarvesting: false };

            let dayClass = "p-3 rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-110 hover:rotate-3 relative group animate-fadeInUp";
            let bgClass = "";
            let hasEvent = isSowing || isHarvesting;

            if (hasEvent) {
                if (isSowing && isHarvesting) {
                  bgClass = "bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 text-white shadow-xl hover:shadow-2xl";
                } else if (isSowing) {
                  bgClass = "bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-xl hover:shadow-2xl";
                } else {
                  bgClass = "bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl hover:shadow-2xl";
                }
                dayClass += ` ${bgClass} font-bold`;
            } else {
                dayClass += ' text-gray-700 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100 hover:shadow-lg';
            }

            if (selectedDay === i) {
              dayClass += ' ring-4 ring-purple-500 ring-opacity-50 animate-pulse-ring';
            }

            dayElements.push(
                <div 
                    key={i} 
                    className={dayClass}
                    style={{ animationDelay: `${(i % 7) * 0.1}s` }}
                    onClick={() => setSelectedDay(selectedDay === i ? null : i)}
                >
                    <div className="text-center font-semibold relative z-10">{i}</div>
                    {hasEvent && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full opacity-80 animate-ping"></div>
                    )}
                    {hasEvent && (
                      <div className="absolute inset-0 bg-white bg-opacity-20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm"></div>
                    )}
                    {hasEvent && (
                      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"></div>
                    )}
                </div>
            );
        }
    }
    return dayElements;
  };

  const WeatherWidget = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg border border-blue-200 transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fadeInRight">
      <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
        <CloudRain className="mr-2" size={24} />
        Weather Today
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
          <Thermometer className="text-red-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Temperature</p>
            <p className="font-bold text-lg animate-countUp">{weatherData.temp}°C</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
          <Droplets className="text-blue-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="font-bold text-lg animate-countUp">{weatherData.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
          <CloudRain className="text-gray-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Rainfall</p>
            <p className="font-bold text-lg animate-countUp">{weatherData.rainfall}mm</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
          <Wind className="text-green-500" size={20} />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="font-bold text-lg animate-countUp">{weatherData.windSpeed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );

  const Analytics = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-green-200 transform transition-all duration-500 hover:scale-105 animate-slideInUp">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="text-green-600 animate-bounce" size={32} />
            <span className="text-green-600 text-sm font-semibold">+{analyticsData.marketData.priceChange}%</span>
          </div>
          <h3 className="text-lg font-bold text-green-800 mb-2">Market Price</h3>
          <p className="text-2xl font-bold text-green-900 animate-countUp">₹{analyticsData.marketData.currentPrice}</p>
          <p className="text-sm text-green-600 mt-1">per quintal</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-2xl shadow-lg border border-blue-200 transform transition-all duration-500 hover:scale-105 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-4">
            <Users className="text-blue-600 animate-pulse" size={32} />
            <TrendingUp className="text-blue-600" size={20} />
          </div>
          <h3 className="text-lg font-bold text-blue-800 mb-2">Active Farmers</h3>
          <p className="text-2xl font-bold text-blue-900 animate-countUp">{analyticsData.farmStats.activeFarms.toLocaleString()}</p>
          <p className="text-sm text-blue-600 mt-1">out of {analyticsData.farmStats.totalFarmers.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl shadow-lg border border-purple-200 transform transition-all duration-500 hover:scale-105 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <Target className="text-purple-600 animate-spin-slow" size={32} />
            <span className="text-purple-600 text-sm font-semibold">Avg</span>
          </div>
          <h3 className="text-lg font-bold text-purple-800 mb-2">Yield Rate</h3>
          <p className="text-2xl font-bold text-purple-900 animate-countUp">{analyticsData.farmStats.avgYield}</p>
          <p className="text-sm text-purple-600 mt-1">quintals/acre</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-100 p-6 rounded-2xl shadow-lg border border-orange-200 transform transition-all duration-500 hover:scale-105 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4">
            <Award className="text-orange-600 animate-bounce" size={32} />
            <span className="text-orange-600 text-sm font-semibold">ROI</span>
          </div>
          <h3 className="text-lg font-bold text-orange-800 mb-2">Profit Margin</h3>
          <p className="text-2xl font-bold text-orange-900 animate-countUp">{analyticsData.farmStats.profitMargin}%</p>
          <p className="text-sm text-orange-600 mt-1">average return</p>
        </div>
      </div>

      {/* Yield Trends Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 animate-fadeInUp">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <BarChart3 className="mr-3 text-green-600 animate-pulse" size={28} />
            Yield & Rainfall Analysis
          </h3>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded animate-pulse"></div>
              <span className="text-sm font-medium">Yield (Quintals)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded animate-pulse"></div>
              <span className="text-sm font-medium">Rainfall (mm)</span>
            </div>
          </div>
        </div>
        
        {/* Simple Bar Chart */}
        <div className="grid grid-cols-12 gap-2 items-end h-64">
          {analyticsData.yieldTrends.map((data, index) => (
            <div key={data.month} className="flex flex-col items-center space-y-2">
              <div className="flex flex-col items-center space-y-1 w-full">
                <div 
                  className="bg-gradient-to-t from-green-400 to-green-600 rounded-t transform transition-all duration-1000 hover:scale-110 animate-growUp"
                  style={{ 
                    height: `${(data.yield / 80) * 100}%`,
                    animationDelay: `${index * 0.1}s`,
                    minHeight: '10px',
                    width: '60%'
                  }}
                ></div>
                <div 
                  className="bg-gradient-to-t from-blue-400 to-blue-600 rounded-t transform transition-all duration-1000 hover:scale-110 animate-growUp"
                  style={{ 
                    height: `${(data.rainfall / 150) * 80}%`,
                    animationDelay: `${index * 0.1 + 0.5}s`,
                    minHeight: '8px',
                    width: '40%'
                  }}
                ></div>
              </div>
              <span className="text-xs font-medium text-gray-600 transform transition-all duration-300 hover:scale-110">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-green-200 animate-fadeInLeft">
          <h4 className="text-xl font-bold text-green-800 mb-4 flex items-center">
            <CheckCircle className="mr-2 text-green-600 animate-spin-slow" size={24} />
            Key Insights
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 transform transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
              <p className="text-green-700">Peak yield achieved during monsoon months (Jun-Aug)</p>
            </div>
            <div className="flex items-start space-x-3 transform transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
              <p className="text-green-700">Strong correlation between rainfall and yield productivity</p>
            </div>
            <div className="flex items-start space-x-3 transform transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
              <p className="text-green-700">Market prices show seasonal fluctuation pattern</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-2xl shadow-lg border border-yellow-200 animate-fadeInRight">
          <h4 className="text-xl font-bold text-orange-800 mb-4 flex items-center">
            <AlertCircle className="mr-2 text-orange-600 animate-bounce" size={24} />
            Recommendations
          </h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 transform transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
              <p className="text-orange-700">Consider early sowing for better market timing</p>
            </div>
            <div className="flex items-start space-x-3 transform transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
              <p className="text-orange-700">Implement water conservation during low rainfall periods</p>
            </div>
            <div className="flex items-start space-x-3 transform transition-all duration-300 hover:scale-105">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse"></div>
              <p className="text-orange-700">Monitor pest activity during high humidity months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Tips = () => {
    const currentTips = tipsData[selectedCrop] || tipsData.Rice;
    
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-slideInDown">
            Expert Tips for {selectedCrop} Cultivation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fadeIn">
            Professional guidance and best practices to maximize your {selectedCrop.toLowerCase()} yield and quality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentTips.map((category, categoryIndex) => (
            <div 
              key={category.category} 
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slideInUp"
              style={{ animationDelay: `${categoryIndex * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4 animate-bounce" style={{ animationDelay: `${categoryIndex * 0.1}s` }}>
                  {category.icon}
                </span>
                <h3 className="text-xl font-bold text-gray-800">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.tips.map((tip, tipIndex) => (
                  <div 
                    key={tipIndex}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-md animate-fadeInLeft"
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (tipIndex * 0.1)}s` }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-blue-200 animate-fadeInUp">
          <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
            <Sprout className="mr-3 animate-pulse" size={28} />
            Additional Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-bold text-blue-800 mb-2">Learning Materials</h4>
              <p className="text-blue-600 text-sm">Access comprehensive guides and tutorials</p>
            </div>
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl">🌐</span>
              </div>
              <h4 className="font-bold text-blue-800 mb-2">Community Forum</h4>
              <p className="text-blue-600 text-sm">Connect with fellow farmers and experts</p>
            </div>
            <div className="text-center transform transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl">📱</span>
              </div>
              <h4 className="font-bold text-blue-800 mb-2">Mobile App</h4>
              <p className="text-blue-600 text-sm">Get real-time alerts and notifications</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CropTips = () => (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-green-200 transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fadeInRight">
      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
        <Sprout className="mr-2" size={24} />
        Quick Tips for {selectedCrop}
      </h3>
      <div className="space-y-3 text-sm text-green-700">
        <div className="flex items-start space-x-2 transform transition-all duration-300 hover:scale-105">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
          <p>Ensure proper soil drainage before sowing season</p>
        </div>
        <div className="flex items-start space-x-2 transform transition-all duration-300 hover:scale-105">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
          <p>Monitor weather conditions for optimal planting time</p>
        </div>
        <div className="flex items-start space-x-2 transform transition-all duration-300 hover:scale-105">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
          <p>Apply organic fertilizers 2 weeks before sowing</p>
        </div>
        <div className="flex items-start space-x-2 transform transition-all duration-300 hover:scale-105">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
          <p>Regular pest monitoring during growing season</p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(viewMode) {
      case 'analytics':
        return <Analytics />;
      case 'tips':
        return <Tips />;
      default:
        return (
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 animate-fadeIn">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent flex items-center">
                  <Calendar className="mr-3 text-green-600 animate-pulse" size={32} />
                  {monthDisplay} {yearDisplay}
                </h2>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Showing calendar for</p>
                  <p className="font-bold text-lg text-gray-800">{selectedCrop} in {selectedLocation}</p>
                </div>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="p-3 text-center text-sm font-bold text-gray-500 uppercase tracking-wider animate-fadeInDown" style={{ animationDelay: `${index * 0.1}s` }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2 mb-8">
                {renderDays()}
              </div>

              {/* Legend */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 animate-fadeInUp">
                <h4 className="text-lg font-bold mb-4 text-gray-800">Legend</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-md animate-pulse"></div>
                    <span className="font-medium">Sowing Season</span>
                  </div>
                  <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-md animate-pulse"></div>
                    <span className="font-medium">Harvesting Season</span>
                  </div>
                  <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
                    <div className="w-6 h-6 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-md animate-pulse"></div>
                    <span className="font-medium">Both Sowing & Harvesting</span>
                  </div>
                </div>

                {seasonsData.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-300">
                    <h5 className="font-bold text-gray-700 mb-3">Cultivation Seasons:</h5>
                    <div className="space-y-2">
                      {seasonsData.map((season, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg shadow-sm border transform transition-all duration-300 hover:scale-105 animate-slideInLeft" style={{ animationDelay: `${index * 0.1}s` }}>
                          <div className="font-semibold text-green-700">{season.name}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            <span className="inline-block mr-4">
                              🌱 Sowing: {season.sowing_start_month} - {season.sowing_end_month}
                            </span>
                            <span className="inline-block">
                              🌾 Harvesting: {season.harvesting_start_month} - {season.harvesting_end_month}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes bounce-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        @keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); } 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes growUp { from { height: 0; } to { height: 100%; } }
        @keyframes countUp { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out; }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out; }
        .animate-fadeInRight { animation: fadeInRight 0.6s ease-out; }
        .animate-slideInUp { animation: slideInUp 0.6s ease-out; }
        .animate-slideInDown { animation: slideInDown 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-bounce-gentle { animation: bounce-gentle 2s infinite; }
        .animate-pulse-ring { animation: pulse-ring 2s infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-growUp { animation: growUp 1.5s ease-out; }
        .animate-countUp { animation: countUp 0.8s ease-out; }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fadeInDown">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 animate-pulse">
            Smart Crop Calendar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Intelligent farming guidance powered by AI - optimize your crop cycles for maximum yield
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 animate-slideInUp">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Wheat className="mr-2" size={16} />
                Select Crop
              </label>
              <select 
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 transition-all duration-300 transform hover:scale-105"
              >
                {cropOptions.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <MapPin className="mr-2" size={16} />
                Select Location
              </label>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-300 transform hover:scale-105"
              >
                {locationOptions.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">View Mode</label>
              <div className="flex space-x-2">
                {['calendar', 'analytics', 'tips'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 transform hover:scale-105 ${
                      viewMode === mode 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={handlePrevMonth}
                className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
              >
                ←
              </button>
              <button 
                onClick={handleNextMonth}
                className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
              >
                →
              </button>
            </div>
          </div>
        </div>

        <div className={`grid gap-6 ${viewMode === 'calendar' ? 'grid-cols-1 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {/* Main Content */}
          {renderContent()}

          {/* Sidebar (only show in calendar view) */}
          {viewMode === 'calendar' && (
            <div className="space-y-6">
              <WeatherWidget />
              <CropTips />
              
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl shadow-lg border border-purple-200 transform transition-all duration-500 hover:scale-105 hover:shadow-xl animate-fadeInRight">
                <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <BarChart3 className="mr-2 animate-spin-slow" size={24} />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center transform transition-all duration-300 hover:scale-105">
                    <span className="text-purple-700">Total Seasons</span>
                    <span className={`font-bold text-lg bg-purple-200 px-3 py-1 rounded-lg transition-all duration-500 ${animateStats ? 'animate-bounce' : ''}`}>
                      {seasonsData.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center transform transition-all duration-300 hover:scale-105">
                    <span className="text-purple-700">Current Activity</span>
                    <span className={`font-bold text-lg bg-purple-200 px-3 py-1 rounded-lg transition-all duration-500 ${animateStats ? 'animate-spin' : ''}`}>
                      {seasonsData.some(season => 
                        checkMonthRange(season.sowing_start_month, season.sowing_end_month, season.harvesting_start_month, season.harvesting_end_month, currentDate.getMonth()).isSowing
                      ) ? '🌱' : seasonsData.some(season => 
                        checkMonthRange(season.sowing_start_month, season.sowing_end_month, season.harvesting_start_month, season.harvesting_end_month, currentDate.getMonth()).isHarvesting
                      ) ? '🌾' : '🔄'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>  
  );
};

export default CropCalendarDashboard;













