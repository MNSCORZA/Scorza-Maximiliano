import React, { useState } from 'react';
import { Truck, SlidersHorizontal, X, Check, Percent, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CatalogHeader = ({ 
  category, 
  search, 
  totalCount, 
  sortOrder, 
  setSortOrder, 
  onlyFreeShipping, 
  setOnlyFreeShipping,
  onlyOffers,
  setOnlyOffers,
  brands = [],
  selectedBrand,
  setSelectedBrand,
  hasActiveFilters,
  onResetFilters
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeFiltersCount = [
    sortOrder !== "",
    onlyFreeShipping,
    onlyOffers,
    selectedBrand !== "" && selectedBrand !== "Todas"
  ].filter(Boolean).length;

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight leading-none">
            {category || (search ? `Búsqueda: ${search}` : "Catálogo")}
          </h1>
          <span className="text-[10px] font-bold text-gray-400 mt-1.5 uppercase tracking-widest">
            {totalCount} {totalCount === 1 ? "producto" : "productos"}
          </span>
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <button 
            type="button"
            onClick={() => setIsOpen(true)} 
            className={`flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border font-black text-[11px] tracking-wider uppercase transition-all
              ${hasActiveFilters 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                : 'bg-gray-50 border-transparent text-gray-800 hover:bg-gray-100'
              }`}
          >
            <SlidersHorizontal size={14} />
            <span>Filtros Avanzados</span>
            {activeFiltersCount > 0 && (
              <span className={`ml-1 flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-black
                ${hasActiveFilters ? 'bg-white text-blue-600' : 'bg-gray-200 text-gray-800'}`}>
                {activeFiltersCount}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="bg-gray-100 text-gray-600 p-3.5 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-[2px]"
            />

            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl z-50 max-h-[85vh] overflow-y-auto p-6 flex flex-col pb-8"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
                <div>
                  <h3 className="font-black text-sm text-gray-900 uppercase tracking-wider">Filtros y Orden</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Personalizá tu búsqueda</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-50 p-2.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block ml-1">Clasificar por precio</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "" : "asc")}
                      className={`py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all border text-left flex justify-between items-center
                        ${sortOrder === "asc" 
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-black' 
                          : 'bg-gray-50 border-transparent text-gray-700'
                        }`}
                    >
                      <span>Menor precio</span>
                      {sortOrder === "asc" && <Check size={12} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSortOrder(sortOrder === "desc" ? "" : "desc")}
                      className={`py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all border text-left flex justify-between items-center
                        ${sortOrder === "desc" 
                          ? 'bg-blue-50 border-blue-600 text-blue-600 font-black' 
                          : 'bg-gray-50 border-transparent text-gray-700'
                        }`}
                    >
                      <span>Mayor precio</span>
                      {sortOrder === "desc" && <Check size={12} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block ml-1">Condiciones destacadas</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOnlyFreeShipping(!onlyFreeShipping)}
                      className={`py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all border flex items-center gap-2
                        ${onlyFreeShipping 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-600 font-black' 
                          : 'bg-gray-50 border-transparent text-gray-700'
                        }`}
                    >
                      <Truck size={14} />
                      <span>Envío Gratis</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOnlyOffers(!onlyOffers)}
                      className={`py-3 px-4 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all border flex items-center gap-2
                        ${onlyOffers 
                          ? 'bg-orange-50 border-orange-500 text-orange-600 font-black' 
                          : 'bg-gray-50 border-transparent text-gray-700'
                        }`}
                    >
                      <Percent size={14} />
                      <span>En Oferta</span>
                    </button>
                  </div>
                </div>

                {brands.length > 1 && (
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400 block ml-1">Filtrar por marca</label>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                      {brands.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setSelectedBrand(b === "Todas" || selectedBrand === b ? "" : b)}
                          className={`py-2 px-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border flex items-center gap-1.5
                            ${(selectedBrand === b || (b === "Todas" && !selectedBrand)) 
                              ? 'bg-blue-600 border-blue-600 text-white font-black shadow-sm' 
                              : 'bg-gray-50 border-transparent text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                          <Bookmark size={10} fill={(selectedBrand === b || (b === "Todas" && !selectedBrand)) ? "white" : "none"} />
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={() => {
                      onResetFilters();
                      setIsOpen(false);
                    }}
                    className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider hover:bg-gray-200 transition-all"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-[2] bg-[#0f172a] text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider hover:bg-slate-800 transition-all text-center shadow-lg shadow-slate-100"
                >
                  Ver {totalCount} resultados
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
