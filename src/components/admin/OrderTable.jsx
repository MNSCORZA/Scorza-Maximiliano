import React from 'react';

const OrderTable = ({ orders, onUpdateStatus }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <th className="px-8 py-6">ID / Fecha</th>
            <th className="px-8 py-6">Cliente y Contacto</th>
            <th className="px-8 py-6">Detalle de Compra</th>
            <th className="px-8 py-6">Total</th>
            <th className="px-8 py-6">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group align-top">
              <td className="px-8 py-6">
                <p className="font-black text-xs text-gray-900">#{order.id.slice(-6).toUpperCase()}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">{order.date?.toDate().toLocaleDateString()}</p>
              </td>
              <td className="px-8 py-6">
                <p className="font-bold text-gray-900">{order.buyer.nombre} {order.buyer.apellido}</p>
                <p className="text-[10px] text-indigo-600 font-black mt-1">{order.buyer.telefono}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">{order.buyer.email}</p>
              </td>
              <td className="px-8 py-6">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex flex-col border-l-2 border-gray-100 pl-3">
                      <p className="text-xs font-black text-gray-800 uppercase tracking-tight">{item.titulo}</p>
                      <p className="text-[10px] font-bold text-gray-400">{item.cantidad} x ${item.precio}</p>
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-8 py-6 text-lg font-black text-indigo-600">${order.total.toFixed(2)}</td>
              <td className="px-8 py-6">
                <select 
                  value={order.status}
                  onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg border-none outline-none cursor-pointer transition-all ${
                    order.status === 'generada' ? 'bg-amber-50 text-amber-600' : 
                    order.status === 'enviada' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                  }`}
                >
                  <option value="generada">Generada</option>
                  <option value="enviada">Enviada</option>
                  <option value="entregada">Entregada</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
