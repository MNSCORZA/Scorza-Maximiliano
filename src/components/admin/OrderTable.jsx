import React from 'react';
import OrderStatusDropdown from './OrderStatusDropdown';
import { AlertCircle } from 'lucide-react';

const OrderTable = ({ orders, onUpdateStatus, updatingId }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price);
  };

  const formatDate = (firebaseDate) => {
    if (!firebaseDate) return 'S/D';
    try {
      const date = firebaseDate.toDate ? firebaseDate.toDate() : new Date(firebaseDate);
      return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="p-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
        No se encontraron pedidos en este segmento
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/40 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <th className="px-8 py-5">ID / Fecha</th>
            <th className="px-8 py-5">Cliente y Contacto</th>
            <th className="px-8 py-5">Detalle de Compra</th>
            <th className="px-8 py-5">Total</th>
            <th className="px-8 py-5 text-right">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => {
            const isRowUpdating = updatingId === order.id;
            const isClaim = order.status?.toLowerCase() === 'reclamo' || order.status?.toLowerCase()?.startsWith('reclamo resuelto');

            return (
              <tr 
                key={order.id} 
                className={`transition-colors group align-top ${
                  isRowUpdating ? 'bg-gray-50/80 opacity-60 pointer-events-none' : ''
                } ${
                  isClaim 
                    ? 'bg-rose-50/10 hover:bg-rose-50/20 border-l-4 border-l-rose-500' 
                    : 'hover:bg-gray-50/40'
                }`}
              >
                <td className="px-8 py-6">
                  <span className={`inline-block font-black text-xs px-2 py-1 rounded-md mb-1 ${
                    isClaim ? 'text-rose-700 bg-rose-50' : 'text-gray-900 bg-gray-100'
                  }`}>
                    #{order.id.slice(-6).toUpperCase()}
                  </span>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{formatDate(order.date)}</p>
                </td>

                <td className="px-8 py-6">
                  <p className="font-black text-xs text-gray-900 tracking-tight">{order.buyer?.nombre || 'Sin Nombre'} {order.buyer?.apellido || ''}</p>
                  <p className="text-[10px] text-indigo-600 font-black mt-1 select-all">{order.buyer?.telefono || 'Sin Teléfono'}</p>
                  <p className="text-[10px] text-gray-400 font-bold lowercase mt-0.5 select-all break-all max-w-[200px]">{order.buyer?.email || ''}</p>
                  
                  {isClaim && (
                    <div className="mt-3 bg-white border border-rose-100 p-3 rounded-xl max-w-[240px] shadow-sm animate-in fade-in duration-200">
                      <p className="text-[9px] font-black uppercase text-rose-600 tracking-wider flex items-center gap-1 mb-1">
                        <AlertCircle size={10} /> Motivo del Reclamo:
                      </p>
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {order.claimReason || "No especificado"}
                      </p>
                      {order.claimComment && (
                        <>
                          <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider mt-2 mb-0.5">
                            Comentarios:
                          </p>
                          <p className="text-[11px] font-medium text-slate-600 italic bg-slate-50 p-1.5 rounded-lg border border-slate-100 whitespace-pre-wrap">
                            "{order.claimComment}"
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </td>

                <td className="px-8 py-6">
                  <div className="max-h-[140px] overflow-y-auto pr-2 space-y-2 scrollbar-thin">
                    {(order.items || []).map((item, index) => (
                      <div key={index} className="flex flex-col border-l-2 border-indigo-500/30 pl-3 py-0.5">
                        <p className="text-xs font-black text-gray-800 uppercase tracking-tight line-clamp-1">{item.titulo}</p>
                        <p className="text-[10px] font-bold text-gray-400">{item.cantidad} x {formatPrice(item.precio)}</p>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="px-8 py-6">
                  <span className={`text-base font-black tracking-tight ${isClaim ? 'text-rose-600' : 'text-indigo-600'}`}>
                    {formatPrice(order.total || 0)}
                  </span>
                </td>

                <td className="px-8 py-6 text-right overflow-visible">
                  <OrderStatusDropdown 
                    order={order} 
                    onUpdateStatus={onUpdateStatus} 
                    updatingId={updatingId} 
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
