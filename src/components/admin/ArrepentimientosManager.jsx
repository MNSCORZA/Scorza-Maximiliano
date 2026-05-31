import React from 'react';
import { useArrepentimientosManager } from '../../hooks/useArrepentimientosManager';
import { Search, AlertCircle, CheckCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import ArrepentimientosTable from './ArrepentimientosTable';

const ArrepentimientosManager = ({ user, userData }) => {
  const {
    loading,
    updatingId,
    statusTab,
    searchQuery,
    currentPage,
    totalPages,
    currentRequests,
    filteredRequestsLength,
    setStatusTab,
    setSearchQuery,
    setCurrentPage,
    handleUpdateStatus,
    getCountByStatus
  } = useArrepentimientosManager(user, userData);

  if (loading) return <div className="p-20 text-center text-xs font-black text-slate-400">Cargando solicitudes...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm gap-1 w-full lg:w-max">
        {['Pendiente', 'En Proceso', 'Finalizado'].map((status) => (
          <button key={status} onClick={() => setStatusTab(status)} 
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${statusTab === status ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'}`}>
            {status === 'Pendiente' ? <AlertCircle size={14}/> : status === 'En Proceso' ? <Clock size={14}/> : <CheckCircle size={14}/>}
            {status} ({getCountByStatus(status)})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-black uppercase text-xs tracking-widest text-slate-900">Solicitudes de Arrepentimiento</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{filteredRequestsLength} encontrados</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input type="text" placeholder="Buscar nombre, email u orden..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-700 outline-none" />
          </div>
        </div>

        <ArrepentimientosTable requests={currentRequests} onUpdateStatus={handleUpdateStatus} updatingId={updatingId} />
        
        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pág {currentPage} de {totalPages}</p>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="p-2.5 rounded-xl border bg-white"><ChevronLeft size={16} /></button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className="p-2.5 rounded-xl border bg-white"><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrepentimientosManager;
