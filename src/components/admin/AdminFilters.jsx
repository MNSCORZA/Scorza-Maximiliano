import React from 'react';
import { Search, Filter, PackageX } from 'lucide-react';

const AdminFilters = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, categories, onlyNoStock, setOnlyNoStock }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

    <button 
      onClick={() => setOnlyNoStock(!onlyNoStock)}
      className={`flex items-center justify-center gap-3 py-4 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${onlyNoStock ? 'bg-red-50 text-red-600 border-red-100 shadow-inner' : 'bg-white text-gray-400 border-gray-100 shadow-sm'}`}
    >
      <PackageX size={18} /> {onlyNoStock ? 'MOSTRANDO AGOTADOS' : 'VER AGOTADOS'}
    </button>
  </div>
);

export default AdminFilters;
