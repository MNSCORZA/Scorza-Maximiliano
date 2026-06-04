import React, { useState } from 'react';
import OrderStatusDropdown from './OrderStatusDropdown';
import { AlertCircle } from 'lucide-react';
import { ClaimDetailModal } from './ClaimDetailModal';

const OrderTable = ({ orders, onUpdateStatus, updatingId }) => {
  const [selectedClaim, setSelectedClaim] = useState(null);

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
            const isClaim = order.status?.toLowerCase()?.startsWith('reclamo');

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
                    <button 
                      onClick={() => setSelectedClaim(order)}
                      className="mt-3 flex items-center gap-2 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl text-rose-700 hover:bg-rose-100 transition-all cursor-pointer outline-none"
                    >
                      <AlertCircle size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Ver Reclamo Completo</span>
                    </button>
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

      {selectedClaim && (
        <ClaimDetailModal 
          order={selectedClaim} 
          onClose={() => setSelectedClaim(null)} 
        />
      )}
    </div>
  );
};

export default OrderTable;
