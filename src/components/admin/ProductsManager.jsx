import React from 'react';
import { Plus, X, Percent, Layers, Trash2, Check, ArrowDown } from 'lucide-react';
import { useProductsManager } from '../../hooks/useProductsManager';
import AdminFilters from './AdminFilters';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

const ProductsManager = ({ admin, onEdit, onDeleteCustom }) => {
  const {
    isFormOpen,
    selectedIds,
    bulkAction,
    bulkValue,
    isProcessing,
    setBulkAction,
    setBulkValue,
    handleEditIntercept,
    handleToggleSelect,
    handleToggleSelectAll,
    handleBulkExecute,
    resetBulkSelection,
    closeAndResetForm
  } = useProductsManager(admin, onEdit, onDeleteCustom);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <AdminFilters {...admin} />
        <button 
          type="button"
          onClick={closeAndResetForm} 
          className={`lg:hidden flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border ${
            isFormOpen ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-600 text-white shadow-md'
          }`}
        >
          {isFormOpen ? (
            <>
              <X size={14} /> Cancelar / Cerrar
            </>
          ) : (
            <>
              <Plus size={14} /> Nuevo Producto
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4 relative pb-24">
        <div className={`lg:col-span-1 ${isFormOpen ? 'block' : 'hidden lg:block'}`}>
          <ProductForm 
            formData={admin.formData} 
            setFormData={admin.setFormData} 
            isEditing={admin.isEditing} 
            handleSubmit={(e) => {
              admin.handleSubmit(e);
              closeAndResetForm();
            }}
          />
        </div>

        <div className="lg:col-span-2">
          <ProductTable 
            products={admin.products} 
            onEdit={handleEditIntercept} 
            onDelete={onDeleteCustom}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
            onSort={(key) => admin.setSortConfig(p => ({ 
              key, 
              direction: p.key === key && p.direction === 'asc' ? 'desc' : 'asc' 
            }))}
          />
        </div>

        {selectedIds.length > 0 && (
          <div className="mt-6 md:mt-0 md:fixed md:bottom-4 md:left-1/2 md:-translate-x-1/2 bg-slate-900 text-white px-5 py-4 rounded-[24px] shadow-2xl flex flex-col md:flex-row items-center gap-3.5 z-50 border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300 w-full md:w-[94%] md:max-w-2xl">

            <div className="flex items-center gap-2 flex-shrink-0 w-full md:w-auto justify-center md:justify-start">
              <span className="w-5 h-5 bg-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-black">{selectedIds.length}</span>
              <p className="text-xs font-bold text-slate-300">artículos seleccionados</p>
            </div>

            <div className="hidden md:block h-5 w-px bg-slate-800" />

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:justify-end">

              <select
                value={bulkAction}
                onChange={(e) => {
                  setBulkAction(e.target.value);
                  setBulkValue('');
                }}
                className="w-full sm:w-auto bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider px-3 py-2.5 outline-none focus:border-indigo-500 transition-colors text-white cursor-pointer min-h-[40px]"
              >
                <option value="">Elegir acción masiva...</option>
                <option value="precio">Aumentar Precio (%)</option>
                <option value="rebajar">Rebajar Precio (% OFF)</option>
                <option value="stock">Modificar Stock Fijo</option>
                <option value="eliminar">Eliminar del catálogo</option>
              </select>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">

                {(bulkAction === 'precio' || bulkAction === 'rebajar') && (
                  <div className="relative flex items-center w-full sm:max-w-[100px]">
                    {bulkAction === 'rebajar' ? (
                      <ArrowDown size={12} className="absolute left-3 text-orange-400" />
                    ) : (
                      <Percent size={12} className="absolute left-3 text-slate-400" />
                    )}
                    <input
                      type="number"
                      placeholder={bulkAction === 'rebajar' ? "Ej: 15" : "Ej: 10"}
                      value={bulkValue}
                      onChange={(e) => setBulkValue(e.target.value)}
                      className="w-full h-[40px] bg-slate-800 text-white rounded-xl pl-8 pr-3 font-bold text-xs border border-slate-700 outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {bulkAction === 'stock' && (
                  <div className="relative flex items-center w-full sm:max-w-[100px]">
                    <Layers size={12} className="absolute left-3 text-slate-400" />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={bulkValue}
                      onChange={(e) => setBulkValue(e.target.value)}
                      className="w-full h-[40px] bg-slate-800 text-white rounded-xl pl-8 pr-3 font-bold text-xs border border-slate-700 outline-none focus:border-indigo-500"
                    />
                  </div>
                )}

                {bulkAction && (
                  <button
                    type="button"
                    onClick={handleBulkExecute}
                    disabled={isProcessing}
                    className={`h-[40px] px-4 rounded-xl text-white transition-all font-bold text-xs cursor-pointer flex items-center justify-center flex-shrink-0 ${
                      bulkAction === 'eliminar' 
                        ? 'bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-900/20' 
                        : bulkAction === 'rebajar'
                        ? 'bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-900/20'
                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-900/20'
                    }`}
                  >
                    {bulkAction === 'eliminar' ? <Trash2 size={14} /> : <Check size={14} />}
                  </button>
                )}

                <button 
                  type="button"
                  onClick={resetBulkSelection}
                  className="h-[40px] w-[40px] rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer flex-shrink-0"
                >
                  <X size={14} />
                </button>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsManager;
