import React from 'react';
import { ArrowLeft, Package, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { orders } = useApp();

  return (
    <div className="bg-slate-50 min-h-full font-sans pb-20">
      {/* Header */}
      <div className="bg-[#FFE4D6] px-4 py-4 flex items-center gap-3 shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-1.5 -ml-1 hover:bg-orange-200/50 rounded-full transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5 text-[#02006c]" />
        </button>
        <h1 className="text-[#02006c] text-[18px] font-black tracking-tight">My Orders</h1>
      </div>

      {/* Orders List / Empty State */}
      {orders.length === 0 ? (
        <div className="p-4 flex flex-col items-center justify-center mt-20">
          <div className="w-24 h-24 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-[#FF6E54]" />
          </div>
          <h2 className="text-[17px] font-bold text-slate-800 mb-2">No Orders Yet</h2>
          <p className="text-slate-500 text-[13px] text-center max-w-[250px]">
            Looks like you haven't placed any orders yet.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 bg-[#02006c] hover:bg-blue-900 text-white text-[13px] font-bold py-3 px-8 rounded-[20px] transition-all active:scale-95 shadow-md shadow-[#02006c]/20 cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Order ID</span>
                  <span className="text-[13px] text-[#02006c] font-black">{order.id}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Date</span>
                  <span className="text-[13px] text-slate-800 font-bold">{order.date}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {order.items.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded-md bg-slate-50" />
                    <div className="flex flex-col flex-1">
                      <span className="text-[12px] font-bold text-slate-800 line-clamp-1">{item.name}</span>
                      <span className="text-[10px] text-slate-500">Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <span className="text-[11px] text-slate-500 font-bold ml-1">+ {order.items.length - 2} more items</span>
                )}
              </div>
              
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-orange-50 px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">{order.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[14px] font-black text-[#02006c]">₹{order.total}</span>
                  <button className="w-7 h-7 bg-slate-50 rounded-full flex items-center justify-center hover:bg-slate-100">
                    <ChevronRight className="w-4 h-4 text-[#02006c]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
