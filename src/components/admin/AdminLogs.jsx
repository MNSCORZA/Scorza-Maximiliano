import React from 'react';
import { useAdminLogs } from '../../hooks/useAdminLogs';
import { ShieldAlert, ChevronLeft, ChevronRight, User, Search, Filter } from 'lucide-react';

export default function AdminLogs() {
  const {
    currentItems,
    loading,
    searchTerm,
    actionFilter,
    currentPage,
    totalPages,
    filteredLogsLength,
    indexOfFirstItem,
    indexOfLastItem,
    setSearchTerm,
    setActionFilter,
    setCurrentPage
  } = useAdminLogs();

  if (loading) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cargando registros de auditoría...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm">
        <div className="relative sm:col-span-2 flex items-center">
          <Search size={16} className="absolute left-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por admin, email, cupón o repuesto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 text-slate-700 placeholder-slate-400 font-bold text-xs rounded-xl py-3.5 pl-11 pr-4 outline-none border border-transparent focus:border-indigo-600/20 transition-all"
          />
        </div>

        <div className="relative flex items-center">
          <Filter size={16} className="absolute left-4 text-slate-400 select-none pointer-events-none" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="w-full bg-slate-50 text-slate-700 font-black text-[10px] uppercase tracking-wider rounded-xl py-3.5 pl-11 pr-4 outline-none border border-transparent focus:border-indigo-600/20 transition-all appearance-none cursor-pointer"
          >
            <option value="todos">Todas las acciones</option>
            <option value="Crear Producto">Creaciones</option>
            <option value="Editar Producto">Ediciones</option>
            <option value="Eliminar Producto">Eliminaciones</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[28px] border border-gray-100 shadow-xl overflow-hidden flex flex-col justify-between min-h-[550px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
              <tr>
                <th className="p-5">Usuario</th>
                <th className="p-5">Acción Realizada</th>
                <th className="p-5">Detalles del cambio</th>
                <th className="p-5 text-right pr-8">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center">
                        <ShieldAlert size={20} />
                      </div>
                      <p className="text-sm font-bold text-slate-700">No se encontraron registros que coincidan</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map(l => (
                  <tr key={l.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-xs leading-none mb-1">{l.userNombre || 'Admin'}</p>
                          <p className="text-[10px] font-medium text-slate-400">{l.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className={`inline-block text-[9px] font-black px-2.5 py-1 rounded-xl uppercase tracking-wider ${
                        l.accion.includes('Eliminar') ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                        l.accion.includes('Crear') || l.accion.includes('Publicar') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {l.accion}
                      </span>
                    </td>
                    <td className="p-5">
                      <p className="text-xs font-bold text-slate-600 max-w-md truncate" title={l.detalles}>{l.detalles}</p>
                    </td>
                    <td className="p-5 text-right pr-8">
                      <span className="text-[11px] font-bold text-slate-400">
                        {l.fecha?.seconds ? new Date(l.fecha.seconds * 1000).toLocaleString('es-AR') : 'Reciente'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between sm:px-6">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
              Mostrando <span className="font-black text-slate-800">{indexOfFirstItem + 1}</span> a <span className="font-black text-slate-800">{Math.min(indexOfLastItem, filteredLogsLength)}</span> de <span className="font-black text-slate-800">{filteredLogsLength}</span> registros
            </p>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                disabled={currentPage === 1} 
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                type="button"
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                disabled={currentPage === totalPages} 
                className="p-2 rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
