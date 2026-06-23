import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from '../components/ui/OptimizedImage';
import { cachedFetch } from '../utils/apiCache';
import { getImageUrl } from '../utils/imageHelper';

export default function TopSelectionPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTopSelections = async () => {
      try {
        const data = await cachedFetch('/admin/catalog/products?status=Approved', { ttl: 300, signal: controller.signal });
        if (data.success && data.products) {
          setProducts(data.products.filter(p => p.flags?.topSection));
        }
      } catch (err) {
        if (err.name !== 'AbortError') console.error('Error fetching top picks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopSelections();
    return () => controller.abort();
  }, []);


  return (
    <div className="min-h-screen bg-white flex flex-col pb-20 animate-fade-in">
      {/* Simple Header */}
      <div className="bg-[#FFE4D6] px-4 py-4 flex items-center gap-3 shadow-sm z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-1.5 -ml-1 hover:bg-orange-200/50 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#02006c]" />
        </button>
        <h1 className="text-[#02006c] text-xl font-bold tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Top picks for you</h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 bg-slate-50 gap-3 p-3">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white flex flex-col items-center pb-3 animate-pulse shadow-sm rounded-lg overflow-hidden">
              <div className="w-full aspect-[4/5] bg-slate-200 mb-2" />
              <div className="w-3/4 h-3 bg-slate-200 rounded mb-1.5" />
              <div className="w-1/2 h-2.5 bg-slate-200 rounded" />
            </div>
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <div 
              key={product._id || product.id} 
              onClick={() => navigate(`/product/${product._id || product.id}`)}
              className="bg-white flex flex-col items-center pt-0 px-0 pb-3 cursor-pointer hover:shadow-md transition-all shadow-sm"
            >
              <div className="w-full aspect-[4/5] mb-2 relative overflow-hidden">
                <OptimizedImage
                  src={getImageUrl((product.images && product.images[0]) ? product.images[0] : '')}
                  alt={product.name}
                  type="product"
                  className="absolute inset-0"
                />
              </div>
              <h3 className="text-[12px] font-medium text-slate-600 text-center tracking-wide font-sans truncate w-full px-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                {product.brandName || 'Mynzo Originals'}
              </h3>
              <p className="text-[10px] text-emerald-600 mt-1 text-center font-medium tracking-wide font-sans truncate w-full px-2" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
                {product.name}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-10 text-center text-slate-400 text-xs font-medium">
            No Top Picks available at this moment.
          </div>
        )}
      </div>
    </div>
  );
}
