import React from 'react';
import { Edit3, Trash2, ArrowUpDown, PackageX, ShoppingBag, Eye } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete, onSort }) => (
  <div className="bg-white rounded-[28px] border border-gray-100 shadow-xl shadow-slate-100/40 overflow-hidden transition-all duration-300">
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
          <tr>
            <th className="p-6 cursor-pointer hover:text-indigo-600 transition-colors group select-none" onClick={() => onSort('titulo')}>
              <div className="flex items-center gap-1.5">
                Producto 
                <ArrowUpDown size={12} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </th>
            <th className="p-6 cursor-pointer hover:text-indigo-600 transition-colors group select-none" onClick={() => onSort('precio')}>
              <div className="flex items-center gap-1.5">
                Precio 
                <ArrowUpDown size={12} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </th>
            <th className="p-6 hidden md:table-cell cursor-pointer hover:text-indigo-600 transition-colors group select-none" onClick={() => onSort('stock')}>
              <div className="flex items-center gap-1.5">
                Disponibilidad 
                <ArrowUpDown size={12} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </th>
            <th className="p-6 text-right pr-8">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-12 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center">
                    <ShoppingBag size={20} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">No hay productos en el catálogo</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cargá un nuevo artículo usando el formulario</p>
                </div>
              </td>
            </tr>
          ) : (
            products.map(p => {
              const isOutofStock = Number(p.stock) <= 0;
              const hasOffer = p.tieneDescuento || (p.precioAnterior && Number(p.precioAnterior) > Number(p.precio));

              return (
                <tr key={p.id} className="hover:bg-slate-50/40 transition-colors group/row">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0 select-none">
                        <img src={p.imagenUrl} className={`w-14 h-14 rounded-2xl object-cover bg-slate-50 border border-slate-100 shadow-sm transition-transform duration-300 group-hover/row:scale-[1.03] ${isOutofStock ? 'grayscale opacity-60' : ''}`} alt="" />
                        {isOutofStock && (
                          <div className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white p-1 rounded-lg shadow-md shadow-rose-500/20 animate-pulse">
                            <PackageX size={11} />
                          </div>
                        )}
                        {hasOffer && !isOutofStock && (
                          <div className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md shadow-sm shadow-orange-500/20">
                            %{p.porcentajeDescuento || Math.round(((p.precioAnterior - p.precio) / p.precioAnterior) * 100)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 max-w-[180px] sm:max-w-xs">
                        <p className="font-bold text-slate-800 leading-tight truncate mb-1" title={p.titulo}>{p.titulo}</p>
                        <span className="inline-block text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">{p.categoria}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900">${Number(p.precio).toLocaleString('es-AR')}</span>
                      {hasOffer && (
                        <span className="text-[10px] font-bold text-slate-400 line-through mt-0.5">${Number(p.precioAnterior).toLocaleString('es-AR')}</span>
                      )}
                    </div>
                  </td>

                  <td className="p-6 hidden md:table-cell">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-2.5 py-1 rounded-xl w-fit ${isOutofStock ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isOutofStock ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        {isOutofStock ? 'Sin Stock' : `${p.stock} unidades`}
                      </span>
                    </div>
                  </td>

                  <td className="p-6 text-right pr-8">
                    <div className="flex justify-end gap-2.5">
                      <button onClick={() => onEdit(p)} className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer" title="Editar">
                        <Edit3 size={15} />
                      </button>
                      <button onClick={() => onDelete(p.id)} className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl active:scale-95 transition-all cursor-pointer" title="Eliminar">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProductTable;
