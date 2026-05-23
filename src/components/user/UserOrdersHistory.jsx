import React from 'react';
import { Package } from 'lucide-react';
import { Loader } from '../Loader'; // Importa tu hermoso loader personalizado
import OrderItem from './OrderItem';
import EmptyOrders from './EmptyOrders';

const UserOrdersHistory = ({ pedidos = [], loading }) => {
  if (loading) {
    return (
      <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-center min-h-[300px]">
        <Loader />
      </div>
    );
  }

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
          pedidos.map((pedido) => (
            <OrderItem key={pedido.id} pedido={pedido} />
          ))
        ) : (
          <EmptyOrders />
        )}
      </div>
    </div>
  );
};

export default UserOrdersHistory;
