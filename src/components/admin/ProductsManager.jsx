import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import AdminFilters from './AdminFilters';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';

const ProductsManager = ({ admin, onEdit, onDeleteCustom }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditIntercept = (product) => {
    onEdit(product);
    setIsFormOpen(true);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4">
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
            onSort={(key) => admin.setSortConfig(p => ({ 
              key, 
              direction: p.key === key && p.direction === 'asc' ? 'desc' : 'asc' 
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default ProductsManager;
