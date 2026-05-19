import React from 'react';
import { Package, Calendar, ShoppingBag, ArrowUpRight, Inbox } from 'lucide-react';

const UserOrdersHistory = ({ pedidos = [], loading }) => {
  if (loading) {
    return (
      <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-center min-h-[300px]">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'generada':
      case 'pendiente':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'enviada':
      case 'en camino':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'entregada':
      case 'finalizado':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Reciente';
    const date = timestamp.seconds ? new Array(timestamp.seconds * 1000) : new Date(timestamp);
    return new Date(date).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900">
          <Package size={16} className="text-indigo-600"/> Historial de Compras
        </h3>
        <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-full border border-slate-100 uppercase tracking-wider">
          {pedidos.length} {pedidos.length === 1 ? 'Pedido' : 'Pedidos'}
        </span>
      </div>

      <div className="space-y-4">
        {pedidos.length > 0 ? (
          pedidos.map((p) => (
            <div 
              key={p.id} 
              className="group border border-slate-100 bg-white p-5 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xl hover:shadow-slate-100/50 hover:border-indigo-100 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-slate-50 p-3.5 rounded-2xl text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <ShoppingBag size={20} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-slate-800 text-sm tracking-tight">
                      Orden #{p.id.slice(-6).toUpperCase()}
                    </p>
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border tracking-wider ${getStatusStyles(p.status)}`}>
                      {p.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-300" />
                      {formatDate(p.fecha)}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 hidden sm:inline-block"></span>
                    <span className="text-slate-500 font-bold">
                      {p.items?.length || 1} {p.items?.length === 1 ? 'artículo' : 'artículos'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest sm:hidden">Total pagado</p>
                <div className="flex items-center gap-2">
                  <p className="font-black text-slate-900 text-lg tracking-tight">
                    $ {p.total?.toLocaleString('es-AR')}
                  </p>
                  <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors hidden sm:block">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[2rem]">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-50">
              <Inbox className="text-slate-300" size={26} />
            </div>
            <p className="text-slate-800 font-black text-sm tracking-tight mb-1">Tu historial está vacío</p>
            <p className="text-slate-400 font-medium text-xs max-w-xs mx-auto">
              Cuando realices tu primera compra, vas a poder seguir el estado del envío desde acá.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrdersHistory;
