import React from 'react';
import { Package, FileText, DollarSign, Layers, Image as ImageIcon, Truck, PlusCircle, Save, Percent } from 'lucide-react';

const ProductForm = ({ formData, setFormData, handleSubmit, isEditing }) => (
  <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-[28px] border border-gray-100/80 shadow-xl shadow-slate-100/50 sticky top-24 transition-all duration-300">
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
      <div className={`p-2 rounded-xl text-white ${isEditing ? 'bg-amber-500' : 'bg-indigo-600'}`}>
        {isEditing ? <Save size={16} /> : <PlusCircle size={16} />}
      </div>
      <div>
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">{isEditing ? 'Modificar Producto' : 'Nuevo Producto'}</h2>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">{isEditing ? 'Editarás el ítem seleccionado' : 'Creá un nuevo artículo en la tienda'}</p>
      </div>
    </div>

    <div className="space-y-4">
      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 ml-1"><Package size={11} /> Nombre del Producto</span>
        <input className="w-full bg-slate-50/50 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50" placeholder="Ej: Smart TV 43 pulgadas" value={formData.titulo || ''} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
      </div>

      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 ml-1"><FileText size={11} /> Descripción</span>
        <textarea className="w-full bg-slate-50/50 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 outline-none h-24 resize-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50" placeholder="Detalles, especificaciones..." value={formData.descripcion || ''} onChange={e => setFormData({...formData, descripcion: e.target.value})} required />
      </div>

      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2 space-y-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 ml-1">
              <DollarSign size={11} /> {formData.tieneDescuento ? 'Precio Lista (Original)' : 'Precio'}
            </span>
            <input type="number" step="any" className="w-full bg-white px-4 py-3.5 rounded-xl text-sm font-bold text-slate-900 border border-slate-200 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50" placeholder="0.00" value={formData.precio || ''} onChange={e => setFormData({...formData, precio: e.target.value})} required />
          </div>
          <div className="w-1/2 space-y-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 ml-1">Stock disponible</span>
            <input type="number" className="w-full bg-white px-4 py-3.5 rounded-xl text-sm font-bold text-slate-900 border border-slate-200 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50" placeholder="0" value={formData.stock || ''} onChange={e => setFormData({...formData, stock: e.target.value})} required />
          </div>
        </div>

        <div className="flex items-end gap-4 pt-2 border-t border-slate-200/60">
          <label className={`flex items-center justify-between px-4 py-3.5 rounded-xl border cursor-pointer select-none transition-all duration-200 w-1/2 bg-white ${formData.tieneDescuento ? 'border-orange-200 shadow-sm shadow-orange-50' : 'border-gray-200'}`}>
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${formData.tieneDescuento ? 'bg-orange-100 text-orange-600' : 'bg-slate-200/60 text-slate-500'}`}>
                <Percent size={13} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${formData.tieneDescuento ? 'text-orange-700' : 'text-slate-400'}`}>Aplicar Oferta</span>
            </div>
            <input type="checkbox" checked={formData.tieneDescuento || false} onChange={e => setFormData({...formData, tieneDescuento: e.target.checked})} className="w-4 h-4 accent-orange-600 rounded cursor-pointer" />
          </label>

          <div className="w-1/2 space-y-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider ml-1">Descuento (%)</span>
            <input type="number" min="1" max="99" disabled={!formData.tieneDescuento} className={`w-full px-4 py-3.5 rounded-xl text-sm font-bold border outline-none transition-all duration-200 ${formData.tieneDescuento ? 'bg-white text-orange-600 border-orange-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-50' : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'}`} placeholder="0" value={formData.porcentajeDescuento || ''} onChange={e => setFormData({...formData, porcentajeDescuento: e.target.value})} required={formData.tieneDescuento} />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 ml-1"><Layers size={11} /> Categoría</span>
        <input className="w-full bg-slate-50/50 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50" placeholder="Ej: Tecnología" value={formData.categoria || ''} onChange={e => setFormData({...formData, categoria: e.target.value})} required />
      </div>

      <div className="space-y-1">
        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5 ml-1"><ImageIcon size={11} /> URL de Imagen</span>
        <input className="w-full bg-slate-50/50 px-4 py-3.5 rounded-xl text-sm font-medium text-slate-800 border border-slate-100 outline-none transition-all duration-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50" placeholder="https://..." value={formData.imagenUrl || ''} onChange={e => setFormData({...formData, imagenUrl: e.target.value})} required />
      </div>

      <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 ${formData.envioGratis ? 'bg-emerald-50/40 border-emerald-200 shadow-sm shadow-emerald-50' : 'bg-slate-50/50 border-slate-100'}`}>
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg ${formData.envioGratis ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200/60 text-slate-500'}`}>
            <Truck size={13} />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-wider ${formData.envioGratis ? 'text-emerald-700' : 'text-slate-400'}`}>Envío Gratis</span>
        </div>
        <input type="checkbox" checked={formData.envioGratis || false} onChange={e => setFormData({...formData, envioGratis: e.target.checked})} className="w-4 h-4 accent-emerald-600 rounded cursor-pointer" />
      </label>

      <button type="submit" className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest mt-4 shadow-lg active:scale-[0.98] transition-all duration-200 cursor-pointer ${isEditing ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/10' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/15'}`}>
        {isEditing ? 'Actualizar Artículo' : 'Publicar Catálogo'}
      </button>
    </div>
  </form>
);

export default ProductForm;
