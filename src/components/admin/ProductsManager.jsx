import React, { useState } from 'react';
import { Plus, X, Percent, Layers, Trash2, Check, ArrowDown } from 'lucide-react';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { saveLog } from '../../fireBase/dataBase';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';
import AdminFilters from './AdminFilters';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

const ProductsManager = ({ admin, onEdit, onDeleteCustom }) => {
  const { user, userData } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState(''); 
  const [bulkValue, setBulkValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEditIntercept = (product) => {
    onEdit(product);
    setIsFormOpen(true);
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = (currentPageItems) => {
    const currentPageIds = currentPageItems.map(p => p.id);
    const allSelectedOnPage = currentPageIds.every(id => selectedIds.includes(id));

    if (allSelectedOnPage) {
      setSelectedIds(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedIds(prev => {
        const structuralUnique = new Set([...prev, ...currentPageIds]);
        return Array.from(structuralUnique);
      });
    }
  };

  const handleBulkExecute = async () => {
    if (!bulkAction) return;
    if ((bulkAction === 'precio' || bulkAction === 'rebajar' || bulkAction === 'stock') && !bulkValue) {
      toast.error('Por favor, ingresá un valor para la modificación');
      return;
    }

    setIsProcessing(true);
    try {
      const batch = writeBatch(db);
      const affectedProducts = admin.products.filter(p => selectedIds.includes(p.id));
      let descriptionLog = '';

      if (bulkAction === 'precio') {
        const percentage = Number(bulkValue);
        affectedProducts.forEach(p => {
          const currentPrice = Number(p.precio);
          const incremental = currentPrice * (percentage / 100);
          const finalPrice = Math.round(currentPrice + incremental);
          const productRef = doc(db, "productos", p.id);
          batch.update(productRef, { 
            precio: finalPrice,
            precioAnterior: currentPrice,
            tieneDescuento: false,
            porcentajeDescuento: 0
          });
        });
        descriptionLog = `Aumentó el precio un ${percentage}% de forma masiva a un bloque de ${selectedIds.length} productos.`;
      } 
      else if (bulkAction === 'rebajar') {
        const percentage = Number(bulkValue);
        if (percentage <= 0 || percentage >= 100) {
          toast.error('El porcentaje de descuento debe ser entre 1 y 99');
          setIsProcessing(false);
          return;
        }
        affectedProducts.forEach(p => {
          const basePrice = p.precioAnterior ? Number(p.precioAnterior) : Number(p.precio);
          const discountAmount = basePrice * (percentage / 100);
          const finalPrice = Math.round(basePrice - discountAmount);
          const productRef = doc(db, "productos", p.id);
          batch.update(productRef, { 
            precio: finalPrice,
            precioAnterior: basePrice,
            tieneDescuento: true,
            porcentajeDescuento: percentage
          });
        });
        descriptionLog = `Aplicó un descuento masivo del ${percentage}% OFF a un bloque de ${selectedIds.length} productos.`;
      }
      else if (bulkAction === 'stock') {
        const targetStock = Number(bulkValue);
        affectedProducts.forEach(p => {
          const productRef = doc(db, "productos", p.id);
          batch.update(productRef, { stock: targetStock });
        });
        descriptionLog = `Actualizó el stock a ${targetStock} unidades de forma masiva a un bloque de ${selectedIds.length} productos.`;
      } 
      else if (bulkAction === 'eliminar') {
        affectedProducts.forEach(p => {
          const productRef = doc(db, "productos", p.id);
          batch.delete(productRef);
        });
        descriptionLog = `Eliminó permanentemente del catálogo un bloque masivo de ${selectedIds.length} productos.`;
      }

      await batch.commit();
      await saveLog(user.uid, user.email, userData?.nombre || 'Admin Masivo', 'Acción Masiva', descriptionLog);

      toast.success('¡Acción masiva aplicada con éxito!');
      setSelectedIds([]);
      setBulkAction('');
      setBulkValue('');
      if (admin.refreshProducts) await admin.refreshProducts();
    } catch (error) {
      console.error(error);
      toast.error('Hubo un inconveniente al procesar la actualización masiva');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <AdminFilters {...admin} />
        <button 
          onClick={() => {
            if (isFormOpen && admin.isEditing) {
              admin.setIsEditing(false);
              admin.setFormData({ 
                titulo: "", descripcion: "", precio: "", stock: "", 
                categoria: "", imagenUrl: "", envioGratis: false, 
                tieneDescuento: false, porcentajeDescuento: "" 
              });
            }
            setIsFormOpen(!isFormOpen);
          }} 
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
              setIsFormOpen(false);
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
                  onClick={() => {
                    setSelectedIds([]);
                    setBulkAction('');
                    setBulkValue('');
                  }}
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
