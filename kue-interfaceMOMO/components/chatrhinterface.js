


// import React, { useState, useEffect, useRef, useCallback } from 'react';

// // Composants d'icônes modernes
// const DashboardIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor"/>
//   </svg>
// );

// const CandidatesIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" fill="currentColor"/>
//   </svg>
// );

// const SettingsIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5ZM19.43 13C19.47 12.67 19.5 12.34 19.5 12C19.5 11.66 19.47 11.33 19.43 11H21.54C21.73 11 21.82 10.76 21.67 10.63L19.67 8.63C19.57 8.54 19.42 8.59 19.39 8.71L18.82 11.19C18.38 10.86 17.89 10.59 17.37 10.39L17 7.83C17 7.73 16.92 7.65 16.82 7.65H14.18C14.07 7.65 14 7.73 14 7.83L13.62 10.39C13.11 10.59 12.62 10.86 12.18 11.19L11.61 8.71C11.58 8.59 11.43 8.54 11.33 8.63L9.33 10.63C9.18 10.76 9.27 11 9.46 11H11.57C11.53 11.33 11.5 11.66 11.5 12C11.5 12.34 11.53 12.67 11.57 13H9.46C9.27 13 9.18 13.24 9.33 13.37L11.33 15.37C11.43 15.46 11.58 15.41 11.61 15.29L12.18 12.81C12.62 13.14 13.11 13.41 13.63 13.61L14 16.17C14 16.27 14.08 16.35 14.18 16.35H16.82C16.92 16.35 17 16.27 17 16.17L17.37 13.61C17.89 13.41 18.38 13.14 18.82 12.81L19.39 15.29C19.42 15.41 19.57 15.46 19.67 15.37L21.67 13.37C21.82 13.24 21.73 13 21.54 13H19.43Z" fill="currentColor"/>
//   </svg>
// );

