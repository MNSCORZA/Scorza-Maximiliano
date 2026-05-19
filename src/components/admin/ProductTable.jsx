import React, { useState } from 'react';
import { Edit3, Trash2, ArrowUpDown, PackageX, ShoppingBag, Truck, Percent, ChevronLeft, ChevronRight } from 'lucide-react';

const ProductTable = ({ products, onEdit, onDelete, onSort }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-xl shadow-slate-100/40 overflow-hidden flex flex-col justify-between min-h-[500px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
            <tr>
              <th className="p-5 cursor-pointer hover:text-indigo-600 transition-colors group select-none" onClick={() => onSort('titulo')}>
                <div className="flex items-center gap-1.5">Producto <ArrowUpDown size={12} className="text-slate-300 group-hover:text-indigo-500 transition-colors" /></div>
              </th>
              <th className="p-5 cursor-pointer hover:text-indigo-600 transition-colors group select-none" onClick={() => onSort('precio')}>
                <div className="flex items-center gap-1.5">Precio Comercial <ArrowUpDown size={12} className="text-slate-300 group-hover:text-indigo-500 transition-colors" /></div>
              </th>
              <th className="p-5 hidden sm:table-cell text-center">Condición</th>
              <th className="p-5 hidden md:table-cell cursor-pointer hover:text-indigo-600 transition-colors group select-none" onClick={() => onSort('stock')}>
                <div className="flex items-center gap-1.5">Stock <ArrowUpDown size={12} className="text-slate-300 group-hover:text-indigo-500 transition-colors" /></div>
              </th>
              <th className="p-5 text-right pr-8">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center">
                      <ShoppingBag size={20} />
                    </div>
                    <p className="text-sm font-bold text-slate-700">No hay productos disponibles</p>
                  </div>
                </td>
              </tr>
            ) : (
              currentItems.map(p => {
                const isOutofStock = Number(p.stock) <= 0;
                const hasOffer = p.tieneDescuento || (p.precioAnterior && Number(p.precioAnterior) > Number(p.precio));

                return (
                  <tr key={p.id} className="hover:bg-slate-50/40 transition-colors group/row">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0 select-none">
                          <img src={p.imagenUrl} className={`w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-100 shadow-sm transition-transform duration-300 group-hover/row:scale-[1.03] ${isOutofStock ? 'grayscale opacity-60' : ''}`} alt="" />
                          {isOutofStock && (
                            <div className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white p-1 rounded-lg shadow-md">
                              <PackageX size={10} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-[140px] sm:max-w-xs">
                          <p className="font-bold text-slate-800 leading-tight truncate mb-1" title={p.titulo}>{p.titulo}</p>
                          <div className="flex flex-wrap gap-1 items-center">
                            <span className="inline-block text-[8px] font-black text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{p.categoria}</span>
                            {p.envioGratis && (
                              <span className="inline-flex items-center gap-0.5 text-[8px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wider border border-emerald-100">
                                <Truck size={9} /> Gratis
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="p-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900">${Number(p.precio).toLocaleString('es-AR')}</span>
                        {hasOffer && (
                          <span className="text-[10px] font-bold text-slate-400 line-through mt-0.5">${Number(p.precioAnterior).toLocaleString('es-AR')}</span>
                        )}
                      </div>
                    </td>

                    <td className="p-5 hidden sm:table-cell text-center vertical-middle">
                      {hasOffer ? (
                        <span className="inline-flex items-center gap-1 text-[9px] font-black text-orange-600 bg-orange-50 border border-orange-100 px-2 py-1 rounded-xl mx-auto">
                          <Percent size={10} /> {p.porcentajeDescuento || Math.round(((p.precioAnterior - p.precio) / p.precioAnterior) * 100)}% OFF
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-xl">Normal</span>
                      )}
                    </td>

                    <td className="p-5 hidden md:table-cell">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-2.5 py-1 rounded-xl ${isOutofStock ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isOutofStock ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        {isOutofStock ? 'Agotado' : `${p.stock} u.`}
                      </span>
                    </td>

                    <td className="p-5 text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => onEdit(p)} className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all cursor-pointer" title="Editar">
                          <Edit3 size={14} />
                        </button>
                        <button onClick={() => onDelete(p.id)} className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer" title="Eliminar">
                          <Trash2 size={14} />
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

      {/* Módulo de Paginación Premium */}
      {totalPages > 1 && (
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className={`px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white active:scale-95 transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
              Anterior
            </button>
            <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className={`px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 bg-white active:scale-95 transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                Mostrando <span className="font-black text-slate-800">{indexOfFirstItem + 1}</span> a <span className="font-black text-slate-800">{Math.min(indexOfLastItem, products.length)}</span> de <span className="font-black text-slate-800">{products.length}</span> artículos
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-xl shadow-sm gap-1" aria-label="Pagination">
                <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className={`p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 active:scale-95 transition-all ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                  <ChevronLeft size={16} />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${currentPage === index + 1 ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                    {index + 1}
                  </button>
                ))}
                <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className={`p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 active:scale-95 transition-all ${currentPage === totalPages ? 'opacity-40 cursor-not-
