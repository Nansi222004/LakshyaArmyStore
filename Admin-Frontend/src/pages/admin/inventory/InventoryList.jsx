import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, deleteProduct, approveProduct } from '../../../store/slices/productSlice';
import {
  Search, Filter, Plus, Package, Edit3, Trash2, Eye,
  CheckCircle2, XCircle, AlertTriangle, ChevronDown,
  ArrowUpDown, MoreVertical, Tag, Download, RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Beauty', 'Home & Kitchen', 'Toys', 'Stationery', 'Jewellery', 'Gifting', 'Electrical'];
const STATUSES = ['All', 'Approved', 'Pending', 'Out of Stock'];

const statusConfig = {
  Approved: { label: 'Approved', color: 'bg-green-50 text-green-600 border-green-100' },
  Pending: { label: 'Pending', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  'Out of Stock': { label: 'Out of Stock', color: 'bg-red-50 text-red-500 border-red-100' },
};

// Rich mock product data based on Frontend's CRAZY_DEALS data structure
const MOCK_PRODUCTS = [
  { id: 'P001', name: 'Oversized Tee', category: 'Fashion', price: 599, originalPrice: 999, stock: 120, sales: 245, status: 'Approved', discount: '-40%', sku: 'FSH-001' },
  { id: 'P002', name: 'Layered Necklace', category: 'Jewellery', price: 699, originalPrice: 999, stock: 85, sales: 130, status: 'Approved', discount: '-30%', sku: 'JWL-001' },
  { id: 'P003', name: 'Vintage Watch', category: 'Jewellery', price: 1499, originalPrice: 2999, stock: 40, sales: 97, status: 'Approved', discount: '-50%', sku: 'JWL-002' },
  { id: 'P004', name: 'Benetint Lip Tint', category: 'Beauty', price: 1299, originalPrice: 1999, stock: 200, sales: 312, status: 'Approved', discount: '-35%', sku: 'BTY-001' },
  { id: 'P005', name: 'Pink Lip Gloss', category: 'Beauty', price: 899, originalPrice: 1199, stock: 180, sales: 210, status: 'Approved', discount: '-20%', sku: 'BTY-002' },
  { id: 'P006', name: 'Peptide Serum', category: 'Beauty', price: 2499, originalPrice: 2999, stock: 60, sales: 88, status: 'Approved', discount: '-15%', sku: 'BTY-003' },
  { id: 'P007', name: 'Sunscreen SPF 50', category: 'Beauty', price: 599, originalPrice: 799, stock: 150, sales: 175, status: 'Approved', discount: '-25%', sku: 'BTY-004' },
  { id: 'P008', name: 'Pink Bow Mug', category: 'Gifting', price: 399, originalPrice: 469, stock: 300, sales: 420, status: 'Approved', discount: '-15%', sku: 'GFT-001' },
  { id: 'P009', name: 'Glass Bow Tumbler', category: 'Gifting', price: 599, originalPrice: 749, stock: 90, sales: 120, status: 'Approved', discount: '-20%', sku: 'GFT-002' },
  { id: 'P010', name: 'Accessories Bouquet', category: 'Gifting', price: 1499, originalPrice: 2499, stock: 25, sales: 54, status: 'Approved', discount: '-40%', sku: 'GFT-003' },
  { id: 'P011', name: 'Wireless Earbuds', category: 'Electronics', price: 1599, originalPrice: 2299, stock: 75, sales: 180, status: 'Approved', discount: '-30%', sku: 'ELC-001' },
  { id: 'P012', name: '20W Power Bank', category: 'Electronics', price: 1299, originalPrice: 1749, stock: 110, sales: 220, status: 'Approved', discount: '-25%', sku: 'ELC-002' },
  { id: 'P013', name: 'Cat Ear Headphones', category: 'Electronics', price: 1899, originalPrice: 2899, stock: 0, sales: 95, status: 'Out of Stock', discount: '-35%', sku: 'ELC-003' },
  { id: 'P014', name: 'Fitness Smartwatch', category: 'Electronics', price: 999, originalPrice: 1999, stock: 55, sales: 140, status: 'Approved', discount: '-50%', sku: 'ELC-004' },
  { id: 'P015', name: 'Reversible Octopus', category: 'Toys', price: 399, originalPrice: 699, stock: 200, sales: 360, status: 'Approved', discount: '-40%', sku: 'TOY-001' },
  { id: 'P016', name: 'Strawberry Bunny', category: 'Toys', price: 799, originalPrice: 1199, stock: 130, sales: 210, status: 'Approved', discount: '-30%', sku: 'TOY-002' },
  { id: 'P017', name: 'Panda Night Light', category: 'Toys', price: 699, originalPrice: 849, stock: 8, sales: 72, status: 'Approved', discount: '-15%', sku: 'TOY-003' },
  { id: 'P018', name: 'Dino Mini Notebooks', category: 'Stationery', price: 199, originalPrice: 249, stock: 350, sales: 500, status: 'Approved', discount: '-20%', sku: 'STN-001' },
  { id: 'P019', name: 'Fluffy Bear Diary', category: 'Stationery', price: 499, originalPrice: 699, stock: 160, sales: 195, status: 'Approved', discount: '-30%', sku: 'STN-002' },
  { id: 'P020', name: 'Pink Bow Pants', category: 'Fashion', price: 1299, originalPrice: 1849, stock: 0, sales: 88, status: 'Out of Stock', discount: '-30%', sku: 'FSH-002' },
  { id: 'P021', name: 'Red Bow Blouse', category: 'Fashion', price: 1499, originalPrice: 1999, stock: 70, sales: 115, status: 'Approved', discount: '-25%', sku: 'FSH-003' },
  { id: 'P022', name: 'Electric Steam Iron', category: 'Electrical', price: 999, originalPrice: 1549, stock: 45, sales: 62, status: 'Pending', discount: '-35%', sku: 'ELL-001' },
  { id: 'P023', name: 'Table Fan', category: 'Electrical', price: 1299, originalPrice: 1899, stock: 30, sales: 48, status: 'Pending', discount: '-30%', sku: 'ELL-002' },
  { id: 'P024', name: 'Ocean Pearl Necklace', category: 'Jewellery', price: 899, originalPrice: 1299, stock: 90, sales: 134, status: 'Approved', discount: '-30%', sku: 'JWL-003' },
  { id: 'P025', name: 'EELHOE Hair Mask', category: 'Beauty', price: 499, originalPrice: 999, stock: 220, sales: 290, status: 'Approved', discount: '-50%', sku: 'BTY-005' },
];

const StatCard = ({ label, value, sub, icon: Icon, color }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
      <Icon size={22} />
    </div>
    <div>
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
      <h3 className="text-2xl font-black text-slate-900 leading-tight">{value}</h3>
      {sub && <p className="text-[10px] text-slate-400 font-medium mt-0.5">{sub}</p>}
    </div>
  </div>
);

export default function InventoryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allProducts } = useSelector(state => state.products);

  // Merge redux products with mock data
  const allProductsCombined = [...MOCK_PRODUCTS, ...allProducts.filter(p => !MOCK_PRODUCTS.find(m => m.id === p.id))];

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [editingStock, setEditingStock] = useState(null);
  const [stockValue, setStockValue] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);

  // Stats
  const totalProducts = allProductsCombined.length;
  const approvedCount = allProductsCombined.filter(p => p.status === 'Approved').length;
  const pendingCount = allProductsCombined.filter(p => p.status === 'Pending').length;
  const outOfStockCount = allProductsCombined.filter(p => p.stock === 0 || p.status === 'Out of Stock').length;

  // Filter
  const filtered = allProductsCombined
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    })
    .sort((a, b) => {
      let valA = a[sortBy], valB = b[sortBy];
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([]);
    else setSelectedIds(filtered.map(p => p.id));
  };

  const SortIcon = ({ col }) => (
    <ArrowUpDown size={13} className={`ml-1 inline ${sortBy === col ? 'text-blue-500' : 'text-slate-300'}`} />
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight font-montserrat">Products</h1>
          <p className="text-slate-500 font-medium mt-1 font-raleway">Manage all inventory, stock levels and product status.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={15} />
            Export
          </button>
          <button
            onClick={() => navigate('/admin/inventory/add')}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={totalProducts} sub="In Inventory" icon={Package} color="bg-blue-50 text-blue-500" />
        <StatCard label="Live / Approved" value={approvedCount} sub="Currently active" icon={CheckCircle2} color="bg-green-50 text-green-500" />
        <StatCard label="Pending Review" value={pendingCount} sub="Awaiting approval" icon={AlertTriangle} color="bg-amber-50 text-amber-500" />
        <StatCard label="Out of Stock" value={outOfStockCount} sub="Needs restock" icon={XCircle} color="bg-red-50 text-red-400" />
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by product name or SKU..."
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-5 text-sm font-bold focus:ring-4 focus:ring-blue-50 outline-none transition-all text-slate-900 placeholder:text-slate-300"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-100 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-100 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer"
            >
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <button
            onClick={() => { setSearch(''); setCategoryFilter('All'); setStatusFilter('All'); }}
            className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all"
          >
            <RefreshCw size={14} />
            Reset
          </button>
        </div>

        {/* Bulk Actions */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3">
                <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest">{selectedIds.length} selected</span>
                <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-xs font-black border border-green-100 hover:bg-green-100 transition-all">
                  Approve All
                </button>
                <button className="px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-xs font-black border border-red-100 hover:bg-red-100 transition-all">
                  Delete All
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
          <p className="text-sm font-black text-slate-900">
            {filtered.length} <span className="font-medium text-slate-400">results</span>
          </p>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Inventory</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100">
                <th className="px-5 py-3.5 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                  />
                </th>
                <th onClick={() => toggleSort('sku')} className="px-3 py-3.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none">
                  SKU <SortIcon col="sku" />
                </th>
                <th onClick={() => toggleSort('name')} className="px-3 py-3.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none min-w-[180px]">
                  Product <SortIcon col="name" />
                </th>
                <th onClick={() => toggleSort('category')} className="px-3 py-3.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none">
                  Category <SortIcon col="category" />
                </th>
                <th onClick={() => toggleSort('price')} className="px-3 py-3.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none">
                  Price <SortIcon col="price" />
                </th>
                <th onClick={() => toggleSort('stock')} className="px-3 py-3.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none">
                  Stock <SortIcon col="stock" />
                </th>
                <th onClick={() => toggleSort('sales')} className="px-3 py-3.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none">
                  Sales <SortIcon col="sales" />
                </th>
                <th onClick={() => toggleSort('status')} className="px-3 py-3.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer select-none">
                  Status <SortIcon col="status" />
                </th>
                <th className="px-3 py-3.5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest pr-5">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filtered.map((product, i) => {
                  const isLowStock = product.stock > 0 && product.stock <= 20;
                  const isOutOfStock = product.stock === 0 || product.status === 'Out of Stock';
                  const statusInfo = statusConfig[isOutOfStock ? 'Out of Stock' : product.status] || statusConfig['Pending'];

                  return (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* Checkbox */}
                      <td className="px-5 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
                        />
                      </td>

                      {/* SKU */}
                      <td className="px-3 py-4">
                        <span className="text-[11px] font-black text-slate-400 font-roboto">{product.sku || product.id}</span>
                      </td>

                      {/* Product */}
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl flex items-center justify-center shrink-0">
                            <Package size={16} className="text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 leading-none">{product.name}</p>
                            {product.discount && (
                              <span className="text-[9px] font-black text-blue-500 mt-1 inline-block">{product.discount} OFF</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-3 py-4">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase tracking-wider">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-3 py-4">
                        <div>
                          <p className="text-sm font-black text-slate-900">₹{product.price?.toLocaleString()}</p>
                          {product.originalPrice && (
                            <p className="text-[10px] text-slate-400 font-medium line-through">₹{product.originalPrice?.toLocaleString()}</p>
                          )}
                        </div>
                      </td>

                      {/* Stock */}
                      <td className="px-3 py-4">
                        {editingStock === product.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={stockValue}
                              onChange={e => setStockValue(e.target.value)}
                              className="w-16 border border-blue-200 rounded-lg py-1 px-2 text-xs font-black outline-none focus:ring-2 focus:ring-blue-100"
                              autoFocus
                            />
                            <button
                              onClick={() => {
                                dispatch(updateProduct({ id: product.id, stock: Number(stockValue) }));
                                setEditingStock(null);
                              }}
                              className="p-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                            >
                              <CheckCircle2 size={12} />
                            </button>
                            <button
                              onClick={() => setEditingStock(null)}
                              className="p-1 bg-slate-100 text-slate-400 rounded-lg hover:bg-slate-200 transition-all"
                            >
                              <XCircle size={12} />
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => { setEditingStock(product.id); setStockValue(product.stock || 0); }}
                            className="flex items-center gap-1.5 cursor-pointer group/stock"
                          >
                            <span className={`text-sm font-black ${isOutOfStock ? 'text-red-500' : isLowStock ? 'text-amber-500' : 'text-slate-900'}`}>
                              {product.stock ?? 0}
                            </span>
                            {isLowStock && !isOutOfStock && (
                              <AlertTriangle size={11} className="text-amber-400 shrink-0" />
                            )}
                            <Edit3 size={10} className="text-slate-300 opacity-0 group-hover/stock:opacity-100 transition-opacity" />
                          </div>
                        )}
                      </td>

                      {/* Sales */}
                      <td className="px-3 py-4">
                        <span className="text-sm font-black text-slate-700">{product.sales ?? 0}</span>
                      </td>

                      {/* Status */}
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider ${statusInfo.color}`}>
                          {isOutOfStock ? 'Out of Stock' : product.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 py-4 pr-5">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => navigate(`/admin/inventory/add`)}
                            className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-all"
                            title="Edit Product"
                          >
                            <Edit3 size={14} />
                          </button>
                          {product.status === 'Pending' && (
                            <button
                              onClick={() => dispatch(approveProduct(product.id))}
                              className="p-2 bg-green-50 text-green-500 rounded-lg hover:bg-green-100 transition-all"
                              title="Approve"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => dispatch(deleteProduct(product.id))}
                            className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
                <Package size={36} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-black text-slate-900">No Products Found</h3>
              <p className="text-slate-400 text-sm font-medium mt-2">Try adjusting your filters or search term</p>
            </div>
          )}
        </div>

        {/* Table Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
            <p className="text-xs font-bold text-slate-400">Showing {filtered.length} of {allProductsCombined.length} products</p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Total Stock Value: <span className="text-slate-700">₹{filtered.reduce((acc, p) => acc + (p.price * (p.stock || 0)), 0).toLocaleString()}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
