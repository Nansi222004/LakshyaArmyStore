import React, { useState } from 'react';
import { 
  Package, Upload, Plus, X, 
  Save, CheckCircle2,
  Info, Image as ImageIcon, Layers,
  DollarSign, Tag, FileText, 
  Truck, ShieldCheck, ToggleLeft, ToggleRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Label = ({ children, required }) => (
  <label className="block text-sm font-semibold text-slate-600 mb-2">
    {children}{required && <span className="text-red-400 ml-1">*</span>}
  </label>
);

const SectionTitle = ({ icon: Icon, color, children }) => (
  <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-slate-100">
    <div className={`p-2 rounded-xl ${color}`}>
      <Icon size={17} />
    </div>
    <h3 className="text-base font-semibold text-slate-700">{children}</h3>
  </div>
);

const inputCls = "w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium text-slate-800 focus:ring-4 focus:ring-orange-50 focus:border-orange-300 transition-all outline-none placeholder:text-slate-400";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [saved, setSaved] = useState(false);
  const [flags, setFlags] = useState({ topSection: false, crazyDeals: false, flashSale: false });

  const categories = ['Fashion', 'Electronics', 'Beauty', 'Home Decor', 'Toys', 'Stationery', 'Jewellery', 'Gifting', 'Electrical'];

  const handleAddImage = () => {
    const url = prompt('Enter Image URL');
    if (url) setImages([...images, url]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleFlag = (key) => setFlags(p => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-6 pb-20 max-w-[1200px]">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight font-montserrat">Add New Product</h1>
          <p className="text-slate-500 mt-1">Fill in the details below to publish a product to the catalog.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
            Save as Draft
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${saved ? 'bg-green-500 text-white' : 'bg-blue-500 text-white shadow-blue-100 hover:scale-105'}`}
          >
            {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
            {saved ? 'Product Published!' : 'Publish to Catalog'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── LEFT: Main Form ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* 1. Product Specification */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 space-y-5">
            <SectionTitle icon={FileText} color="bg-orange-50 text-orange-500">Product Specification</SectionTitle>

            <div>
              <Label required>Product Name</Label>
              <input type="text" placeholder="e.g. Premium Leather Satchel" className={inputCls} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label required>Category</Label>
                <select className={inputCls}>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <Label>Sub-Category</Label>
                <input type="text" placeholder="e.g. Bags & Backpacks" className={inputCls} />
              </div>
            </div>

            <div>
              <Label>Detailed Description</Label>
              <textarea
                rows={5}
                placeholder="Tell customers about the product features, materials, and unique selling points..."
                className={`${inputCls} resize-none`}
              />
            </div>
          </section>

          {/* 2. Pricing & Stocks */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 space-y-5">
            <SectionTitle icon={DollarSign} color="bg-green-50 text-green-600">Pricing & Stocks</SectionTitle>

            <div className="grid grid-cols-3 gap-5">
              <div>
                <Label required>Selling Price (₹)</Label>
                <input type="number" placeholder="0.00" className={inputCls} />
              </div>
              <div>
                <Label>MRP / Strike-off (₹)</Label>
                <input type="number" placeholder="0.00" className={inputCls} />
              </div>
              <div>
                <Label required>Initial Stock</Label>
                <input type="number" placeholder="1" className={inputCls} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Discount Label</Label>
                <input type="text" placeholder="e.g. -40% OFF" className={inputCls} />
              </div>
              <div>
                <Label>SKU / Product Code</Label>
                <input type="text" placeholder="e.g. FSH-001" className={inputCls} />
              </div>
            </div>
          </section>

          {/* 3. Highlights & Specs */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 space-y-5">
            <SectionTitle icon={Info} color="bg-indigo-50 text-indigo-500">Highlights & Specs</SectionTitle>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-indigo-500">Key Highlights</p>
                <div className="grid grid-cols-2 gap-3">
                  {['Pack Of', 'Fabric', 'Sleeve', 'Pattern', 'Collar', 'Color'].map(f => (
                    <div key={f}>
                      <Label>{f}</Label>
                      <input type="text" placeholder={`e.g. ${f}`} className={inputCls} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-indigo-500">Technical Specs</p>
                <div className="space-y-3">
                  {['Fit', 'Fabric Care', 'Suitable For', 'Hem'].map(f => (
                    <div key={f}>
                      <Label>{f}</Label>
                      <input type="text" placeholder={`e.g. ${f}`} className={inputCls} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4. Variations */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 space-y-5">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-50 text-purple-500 rounded-xl"><Layers size={17} /></div>
                <h3 className="text-base font-semibold text-slate-700">Variations (SKUs)</h3>
              </div>
              <button className="text-sm font-semibold text-blue-500 hover:underline">+ Add Attribute</button>
            </div>

            <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 gap-3">
              <Layers size={32} />
              <p className="text-sm font-medium text-center text-slate-400">No variations defined.<br />Add Size, Color or Material to create SKUs.</p>
            </div>
          </section>

          {/* 5. Shipping & Logistics */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7 space-y-5">
            <SectionTitle icon={Truck} color="bg-blue-50 text-blue-500">Shipping & Logistics</SectionTitle>

            <div className="grid grid-cols-4 gap-4">
              {['Weight (kg)', 'Length (cm)', 'Width (cm)', 'Height (cm)'].map((f, i) => (
                <div key={f}>
                  <Label>{f}</Label>
                  <input type="number" placeholder={['0.5', '10', '10', '5'][i]} className={inputCls} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <div className="space-y-6">

          {/* Product Flags */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <SectionTitle icon={Tag} color="bg-orange-50 text-orange-500">Product Flags</SectionTitle>

            {[
              { key: 'topSection', label: 'Top Section', desc: 'Show in the top hero grid' },
              { key: 'crazyDeals', label: 'Crazy Deals', desc: 'Feature in the crazy deals list' },
              { key: 'flashSale', label: 'Flash Sale', desc: 'Include in the active flash sale' },
            ].map(flag => (
              <div key={flag.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{flag.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{flag.desc}</p>
                </div>
                <button onClick={() => toggleFlag(flag.key)}>
                  {flags[flag.key]
                    ? <ToggleRight size={28} className="text-blue-500" />
                    : <ToggleLeft size={28} className="text-slate-300" />
                  }
                </button>
              </div>
            ))}
          </section>

          {/* Tax & Compliance */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <SectionTitle icon={ShieldCheck} color="bg-green-50 text-green-600">Tax & Compliance</SectionTitle>

            <div>
              <Label>GST Category</Label>
              <select className={inputCls}>
                <option>GST 18% (Standard)</option>
                <option>GST 12%</option>
                <option>GST 5%</option>
                <option>GST 0% (Exempt)</option>
              </select>
            </div>
            <div>
              <Label>HSN Code</Label>
              <input type="text" placeholder="e.g. 4202" className={inputCls} />
            </div>
          </section>

          {/* Image Gallery */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl"><ImageIcon size={17} /></div>
                <h3 className="text-base font-semibold text-slate-700">Visuals</h3>
              </div>
              <span className="text-sm font-semibold text-blue-500">{images.length}/5</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
                  <img src={img} alt="Product" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <button
                  onClick={handleAddImage}
                  className="aspect-square border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/20 transition-all text-slate-400"
                >
                  <Upload size={22} />
                  <span className="text-xs font-semibold">Add URL</span>
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              Recommended: <strong className="text-slate-700">1080×1080 px</strong>. High-quality images increase conversion by up to <strong className="text-slate-700">40%</strong>.
            </p>
          </section>

          {/* Organization */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <SectionTitle icon={Tag} color="bg-amber-50 text-amber-500">Organization</SectionTitle>

            <div>
              <Label>Brand Name</Label>
              <input type="text" placeholder="Generic" className={inputCls} />
            </div>
            <div>
              <Label>Tags (Comma Separated)</Label>
              <input type="text" placeholder="new, trending, summer" className={inputCls} />
            </div>
            <div>
              <Label>Manufacturer Info</Label>
              <textarea rows={3} placeholder="Manufacturer details, origin, etc." className={`${inputCls} resize-none`} />
            </div>
          </section>

          {/* Status */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Package size={100} />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Publish Status</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <h4 className="text-lg font-semibold text-white">Ready to Publish</h4>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                This product will be immediately visible across all platform storefronts upon publishing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
