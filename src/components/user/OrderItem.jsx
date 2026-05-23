import React, { useState } from 'react';
import { ShoppingBag, Calendar, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

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
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const OrderItem = ({ pedido }) => {
  // Estado por si querés que los detalles se puedan expandir/colapsar (opcional pero recomendado en mobile)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group border border-slate-100 bg-white p-5 rounded-[2rem] flex flex-col gap-4 hover:shadow-xl hover:shadow-slate-100/50 hover:border-indigo-100 transition-all duration-300">
      
      {/* Cabecera de la Orden */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                {pedido.items?.length || 0} {pedido.items?.length === 1 ? 'artículo' : 'artículos'}
              </span>
            </div>
          </div>
        </div>

        {/* Total y Botón de Expandir */}
        <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest sm:hidden">Total pagado</p>
          <div className="flex items-center gap-2">
            <p className="font-black text-slate-900 text-lg tracking-tight">
              $ {pedido.total?.toLocaleString('es-AR')}
            </p>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 bg-slate-50 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              title="Ver productos"
            >
              {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desglose de Productos (Se muestra si isOpen es true) */}
      {isOpen && pedido.items && pedido.items.length > 0 && (
        <div className="border-t border-slate-50 pt-4 mt-1 space-y-3 animate-fadeIn">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detalle de productos</p>
          
          {pedido.items.map((item, idx) => (
            <div key={item.id || idx} className="flex items-center justify-between bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/50">
              <div className="flex items-center gap-3">
                {/* Miniatura del producto (si guardás 'img' o 'imagen' en el item de la orden) */}
                {item.img && (
                  <img 
                    src={item.img} 
                    alt={item.nombre} 
                    className="w-10 h-10 object-cover rounded-xl bg-white border border-slate-100"
                  />
                )}
                <div>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">
                    {item.nombre || item.title}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Cantidad: <span className="font-bold text-slate-600">{item.cantidad || item.quantity || 1}</span>
                  </p>
                </div>
              </div>
              
              <p className="text-xs font-black text-slate-700 whitespace-nowrap">
                $ {((item.precio || item.price) * (item.cantidad || item.quantity || 1))?.toLocaleString('es-AR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderItem;
