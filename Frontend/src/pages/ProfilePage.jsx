import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import toast from '../utils/toast';
import { 
  ChevronLeft, User, Lock, Settings, Phone, LogOut, Camera, 
  ChevronRight, Coins, Gift, ShoppingBag, Sparkles, X,
  CreditCard, Globe, Bell, Headphones, Store, FileText, HelpCircle,
  Heart, Package, Edit2, MapPin, Truck, RotateCcw, ShieldCheck, Tag, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CRAZY_DEALS, VALUE_PROPS } from '../data/mockData';
import OptimizedImage from '../components/ui/OptimizedImage';

export default function ProfilePage() {
  const { coins, user, setUser, logout } = useApp();
  const navigate = useNavigate();

  const [infoModalType, setInfoModalType] = useState(null); // 'terms', 'faq', or null
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Custom Image Upload State
  const [uploadedImage, setUploadedImage] = useState(() => {
    return user?.avatar  || null;
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.info('Image size cannot exceed 10MB!');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);

      const token = localStorage.getItem('userToken');
      if (token) {
        const uploadPromise = new Promise(async (resolve, reject) => {
          try {
            const formData = new FormData();
            formData.append('image', file);
            const apiBase = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth`;
            const res = await fetch(`${apiBase}/profile`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`
              },
              body: formData
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
              reject(new Error(data.message || 'Failed to upload profile photo'));
              return;
            }

            const currentInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const updatedInfo = {
              ...currentInfo,
              avatar: data.user.avatar
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedInfo));

            if (setUser) {
              setUser({
                ...user,
                avatar: data.user.avatar
              });
            }
            resolve('Profile photo updated successfully!');
          } catch (err) {
            reject(err);
          }
        });

        toast.promise(uploadPromise, {
          loading: 'Uploading photo...',
          success: (msg) => msg,
          error: (err) => err.message || 'Failed to upload photo.'
        });
      } else {
        toast.success('Photo preview updated! (Offline mode)');
      }
    }
  };

  if (!user) {
    return (
      <div className="bg-slate-100 min-h-[100dvh] pb-24 font-sans animate-fade-in flex flex-col">
        
        {/* Sticky App Header */}
        <div className="bg-[#FFE4D6] px-4 py-4 shadow-sm z-10 sticky top-0 flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center text-[#2F3E16] hover:bg-white active:scale-95 transition-all cursor-pointer shadow-sm flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[#2F3E16] text-[20px] font-black tracking-tight">Profile</h1>
        </div>

        {/* Login Section Card */}
        <div className="bg-white px-4 py-4 mb-2 shadow-sm mt-2">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#2F3E16] font-medium">Log in to get exclusive offers</span>
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#2F3E16] hover:bg-blue-900 active:scale-95 text-white text-[13px] font-bold py-2 px-6 rounded transition-all shadow-sm"
            >
              Log In
            </button>
          </div>
        </div>






        {/* Feedback & Information */}
        <div className="bg-white shadow-sm mb-4">
          <h3 className="text-[15px] font-bold text-slate-800 p-4 pb-2">Feedback & Information</h3>
          <div className="flex flex-col">
            {[
              { icon: FileText, label: 'Terms, Policies and Licenses', id: 'terms' },
              { icon: HelpCircle, label: 'Browse FAQs', id: 'faq' },
              { icon: Phone, label: 'Help & Support', path: '/help' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  if (item.path) {
                    navigate(item.path);
                  } else {
                    setInfoModalType(item.id);
                  }
                }}
                className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 cursor-pointer hover:bg-slate-50 group transition-colors"
              >
                <item.icon className="w-5 h-5 text-[#2F3E16] group-hover:scale-110 transition-transform" />
                <span className="text-[13px] font-medium text-slate-700 flex-1 group-hover:text-[#2F3E16] transition-colors">{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#4B5320] group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* Info Modals */}
        <AnimatePresence>
          {infoModalType === 'terms' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0a0927]/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
            >
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md overflow-hidden flex flex-col h-[85vh] shadow-2xl border-t border-slate-100"
              >
                <div className="w-full flex justify-center pt-4 pb-2 bg-white relative z-20">
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                </div>
                <div className="px-6 pb-4 pt-1 flex items-center justify-between border-b border-slate-100">
                  <h3 className="text-lg font-black text-[#2F3E16]">Terms & Policies</h3>
                  <button onClick={() => setInfoModalType(null)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"><X className="w-4.5 h-4.5 text-slate-500" /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-600">
                  <h4 className="font-bold text-slate-800">1. Acceptance of Terms</h4>
                  <p>By using Lakshya, you agree to these conditions. Please read them carefully.</p>
                  <h4 className="font-bold text-slate-800">2. Privacy Policy</h4>
                  <p>Your privacy is important to us. We only collect information necessary to provide you with our services.</p>
                  <h4 className="font-bold text-slate-800">3. Return & Refund</h4>
                  <p>Items can be returned within 14 days of delivery. Custom avatars and digital goods are non-refundable.</p>
                  <h4 className="font-bold text-slate-800">4. Intellectual Property</h4>
                  <p>All content included in or made available through Lakshya, such as text, graphics, logos, and avatars is the property of Lakshya.</p>
                  <h4 className="font-bold text-slate-800">5. User Conduct</h4>
                  <p>Users must not engage in any activity that disrupts or interferes with Lakshya services.</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {infoModalType === 'faq' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0a0927]/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
            >
              <motion.div 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-md overflow-hidden flex flex-col h-[85vh] shadow-2xl border-t border-slate-100"
              >
                <div className="w-full flex justify-center pt-4 pb-2 bg-white relative z-20">
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full"></div>
                </div>
                <div className="px-6 pb-4 pt-1 flex items-center justify-between border-b border-slate-100">
                  <h3 className="text-lg font-black text-[#2F3E16]">Frequently Asked Questions</h3>
                  <button onClick={() => setInfoModalType(null)} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"><X className="w-4.5 h-4.5 text-slate-500" /></button>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">How do I track my order?</h4>
                    <p className="text-sm text-slate-600">You can track your order status in the "My Orders" section if you are logged in, or using the tracking link in your email.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">What are Lakshya Coins?</h4>
                    <p className="text-sm text-slate-600">Lakshya Coins are our loyalty currency. You earn them on every purchase and can use them for discounts on future orders.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Can I change my avatar later?</h4>
                    <p className="text-sm text-slate-600">Yes! You can edit your avatar at any time by clicking on it in your profile page.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Do you ship internationally?</h4>
                    <p className="text-sm text-slate-600">Currently, we only ship within select regions. Please check our delivery coverage during checkout.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  const mockUser = user;

  const menuOptions = [
    { id: 'wallet', label: "My Wallet", desc: "View your current Lakshya coin balance", icon: Coins, color: "bg-indigo-100/60 text-[#2F3E16]", path: "/wallet" },
    { label: "Account Information", desc: "Manage your email, phone, and profile settings", icon: User, color: "bg-primary-100/60 text-[#4B5320]", path: "/account" },
    { label: "Saved Addresses", desc: "Manage your delivery addresses", icon: MapPin, color: "bg-rose-100/60 text-rose-500", path: "/saved-addresses" },
    { label: "Security & Password", desc: "Change password and secure credentials", icon: Lock, color: "bg-amber-100/60 text-amber-600", path: "/security" },
    { label: "Refer & Earn", desc: "Invite friends and earn Lakshya Coins", icon: Gift, color: "bg-emerald-100/60 text-emerald-600", path: "/refer" }
  ];

  // Options configuration pools
  const optionsPool = {
    skinTones: [
      { name: "Fair", value: "#FFDBB5" },
      { name: "Tan", value: "#E0A96D" },
      { name: "Warm", value: "#AE7A48" },
      { name: "Rich", value: "#5C3E21" }
    ],
    hairStyles: [
      { id: "crop", label: "Crop" },
      { id: "curly", label: "Curly" },
      { id: "long", label: "Long" },
      { id: "spiky", label: "Spiky" }
    ]
  };

  return (
    <div className="bg-white relative pb-24 w-full min-h-full font-sans overflow-x-hidden selection:bg-primary-100 animate-fade-in">
      
      {/* 1. Dark Orange Background */}
      <div className="absolute top-0 left-0 right-0 h-[240px] z-0 pointer-events-none overflow-hidden rounded-b-2xl bg-[#4B5320]">
        {/* Cute soft blobs */}
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-white/20 rounded-full mix-blend-overlay filter blur-3xl opacity-60"></div>
        <div className="absolute top-10 -right-10 w-48 h-48 bg-yellow-400/20 rounded-full mix-blend-overlay filter blur-3xl opacity-60"></div>
      </div>

      {/* 2. Page Content Overlaid */}
      <div className="relative z-10 pt-4 px-5 space-y-4">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-[#2F3E16] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={() => navigate('/account')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-[#2F3E16] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
             <Edit2 className="w-5 h-5" />
          </button>
        </div>

        {/* User Card: Avatar and Names (Cute & Simple) */}
        <div className="flex flex-col items-center text-center !-mt-4 relative">
          {/* Avatar Container with Soft Ring */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1.5 rounded-full bg-primary-200/40 animate-ping opacity-50 blur-sm"></div>
            <div className="relative p-1.5 bg-white rounded-full shadow-md border border-primary-100 transition-transform duration-300 group-hover:scale-105">
              <div className="w-20 h-20 rounded-full border-2 border-primary-50 overflow-hidden bg-slate-50 flex items-center justify-center relative">
                {uploadedImage ? (
                  <OptimizedImage src={uploadedImage} alt="Uploaded Profile" type="default" className="w-full h-full" />
                ) : (
                  <div className="w-full h-full bg-[#4B5320] text-white flex items-center justify-center text-3xl font-bold">
                    {mockUser?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current.click();
                }}
                className="absolute -bottom-1 -right-1 p-2 bg-white border border-slate-100 rounded-full shadow-sm text-primary-400 group-hover:text-primary-500 transition-colors cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 fill-current" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageUpload}
                onClick={(e) => e.stopPropagation()}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* User Names */}
          <h3 className="text-xl font-black text-white mt-3 font-syne tracking-wide drop-shadow-md">
            {mockUser.name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full shadow-sm">
            <Sparkles className="w-3 h-3 text-primary-400 fill-primary-400" />
            <span className="text-[9px] text-primary-600 font-extrabold tracking-widest uppercase">
              {mockUser.tier || 'Gold Tier Gifter'}
            </span>
          </div>
        </div>



        {/* Action Grid (Orders, Wishlist, Coupons, Help Center) */}
        <div className="grid grid-cols-2 gap-3 px-1 pt-4">
          <div 
            onClick={() => navigate('/orders')}
            className="bg-white rounded h-[52px] px-3.5 flex items-center gap-3 shadow-sm border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <Package className="w-5 h-5 text-[#4B5320] group-hover:scale-110 transition-transform" />
            <span className="text-[13px] font-bold text-slate-800 whitespace-nowrap">Orders</span>
          </div>

          <div 
            onClick={() => navigate('/wishlist')}
            className="bg-white rounded h-[52px] px-3.5 flex items-center gap-3 shadow-sm border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <Heart className="w-5 h-5 text-[#4B5320] group-hover:scale-110 transition-transform" />
            <span className="text-[13px] font-bold text-slate-800 whitespace-nowrap">My Picks</span>
          </div>

          <div 
            onClick={() => navigate('/coupons')}
            className="bg-white rounded h-[52px] px-3.5 flex items-center gap-3 shadow-sm border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <Gift className="w-5 h-5 text-[#4B5320] group-hover:scale-110 transition-transform" />
            <span className="text-[13px] font-bold text-slate-800 whitespace-nowrap">Coupons</span>
          </div>

          <div 
            onClick={() => navigate('/support')}
            className="bg-white rounded h-[52px] px-3.5 flex items-center gap-3 shadow-sm border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <Headphones className="w-5 h-5 text-[#4B5320] group-hover:scale-110 transition-transform" />
            <span className="text-[13px] font-bold text-slate-800 whitespace-nowrap">Help Center</span>
          </div>
        </div>

        {/* Lakshya Trust Stamps (Value Props) */}
        <div className="px-1">
          <div className="grid grid-cols-4 gap-2">
            {VALUE_PROPS.map((prop) => (
              <div 
                key={prop.id} 
                className="flex flex-col items-center justify-center rounded-lg bg-white border border-primary-200 p-1.5 py-2 shadow-3xs hover:border-[#4B5320] hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {/* Colored Stamp Icon box with soft blue and blue icon */}
                <div className="w-7 h-7 bg-blue-50 text-[#2F3E16] rounded-md flex items-center justify-center mb-1 shadow-3xs">
                  {prop.id === 1 && <Truck className="w-4 h-4 stroke-[2.2]" />}
                  {prop.id === 2 && <RotateCcw className="w-4 h-4 stroke-[2.2]" />}
                  {prop.id === 3 && <ShieldCheck className="w-4 h-4 stroke-[2.2]" />}
                  {prop.id === 4 && <Tag className="w-4 h-4 stroke-[2.2]" />}
                </div>
                <h5 className="text-[8px] font-bold text-[#2F3E16] leading-tight text-center">{prop.title}</h5>
                <p className="text-[7px] text-slate-400 font-medium leading-none mt-0.5 text-center">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Menu Options Stack (Cute List) */}
        <div className="pt-2">
          <h3 className="text-[15px] font-bold text-slate-800 px-1 mb-3">Account Settings</h3>
          <div className="bg-white rounded p-2 shadow-sm border border-slate-100">
          <div className="space-y-1">
            {menuOptions.map((opt, idx) => {
              const Icon = opt.icon;
              const isWallet = opt.id === 'wallet';
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (opt.path) navigate(opt.path);
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded hover:bg-slate-50 active:scale-[0.98] transition-all duration-300 text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className={`w-11 h-11 ${opt.color} rounded flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 shadow-inner`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-[#2F3E16] font-sans tracking-wide block leading-tight">{opt.label}</span>
                      <span className="text-[9px] text-slate-400 font-bold block truncate mt-1 leading-none tracking-wide">{opt.desc}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#4B5320] group-hover:translate-x-1 transition-all" />
                </button>
              );
            })}
          </div>

          <div className="h-[1px] w-full bg-slate-100 my-2.5"></div>

          {/* Logout Button */}
          <button 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-between p-3.5 rounded hover:bg-rose-50/60 active:scale-[0.98] transition-all duration-300 text-left cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-rose-50 text-rose-500 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 shadow-inner">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-rose-500 font-sans tracking-wide block leading-tight">Log Out</span>
                <span className="text-[9px] text-slate-400 font-bold block mt-1 leading-none tracking-wide">Safely terminate session</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-rose-400 transition-colors" />
          </button>

          <div className="h-[1px] w-full bg-slate-100 my-1"></div>

          {/* Delete Account Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-between p-3.5 rounded hover:bg-red-50/80 active:scale-[0.98] transition-all duration-300 text-left cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-red-50 text-red-500 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-inner">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-red-500 font-sans tracking-wide block leading-tight">Delete Account</span>
                <span className="text-[9px] text-slate-400 font-bold block mt-1 leading-none tracking-wide">Permanently remove your account</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-400 transition-colors" />
          </button>
        </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0a0927]/70 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="bg-white rounded-[28px] w-full max-w-sm p-6 shadow-2xl border border-slate-100 relative overflow-hidden"
            >
              {!deleteSuccess ? (
                <>
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center shadow-inner">
                      <Trash2 className="w-7 h-7 text-red-500" />
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-[18px] font-black text-[#2F3E16] text-center mb-1">Delete Account?</h3>
                  <p className="text-[12px] text-slate-500 font-medium text-center leading-relaxed mb-6">
                    Are you sure you want to permanently delete your account? This action <span className="text-red-500 font-bold">cannot be undone</span> and all your data will be lost.
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 text-[14px] font-bold hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                    >
                      No, Keep It
                    </button>
                    <button
                      onClick={() => {
                        setDeleteSuccess(true);
                        setTimeout(() => {
                          setShowDeleteModal(false);
                          setDeleteSuccess(false);
                          setUser(null);
                          navigate('/login');
                        }, 2000);
                      }}
                      className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-[14px] font-bold active:scale-95 transition-all cursor-pointer shadow-md shadow-red-200"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-4"
                >
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center shadow-inner mb-4">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[17px] font-black text-[#2F3E16] text-center mb-1">Account Deleted</h3>
                  <p className="text-[12px] text-slate-500 font-medium text-center leading-relaxed">
                    Your account has been successfully deleted. Redirecting you now…
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
