import React from 'react';
import { useOrdersManager } from '../../hooks/useOrdersManager';
import { Search, Package, Truck, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import OrderTable from './OrderTable';

const OrdersManager = () => {
  const {
    loading,
    updatingId,
    statusTab,
    searchQuery,
    currentPage,
    totalPages,
    currentOrders,
    filteredOrdersLength,
    setStatusTab,
    setSearchQuery,
    setCurrentPage,
    handleUpdateOrderStatus,
    getCountByStatus
  } = useOrdersManager();

  if (loading) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronizando Ventas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid de Pestañas Adaptado a 4 columnas en pantallas medianas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm gap-1 w-full lg:w-max">
        <button 
          type="button"
          onClick={() => setStatusTab('generada')} 
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
            statusTab === 'generada' ? 'bg-amber-50 text-amber-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Package size={14}/> Pendientes ({getCountByStatus('generada')})
        </button>
        <button 
          type="button"
          onClick={() => setStatusTab('enviada')} 
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
            statusTab === 'enviada' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Truck size={14}/> En Camino ({getCountByStatus('enviada')})
        </button>
        <button 
          type="button"
          onClick={() => setStatusTab('entregada')} 
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
            statusTab === 'entregada' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <CheckCircle size={14}/> Entregadas ({getCountByStatus('entregada')})
        </button>
        {/* Nueva Pestaña de Reclamos */}
        <button 
          type="button"
          onClick={() => setStatusTab('reclamo')} 
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
            statusTab === 'reclamo' ? 'bg-rose-50 text-rose-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <AlertCircle size={14}/> Reclamos ({getCountByStatus('reclamo') || 0})
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-black uppercase text-xs tracking-widest text-slate-900">
              {statusTab === 'generada' 
                ? 'Pedidos por Procesar' 
                : statusTab === 'enviada' 
                ? 'Envíos en Curso' 
                : statusTab === 'entregada' 
                ? 'Historial de Entregas' 
                : 'Incidentes y Reclamos Abiertos'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
              {filteredOrdersLength} encontrados en esta sección
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text"
              placeholder="Buscar cliente, email o id..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-700 placeholder-gray-400 focus:bg-white focus:border-indigo-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <OrderTable orders={currentOrders} onUpdateStatus={handleUpdateOrderStatus} updatingId={updatingId} />

        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="p-2.5 rounded-xl border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="p-2.5 rounded-xl border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManager;
