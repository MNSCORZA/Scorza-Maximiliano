import React from 'react';
import { ShoppingBag, Calendar, ArrowUpRight } from 'lucide-react';

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
  // Corrección en la conversión por si viene de Firestore/Timestamp nativo
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const OrderItem = ({ pedido }) => {
  return (
    <div className="group border border-slate-100 bg-white p-5 rounded-[2rem] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-xl hover:shadow-slate-100/50 hover:border-indigo-100 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="bg-slate-50 p-3.5 rounded-2xl text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
          <ShoppingBag size={20} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-black text-slate-800 text-sm tracking-tight">
              Orden #{pedido.id.slice(-6).toUpperCase()}
            </p>
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border tracking-wider ${getStatusStyles(pedido.status)}`}>
              {pedido.status}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium flex-wrap">
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-slate-300" />
              {formatDate(pedido.fecha)}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-200 hidden sm:inline-block"></span>
            <span className="text-slate-500 font-bold">
              {pedido.items?.length || 1} {pedido.items?.length === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest sm:hidden">Total pagado</p>
        <div className="flex items-center gap-2">
          <p className="font-black text-slate-900 text-lg tracking-tight">
            $ {pedido.total?.toLocaleString('es-AR')}
          </p>
          <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors hidden sm:block">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