// const LogoutIcon = () => (
//   <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M17 16L21 12M21 12L17 8M21 12H7M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const ChatPanel = ({ 
//   messages, 
//   message, 
//   isRecording, 
//   loading, 
//   pdfStatus, 
//   onMessageChange, 
//   onSendMessage, 
//   onToggleRecording, 
//   onPdfUpload, 
//   onKeyPress, 
//   chatContainerRef,
//   onCloseChat 
// }) => {
//   const [showUploadStatus, setShowUploadStatus] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState({ text: '', type: '' });
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     if (pdfStatus.visible) {
//       setUploadStatus({ text: pdfStatus.text, type: 'info' });
//       setShowUploadStatus(true);
      
//       const timer = setTimeout(() => {
//         setShowUploadStatus(false);
//       }, 4000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [pdfStatus]);

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     setSelectedFile(file);
    
//     // Ajouter un message avec les options dans le chat
//     const newMessage = {
//       type: "file_options",
//       text: "Que voulez-vous générer à partir de ce PDF?",
//       options: [
//         { text: "Générer questionnaire pour entretien", api: "/generate-questions" },
//         { text: "Générer feuille de notation", api: "/generate-criteria" }
//       ],
//       fileName: file.name
//     };
    
//     onMessageChange({ target: { value: "" } }); // Réinitialiser le champ de message
//     onSendMessage(newMessage); // Utiliser la fonction existante pour ajouter le message
//   };

//   const handleOptionClick = async (apiEndpoint) => {
//     if (!selectedFile) return;
    
//     // Ajouter un message de chargement
//     const loadingMessage = {
//       sender: 'bot',
//       text: `Génération ${apiEndpoint === '/generate-questions' ? 'du questionnaire' : 'de la feuille de notation'} en cours...`,
//       isLoading: true
//     };
//     onSendMessage(loadingMessage);
    
//     const formData = new FormData();
//     formData.append("file", selectedFile);
    
//     if (apiEndpoint === "/generate-questions") {
//       formData.append("nb_questions", 5); // Valeur par défaut
//     }
    
//     try {
//       const response = await fetch(`http://localhost:8002${apiEndpoint}`, {
//         method: "POST",
//         body: formData
//       });
      
//       if (!response.ok) throw new Error("Erreur lors de la génération");
      
//       const data = await response.json();
      
//       // Ajouter la réponse au chat
//       const resultMessage = {
//         sender: 'bot',
//         text: apiEndpoint === "/generate-questions" 
//           ? "Questionnaire généré:\n\n" + data.questions.join("\n\n")
//           : "Feuille de notation générée:\n\n" + data.criteria
//       };
      
//       onSendMessage(resultMessage);
//     } catch (error) {
//       const errorMessage = {
//         sender: 'bot',
//         text: "Une erreur est survenue lors de la génération: " + error.message
//       };
//       onSendMessage(errorMessage);
//     } finally {
//       setSelectedFile(null); // Réinitialiser le fichier sélectionné
//     }
//   };

//   return (
//     <div className="fixed lg:relative bottom-0 right-0 w-full lg:w-96 bg-white border-t lg:border-l border-gray-200 flex flex-col" 
//          style={{ height: 'calc(105vh - 40px)' }}>
//       <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center border-b border-white/10">
//         <h1 className="text-lg font-semibold">Assistant RH Intelligent</h1>
//         <button 
//           onClick={onCloseChat} 
//           className="lg:hidden absolute right-4 top-4 text-white/80 hover:text-white"
//         >
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>

//       <div 
//         ref={chatContainerRef} 
//         className="flex-1 overflow-y-auto p-6 bg-gray-50"
//         style={{ scrollBehavior: 'smooth' }}
//       >
//         <div className="space-y-4">
//           {messages.map((msg, idx) => (
//             <div 
//               key={idx} 
//               className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
//               style={{ animation: 'fadeInUp 0.5s ease forwards' }}
//             >
//               {msg.type === "file_options" ? (
//                 <div className="max-w-[85%] bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100">
//                   <p className="text-sm text-gray-600 mb-2">{msg.text}</p>
//                   <p className="text-xs text-gray-400 mb-3">Fichier: {msg.fileName}</p>
//                   <div className="flex flex-col gap-2">
//                     {msg.options.map((option, i) => (
//                       <button
//                         key={i}
//                         onClick={() => handleOptionClick(option.api)}
//                         className="text-left p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm"
//                       >
//                         {option.text}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               ) : msg.isLoading ? (
//                 <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 max-w-[85%]">
//                   <div className="flex items-center gap-2">
//                     <div className="flex space-x-1">
//                       {[...Array(3)].map((_, i) => (
//                         <div 
//                           key={i}
//                           className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
//                           style={{ animationDelay: `${i * 0.2}s` }}
//                         />
//                       ))}
//                     </div>
//                     <span className="text-sm text-gray-500">{msg.text}</span>
//                   </div>
//                 </div>
//               ) : (
//                 <div 
//                   className={`max-w-[85%] p-4 rounded-2xl ${
//                     msg.sender === 'user' 
//                       ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none' 
//                       : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
//                   }`}
//                 >
//                   <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
//                 </div>
//               )}
//             </div>
//           ))}
          
//           {loading.chat && !messages.some(msg => msg.isLoading) && (
//             <div className="flex justify-start">
//               <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 max-w-[85%]">
//                 <div className="flex items-center gap-2">
//                   <div className="flex space-x-1">
//                     {[...Array(3)].map((_, i) => (
//                       <div 
//                         key={i}
//                         className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
//                         style={{ animationDelay: `${i * 0.2}s` }}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-500">L'assistant réfléchit...</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="p-4 border-t border-gray-200 bg-white">
//         <div className="relative flex gap-2 items-end">
//           <textarea
//             value={message}
//             onChange={onMessageChange}
//             onKeyDown={onKeyPress}
//             placeholder="Tapez votre message..."
//             className="flex-1 border-2 border-gray-200 rounded-xl p-3 pr-10 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-0 resize-none outline-none transition-all"
//             rows="1"
//             style={{ minHeight: '50px', maxHeight: '120px' }}
//             disabled={loading.chat}
//           />
          
//           <div className="absolute right-2 bottom-2 flex gap-1">
//             <button
//               onClick={() => document.getElementById('pdfUpload').click()}
//               className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//               disabled={loading.chat}
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-5-5-5 5" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12" />
//               </svg>
//             </button>
            
//             <button
//               onClick={() => onSendMessage({ sender: 'user', text: message })}
//               disabled={loading.chat || !message.trim()}
//               className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//               </svg>
//             </button>
//           </div>
//         </div>
        
//         <input 
//           type="file" 
//           id="pdfUpload" 
//           className="hidden" 
//           accept=".pdf" 
//           onChange={handleFileChange}
//         />
//       </div>

//       {showUploadStatus && (
//         <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white text-sm ${
//           uploadStatus.type === 'error' ? 'bg-red-500' : 'bg-green-500'
//         } transition-all duration-300 ease-in-out`}>
//           {uploadStatus.text}
//         </div>
//       )}
      
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// const StatCard = React.memo(({ title, value, icon, description }) => (
//   <div className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-start h-full group">
//     <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 mr-4 group-hover:bg-indigo-100 transition-colors">
//       {icon}
//     </div>
//     <div>
//       <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
//       <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
//       {description && <p className="text-xs text-gray-400 mt-2">{description}</p>}
//     </div>
//   </div>
// ));

// const PDFCarousel = ({ candidates, onViewCV }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const intervalRef = useRef();
  
//   useEffect(() => {
//     intervalRef.current = setInterval(() => {
//       setCurrentIndex(prev => (prev === candidates.length - 1 ? 0 : prev + 1));
//     }, 5000);
    
//     return () => clearInterval(intervalRef.current);
//   }, [candidates.length]);

//   if (!candidates || candidates.length === 0) return null;

//   const nextSlide = () => {
//     clearInterval(intervalRef.current);
//     setCurrentIndex(prev => (prev === candidates.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     clearInterval(intervalRef.current);
//     setCurrentIndex(prev => (prev === 0 ? candidates.length - 1 : prev - 1));
//   };

//   return (
//       <div className="mt-4 bg-white p-4 rounded-xl border border-gray-100" style={{ maxHeight: '300px' }}>
//       <h3 className="text-lg font-semibold mb-4 text-gray-800">Candidatures reçues</h3>
//       <div className="relative">
//         <div className="flex overflow-hidden">
//           {candidates.map((candidate, index) => (
//             <div 
//               key={index}
//               className={`w-full flex-shrink-0 transition-transform duration-500 ease-in-out ${
//                 index === currentIndex ? 'block' : 'hidden'
//               }`}
//             >
//               <div className="flex flex-col md:flex-row gap-6 items-center">
//                 <div className="w-full md:w-1/3 bg-gray-100 h-48 flex items-center justify-center rounded-lg">
//                   <div className="text-center p-4">
//                     <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
//                     </svg>
//                     <p className="text-gray-500 mt-2 text-sm">{candidate.nom || 'Candidat'}.pdf</p>
//                   </div>
//                 </div>
//                 <div className="w-full md:w-2/3">
//                   <h4 className="font-bold text-lg text-gray-800">{candidate.nom || 'Candidat sans nom'}</h4>
//                   <div className="flex items-center gap-2 mt-1 mb-3">
//                     <span className="font-medium text-gray-500">Score:</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-bold ${
//                       candidate.score > 70 ? 'bg-green-100 text-green-800' :
//                       candidate.score > 50 ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-red-100 text-red-800'
//                     }`}>
//                       {candidate.score}%
//                     </span>
//                   </div>
//                   <button
//                     onClick={() => onViewCV(candidate)}
//                     className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 mt-2 transition-colors gap-2"
//                   >
//                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
//                     </svg>
//                     Ouvrir le CV complet
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <button 
//           onClick={prevSlide}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-50 transition-colors"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <button 
//           onClick={nextSlide}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-50 transition-colors"
//         >
//           <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//         <div className="flex justify-center mt-6 space-x-2">
//           {candidates.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 clearInterval(intervalRef.current);
//                 setCurrentIndex(index);
//               }}
//               className={`w-2.5 h-2.5 rounded-full transition-colors ${
//                 index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const MainContent = ({ 
//   view, 
//   error, 
//   stats, 
//   candidates, 
//   loading, 
//   onViewChange, 
//   onRefresh,
//   API_BASE_URL 
// }) => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);

//   const parseJustificatifs = (justificatifs) => {
//     if (!justificatifs || typeof justificatifs === 'string') {
//       return {
//         analyse: justificatifs || "Analyse non disponible",
//         correspondances: [],
//         ecarts: [],
//         recommandation: { note: 0, explication: "" }
//       };
//     }
    
//     return {
//       analyse: justificatifs.analyse_generale || "Analyse non disponible",
//       correspondances: justificatifs.correspondances || [],
//       ecarts: justificatifs.ecarts || [],
//       recommandation: justificatifs.recommandation || { note: 0, explication: "" }
//     };
//   };

//   const handleViewCV = (candidate) => {
//     const cvPath = candidate.cv_url;
//     if (cvPath) {
//       window.open(`${API_BASE_URL}${cvPath}`, '_blank');
//     } else {
//       alert("Le CV de ce candidat n'est pas disponible");
//     }
//   };

//   return (
//     <div className="flex-1 p-6 overflow-auto bg-gray-50">
//       {error && (
//         <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg">
//           <p>{error}</p>
//         </div>
//       )}

//       {view === 'dashboard' && (
//         <div className="space-y-6">
//           {/* Section Statistiques */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//             <StatCard 
//               title="Total candidats" 
//               value={stats.totalCandidates} 
//               icon={<CandidatesIcon />}
//               description="Nombre total de CV analysés"
//             />
//             <StatCard 
//               title="Score moyen" 
//               value={`${stats.avgScore}%`} 
//               icon={<DashboardIcon />}
//               description="Moyenne des scores"
//             />
//             <StatCard 
//               title="Candidats évalués" 
//               value={candidates.length} 
//               icon={<CandidatesIcon />}
//               description="Tous les candidats"
//             />
//           </div>

//           {/* Section Meilleurs profils simplifiée */}
//           <div className="bg-white p-6 rounded-xl border border-gray-100">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold text-gray-800">Meilleurs profils</h2>
//               <button 
//                 onClick={() => onViewChange('candidates')}
//                 className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
//               >
//                 Voir tous →
//               </button>
//             </div>

//             {loading.candidates ? (
//               <div className="flex justify-center py-4">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
//               </div>
//             ) : candidates.length > 0 ? (
//               <div className="space-y-3">
//                 {candidates.slice(0, 2).map((candidate, index) => (
//                   <div key={index} className="group cursor-pointer" onClick={() => setSelectedCandidate(candidate)}>
//                     <div className="flex justify-between items-center mb-1">
//                       <h3 className="font-medium text-gray-800">{candidate.nom || 'Candidat sans nom'}</h3>
//                       <span className={`text-xs font-medium ${
//                         candidate.score > 70 ? 'text-green-600' :
//                         candidate.score > 50 ? 'text-yellow-600' : 
//                         'text-red-600'
//                       }`}>
//                         {candidate.score}%
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-1.5">
//                       <div 
//                         className={`h-full rounded-full ${
//                           candidate.score > 70 ? 'bg-green-500' :
//                           candidate.score > 50 ? 'bg-yellow-500' : 
//                           'bg-red-500'
//                         }`} 
//                         style={{ width: `${candidate.score}%` }}
//                       />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm py-2">Aucun candidat évalué</p>
//             )}
//           </div>

//           {/* Section Candidatures reçues */}
//           <PDFCarousel 
//             candidates={candidates} 
//             onViewCV={handleViewCV}
//           />
//         </div>
//       )}

//       {view === 'candidates' && (
//         <div className="bg-white p-6 rounded-xl border border-gray-100">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-gray-800">Tous les candidats</h2>
//             <div className="flex gap-3">
//               <button 
//                 onClick={() => onViewChange('dashboard')}
//                 className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 transition-colors"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Retour
//               </button>
//               <button 
//                 onClick={onRefresh}
//                 disabled={loading.candidates}
//                 className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-1"
//               >
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Actualiser
//               </button>
//             </div>
//           </div>
          
//           {loading.candidates ? (
//             <div className="flex justify-center py-12">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {candidates.map((candidate, index) => (
//                     <tr key={index} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {candidate.nom || 'Candidat sans nom'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center gap-3 w-full">
//                           <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
//                             <div 
//                               className={`h-full rounded-full ${
//                                 candidate.score > 70 ? 'bg-green-400' : 
//                                 candidate.score > 50 ? 'bg-yellow-400' : 'bg-red-400'
//                               }`} 
//                               style={{ width: `${candidate.score}%` }}
//                             />
//                           </div>
//                           <span className={`text-sm font-semibold w-12 text-right ${
//                             candidate.score > 70 ? 'text-green-600' : 
//                             candidate.score > 50 ? 'text-yellow-600' : 'text-red-600'
//                           }`}>
//                             {candidate.score}%
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
//                         <button 
//                           onClick={() => setSelectedCandidate(candidate)}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           Détails
//                         </button>
//                         <span className="text-gray-300">|</span>
//                         <button 
//                           onClick={() => handleViewCV(candidate)}
//                           className="text-indigo-600 hover:text-indigo-900"
//                         >
//                           CV
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {selectedCandidate && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-xl font-bold text-gray-800">{selectedCandidate.nom || 'Candidat sans nom'}</h3>
//                 <button 
//                   onClick={() => setSelectedCandidate(null)}
//                   className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
              
//               <div className="mb-4">
//                 <h4 className="font-semibold mb-2 text-gray-700">Score: {selectedCandidate.score}%</h4>
//                 <div className="flex items-center gap-3 w-full">
//                   <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
//                     <div 
//                       className={`h-full rounded-full ${
//                         selectedCandidate.score > 70 ? 'bg-green-400' : 
//                         selectedCandidate.score > 50 ? 'bg-yellow-400' : 'bg-red-400'
//                       }`} 
//                       style={{ width: `${selectedCandidate.score}%` }}
//                     />
//                   </div>
//                   <span className={`text-sm font-semibold w-12 text-right ${
//                     selectedCandidate.score > 70 ? 'text-green-600' : 
//                     selectedCandidate.score > 50 ? 'text-yellow-600' : 'text-red-600'
//                   }`}>
//                     {selectedCandidate.score}%
//                   </span>
//                 </div>
//               </div>
              
//               <div className="mb-4">
//                 <h4 className="font-semibold mb-2 text-gray-700">Analyse globale:</h4>
//                 <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
//                   {parseJustificatifs(selectedCandidate.justificatifs).analyse}
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <h4 className="font-semibold mb-2 text-gray-700">Correspondances:</h4>
//                   <ul className="space-y-2">
//                     {parseJustificatifs(selectedCandidate.justificatifs).correspondances.map((item, i) => (
//                       <li key={i} className="flex items-start">
//                         <span className="text-green-500 mr-2 mt-1">•</span>
//                         <span className="text-sm text-gray-600">{item.point || item}: {item.explication || ''}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
                
//                 <div>
//                   <h4 className="font-semibold mb-2 text-gray-700">Écarts:</h4>
//                   <ul className="space-y-2">
//                     {parseJustificatifs(selectedCandidate.justificatifs).ecarts.map((item, i) => (
//                       <li key={i} className="flex items-start">
//                         <span className="text-red-500 mr-2 mt-1">•</span>
//                         <span className="text-sm text-gray-600">{item.point || item}: {item.explication || ''}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
              
//               <div className="mb-4">
//                 <h4 className="font-semibold mb-2 text-gray-700">Recommandation:</h4>
//                 <div className="flex items-center gap-2">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <span key={i} className={`text-xl ${i < (parseJustificatifs(selectedCandidate.justificatifs).recommandation.note || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <p className="text-sm text-gray-600">{parseJustificatifs(selectedCandidate.justificatifs).recommandation.explication}</p>
//                 </div>
//               </div>
              
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setSelectedCandidate(null)}
//                   className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
//                 >
//                   Fermer
//                 </button>
//                 <button
//                   onClick={() => handleViewCV(selectedCandidate)}
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
//                 >
//                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
//                   </svg>
//                   Voir le CV
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const RhAssistant = () => {
//   const [state, setState] = useState({
//     view: 'dashboard',
//     message: '',
//     chatMessages: [
//       { sender: 'bot', text: 'Bonjour ! Je suis votre assistant RH intelligent. Je peux répondre à vos questions sur tous les candidats et leurs CV.' }
//     ],
//     isRecording: false,
//     pdfStatus: { visible: false, text: '' },
//     candidates: [],
//     totalCandidates: 0,
//     loading: { candidates: false, stats: false, chat: false },
//     error: null,
//     showChat: false
//   });

//   const API_BASE_URL = 'http://localhost:8001';
//   const chatContainerRef = useRef(null);

//   const fetchTotalCandidates = useCallback(async () => {
//     setState(prev => ({...prev, loading: {...prev.loading, stats: true}}));
//     try {
//       const response = await fetch(`${API_BASE_URL}/total-candidats`);
//       if (!response.ok) throw new Error('Erreur réseau');
//       const data = await response.json();
//       setState(prev => ({...prev, totalCandidates: data.total || 0}));
//     } catch (error) {
//       console.error('Error fetching total candidates:', error);
//       setState(prev => ({...prev, error: "Impossible de charger le nombre total de candidats"}));
//     } finally {
//       setState(prev => ({...prev, loading: {...prev.loading, stats: false}}));
//     }
//   }, []);

//   const fetchCandidates = useCallback(async () => {
//     setState(prev => ({...prev, loading: {...prev.loading, candidates: true}, error: null}));
//     try {
//       const response = await fetch(`${API_BASE_URL}/liste_evaluations`);
      
//       if (!response.ok) throw new Error('Erreur réseau');
//       const data = await response.json();
      
//       const formattedCandidates = data.map(item => ({
//         nom: item.nom,
//         score: item.score_final,
//         cv_url: item.cv_url,
//         justificatifs: item.justificatifs
//       })).sort((a, b) => b.score - a.score);
      
//       setState(prev => ({
//         ...prev,
//         candidates: formattedCandidates
//       }));
      
//     } catch (error) {
//       console.error('Error fetching candidates:', error);
//       setState(prev => ({...prev, error: "Impossible de charger la liste des candidats"}));
//     } finally {
//       setState(prev => ({...prev, loading: {...prev.loading, candidates: false}}));
//     }
//   }, []);

//   const stats = React.useMemo(() => {
//     const validCandidates = Array.isArray(state.candidates) ? state.candidates : [];
//     const sumScores = validCandidates.reduce((sum, candidate) => sum + (candidate.score || 0), 0);
//     const avgScore = validCandidates.length > 0 ? (sumScores / validCandidates.length).toFixed(1) : 0;
    
//     return {
//       totalCandidates: state.totalCandidates,
//       avgScore,
//       selectedCandidates: validCandidates.length
//     };
//   }, [state.candidates, state.totalCandidates]);

//   const handleSendMessage = useCallback(async (message) => {
//     // Si le message est déjà un objet (pour les options de fichier)
//     if (typeof message === 'object') {
//       setState(prev => ({
//         ...prev,
//         chatMessages: [...prev.chatMessages, message]
//       }));
//       return;
//     }

//     // Si c'est un message texte normal
//     if (!message.trim()) return;

//     const userMessage = { sender: 'user', text: message };
//     setState(prev => ({
//       ...prev,
//       message: '',
//       chatMessages: [...prev.chatMessages, userMessage],
//       loading: {...prev.loading, chat: true}
//     }));

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/chat`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           message: message,
//           candidates: state.candidates
//         })
//       });

//       if (!response.ok) throw new Error('Erreur réseau');
//       const data = await response.json();

//       setState(prev => ({
//         ...prev,
//         chatMessages: [...prev.chatMessages, userMessage, { sender: 'bot', text: data.response }],
//         loading: {...prev.loading, chat: false}
//       }));
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setState(prev => ({
//         ...prev,
//         chatMessages: [...prev.chatMessages, userMessage, { 
//           sender: 'bot', 
//           text: "Désolé, une erreur est survenue. Veuillez réessayer plus tard."
//         }],
//         loading: {...prev.loading, chat: false}
//       }));
//     }
//   }, [state.candidates]);

//   const handlePdfUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
    
//     setState(prev => ({...prev, pdfStatus: { visible: true, text: `Traitement de ${file.name}` }, error: null}));
    
//     try {
//       const formData = new FormData();
//       formData.append('file', file);
      
//       const response = await fetch(`${API_BASE_URL}/upload-cv`, {
//         method: 'POST',
//         body: formData
//       });
      
//       if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      
//       const data = await response.json();
//       setState(prev => ({
//         ...prev,
//         pdfStatus: { visible: true, text: `CV traité: ${data.nom}` },
//         chatMessages: [
//           ...prev.chatMessages,
//           { sender: 'bot', text: `J'ai analysé un nouveau CV:\n\nNom: ${data.nom}\nScore: ${data.score_final}%\n\nQue souhaitez-vous savoir sur ce candidat ?` }
//         ]
//       }));
      
//       await fetchCandidates();
//       await fetchTotalCandidates();
//       setTimeout(() => setState(prev => ({...prev, pdfStatus: { visible: false, text: '' }})), 3000);
//     } catch (error) {
//       setState(prev => ({
//         ...prev,
//         pdfStatus: { visible: true, text: 'Échec du traitement du CV' },
//         error: error.message
//       }));
//       console.error('Error:', error);
//     }
//   };

//   const handleViewChange = (newView) => {
//     setState(prev => ({...prev, view: newView}));
//   };

//   const toggleChatVisibility = () => {
//     setState(prev => ({...prev, showChat: !prev.showChat}));
//   };

//   const handleLogout = () => {
//     console.log("Déconnexion...");
//   };

//   useEffect(() => {
//     const init = async () => {
//       await fetchTotalCandidates();
//       await fetchCandidates();
      
//       const handleResize = () => {
//         setState(prev => ({...prev, showChat: window.innerWidth > 1024}));
//       };
      
//       window.addEventListener('resize', handleResize);
//       handleResize();
      
//       return () => window.removeEventListener('resize', handleResize);
//     };
    
//     init();
//   }, [fetchTotalCandidates, fetchCandidates]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [state.chatMessages]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
//       <div className="lg:w-64 bg-white border-r border-gray-200 flex flex-col">
//         <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//           <h1 className="text-xl font-bold flex items-center gap-2">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//            SmartRH
//           </h1>
//         </div>
//         <nav className="p-2 flex lg:flex-col overflow-x-auto lg:overflow-visible flex-1">
//           <div className="flex flex-col w-full">
//             <button
//               onClick={() => handleViewChange('dashboard')}
//               className={`flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 ${
//                 state.view === 'dashboard' 
//                   ? 'bg-indigo-50 text-indigo-600 font-medium' 
//                   : 'hover:bg-gray-100 text-gray-600'
//               } transition-colors`}
//             >
//               <DashboardIcon />
//               <span>Tableau de bord</span>
//             </button>
//             <button
//               onClick={() => handleViewChange('candidates')}
//               className={`flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 ${
//                 state.view === 'candidates' 
//                   ? 'bg-indigo-50 text-indigo-600 font-medium' 
//                   : 'hover:bg-gray-100 text-gray-600'
//               } transition-colors`}
//             >
//               <CandidatesIcon />
//               <span>Candidats</span>
//             </button>
//             <button
//               onClick={toggleChatVisibility}
//               className={`flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 text-gray-600 transition-colors`}
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//               </svg>
//               <span>{state.showChat ? 'Masquer le chat' : 'Afficher le chat'}</span>
//             </button>
//           </div>

//           <div className="mt-auto border-t border-gray-200 pt-2 w-full">
//             <button
//               className="flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 text-gray-600 transition-colors"
//             >
//               <SettingsIcon />
//               <span>Paramètres</span>
//             </button>
//             <button
//               onClick={handleLogout}
//               className="flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 text-red-500 transition-colors"
//             >
//               <LogoutIcon />
//               <span>Déconnexion</span>
//             </button>
//           </div>
//         </nav>
//       </div>

//       <MainContent
//         view={state.view}
//         error={state.error}
//         stats={stats}
//         candidates={state.candidates}
//         loading={state.loading}
//         onViewChange={handleViewChange}
//         onRefresh={fetchCandidates}
//         API_BASE_URL={API_BASE_URL}
//       />

//       {state.showChat && (
//         <ChatPanel
//           messages={state.chatMessages}
//           message={state.message}
//           isRecording={state.isRecording}
//           loading={state.loading}
//           pdfStatus={state.pdfStatus}
//           onMessageChange={(e) => setState(prev => ({...prev, message: e.target.value}))}
//           onSendMessage={handleSendMessage}
//           onToggleRecording={() => setState(prev => ({...prev, isRecording: !prev.isRecording}))}
//           onPdfUpload={handlePdfUpload}
//           onKeyPress={(e) => {
//             if (e.key === 'Enter' && !state.loading.chat) {
//               handleSendMessage(state.message);
//             }
//           }}
//           chatContainerRef={chatContainerRef}
//           onCloseChat={() => setState(prev => ({...prev, showChat: false}))}
//         />
//       )}
//     </div>
//   );
// };

// export default RhAssistant;

import React, { useCallback, useEffect, useRef, useState } from 'react';

// Composants d'icônes modernes
const DashboardIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor"/>
  </svg>
);

const CandidatesIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z" fill="currentColor"/>
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5ZM19.43 13C19.47 12.67 19.5 12.34 19.5 12C19.5 11.66 19.47 11.33 19.43 11H21.54C21.73 11 21.82 10.76 21.67 10.63L19.67 8.63C19.57 8.54 19.42 8.59 19.39 8.71L18.82 11.19C18.38 10.86 17.89 10.59 17.37 10.39L17 7.83C17 7.73 16.92 7.65 16.82 7.65H14.18C14.07 7.65 14 7.73 14 7.83L13.62 10.39C13.11 10.59 12.62 10.86 12.18 11.19L11.61 8.71C11.58 8.59 11.43 8.54 11.33 8.63L9.33 10.63C9.18 10.76 9.27 11 9.46 11H11.57C11.53 11.33 11.5 11.66 11.5 12C11.5 12.34 11.53 12.67 11.57 13H9.46C9.27 13 9.18 13.24 9.33 13.37L11.33 15.37C11.43 15.46 11.58 15.41 11.61 15.29L12.18 12.81C12.62 13.14 13.11 13.41 13.63 13.61L14 16.17C14 16.27 14.08 16.35 14.18 16.35H16.82C16.92 16.35 17 16.27 17 16.17L17.37 13.61C17.89 13.41 18.38 13.14 18.82 12.81L19.39 15.29C19.42 15.41 19.57 15.46 19.67 15.37L21.67 13.37C21.82 13.24 21.73 13 21.54 13H19.43Z" fill="currentColor"/>
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 16L21 12M21 12L17 8M21 12H7M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatPanel = ({ 
  messages, 
  message, 
  isRecording, 
  loading, 
  pdfStatus, 
  onMessageChange, 
  onSendMessage, 
  onToggleRecording, 
  onPdfUpload, 
  onKeyPress, 
  chatContainerRef,
  onCloseChat 
}) => {
  const [showUploadStatus, setShowUploadStatus] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({ text: '', type: '' });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (pdfStatus.visible) {
      setUploadStatus({ text: pdfStatus.text, type: 'info' });
      setShowUploadStatus(true);
      
      const timer = setTimeout(() => {
        setShowUploadStatus(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [pdfStatus]);

  const handleDownloadWord = (content, fileName) => {
    // Création du contenu Word simplifié
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                   "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                   "xmlns='http://www.w3.org/TR/REC-html40'>"+
                   "<head><meta charset='utf-8'><title>Export</title></head><body>";
    const footer = "</body></html>";
    const html = header + content.replace(/\n/g, "<br>") + footer;
    
    // Création du blob
    const blob = new Blob([html], {
      type: "application/msword"
    });
    
    // Création du lien de téléchargement
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Réinitialiser l'input file pour permettre de réimporter le même fichier
    e.target.value = '';
    
    setSelectedFile(file);
    
    // Ajouter un message avec les options dans le chat
    const newMessage = {
      type: "file_options",
      text: "Que voulez-vous générer à partir de ce PDF?",
      options: [
        { text: "Générer questionnaire pour entretien", api: "/generate-questions" },
        { text: "Générer feuille de notation", api: "/generate-criteria" }
      ],
      fileName: file.name
    };
    
    onMessageChange({ target: { value: "" } });
    onSendMessage(newMessage);
  };

  const handleOptionClick = async (apiEndpoint) => {
    if (!selectedFile) return;
    
    // Ajouter un message de chargement
    const loadingMessage = {
      sender: 'bot',
      text: `Génération ${apiEndpoint === '/generate-questions' ? 'du questionnaire' : 'de la feuille de notation'} en cours...`,
      isLoading: true
    };
    onSendMessage(loadingMessage);
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    if (apiEndpoint === "/generate-questions") {
      formData.append("nb_questions", 5); // Valeur par défaut
    }
    
    try {
      const response = await fetch(`http://localhost:8002${apiEndpoint}`, {
        method: "POST",
        body: formData
      });
      
      if (!response.ok) throw new Error("Erreur lors de la génération");
      
      const data = await response.json();
      const resultText = apiEndpoint === "/generate-questions" 
        ? "Questionnaire généré:\n\n" + data.questions.join("\n\n")
        : "Feuille de notation générée:\n\n" + data.criteria;
      
      // Ajouter la réponse au chat avec bouton de téléchargement
      const resultMessage = {
        sender: 'bot',
        text: resultText,
        downloadData: {
          content: resultText,
          fileName: apiEndpoint === "/generate-questions" 
            ? "questionnaire_entretien" 
            : "feuille_notation"
        }
      };
      
      onSendMessage(resultMessage);
    } catch (error) {
      const errorMessage = {
        sender: 'bot',
        text: "Une erreur est survenue lors de la génération: " + error.message
      };
      onSendMessage(errorMessage);
    } finally {
      setSelectedFile(null); // Permet de réimporter un nouveau fichier
    }
  };

  return (
    <div className="fixed lg:relative bottom-0 right-0 w-full lg:w-96 bg-white border-t lg:border-l border-gray-200 flex flex-col" 
         style={{ height: 'calc(105vh - 40px)' }}>
      <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center border-b border-white/10">
        <h1 className="text-lg font-semibold">Assistant RH Intelligent</h1>
        <button 
          onClick={onCloseChat} 
          className="lg:hidden absolute right-4 top-4 text-white/80 hover:text-white"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-6 bg-gray-50"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              style={{ animation: 'fadeInUp 0.5s ease forwards' }}
            >
              {msg.type === "file_options" ? (
                <div className="max-w-[85%] bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">{msg.text}</p>
                  <p className="text-xs text-gray-400 mb-3">Fichier: {msg.fileName}</p>
                  <div className="flex flex-col gap-2">
                    {msg.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option.api)}
                        className="text-left p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm"
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : msg.isLoading ? (
                <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 max-w-[85%]">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{msg.text}</span>
                  </div>
                </div>
              ) : (
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-br-none' 
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  {msg.downloadData && (
                    <button
                      onClick={() => handleDownloadWord(msg.downloadData.content, msg.downloadData.fileName)}
                      className="mt-2 text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
                    >
                      <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                      Télécharger en Word
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {loading.chat && !messages.some(msg => msg.isLoading) && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-gray-100 max-w-[85%]">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">L'assistant réfléchit...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="relative flex gap-2 items-end">
          <textarea
            value={message}
            onChange={onMessageChange}
            onKeyDown={onKeyPress}
            placeholder="Tapez votre message..."
            className="flex-1 border-2 border-gray-200 rounded-xl p-3 pr-10 bg-gray-50 focus:bg-white focus:border-indigo-500 focus:ring-0 resize-none outline-none transition-all"
            rows="1"
            style={{ minHeight: '50px', maxHeight: '120px' }}
            disabled={loading.chat}
          />
          
          <div className="absolute right-2 bottom-2 flex gap-1">
            <button
              onClick={() => document.getElementById('pdfUpload').click()}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              disabled={loading.chat}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l-5-5-5 5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12" />
              </svg>
            </button>
            
            <button
              onClick={() => onSendMessage({ sender: 'user', text: message })}
              disabled={loading.chat || !message.trim()}
              className="p-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
        
        <input 
          type="file" 
          id="pdfUpload" 
          className="hidden" 
          accept=".pdf" 
          onChange={handleFileChange}
        />
      </div>

      {showUploadStatus && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white text-sm ${
          uploadStatus.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } transition-all duration-300 ease-in-out`}>
          {uploadStatus.text}
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const StatCard = React.memo(({ title, value, icon, description }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex items-start h-full group">
    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 mr-4 group-hover:bg-indigo-100 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      {description && <p className="text-xs text-gray-400 mt-2">{description}</p>}
    </div>
  </div>
));

const PDFCarousel = ({ candidates, onViewCV }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef();
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev === candidates.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(intervalRef.current);
  }, [candidates.length]);

  if (!candidates || candidates.length === 0) return null;

  const nextSlide = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex(prev => (prev === candidates.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex(prev => (prev === 0 ? candidates.length - 1 : prev - 1));
  };

  return (
      <div className="mt-4 bg-white p-4 rounded-xl border border-gray-100" style={{ maxHeight: '300px' }}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Candidatures reçues</h3>
      <div className="relative">
        <div className="flex overflow-hidden">
          {candidates.map((candidate, index) => (
            <div 
              key={index}
              className={`w-full flex-shrink-0 transition-transform duration-500 ease-in-out ${
                index === currentIndex ? 'block' : 'hidden'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/3 bg-gray-100 h-48 flex items-center justify-center rounded-lg">
                  <div className="text-center p-4">
                    <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                    <p className="text-gray-500 mt-2 text-sm">{candidate.nom || 'Candidat'}.pdf</p>
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h4 className="font-bold text-lg text-gray-800">{candidate.nom || 'Candidat sans nom'}</h4>
                  <div className="flex items-center gap-2 mt-1 mb-3">
                    <span className="font-medium text-gray-500">Score:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      candidate.score > 70 ? 'bg-green-100 text-green-800' :
                      candidate.score > 50 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {candidate.score}%
                    </span>
                  </div>
                  <button
                    onClick={() => onViewCV(candidate)}
                    className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 mt-2 transition-colors gap-2"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                    Ouvrir le CV complet
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="flex justify-center mt-6 space-x-2">
          {candidates.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                clearInterval(intervalRef.current);
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MainContent = ({ 
  view, 
  error, 
  stats, 
  candidates, 
  loading, 
  onViewChange, 
  onRefresh,
  API_BASE_URL 
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const parseJustificatifs = (_justificatifs) => {
    if (!_justificatifs ) {
      return {
        analyse: "Analyse non disponible",
        correspondances: [],
        ecarts: [],
        recommandation: { note: 0, explication: "" }
      };
    }

    const justificatifs = JSON.parse(_justificatifs)

    console.log(justificatifs)
    
    return {
      analyse: justificatifs.analyse_generale || "Analyse non disponible",
      correspondances: justificatifs.correspondances || [],
      ecarts: justificatifs.ecarts || [],
      recommandation: justificatifs.recommandation || { note: 0, explication: "" }
    };
  };

  const handleViewCV = (candidate) => {
    const cvPath = candidate.cv_url;
    if (cvPath) {
      window.open(`${API_BASE_URL}${cvPath}`, '_blank');
    } else {
      alert("Le CV de ce candidat n'est pas disponible");
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto bg-gray-50">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r-lg">
          <p>{error}</p>
        </div>
      )}

      {view === 'dashboard' && (
        <div className="space-y-6">
          {/* Section Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard 
              title="Total candidats" 
              value={stats.totalCandidates} 
              icon={<CandidatesIcon />}
              description="Nombre total de CV analysés"
            />
            <StatCard 
              title="Score moyen" 
              value={`${stats.avgScore}%`} 
              icon={<DashboardIcon />}
              description="Moyenne des scores"
            />
            <StatCard 
              title="Candidats évalués" 
              value={candidates.length} 
              icon={<CandidatesIcon />}
              description="Tous les candidats"
            />
          </div>

          {/* Section Meilleurs profils simplifiée */}
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Meilleurs profils</h2>
              <button 
                onClick={() => onViewChange('candidates')}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Voir tous →
              </button>
            </div>

            {loading.candidates ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              </div>
            ) : candidates.length > 0 ? (
              <div className="space-y-3">
                {candidates.slice(0, 2).map((candidate, index) => (
                  <div key={index} className="group cursor-pointer" onClick={() => setSelectedCandidate(candidate)}>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-800">{candidate.nom || 'Candidat sans nom'}</h3>
                      <span className={`text-xs font-medium ${
                        candidate.score > 70 ? 'text-green-600' :
                        candidate.score > 50 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {candidate.score}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-full rounded-full ${
                          candidate.score > 70 ? 'bg-green-500' :
                          candidate.score > 50 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`} 
                        style={{ width: `${candidate.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm py-2">Aucun candidat évalué</p>
            )}
          </div>

          {/* Section Candidatures reçues */}
          <PDFCarousel 
            candidates={candidates} 
            onViewCV={handleViewCV}
          />
        </div>
      )}

      {view === 'candidates' && (
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Tous les candidats</h2>
            <div className="flex gap-3">
              <button 
                onClick={() => onViewChange('dashboard')}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour
              </button>
              <button 
                onClick={onRefresh}
                disabled={loading.candidates}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Actualiser
              </button>
            </div>
          </div>
          
          {loading.candidates ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidates.map((candidate, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {candidate.nom || 'Candidat sans nom'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3 w-full">
                          <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                candidate.score > 70 ? 'bg-green-400' : 
                                candidate.score > 50 ? 'bg-yellow-400' : 'bg-red-400'
                              }`} 
                              style={{ width: `${candidate.score}%` }}
                            />
                          </div>
                          <span className={`text-sm font-semibold w-12 text-right ${
                            candidate.score > 70 ? 'text-green-600' : 
                            candidate.score > 50 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {candidate.score}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                        <button 
                          onClick={() => setSelectedCandidate(candidate)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Détails
                        </button>
                        <span className="text-gray-300">|</span>
                        <button 
                          onClick={() => handleViewCV(candidate)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          CV
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedCandidate.nom || 'Candidat sans nom'}</h3>
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-700">Score: {selectedCandidate.score}%</h4>
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        selectedCandidate.score > 70 ? 'bg-green-400' : 
                        selectedCandidate.score > 50 ? 'bg-yellow-400' : 'bg-red-400'
                      }`} 
                      style={{ width: `${selectedCandidate.score}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold w-12 text-right ${
                    selectedCandidate.score > 70 ? 'text-green-600' : 
                    selectedCandidate.score > 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {selectedCandidate.score}%
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-700">Analyse globale:</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                  {parseJustificatifs(selectedCandidate.justificatifs).analyse}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Correspondances:</h4>
                  <ul className="space-y-2">
                    {parseJustificatifs(selectedCandidate.justificatifs).correspondances.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        <span className="text-sm text-gray-600">{item.point || item}: {item.explication || ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Écarts:</h4>
                  <ul className="space-y-2">
                    {parseJustificatifs(selectedCandidate.justificatifs).ecarts.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span className="text-sm text-gray-600">{item.point || item}: {item.explication || ''}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-gray-700">Recommandation:</h4>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xl ${i < (parseJustificatifs(selectedCandidate.justificatifs).recommandation.note || 0) ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{parseJustificatifs(selectedCandidate.justificatifs).recommandation.explication}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => handleViewCV(selectedCandidate)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                  Voir le CV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RhAssistant = () => {
  const [state, setState] = useState({
    view: 'dashboard',
    message: '',
    chatMessages: [
      { sender: 'bot', text: 'Bonjour ! Je suis votre assistant RH intelligent. Je peux répondre à vos questions sur tous les candidats et leurs CV.' }
    ],
    isRecording: false,
    pdfStatus: { visible: false, text: '' },
    candidates: [],
    totalCandidates: 0,
    loading: { candidates: false, stats: false, chat: false },
    error: null,
    showChat: false
  });

  const API_BASE_URL = 'http://localhost:8001';
  const chatContainerRef = useRef(null);

  const fetchTotalCandidates = useCallback(async () => {
    setState(prev => ({...prev, loading: {...prev.loading, stats: true}}));
    try {
      const response = await fetch(`${API_BASE_URL}/total-candidats`);
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      setState(prev => ({...prev, totalCandidates: data.total || 0}));
    } catch (error) {
      console.error('Error fetching total candidates:', error);
      setState(prev => ({...prev, error: "Impossible de charger le nombre total de candidats"}));
    } finally {
      setState(prev => ({...prev, loading: {...prev.loading, stats: false}}));
    }
  }, []);

  const fetchCandidates = useCallback(async () => {
    setState(prev => ({...prev, loading: {...prev.loading, candidates: true}, error: null}));
    try {
      const response = await fetch(`${API_BASE_URL}/liste_evaluations`);
      
      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();
      
      const formattedCandidates = data.map(item => ({
        nom: item.nom,
        score: item.score_final,
        cv_url: item.cv_url,
        justificatifs: item.justificatifs
      })).sort((a, b) => b.score - a.score);
      
      setState(prev => ({
        ...prev,
        candidates: formattedCandidates
      }));
      
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setState(prev => ({...prev, error: "Impossible de charger la liste des candidats"}));
    } finally {
      setState(prev => ({...prev, loading: {...prev.loading, candidates: false}}));
    }
  }, []);

  const stats = React.useMemo(() => {
    const validCandidates = Array.isArray(state.candidates) ? state.candidates : [];
    const sumScores = validCandidates.reduce((sum, candidate) => sum + (candidate.score || 0), 0);
    const avgScore = validCandidates.length > 0 ? (sumScores / validCandidates.length).toFixed(1) : 0;
    
    return {
      totalCandidates: state.totalCandidates,
      avgScore,
      selectedCandidates: validCandidates.length
    };
  }, [state.candidates, state.totalCandidates]);

  const handleSendMessage = useCallback(async (message) => {
    // Si le message est déjà un objet (pour les options de fichier)
    if (typeof message === 'object') {
      setState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages, message]
      }));
      return;
    }

    // Si c'est un message texte normal
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setState(prev => ({
      ...prev,
      message: '',
      chatMessages: [...prev.chatMessages, userMessage],
      loading: {...prev.loading, chat: true}
    }));

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: message,
          candidates: state.candidates
        })
      });

      if (!response.ok) throw new Error('Erreur réseau');
      const data = await response.json();

      setState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages, userMessage, { sender: 'bot', text: data.response }],
        loading: {...prev.loading, chat: false}
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      setState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages, userMessage, { 
          sender: 'bot', 
          text: "Désolé, une erreur est survenue. Veuillez réessayer plus tard."
        }],
        loading: {...prev.loading, chat: false}
      }));
    }
  }, [state.candidates]);

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setState(prev => ({...prev, pdfStatus: { visible: true, text: `Traitement de ${file.name}` }, error: null}));
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_BASE_URL}/upload-cv`, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      
      const data = await response.json();
      setState(prev => ({
        ...prev,
        pdfStatus: { visible: true, text: `CV traité: ${data.nom}` },
        chatMessages: [
          ...prev.chatMessages,
          { sender: 'bot', text: `J'ai analysé un nouveau CV:\n\nNom: ${data.nom}\nScore: ${data.score_final}%\n\nQue souhaitez-vous savoir sur ce candidat ?` }
        ]
      }));
      
      await fetchCandidates();
      await fetchTotalCandidates();
      setTimeout(() => setState(prev => ({...prev, pdfStatus: { visible: false, text: '' }})), 3000);
    } catch (error) {
      setState(prev => ({
        ...prev,
        pdfStatus: { visible: true, text: 'Échec du traitement du CV' },
        error: error.message
      }));
      console.error('Error:', error);
    }
  };

  const handleViewChange = (newView) => {
    setState(prev => ({...prev, view: newView}));
  };

  const toggleChatVisibility = () => {
    setState(prev => ({...prev, showChat: !prev.showChat}));
  };

  const handleLogout = () => {
    console.log("Déconnexion...");
  };

  useEffect(() => {
    const init = async () => {
      await fetchTotalCandidates();
      await fetchCandidates();
      
      const handleResize = () => {
        setState(prev => ({...prev, showChat: window.innerWidth > 1024}));
      };
      
      window.addEventListener('resize', handleResize);
      handleResize();
      
      return () => window.removeEventListener('resize', handleResize);
    };
    
    init();
  }, [fetchTotalCandidates, fetchCandidates]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [state.chatMessages]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <div className="lg:w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
           SmartRH
          </h1>
        </div>
        <nav className="p-2 flex lg:flex-col overflow-x-auto lg:overflow-visible flex-1">
          <div className="flex flex-col w-full">
            <button
              onClick={() => handleViewChange('dashboard')}
              className={`flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 ${
                state.view === 'dashboard' 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'hover:bg-gray-100 text-gray-600'
              } transition-colors`}
            >
              <DashboardIcon />
              <span>Tableau de bord</span>
            </button>
            <button
              onClick={() => handleViewChange('candidates')}
              className={`flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 ${
                state.view === 'candidates' 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'hover:bg-gray-100 text-gray-600'
              } transition-colors`}
            >
              <CandidatesIcon />
              <span>Candidats</span>
            </button>
            <button
              onClick={toggleChatVisibility}
              className={`flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 text-gray-600 transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{state.showChat ? 'Masquer le chat' : 'Afficher le chat'}</span>
            </button>
          </div>

          <div className="mt-auto border-t border-gray-200 pt-2 w-full">
            <button
              className="flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <SettingsIcon />
              <span>Paramètres</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex-shrink-0 lg:w-full text-left mb-1 p-3 rounded-lg flex items-center gap-3 hover:bg-gray-100 text-red-500 transition-colors"
            >
              <LogoutIcon />
              <span>Déconnexion</span>
            </button>
          </div>
        </nav>
      </div>

      <MainContent
        view={state.view}
        error={state.error}
        stats={stats}
        candidates={state.candidates}
        loading={state.loading}
        onViewChange={handleViewChange}
        onRefresh={fetchCandidates}
        API_BASE_URL={API_BASE_URL}
      />

      {state.showChat && (
        <ChatPanel
          messages={state.chatMessages}
          message={state.message}
          isRecording={state.isRecording}
          loading={state.loading}
          pdfStatus={state.pdfStatus}
          onMessageChange={(e) => setState(prev => ({...prev, message: e.target.value}))}
          onSendMessage={handleSendMessage}
          onToggleRecording={() => setState(prev => ({...prev, isRecording: !prev.isRecording}))}
          onPdfUpload={handlePdfUpload}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !state.loading.chat) {
              handleSendMessage(state.message);
            }
          }}
          chatContainerRef={chatContainerRef}
          onCloseChat={() => setState(prev => ({...prev, showChat: false}))}
        />
      )}
    </div>
  );
};

export default RhAssistant;