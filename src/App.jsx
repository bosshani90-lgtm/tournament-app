```react

import React, { useState, useEffect, useRef } from 'react';

import { 

Trophy, Menu, X, ChevronRight, LayoutDashboard, ShieldCheck, 

User, BadgeCheck, Copy, UploadCloud, LogOut, Wallet, 

Medal, MessageCircle, Lock, Clock, Key, Gamepad2, Target, 

Star, Users, Trash2, CheckCircle2, Calendar, Swords, Edit3, Smartphone,

AlertCircle, Info, BellRing, Monitor, HelpCircle, Share2, Fingerprint, Send, Megaphone,

Bell, UserPlus, Shield

} from 'lucide-react';


const App = () => {

const [loading, setLoading] = useState(true);

const [isLoggedIn, setIsLoggedIn] = useState(false);

const [isLoggingIn, setIsLoggingIn] = useState(false);

const [view, setView] = useState('dashboard');

const [sidebarOpen, setSidebarOpen] = useState(false);

const [selectedGameMode, setSelectedGameMode] = useState('Full Map Mode');

const [selectedMatch, setSelectedMatch] = useState(null);

const [roomModal, setRoomModal] = useState(null);

const [rulesModal, setRulesModal] = useState(null);

const [fullScreenImage, setFullScreenImage] = useState(null);

const [showFullModal, setShowFullModal] = useState(false);


// Hidden Admin Access Logic

const [logoClickCount, setLogoClickCount] = useState(0);

const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);


// Notification State

const [notifications, setNotifications] = useState([]);

const [adminNotifText, setAdminNotifText] = useState("");

const [showNotifModal, setShowNotifModal] = useState(false);

const [activeNotification, setActiveNotification] = useState(null);


// Forgot Password State

const [showForgotModal, setShowForgotModal] = useState(false);

const [otpSent, setOtpSent] = useState(false);

const [otpValue, setOtpValue] = useState('');

const [newPassword, setNewPassword] = useState('');

const recoveryNumber = "03305122469";

const maskedRecoveryNumber = `*********${recoveryNumber.slice(-2)}`;


const [userProfile, setUserProfile] = useState(null);


const [appSettings, setAppSettings] = useState({

paymentName: 'Sheryar Ishtiaq',

paymentNumber: '03445693786',

boardName: 'WINNERS BOARD',

adminWhatsApp: '03305122469'

});


const [winners, setWinners] = useState([

{ rank: 1, name: 'Winners Name', prize: 'Rs 000' },

{ rank: 2, name: 'Winners Name', prize: 'Rs 000' },

{ rank: 3, name: 'Winners Name', prize: 'Rs 000' }

]);


const [tournaments, setTournaments] = useState([]);

const [pendingRequests, setPendingRequests] = useState([]);

const [approvedRecords, setApprovedRecords] = useState([]);

const [userStatus, setUserStatus] = useState({}); 


const [newTourney, setNewTourney] = useState({

title: '', mode: 'Full Map Mode', type: 'SOLO', entryFee: '', date: '', 

roomId: '', roomPass: '', prizePool: '1000', prize2: '500', prize3: '200',

platform: 'Mobile', map: 'Bermuda',

rules: '1. No Hacks\n2. No Teaming\n3. Screenshot is must\n4. Be on time'

});


const [editRoomId, setEditRoomId] = useState("");

const [editRoomPass, setEditRoomPass] = useState("");

const [editingMatchId, setEditingMatchId] = useState(null);


// Audio Refs

const notificationSound = useRef(null);

const successSound = useRef(null);

const clickSound = useRef(null);

const alertSound = useRef(null);

const switchSound = useRef(null);


useEffect(() => {

const timer = setTimeout(() => setLoading(false), 2000);

notificationSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');

successSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');

clickSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');

alertSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/1431/1431-preview.mp3');

switchSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

return () => clearTimeout(timer);

}, []);


const handleLogoClick = () => {

const newCount = logoClickCount + 1;

setLogoClickCount(newCount);

playClick();

if (newCount === 8) {

setIsAdminAuthenticated(true);

setView('admin');

setLogoClickCount(0);

playSuccess();

}

setTimeout(() => {

setLogoClickCount(0);

}, 3000);

};


const playNotification = () => {

if (notificationSound.current) {

notificationSound.current.currentTime = 0;

notificationSound.current.play().catch(e => console.log("Audio play failed", e));

}

};


const playAlert = () => {

if (alertSound.current) {

alertSound.current.currentTime = 0;

alertSound.current.play().catch(e => console.log("Audio play failed", e));

}

};


const playSuccess = () => {

if (successSound.current) {

successSound.current.currentTime = 0;

successSound.current.play().catch(e => console.log("Audio play failed", e));

}

};


const playClick = () => {

if (clickSound.current) {

clickSound.current.currentTime = 0;

clickSound.current.play().catch(e => console.log("Audio play failed", e));

}

};


const playSwitch = () => {

if (switchSound.current) {

switchSound.current.currentTime = 0;

switchSound.current.play().catch(e => console.log("Audio play failed", e));

}

};


const sendNotification = () => {

if(!adminNotifText.trim()) return;

playSuccess();

const newNotif = {

id: Date.now(),

text: adminNotifText,

time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

};

setNotifications([newNotif, ...notifications]);

setActiveNotification(newNotif); 

setAdminNotifText("");

playAlert(); 

};


const clearNotifications = () => {

playClick();

setNotifications([]);

};


const openWhatsApp = () => {

playClick();

window.open(`https://wa.me/923305122469?text=Assalam-o-Alaikum Admin, mujhe help chahiye.`, '_blank');

};


const openCommunity = () => {

playClick();

window.open(`https://wa.me/923305122469?text=Assalam-o-Alaikum Admin, mujhe Community join karni hai.`, '_blank');

};


const handleGoogleLogin = () => {

playClick();

setIsLoggingIn(true);

setTimeout(() => {

setUserProfile({

name: 'Pro Player',

email: 'player@gmail.com',

photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'

});

setIsLoggedIn(true);

setIsLoggingIn(false);

}, 2000);

};


const deleteTournament = (id) => {

playClick();

setTournaments(prev => prev.filter(t => t.id !== id));

};


const updateRoomDetails = (id) => {

playClick();

const match = tournaments.find(t => t.id === id);

if (!match) return;

setTournaments(prev => prev.map(t => t.id === id ? { ...t, roomId: editRoomId, roomPass: editRoomPass } : t));

const roomNotif = {

id: Date.now(),

text: `Room Details Available! Tournament: "${match.title}" ki Room ID: ${editRoomId} aur Password: ${editRoomPass} update kar di gai hai. Check your Arena.`,

time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

};

setNotifications([roomNotif, ...notifications]);

setActiveNotification(roomNotif);

playAlert();

setEditingMatchId(null);

setEditRoomId("");

setEditRoomPass("");

};


