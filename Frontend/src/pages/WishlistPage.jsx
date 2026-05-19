import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Heart, ChevronLeft, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishlistPage() {
  const { wishlist } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex-grow flex flex-col bg-white min-h-screen">
      {/* Elevated Sticky Header */}
      <header className="sticky top-0 bg-orange-50 border-b border-slate-100/80 px-4 py-3 flex items-center justify-between z-40">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="p-1 bg-white hover:bg-orange-100/50 border border-slate-100/85 rounded-full shadow-2xs transition-colors active:scale-95 cursor-pointer text-[#02006c]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xs font-black text-[#02006c] tracking-wide uppercase font-syne flex items-center gap-1">
              Your Wishlist
              <Heart className="w-3.5 h-3.5 text-[#FF6E54] fill-current" />
            </h1>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest font-sans">
              Saved Treasures
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#FF6E54]/10 text-[#FF6E54] px-2.5 py-0.5 rounded-full border border-[#FF6E54]/15">
          <span className="text-[8.5px] font-bold uppercase tracking-wider">{wishlist.length} Items</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 space-y-6 pb-24 flex-grow animate-fade-in">
        <AnimatePresence mode="popLayout">
          {wishlist.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 gap-3"
            >
              {wishlist.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-10 text-center space-y-4 max-w-sm mx-auto shadow-inner mt-12"
            >
              <div className="w-16 h-16 bg-rose-50 text-[#FF6E54] rounded-full flex items-center justify-center mx-auto shadow-md shadow-rose-500/10">
                <Heart className="w-8 h-8 animate-pulse fill-current text-[#FF6E54]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-[#02006c] font-syne">Nothing saved yet!</h4>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed font-sans">
                  Start browsing our collections and click the heart icon on your favorite gifts to save them here.
                </p>
              </div>

              <button
                onClick={() => navigate('/')}
                className="bg-[#FF6E54] hover:bg-orange-600 active:scale-95 text-white text-[10px] font-black px-6 py-3 rounded-2xl shadow-md shadow-orange-500/25 transition-all duration-300 font-sans cursor-pointer"
              >
                EXPLORE PRODUCTS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
