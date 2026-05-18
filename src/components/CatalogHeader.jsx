import React from 'react';
import { Truck } from 'lucide-react';

export const CatalogHeader = ({ 
  category, 
  search, 
  totalCount, 
  sortOrder, 
  setSortOrder, 
  onlyFreeShipping, 
  setOnlyFreeShipping 
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col">
        <h1 className="text-2xl font-black text-gray-900 uppercase leading-none">
          {category || (search ? `Búsqueda: ${search}` : "Catálogo")}
        </h1>
        <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
          {totalCount} {totalCount === 1 ? "producto" : "productos"}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)} 
          className="flex-1 lg:flex-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-[11px] font-black uppercase outline-none focus:border-blue-600/30"
        >
          <option value="">ORDENAR POR</option>
          <option value="asc">Menor precio</option>
          <option value="desc">Mayor precio</option>
        </select>
        
        <button 
          onClick={() => setOnlyFreeShipping(!onlyFreeShipping)} 
          className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border font-black text-[11px] transition-all 
            ${onlyFreeShipping 
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
              : 'bg-white border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600'
            }`}
        >
          <Truck size={16} /> ENVÍO GRATIS
        </button>
      </div>
    </div>
  );
};