const updateWinner = (index, field, value) => {

const newWinners = [...winners];

newWinners[index][field] = value;

setWinners(newWinners);

};


const formatDateTime = (dateStr) => {

if(!dateStr) return "SET DATE";

const d = new Date(dateStr);

return d.toLocaleString('en-US', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase();

};


const TournamentCard = ({ t }) => {

const status = userStatus[t.id] || 'none';

const isFull = t.participants >= t.maxParticipants;

const handleJoinClick = () => {

playClick();

if (isFull) {

playAlert();

setShowFullModal(true);

} else {

setSelectedMatch(t); 

setView('joinForm');

}

};

return (

<div className="bg-[#111] rounded-[35px] border border-white/5 overflow-hidden shadow-2xl mb-8 transition-all">

<div className={`relative h-36 bg-gradient-to-br ${isFull ? 'from-gray-600 to-gray-400' : 'from-orange-600 to-orange-400'} p-6 flex flex-col justify-between`}>

<div className="flex justify-between items-start z-10">

<span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-black uppercase italic tracking-widest">{formatDateTime(t.date)}</span>

<div className="flex gap-2">

<button onClick={() => { playClick(); setRulesModal(t); }} className="bg-black/40 p-2 rounded-lg text-white hover:bg-black/60 transition-colors">

<Info size={14} />

</button>

<span className="bg-black text-orange-500 px-3 py-1 rounded-lg text-[8px] font-black uppercase italic">{t.platform}</span>

</div>

</div>

<h3 className="text-2xl font-black italic text-black uppercase tracking-tighter z-10 leading-none">{t.title}</h3>

{isFull && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black text-white px-4 py-1 rounded-full text-[10px] font-black italic uppercase tracking-tighter z-20 border-2 border-white/10">Full Registered</div>}

<div className="absolute top-0 right-0 p-4 opacity-10"><Gamepad2 size={80} /></div>

</div>

<div className="p-6 space-y-6">

<div className="grid grid-cols-3 gap-2">

<div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center">

<p className="text-[8px] text-gray-500 font-black mb-1 uppercase italic">Top 1</p>

<p className="text-sm font-black text-orange-500 italic">Rs {t.prizePool}</p>

</div>

<div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center">

<p className="text-[8px] text-gray-500 font-black mb-1 uppercase italic">Top 2</p>

<p className="text-sm font-black text-white italic">Rs {t.prize2 || '0'}</p>

</div>

<div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center">

<p className="text-[8px] text-gray-500 font-black mb-1 uppercase italic">Top 3</p>

<p className="text-sm font-black text-white italic">Rs {t.prize3 || '0'}</p>

</div>

</div>

<div className="flex justify-between items-center px-2">

<div className="flex flex-col">

<p className="text-[10px] text-gray-600 font-black uppercase italic">Entry Fee</p>

<p className="text-2xl font-black italic text-white leading-none">Rs {t.entryFee}</p>

</div>

<div className="text-right">

<p className="text-[10px] text-gray-600 font-black uppercase italic">{t.type} | {t.map}</p>

<p className={`text-sm font-black italic ${isFull ? 'text-red-500' : 'text-white'}`}>{t.participants}/{t.maxParticipants}</p>

</div>

</div>

<div className="flex flex-col gap-2">

{status === 'pending' ? (

<div className="w-full py-5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-3xl text-center font-black uppercase italic text-xs tracking-widest animate-pulse">Checking Screenshot...</div>

) : status === 'approved' ? (

<div className="w-full py-5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-3xl text-center font-black uppercase italic text-xs tracking-widest">Joined Successfully</div>

) : (

<button 

onClick={handleJoinClick} 

className={`w-full py-5 rounded-3xl font-black uppercase italic text-sm tracking-wider active:scale-95 transition-all border-4 ${isFull ? 'bg-gray-800 text-gray-400 border-gray-700 cursor-not-allowed' : 'bg-white text-black border-orange-500 shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-pulse'}`}

>

{isFull ? 'Lobby Is Full' : 'Join The Battle'}

</button>

)}

<button onClick={() => { playClick(); setRulesModal(t); }} className="w-full py-2 text-[8px] text-gray-500 font-black uppercase italic tracking-[0.2em] hover:text-orange-500 transition-colors">View Tournament Rules</button>

</div>

</div>

</div>

);

};


const renderPlayerInputs = () => {

const playerCount = selectedMatch.type === 'SQUAD' ? 4 : (selectedMatch.type === 'DUO' ? 2 : 1);

const inputs = [];

for (let i = 1; i <= playerCount; i++) {

inputs.push(

<div key={i} className={`space-y-3 ${i > 1 ? 'pt-4 border-t border-white/5' : ''}`}>

<p className="text-[10px] font-black text-orange-500 uppercase italic ml-2">

{i === 1 ? 'Leader Details' : `Teammate ${i} Details`}

</p>

<input id={`p${i}Name`} placeholder={`PLAYER ${i} IN GAME NAME`} className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none font-black focus:border-orange-500" />

<input id={`p${i}Uid`} placeholder={`PLAYER ${i} IN GAME UID`} className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none font-black focus:border-orange-500" />

</div>

);

}

return inputs;

};


if (loading) return (

<div className="flex flex-col items-center justify-center h-screen bg-[#080808] text-orange-500 font-black italic space-y-4">

<Trophy size={50} className="animate-bounce" />

<p className="tracking-[0.3em] text-xs uppercase text-white">Clash Battle Loading</p>

</div>

);


if (isLoggingIn) return (

<div className="fixed inset-0 bg-[#080808] z-[200] flex flex-col items-center justify-center p-8 space-y-6">

<div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>

<div className="text-center">

<p className="text-white font-black uppercase italic tracking-widest text-lg">Signing in with Google</p>

<p className="text-gray-500 text-xs font-bold mt-2">Please wait a moment...</p>

</div>

</div>

);


if (!isLoggedIn) {

return (

<div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center p-8 text-center">

<Trophy size={80} className="text-orange-500 mb-6 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]" />

<h1 className="text-5xl font-black italic text-white uppercase tracking-tighter mb-12">CLASH <span className="text-orange-500">BATTLE</span></h1>

<div className="bg-[#111] p-10 rounded-[40px] border border-white/5 w-full max-sm space-y-6">

<p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Sign in to continue</p>

<button onClick={handleGoogleLogin} className="w-full py-5 bg-white text-black rounded-[30px] flex items-center justify-center gap-4 font-black uppercase italic text-xs shadow-2xl active:scale-95 transition-all">

<img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="G" />

Continue with Google

</button>

<div className="pt-4 flex items-center justify-center gap-2 opacity-30">

<div className="h-px w-full bg-white/20"></div>

<span className="text-[10px] text-white font-black">OR</span>

<div className="h-px w-full bg-white/20"></div>

</div>

<p className="text-[9px] text-gray-600 font-black italic uppercase">By continuing you agree to our terms & conditions</p>

</div>

</div>

);

}


return (

<div className="min-h-screen bg-[#080808] text-gray-100 pb-40">

<header className="flex items-center justify-between p-6 sticky top-0 bg-[#080808]/80 backdrop-blur-xl z-40 border-b border-white/5">

<div className="flex items-center gap-4">

<Menu className="text-orange-500 cursor-pointer" onClick={() => { playClick(); setSidebarOpen(true); }} />

<h1 onClick={handleLogoClick} className="text-lg font-black uppercase italic cursor-pointer select-none">

CLASH <span className="text-orange-500">BATTLE</span>

</h1>

</div>

<div className="flex items-center gap-3">

<button 

onClick={() => { playNotification(); setShowNotifModal(true); }}

className="bg-yellow-400 p-2 rounded-xl text-black shadow-[0_0_15px_rgba(250,204,21,0.4)] active:scale-90 transition-all hover:bg-yellow-300 relative"

>

<Bell size={18} fill="currentColor" />

{notifications.length > 0 && (

<span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>

)}

</button>

<img src={userProfile?.photo} className="w-9 h-9 rounded-xl border-2 border-orange-500/20" alt="Profile" />

</div>

</header>


{sidebarOpen && (

<div className="fixed inset-0 bg-black/95 z-50" onClick={() => { playClick(); setSidebarOpen(false); }}>

<div className="w-4/5 h-full bg-[#0d0d0d] p-8 flex flex-col relative shadow-2xl" onClick={e => e.stopPropagation()}>

<div className="flex justify-between items-center mb-10">

<div className="flex items-center gap-3">

<div className="bg-orange-500 p-2 rounded-xl text-black rotate-12"><Trophy size={20} /></div>

<h2 className="text-xl font-black uppercase italic tracking-tighter">CLASH <span className="text-orange-500 underline underline-offset-4">BATTLE</span></h2>

</div>

<X className="text-gray-500" onClick={() => { playClick(); setSidebarOpen(false); }} />

</div>


<div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">

<div className="space-y-4">

<p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4">Main Info</p>

<button onClick={() => { playClick(); setView('dashboard'); setSidebarOpen(false); }} className={`w-full text-left font-black uppercase italic text-sm flex gap-4 items-center ${view === 'dashboard' ? 'text-orange-500' : 'text-white'}`}><LayoutDashboard size={18}/> Battle Lobby</button>

<button onClick={() => { playSwitch(); setView('arena'); setSidebarOpen(false); }} className={`w-full text-left font-black uppercase italic text-sm flex gap-4 items-center ${view === 'arena' ? 'text-orange-500' : 'text-white'}`}><Swords size={18}/> Arena</button>

<button onClick={() => { playSwitch(); setView('leaderboard'); setSidebarOpen(false); }} className={`w-full text-left font-black uppercase italic text-sm flex gap-4 items-center ${view === 'leaderboard' ? 'text-orange-500' : 'text-white'}`}><Medal size={18}/> Hall Of Fame</button>

<button onClick={() => { playNotification(); setShowNotifModal(true); setSidebarOpen(false); }} className={`w-full text-left font-black uppercase italic text-sm flex gap-4 items-center text-white`}><Megaphone size={18}/> Notifications</button>

{isAdminAuthenticated && (

<button onClick={() => { playClick(); setView('admin'); setSidebarOpen(false); }} className={`w-full text-left font-black uppercase italic text-sm flex gap-4 items-center text-orange-400`}><ShieldCheck size={18}/> Admin Panel</button>

)}

</div>


<div className="space-y-4 pt-6 border-t border-white/5">

<p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-4">Help and Support</p>

<button onClick={() => { openWhatsApp(); setSidebarOpen(false); }} className="w-full text-left font-black uppercase italic text-sm flex gap-4 items-center text-green-500"><MessageCircle size={18}/> Contact Manager</button>

<button onClick={() => { openCommunity(); setSidebarOpen(false); }} className="w-full text-left font-black uppercase italic text-sm flex gap-4 items-center text-blue-400"><Share2 size={18}/> Join Community</button>

<button onClick={() => { 

playClick(); 

window.open("https://sites.google.com/view/freefire-tournament-policy/home", "_blank");

setSidebarOpen(false);

}} className="w-full text-left font-black uppercase italic text-sm flex gap-4 items-center text-white"><Shield size={18}/> Privacy Policy</button>

<button onClick={playClick} className="w-full text-left font-black uppercase italic text-sm flex gap-4 items-center text-gray-400"><HelpCircle size={18}/> FAQ & Guides</button>

</div>


<div className="pt-8">

<button onClick={() => { playClick(); setIsLoggedIn(false); setIsAdminAuthenticated(false); }} className="w-full text-left font-black uppercase italic text-sm flex gap-4 items-center text-red-500 pt-6 border-t border-white/5"><LogOut size={18}/> Exit App</button>

</div>

</div>

</div>

</div>

)}


<main className="p-5 max-w-md mx-auto">

{view === 'dashboard' && (

<div className="space-y-8 animate-in fade-in duration-500">

<div className="flex justify-between items-center gap-3 px-1 overflow-x-auto pb-2 scrollbar-hide">

{[

{ id: 'Full Map Mode', icon: <Target size={16} /> },

{ id: 'CS Mode', icon: <ShieldCheck size={16} /> },

{ id: 'LoneWolf Mode', icon: <Swords size={16} /> }

].map(mode => (

<button 

key={mode.id} 

onClick={() => { playClick(); setSelectedGameMode(mode.id); }} 

className={`flex flex-col items-center justify-center min-w-[100px] py-4 rounded-[24px] transition-all duration-300 border-2 active:scale-95 ${

selectedGameMode === mode.id 

? 'bg-orange-500 border-orange-400 text-black shadow-[0_8px_30px_rgba(249,115,22,0.5)] scale-105 animate-pulse' 

: 'bg-[#151515] border-white/5 text-gray-500 hover:bg-[#202020]'

}`}

>

<div className={`mb-2 p-2 rounded-xl transition-transform duration-500 ${selectedGameMode === mode.id ? 'bg-black/20 text-black scale-125 rotate-12' : 'bg-black/40 text-orange-500'}`}>

{mode.icon}

</div>

<span className="text-[9px] font-black uppercase italic tracking-tighter whitespace-nowrap">

{mode.id.replace(' Mode', '')}

</span>

</button>

))}

</div>


{tournaments.filter(t => t.mode === selectedGameMode).length > 0 ? (

tournaments.filter(t => t.mode === selectedGameMode).map(t => <TournamentCard key={t.id} t={t} />)

) : (

<div className="py-24 text-center">

<button onClick={playClick} className="px-10 py-5 bg-white/5 border border-white/10 rounded-full text-gray-600 font-black uppercase italic text-[10px] tracking-widest">No Tournament Available</button>

</div>

)}

</div>

)}


{view === 'arena' && (

<div className="space-y-6 py-4 animate-in slide-in-from-bottom-10 duration-500">

<h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">MY <span className="text-orange-500">ARENA</span></h2>

{tournaments.filter(t => userStatus[t.id] === 'approved').length > 0 ? (

tournaments.filter(t => userStatus[t.id] === 'approved').map(t => (

<div key={t.id} className="bg-[#111] p-6 rounded-[35px] border border-green-500/20 space-y-5">

<div className="flex justify-between items-center">

<h3 className="text-lg font-black italic text-white uppercase">{t.title}</h3>

<span className="text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-[8px] font-black uppercase italic border border-green-500/20">Approved</span>

</div>

<div className="grid grid-cols-2 gap-4">

<div className="bg-black/40 p-3 rounded-2xl">

<p className="text-[7px] text-gray-500 font-black uppercase">Date & Time</p>

<p className="text-[10px] text-white font-black italic">{formatDateTime(t.date)}</p>

</div>

<div className="bg-black/40 p-3 rounded-2xl">

<p className="text-[7px] text-gray-500 font-black uppercase">Mode</p>

<p className="text-[10px] text-white font-black italic">{t.mode} - {t.type}</p>

</div>

</div>

<button onClick={() => { playClick(); setRoomModal(t); }} className="w-full py-4 bg-orange-500 text-black rounded-2xl font-black uppercase italic text-[10px] tracking-widest shadow-lg">View Room ID & Pass</button>

</div>

))

) : (

<div className="py-32 text-center space-y-4">

<Swords size={48} className="mx-auto text-gray-800" />

<p className="text-gray-600 font-black uppercase italic text-xs tracking-widest">No Approved Matches Found</p>

</div>

)}

</div>

)}


{view === 'leaderboard' && (

<div className="space-y-10 py-5 animate-in slide-in-from-bottom-10 duration-500">

<h2 className="text-4xl font-black uppercase italic text-center text-white tracking-tighter">{appSettings.boardName}</h2>

<div className="bg-[#111] rounded-[45px] p-8 space-y-5 border border-white/5 shadow-2xl relative overflow-hidden">

<div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/10 blur-[80px]"></div>

{winners.map((w, i) => (

<div key={i} className={`p-6 rounded-3xl flex justify-between items-center transition-all ${i === 0 ? 'bg-orange-500 text-black scale-105' : 'bg-black text-white border border-white/5'}`}>

<span className="text-xl font-black italic">#{w.rank} {w.name}</span>

<span className="font-black italic text-xs tracking-widest">{w.prize}</span>

</div>

))}

</div>

</div>

)}


{view === 'admin' && isAdminAuthenticated && (

<div className="space-y-10 pb-20 animate-in fade-in">

<div className="flex justify-between items-center">

<h2 className="text-2xl font-black uppercase italic text-orange-500">ADMIN CORE</h2>

<button onClick={() => { playClick(); setIsAdminAuthenticated(false); setView('dashboard'); }} className="px-4 py-2 bg-red-500 text-black rounded-full font-black uppercase italic text-[8px]">Logout</button>

</div>


<div className="bg-[#111] p-8 rounded-[40px] border border-blue-500/20 space-y-5">

<p className="text-[10px] font-black uppercase text-blue-500 italic px-2">Send Notification To Users</p>

<textarea 

placeholder="Enter message here..." 

className="w-full bg-black border border-white/5 rounded-2xl p-5 text-xs text-white outline-none font-black min-h-[80px]" 

value={adminNotifText} 

onChange={e => setAdminNotifText(e.target.value)} 

/>

<button onClick={sendNotification} className="w-full py-4 bg-blue-600 text-white rounded-3xl font-black uppercase italic text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-600/20">

<Send size={14}/> Send To All Users

</button>

</div>


<div className="bg-[#111] p-8 rounded-[40px] border border-orange-500/20 space-y-5">

<p className="text-[10px] font-black uppercase text-orange-500 italic px-2">Create Match</p>

<input required placeholder="Match Title" className="w-full bg-black border border-white/5 rounded-2xl p-5 text-xs text-white outline-none font-black" value={newTourney.title} onChange={e => setNewTourney({...newTourney, title: e.target.value})} />

<div className="grid grid-cols-2 gap-3">

<select className="bg-black border border-white/5 rounded-2xl p-5 text-xs text-white outline-none appearance-none font-black" value={newTourney.mode} onChange={e => {

const mode = e.target.value;

setNewTourney({...newTourney, mode: mode, type: mode === 'LoneWolf Mode' ? 'SOLO' : newTourney.type});

}}>

<option>Full Map Mode</option>

<option>CS Mode</option>

<option>LoneWolf Mode</option>

</select>

<select className="bg-black border border-white/5 rounded-2xl p-5 text-xs text-white outline-none appearance-none font-black" value={newTourney.type} onChange={e => setNewTourney({...newTourney, type: e.target.value})}>

<option>SOLO</option>

<option>DUO</option>

{newTourney.mode !== 'LoneWolf Mode' && <option>SQUAD</option>}

</select>

</div>


<div className="grid grid-cols-2 gap-3">

<div className="relative">

{newTourney.platform === 'Pc only' ? <Monitor size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" /> : <Smartphone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />}

<select className="w-full bg-black border border-white/5 rounded-2xl p-5 pl-10 text-xs text-white outline-none appearance-none font-black" value={newTourney.platform} onChange={e => setNewTourney({...newTourney, platform: e.target.value})}>

<option>Mobile</option>

<option>Pc only</option>

<option>Mobile/Pc</option>

</select>

</div>

<input placeholder="Map Name" className="bg-black border border-white/5 rounded-2xl p-5 text-xs text-white font-black outline-none" value={newTourney.map} onChange={e => setNewTourney({...newTourney, map: e.target.value})} />

</div>


<div className="space-y-2">

<p className="text-[8px] font-black text-gray-500 uppercase italic ml-2 flex items-center gap-2"><AlertCircle size={10}/> Tournament Rules</p>

<textarea 

placeholder="Enter rules (Line by line)..." 

className="w-full bg-black border border-white/5 rounded-2xl p-5 text-xs text-white outline-none font-black min-h-[100px] custom-scrollbar" 

value={newTourney.rules} 

onChange={e => setNewTourney({...newTourney, rules: e.target.value})} 

/>

</div>


<div className="space-y-3 bg-black/40 p-4 rounded-3xl border border-white/5">

<p className="text-[8px] font-black text-gray-500 uppercase italic ml-2">Prize Pool Distribution</p>

<div className="grid grid-cols-3 gap-2">

<input placeholder="Top 1" className="bg-black border border-white/5 rounded-2xl p-4 text-[10px] text-white font-black" value={newTourney.prizePool} onChange={e => setNewTourney({...newTourney, prizePool: e.target.value})} />

<input placeholder="Top 2" className="bg-black border border-white/5 rounded-2xl p-4 text-[10px] text-white font-black" value={newTourney.prize2} onChange={e => setNewTourney({...newTourney, prize2: e.target.value})} />

<input placeholder="Top 3" className="bg-black border border-white/5 rounded-2xl p-4 text-[10px] text-white font-black" value={newTourney.prize3} onChange={e => setNewTourney({...newTourney, prize3: e.target.value})} />

</div>

</div>


<div className="grid grid-cols-2 gap-3">

<input placeholder="Entry Fee (Rs)" className="bg-black border border-white/5 rounded-2xl p-5 text-xs text-white font-black outline-none" value={newTourney.entryFee} onChange={e => setNewTourney({...newTourney, entryFee: e.target.value})} />

<div className="relative group">

<Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 z-10 pointer-events-none" />

<input 

type="datetime-local" 

className="w-full bg-black border border-white/5 rounded-2xl p-5 pl-10 text-[10px] text-white font-black outline-none appearance-none cursor-pointer focus:border-orange-500 transition-colors"

value={newTourney.date} 

onChange={e => setNewTourney({...newTourney, date: e.target.value})} 

/>

<div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] text-gray-600 font-black pointer-events-none uppercase italic">Select Date</div>

</div>

</div>


<button onClick={() => {

playClick();

if(!newTourney.title || !newTourney.date) return;

const id = Date.now();

let max = 48; 

if(newTourney.mode === 'CS Mode') {

max = (newTourney.type === 'SQUAD' ? 8 : (newTourney.type === 'DUO' ? 4 : 2));

} else if(newTourney.mode === 'LoneWolf Mode') {

max = (newTourney.type === 'DUO' ? 4 : 2);

}

setTournaments([...tournaments, {...newTourney, id, participants: 0, maxParticipants: max, roomId: '', roomPass: ''}]);

setView('dashboard');

setNewTourney({title: '', mode: 'Full Map Mode', type: 'SOLO', entryFee: '', date: '', roomId: '', roomPass: '', prizePool: '1000', prize2: '500', prize3: '200', platform: 'Mobile', map: 'Bermuda', rules: '1. No Hacks\n2. No Teaming\n3. Screenshot is must\n4. Be on time'});

}} className="w-full py-6 bg-orange-500 text-black rounded-3xl font-black uppercase italic text-xs tracking-widest shadow-xl">Publish Match</button>

</div>


<div className="bg-[#111] p-8 rounded-[40px] border border-orange-500/20 space-y-6">

<p className="text-[10px] font-black uppercase text-orange-500 italic px-2"><Key size={14}/> Manage Active Matches</p>

<div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">

{tournaments.length > 0 ? tournaments.map(t => (

<div key={t.id} className="bg-black p-5 rounded-3xl border border-white/5 space-y-4">

<div className="flex justify-between items-center">

<p className="text-white font-black italic text-[11px] uppercase">{t.title}</p>

<button onClick={() => deleteTournament(t.id)} className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={16}/></button>

</div>

{editingMatchId === t.id ? (

<div className="space-y-3 animate-in fade-in">

<input placeholder="New Room ID" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-[10px] text-white font-black" value={editRoomId} onChange={e => setEditRoomId(e.target.value)} />

<input placeholder="New Room Pass" className="w-full bg-[#111] border border-white/10 rounded-xl p-3 text-[10px] text-white font-black" value={editRoomPass} onChange={e => setEditRoomPass(e.target.value)} />

<div className="flex gap-2">

<button onClick={() => updateRoomDetails(t.id)} className="flex-1 py-3 bg-green-500 text-black rounded-xl font-black uppercase text-[8px]">Save</button>

<button onClick={() => { playClick(); setEditingMatchId(null); }} className="flex-1 py-3 bg-white/10 text-white rounded-xl font-black uppercase text-[8px]">Cancel</button>

</div>

</div>

) : (

<div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl">

<div className="flex flex-col gap-1">

<p className="text-[8px] text-gray-500 font-black uppercase italic">ID: {t.roomId || '---'}</p>

<p className="text-[8px] text-gray-500 font-black uppercase italic">PASS: {t.roomPass || '---'}</p>

</div>

<button onClick={() => {

playClick();

setEditingMatchId(t.id);

setEditRoomId(t.roomId || "");

setEditRoomPass(t.roomId || "");

}} className="p-3 bg-orange-500 text-black rounded-full"><Edit3 size={14}/></button>

</div>

)}

</div>

)) : (

<p className="text-center text-gray-700 font-black italic uppercase text-[9px] py-10">No Matches To Manage</p>

)}

</div>

</div>


<div className="bg-[#111] p-8 rounded-[40px] border border-green-500/20 space-y-6">

<div className="flex justify-between items-center px-2">

<p className="text-[10px] font-black uppercase text-green-500 italic flex items-center gap-2"><Users size={14}/> Approved Players Record</p>

<button onClick={() => { playClick(); setApprovedRecords([]); }} className="text-red-500 text-[8px] font-black uppercase italic bg-red-500/10 px-3 py-1 rounded-full"><Trash2 size={10} className="inline mr-1"/> Clear</button>

</div>

<div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">

{approvedRecords.length > 0 ? approvedRecords.map((rec, i) => (

<div key={i} className="bg-black p-5 rounded-3xl border border-white/5 flex flex-col gap-2">

<div className="flex justify-between items-start">

<div className="space-y-1">

{rec.teamName && (

<p className="text-orange-500 font-black uppercase italic text-xs mb-1">TEAM: {rec.teamName}</p>

)}

{rec.players.map((p, idx) => (

<p key={idx} className="text-white font-black italic text-[11px] leading-tight">

P{idx+1}: {p.name} <span className="text-orange-500 text-[8px]">({p.uid})</span>

</p>

))}

{rec.waNum && (

<div className="flex items-center gap-1 pt-1">

<MessageCircle size={10} className="text-green-500" />

<span className="text-green-500 text-[9px] font-black italic">{rec.waNum}</span>

</div>

)}

</div>

<span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md text-[7px] font-black uppercase italic border border-green-500/20">Approved</span>

</div>

<div className="pt-2 border-t border-white/5 flex justify-between items-center">

<p className="text-gray-500 text-[8px] font-bold uppercase tracking-wider">{rec.matchTitle}</p>

<p className="text-gray-700 text-[7px] font-black italic">{rec.time}</p>

</div>

</div>

)) : (

<p className="text-center text-gray-700 font-black italic uppercase text-[9px] py-10">No Approved Records Yet</p>

)}

</div>

</div>


<div className="space-y-6">

<div className="flex items-center justify-between px-4">

<p className="text-[10px] font-black uppercase text-gray-500 italic">Pending Requests ({pendingRequests.length})</p>

{pendingRequests.length > 0 && <BellRing size={14} className="text-orange-500 animate-bounce" />}

</div>

{pendingRequests.map(req => (

<div key={req.requestId} className="bg-[#111] p-8 rounded-[40px] border border-white/5 space-y-6">

<div className="space-y-2">

<p className="text-white font-black uppercase text-sm italic">{req.matchTitle}</p>

{req.teamName && (

<p className="text-orange-500 font-black italic text-xs uppercase tracking-tighter">Team Name: {req.teamName}</p>

)}

<div className="flex flex-wrap gap-2">

{req.players.map((p, idx) => (

<span key={idx} className="bg-orange-500/10 text-orange-500 text-[8px] px-2 py-1 rounded-md font-black italic border border-orange-500/10">{p.name} ({p.uid})</span>

))}

</div>

<div className="flex items-center gap-2 bg-green-500/10 p-3 rounded-2xl border border-green-500/10">

<MessageCircle size={14} className="text-green-500" />

<span className="text-green-500 font-black italic text-xs">{req.waNum}</span>

</div>

</div>

<div className="relative cursor-pointer group" onClick={() => { playClick(); setFullScreenImage(req.screenshot); }}>

<img src={req.screenshot} className="w-full h-48 object-cover rounded-3xl" alt="Proof" />

<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">

<span className="text-white font-black uppercase italic text-[10px]">Click to view Full</span>

</div>

</div>


<button onClick={() => {

playSuccess();

setTournaments(prev => prev.map(t => {

if (t.id === req.matchId) {

let increment = 1;

if (t.type === 'DUO') increment = 2;

if (t.type === 'SQUAD') increment = 4;

return { ...t, participants: t.participants + increment };

}

return t;

}));

setUserStatus(prev => ({ ...prev, [req.matchId]: 'approved' }));

const now = new Date();

const timeStr = `${now.getHours()}:${now.getMinutes()} | ${now.getDate()}/${now.getMonth()+1}`;

setApprovedRecords([{ players: req.players, matchTitle: req.matchTitle, time: timeStr, waNum: req.waNum, teamName: req.teamName }, ...approvedRecords]);

setPendingRequests(prev => prev.filter(r => r.requestId !== req.requestId));

}} className="w-full py-4 bg-green-500 text-black rounded-2xl font-black uppercase italic text-[10px] tracking-widest active:scale-95 transition-all shadow-lg shadow-green-500/20">Approve Players</button>

</div>

))}

</div>


<div className="bg-[#111] p-8 rounded-[40px] border border-white/5 space-y-6">

<p className="text-[10px] font-black uppercase text-orange-500 italic px-2">Edit Winners Board</p>

{winners.map((w, i) => (

<div key={i} className="space-y-2 p-4 bg-black rounded-2xl border border-white/5">

<p className="text-[8px] font-black text-gray-500 uppercase italic">Rank #{w.rank}</p>

<input placeholder="Name" className="w-full bg-transparent border-b border-white/10 p-2 text-xs outline-none font-black" value={w.name} onChange={(e) => updateWinner(i, 'name', e.target.value)} />

<input placeholder="Prize (Rs 000)" className="w-full bg-transparent border-b border-white/10 p-2 text-xs outline-none font-black" value={w.prize} onChange={(e) => updateWinner(i, 'prize', e.target.value)} />

</div>

))}

</div>


<div className="bg-[#111] p-8 rounded-[40px] border border-white/5 space-y-4">

<p className="text-[10px] font-black uppercase text-gray-500 italic px-2">Global Settings</p>

<input placeholder="Board Name" className="w-full bg-black border border-white/5 rounded-2xl p-4 text-xs text-white font-black outline-none" value={appSettings.boardName} onChange={e => setAppSettings({...appSettings, boardName: e.target.value})} />

<input placeholder="Admin WhatsApp" className="w-full bg-black border border-white/5 rounded-2xl p-4 text-xs text-white font-black outline-none" value={appSettings.adminWhatsApp} onChange={e => setAppSettings({...appSettings, adminWhatsApp: e.target.value})} />

<input placeholder="Payment Name" className="w-full bg-black border border-white/5 rounded-2xl p-4 text-xs text-white font-black outline-none" value={appSettings.paymentName} onChange={e => setAppSettings({...appSettings, paymentName: e.target.value})} />

<input placeholder="Payment Number" className="w-full bg-black border border-white/5 rounded-2xl p-4 text-xs text-white font-black outline-none" value={appSettings.paymentNumber} onChange={e => setAppSettings({...appSettings, paymentNumber: e.target.value})} />

</div>

</div>

)}


{view === 'joinForm' && selectedMatch && (

<div className="fixed inset-0 z-[60] bg-[#080808] p-6 overflow-y-auto animate-in slide-in-from-right-20 duration-500">

<header className="flex items-center gap-4 mb-8">

<button onClick={() => { playClick(); setView('dashboard'); }} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white active:scale-90"><ChevronRight className="rotate-180" size={20} /></button>

<h3 className="text-xl font-black text-white italic uppercase tracking-tighter">BATTLE JOIN</h3>

</header>

<div className="bg-[#111] p-10 rounded-[50px] space-y-8 border border-white/5 shadow-2xl mb-20">

<div className="space-y-6">

{renderPlayerInputs()}

<div className="pt-4 border-t border-white/5 space-y-4">

<input id="waNum" placeholder="WHATSAPP NUMBER" className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none font-black focus:border-orange-500" />

{(selectedMatch.type === 'DUO' || selectedMatch.type === 'SQUAD') && (

<input id="teamName" placeholder="TEAM NAME" className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none font-black focus:border-orange-500" />

)}

</div>

</div>

<div className="p-8 bg-orange-500 rounded-[40px] text-black text-center shadow-xl relative overflow-hidden">

<div className="absolute top-2 left-2 opacity-10"><Wallet size={40}/></div>

<p className="text-[10px] font-black uppercase italic mb-1">Transfer Fee Rs {selectedMatch.entryFee}</p>

<div className="flex items-center justify-center gap-2">

<p className="text-xl font-black tracking-widest">{appSettings.paymentNumber}</p>

<span className="bg-black/20 px-2 py-0.5 rounded-md text-[8px] font-black uppercase italic">Easypaisa</span>

</div>

<p className="text-[10px] font-bold uppercase">{appSettings.paymentName}</p>

</div>

<div className="text-center space-y-6">

<h2 className="text-2xl font-black text-orange-500 uppercase italic tracking-tighter">UPLOAD SCRIPT</h2>

<label className="w-full h-64 bg-black border-2 border-dashed border-orange-500/20 rounded-[40px] flex flex-col items-center justify-center cursor-pointer overflow-hidden group shadow-2xl">

<input type="file" className="hidden" onChange={(e) => {

playClick();

if (e.target.files && e.target.files[0]) {

const reader = new FileReader();

reader.onload = () => { 

const imgEl = document.getElementById('preImg');

imgEl.src = reader.result; 

imgEl.classList.remove('hidden');

document.getElementById('uploadPlaceholder').classList.add('hidden');

};

reader.readAsDataURL(e.target.files[0]);

}

}} />

<img id="preImg" className="w-full h-full object-cover hidden" alt="Proof" />

<div id="uploadPlaceholder" className="flex flex-col items-center gap-4">

<UploadCloud size={60} className="text-orange-500/40 animate-pulse" />

<span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select From Gallery</span>

</div>

</label>

</div>

<button onClick={() => {

const img = document.getElementById('preImg').src;

const waNumVal = document.getElementById('waNum').value;

let teamNameVal = "";

if (selectedMatch.type !== 'SOLO') {

teamNameVal = document.getElementById('teamName')?.value || "";

if (!teamNameVal) return;

}

if(!img || img === "" || !waNumVal) return;

const playerCount = selectedMatch.type === 'SQUAD' ? 4 : (selectedMatch.type === 'DUO' ? 2 : 1);

const playersData = [];

for(let i=1; i<=playerCount; i++){

const name = document.getElementById(`p${i}Name`).value;

const uid = document.getElementById(`p${i}Uid`).value;

if(name && uid) playersData.push({ name, uid });

}

if(playersData.length < playerCount) return;

playNotification();

const newReq = { 

requestId: Date.now(), 

matchId: selectedMatch.id, 

matchTitle: selectedMatch.title, 

players: playersData, 

screenshot: img,

waNum: waNumVal,

teamName: teamNameVal

};

setPendingRequests([newReq, ...pendingRequests]);

setUserStatus(prev => ({ ...prev, [selectedMatch.id]: 'pending' }));

setView('dashboard');

}} className="w-full py-6 bg-orange-500 text-black rounded-[2.5rem] font-black uppercase italic text-xs tracking-widest active:scale-95 transition-all shadow-lg shadow-orange-500/20">Submit For Approval</button>

</div>

</div>

)}

<div className="text-center py-4">

<p className="text-[10px] font-black uppercase italic text-gray-600 tracking-widest">

this tournment is skill based not for gambling

</p>

</div>

</main>


<nav className="fixed bottom-0 left-0 right-0 bg-[#080808]/90 backdrop-blur-3xl border-t border-white/5 px-4 py-8 flex justify-around items-center z-50 rounded-t-[50px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

<button onClick={() => { playClick(); setView('dashboard'); }} className={`flex flex-col items-center gap-1 transition-all ${view === 'dashboard' ? 'text-orange-500 scale-110' : 'text-gray-600'}`}>

<LayoutDashboard size={22}/><span className="text-[8px] font-black uppercase italic tracking-widest">Lobby</span>

</button>

<button onClick={() => { playSwitch(); setView('arena'); }} className={`flex flex-col items-center gap-1 transition-all ${view === 'arena' ? 'text-orange-500 scale-110' : 'text-gray-600'}`}>

<Swords size={22}/><span className="text-[8px] font-black uppercase italic tracking-widest">Arena</span>

</button>

<button onClick={() => { playSwitch(); setView('leaderboard'); }} className={`flex flex-col items-center gap-1 transition-all ${view === 'leaderboard' ? 'text-orange-500 scale-110' : 'text-gray-600'}`}>

<Medal size={22}/><span className="text-[8px] font-black uppercase italic tracking-widest">Winners</span>

</button>

</nav>


{showFullModal && (

<div className="fixed inset-0 z-[250] bg-black/98 flex items-center justify-center p-6 animate-in zoom-in-95">

<div className="bg-[#111] w-full max-sm p-10 rounded-[60px] border border-red-500/20 text-center space-y-6 relative overflow-hidden">

<div className="absolute top-0 left-0 p-8 opacity-5 text-red-500"><AlertCircle size={150} /></div>

<div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-red-500 mb-2">

<UserPlus size={40} className="rotate-45" />

</div>

<div className="space-y-2">

<h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">LOBBY <span className="text-red-500 underline decoration-red-500/30">FULL</span></h3>

<p className="text-gray-400 font-bold text-xs uppercase italic leading-relaxed px-4">This Tournament is already full! Please try joining another battle from the lobby.</p>

</div>

<div className="pt-4">

<button onClick={() => { playClick(); setShowFullModal(false); }} className="w-full py-5 bg-red-600 text-white rounded-[2.5rem] font-black uppercase italic text-xs tracking-widest shadow-[0_10px_30px_rgba(220,38,38,0.3)] active:scale-95 transition-all">Back To Lobby</button>

</div>

</div>

</div>

)}


{showNotifModal && (

<div className="fixed inset-0 z-[150] bg-black/95 flex items-center justify-center p-6 animate-in fade-in duration-300">

<div className="bg-[#111] w-full max-w-sm p-8 rounded-[40px] border border-white/5 space-y-6 relative overflow-hidden animate-in zoom-in-95 duration-300">

<div className="flex justify-between items-center border-b border-white/5 pb-4">

<div className="flex items-center gap-2">

<h3 className="text-lg font-black italic uppercase text-yellow-400 flex items-center gap-2">

<BellRing size={20} className="text-yellow-400" /> Inbox

</h3>

{notifications.length > 0 && (

<button 

onClick={clearNotifications}

className="text-[8px] bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full font-black uppercase italic hover:bg-red-500 hover:text-white transition-all active:scale-90"

>

Clear All

</button>

)}

</div>

<button onClick={() => { playClick(); setShowNotifModal(false); }} className="text-gray-500 bg-white/5 p-2 rounded-full"><X size={20}/></button>

</div>

<div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar space-y-4">

{notifications.length > 0 ? notifications.map(n => (

<div key={n.id} className="bg-black/60 p-5 rounded-3xl border border-white/5 space-y-2 hover:border-yellow-400/30 transition-colors">

<div className="flex justify-between items-start">

<Megaphone size={12} className="text-yellow-400" />

<p className="text-[8px] text-gray-600 font-black uppercase italic">{n.time}</p>

</div>

<p className="text-white text-xs font-bold italic leading-relaxed">{n.text}</p>

</div>

)) : (

<div className="text-center py-20 space-y-4">

<Bell size={40} className="mx-auto text-gray-800" />

<p className="text-gray-700 font-black italic uppercase text-[9px]">No notifications at the moment</p>

</div>

)}

</div>

<button onClick={() => { playClick(); setShowNotifModal(false); }} className="w-full py-4 bg-yellow-400 text-black rounded-2xl font-black uppercase italic text-[10px] tracking-widest shadow-lg shadow-yellow-400/20 active:scale-95 transition-all">Close Board</button>

</div>

</div>

)}


{activeNotification && (

<div className="fixed top-20 left-6 right-6 z-[200] animate-in slide-in-from-top-20 duration-500">

<div className="bg-blue-600 p-5 rounded-3xl shadow-[0_10px_40px_rgba(37,99,235,0.4)] border border-blue-400/30 flex items-start gap-4">

<div className="bg-white/20 p-2 rounded-xl text-white"><Megaphone size={20} className="animate-bounce" /></div>

<div className="flex-1">

<div className="flex justify-between items-center">

<p className="text-[8px] font-black uppercase italic text-white/60 tracking-widest">New Update From Admin</p>

<button onClick={() => setActiveNotification(null)} className="text-white/60"><X size={14}/></button>

</div>

<p className="text-white font-black italic text-xs leading-relaxed mt-1">{activeNotification.text}</p>

<button onClick={() => { playClick(); setActiveNotification(null); setShowNotifModal(true); }} className="mt-3 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full text-[8px] font-black uppercase italic text-white transition-colors">View All</button>

</div>

</div>

</div>

)}


{fullScreenImage && (

<div className="fixed inset-0 z-[200] bg-black flex items-center justify-center p-4 animate-in fade-in" onClick={() => { playClick(); setFullScreenImage(null); }}>

<div className="relative w-full max-w-lg" onClick={e => e.stopPropagation()}>

<button onClick={() => { playClick(); setFullScreenImage(null); }} className="absolute -top-12 right-0 p-3 bg-white/10 rounded-full text-white"><X size={24}/></button>

<img src={fullScreenImage} className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl" alt="Proof Full" />

<div className="mt-4 text-center">

<p className="text-gray-500 text-[10px] font-black uppercase italic">Tap outside to close</p>

</div>

</div>

</div>

)}


{rulesModal && (

<div className="fixed inset-0 z-[110] bg-black/98 flex items-center justify-center p-6 animate-in zoom-in-95">

<div className="bg-[#111] w-full max-sm p-8 rounded-[50px] border border-orange-500/20 space-y-6 relative overflow-hidden">

<div className="absolute top-0 right-0 p-8 opacity-5"><Info size={120} /></div>

<div className="flex items-center gap-3 border-b border-white/5 pb-4">

<div className="bg-orange-500 p-2 rounded-xl text-black"><AlertCircle size={20}/></div>

<h3 className="text-xl font-black italic uppercase tracking-tighter">BATTLE <span className="text-orange-500">RULES</span></h3>

</div>

<div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">

<p className="text-sm font-bold text-gray-300 leading-relaxed whitespace-pre-line italic">{rulesModal.rules || "No specific rules provided for this tournament."}</p>

</div>

<button onClick={() => { playClick(); setRulesModal(null); }} className="w-full py-5 bg-orange-500 text-black rounded-3xl font-black uppercase italic text-xs tracking-widest shadow-xl active:scale-95 transition-all">Understood</button>

</div>

</div>

)}


{roomModal && (

<div className="fixed inset-0 z-[100] bg-black/98 flex items-center justify-center p-6 animate-in fade-in">

<div className="bg-[#111] w-full max-xs p-10 rounded-[60px] border border-orange-500/20 text-center space-y-10 relative">

<div className="bg-orange-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-orange-500"><Key size={30} /></div>

<div className="space-y-6">

{roomModal.roomId && roomModal.roomPass ? (

<div className="space-y-4">

<div className="bg-black/60 p-6 rounded-[35px] border border-white/5 relative">

<p className="text-[8px] font-black text-gray-600 uppercase italic mb-1">Room ID</p>

<p className="text-2xl font-black italic text-white tracking-[0.2em]">{roomModal.roomId}</p>

</div>

<div className="bg-black/60 p-6 rounded-[35px] border border-white/5 relative">

<p className="text-[8px] font-black text-gray-600 uppercase italic mb-1">Password</p>

<p className="text-2xl font-black italic text-white tracking-[0.2em]">{roomModal.roomPass}</p>

</div>

</div>

) : (

<div className="p-8 bg-orange-500/5 rounded-[40px] border border-orange-500/20">

<p className="text-sm font-black italic text-white leading-relaxed">Room start honay se 10 min pehle ID Pass yahan update ho jayega.</p>

<div className="flex justify-center mt-4 text-orange-500 animate-pulse"><Clock size={24} /></div>

</div>

)}

</div>

<button onClick={() => { playClick(); setRoomModal(null); }} className="w-full py-5 bg-white text-black rounded-[2.5rem] font-black uppercase italic text-xs tracking-widest shadow-xl">Back To Arena</button>

</div>

</div>

)}

</div>

);

};


export default App;


```
