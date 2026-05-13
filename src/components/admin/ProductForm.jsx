import React from 'react';

const ProductForm = ({ formData, setFormData, handleSubmit, isEditing }) => (
  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm sticky top-24">
    <h2 className="text-lg font-black mb-6 uppercase tracking-tighter">{isEditing ? 'Editar' : 'Nuevo'}</h2>
    <div className="space-y-4">
      <input className="w-full bg-gray-50 p-4 rounded-xl text-sm outline-none border border-transparent focus:border-indigo-100" placeholder="Título" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} required />
      <textarea className="w-full bg-gray-50 p-4 rounded-xl text-sm outline-none h-24 resize-none border border-transparent focus:border-indigo-100" placeholder="Descripción" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} required />
      <div className="flex gap-4">
        <input type="number" className="w-1/2 bg-gray-50 p-4 rounded-xl text-sm outline-none" placeholder="Precio" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} required />
        <input type="number" className="w-1/2 bg-gray-50 p-4 rounded-xl text-sm outline-none" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
      </div>
      <input className="w-full bg-gray-50 p-4 rounded-xl text-sm outline-none" placeholder="Categoría" value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} required />
      <input className="w-full bg-gray-50 p-4 rounded-xl text-sm outline-none" placeholder="URL Imagen" value={formData.imagenUrl} onChange={e => setFormData({...formData, imagenUrl: e.target.value})} required />
      <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer">
        <input type="checkbox" checked={formData.envioGratis} onChange={e => setFormData({...formData, envioGratis: e.target.checked})} className="w-5 h-5 accent-indigo-600" />
        <span className="text-[10px] font-black uppercase text-gray-400">Envío Gratis</span>
      </label>
      <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest mt-4 shadow-lg shadow-indigo-100">{isEditing ? 'Actualizar' : 'Publicar'}</button>
    </div>
  </form>
);

export default ProductForm;