import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ShieldCheck, ArrowRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Lottie from 'lottie-react';
import addToCartAnimation from '../assets/Lotties/AddToCart.json';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, totalCartPrice, totalCartItems, setActiveTab } = useApp();

  const deliveryFee = 0; // FREE Delivery
  const gst = Math.round(totalCartPrice * 0.05); // 5% GST
  const grandTotal = totalCartPrice + deliveryFee + gst;

  // Render highly-detailed, beautiful, custom inline vectors to prevent blank image placeholders
  const renderMiniGraphic = (type) => {
    switch (type) {
      case 'teddy':
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <circle cx="28" cy="30" r="10" fill="#FDA4AF" />
            <circle cx="72" cy="30" r="10" fill="#FDA4AF" />
            <circle cx="50" cy="72" r="24" fill="#FECDD3" />
            <circle cx="50" cy="46" r="20" fill="#FDA4AF" />
            <ellipse cx="50" cy="50" r="8" rx="7" ry="5" fill="#FFE4E6" />
          </svg>
        );
      case 'car':
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <circle cx="28" cy="74" r="12" fill="#1E293B" />
            <circle cx="72" cy="74" r="12" fill="#1E293B" />
            <rect x="22" y="52" width="56" height="18" rx="6" fill="#FF6E54" />
            <path d="M32 52L40 38H60L68 52H32Z" fill="#0F172A" />
          </svg>
        );
      case 'pendant':
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <circle cx="50" cy="53" r="4" fill="none" stroke="#94A3B8" strokeWidth="2" />
            <path d="M50 58 C46 52 32 52 32 68 C32 80 50 90 50 90 C50 90 68 80 68 68 C68 52 54 52 50 58 Z" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1.5" />
          </svg>
        );
      case 'hamper':
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <path d="M22 60 L28 85 A 4 4 0 0 0 32 88 L68 88 A 4 4 0 0 0 72 85 L78 60 Z" fill="#A16207" />
            <path d="M20 60 C30 50 42 42 50 42 C58 42 70 50 80 60" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="50" cy="42" r="3.5" fill="#DC2626" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-grow flex flex-col bg-white min-h-screen">
      {/* Elevated Sticky Header */}
      <header className="sticky top-0 bg-orange-100 border-b border-orange-200/50 px-4 py-3 flex items-center justify-between z-40 shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-1.5 bg-white hover:bg-orange-50 border border-slate-200 rounded-full shadow-sm transition-colors active:scale-95 cursor-pointer text-[#02006c]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1.5 -ml-1">
            <Lottie animationData={addToCartAnimation} loop={true} className="w-10 h-10" />
            <div className="flex flex-col justify-center">
              <h1 className="text-sm font-black text-[#02006c] tracking-wide uppercase font-sans flex items-center gap-1.5 leading-tight">
                Your Basket
                <ShoppingBag className="w-3.5 h-3.5 text-[#FF6E54]" />
              </h1>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-sans leading-tight">
                Secure Checkout
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#FF6E54]/10 text-[#FF6E54] px-2.5 py-0.5 rounded-full border border-[#FF6E54]/15">
          <span className="text-[8.5px] font-bold uppercase tracking-wider">{totalCartItems} Items</span>
        </div>
      </header>

      {/* Main Page Content */}
      <div className="p-4 space-y-6 pb-24 flex-grow animate-fade-in">
        {cart.length > 0 ? (
          /* Cart List and billing layout */
          <div className="space-y-6">
            <div className="space-y-3">
              {cart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center gap-3 bg-white rounded-2xl p-3 border border-slate-100 shadow-xs hover:border-slate-200 transition-all duration-300"
                >
                  {/* SVG/Image container */}
                  <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      renderMiniGraphic(item.type)
                    )}
                  </div>

                  {/* Details layout */}
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-bold text-[#0F172A] truncate leading-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>{item.name}</h4>
                    <p className="text-[9px] text-[#FF6E54] font-black mt-1 bg-orange-50 px-2 py-0.5 rounded-full w-fit">
                      {item.discount} OFF
                    </p>
                    
                    <div className="flex items-center justify-between mt-2 gap-2">
                      {/* Unit price */}
                      <span className="text-xs font-black text-slate-700">₹{item.price * item.quantity}</span>
                      
                      {/* Incrementor buttons */}
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-md bg-white hover:bg-slate-100 active:scale-95 text-slate-500 shadow-sm transition-all duration-300"
                        >
                          <Minus className="w-2.5 h-2.5 stroke-[3]" />
                        </button>
                        <span className="text-xs font-black text-slate-800 min-w-[14px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-md bg-white hover:bg-slate-100 active:scale-95 text-slate-500 shadow-sm transition-all duration-300"
                        >
                          <Plus className="w-2.5 h-2.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Pricing summary */}
            <div className="bg-slate-50/50 rounded-3xl border border-slate-100 p-4 space-y-4">
              <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Bill Summary</h4>
              
              <div className="space-y-2 text-xs font-semibold text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({totalCartItems} items)</span>
                  <span className="text-[#0F172A]">₹{totalCartPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Charge</span>
                  <span className="text-emerald-600 font-extrabold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full text-[9px]">
                    FREE DELIVERY
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated GST (5%)</span>
                  <span className="text-[#0F172A]">₹{gst}</span>
                </div>
                
                <div className="border-t border-slate-100 pt-3 flex justify-between font-black text-sm text-[#0F172A]">
                  <span>To Pay</span>
                  <span className="text-[#FF6E54]">₹{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Safe seal */}
            <div className="flex items-center gap-2.5 bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span className="text-[10px] font-bold text-emerald-950 leading-tight">
                Genuine Products Guarantee. 100% Secure Checkout, Easy Cancellations.
              </span>
            </div>

            {/* Checkout CTA */}
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#FF6E54] hover:bg-orange-600 active:scale-95 text-white py-3.5 rounded-2xl font-black text-xs shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group transition-all duration-300"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          /* Empty State */
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 text-center space-y-4 max-w-sm mx-auto shadow-inner mt-12">
            <div className="w-16 h-16 bg-orange-100 text-[#FF6E54] rounded-full flex items-center justify-center mx-auto shadow-md shadow-orange-500/10">
              <ShoppingBag className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-[#0F172A]">Your Bag is Empty</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Looks like you haven't added any gifts to your shopping bag yet. Fill it with premium items!
              </p>
            </div>

            <button
              onClick={() => setActiveTab('home')}
              className="bg-[#FF6E54] hover:bg-orange-600 active:scale-95 text-white text-[10px] font-black px-6 py-3 rounded-2xl shadow-md shadow-orange-500/25 transition-all duration-300"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
