import React from 'react';

const ProductForm = ({ formData, setFormData, isEditing, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-xl shadow-slate-100/40 sticky top-4">
      <div className="mb-5">
        <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">
          {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
        </h3>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
          {isEditing ? 'Modificá las propiedades del artículo' : 'Cargá un nuevo artículo al catálogo'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">Título del Producto</label>
          <input
            type="text"
            name="titulo"
            required
            value={formData.titulo || ''}
            onChange={handleChange}
            placeholder="Ej: Smart TV 43 Pulgadas"
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">Descripción</label>
          <textarea
            name="descripcion"
            required
            value={formData.descripcion || ''}
            onChange={handleChange}
            placeholder="Detallá las especificaciones..."
            rows="3"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">Precio ($)</label>
            <input
              type="number"
              name="precio"
              required
              value={formData.precio || ''}
              onChange={handleChange}
              placeholder="0"
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">Precio Anterior ($)</label>
            <input
              type="number"
              name="precioAnterior"
              value={formData.precioAnterior || ''}
              onChange={handleChange}
              placeholder="Opcional"
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">Categoría</label>
            <input
              type="text"
              name="categoria"
              required
              value={formData.categoria || ''}
              onChange={handleChange}
              placeholder="Ej: Bazar"
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">Marca</label>
            <input
              type="text"
              name="marca"
              value={formData.marca || ''}
              onChange={handleChange}
              placeholder="Ej: Philips (Opcional)"
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">Stock disponible</label>
            <input
              type="number"
              name="stock"
              required
              value={formData.stock || ''}
              onChange={handleChange}
              placeholder="Unidades"
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">Porcentaje Descuento</label>
            <input
              type="number"
              name="porcentajeDescuento"
              value={formData.porcentajeDescuento || ''}
              onChange={handleChange}
              placeholder="Ej: 15 (Opcional)"
              className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 block ml-1">URL de la Imagen</label>
          <input
            type="url"
            name="imagenUrl"
            required
            value={formData.imagenUrl || ''}
            onChange={handleChange}
            placeholder="https://ejemplo.com/foto.jpg"
            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-xl px-3.5 font-bold text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="bg-slate-50/50 p-3.5 rounded-xl border border-slate-100 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="envioGratis"
              checked={formData.envioGratis || false}
              onChange={handleChange}
              className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Ofrecer Envío Gratis</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="tieneDescuento"
              checked={formData.tieneDescuento || false}
              onChange={handleChange}
              className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Marcar con Etiqueta Oferta</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest h-12 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer border-none"
        >
          {isEditing ? 'Guardar Cambios' : 'Publicar Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
