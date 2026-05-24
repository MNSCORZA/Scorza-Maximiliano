import React from 'react';
import { Search, Filter, AlertTriangle, PackageX, Layers } from 'lucide-react';

const AdminFilters = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, categories, stockFilter, setStockFilter }) => {
  // stockFilter puede ser: "all" | "noStock" | "criticalStock"

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
      <div className="md:col-span-2 relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-600 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="BUSCAR PRODUCTO..." 
          className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm focus:border-indigo-100"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="relative">
        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
        <select 
          className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm appearance-none cursor-pointer"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="relative">
        {stockFilter === 'noStock' ? (
          <PackageX className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" size={16} />
        ) : stockFilter === 'criticalStock' ? (
          <AlertTriangle className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" size={16} />
        ) : (
          <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
        )}
        <select 
          className={`w-full border py-4 pl-12 pr-4 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm appearance-none cursor-pointer transition-all ${
            stockFilter === 'noStock' 
              ? 'bg-rose-50/60 text-rose-600 border-rose-100' 
              : stockFilter === 'criticalStock' 
              ? 'bg-amber-50/60 text-amber-700 border-amber-100' 
              : 'bg-white text-gray-400 border-gray-100'
          }`}
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="all">Filtro: Todos los Stocks</option>
          <option value="criticalStock">Stock Crítico (≤ 3 u.)</option>
          <option value="noStock">Agotados</option>
        </select>
      </div>
    </div>
  );
};

export default AdminFilters;
