import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, AlertTriangle, PackageX, Layers, ChevronDown } from 'lucide-react';

const AdminFilters = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, categories, stockFilter, setStockFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: 'all', label: 'Todos los Stocks', icon: <Layers size={16} /> },
    { value: 'criticalStock', label: 'Stock Crítico (≤ 3 u.)', icon: <AlertTriangle size={16} className="text-amber-500" /> },
    { value: 'noStock', label: 'Agotados', icon: <PackageX size={16} className="text-rose-500" /> }
  ];

  const currentOption = options.find(o => o.value === stockFilter) || options[0];

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

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between border py-4 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none shadow-sm transition-all ${
            stockFilter === 'noStock' 
              ? 'bg-rose-50/60 text-rose-600 border-rose-100' 
              : stockFilter === 'criticalStock' 
              ? 'bg-amber-50/60 text-amber-700 border-amber-100' 
              : 'bg-white text-gray-400 border-gray-100'
          }`}
        >
          <div className="flex items-center gap-3">
            {currentOption.icon}
            <span>{currentOption.label}</span>
          </div>
          <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-slate-200/80 overflow-hidden py-1.5 animate-in fade-in slide-in-from-top-2 duration-150">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setStockFilter(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-[10px] font-black uppercase tracking-widest transition-colors ${
                  stockFilter === option.value 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-gray-400 hover:bg-slate-50 hover:text-slate-700'
                }`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFilters;
