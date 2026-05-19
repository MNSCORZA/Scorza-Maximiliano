import React from 'react';
import { Package } from 'lucide-react';

const UserOrdersHistory = ({ pedidos, loading }) => {
  if (loading) {
    return (
      <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-center py-16">
        <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <h3 className="font-black text-xs uppercase tracking-widest mb-6 flex items-center gap-2 text-slate-900">
        <Package size={16} className="text-indigo-600"/> Historial de Compras
      </h3>

      <div className="space-y-4">
        {pedidos.length > 0 ? (
          pedidos.map(p => (
            <div key={p.id} className="group border border-slate-50 bg-slate-50/30 p-5 rounded-[1.5rem] flex justify-between items-center hover:bg-white hover:shadow-md hover:border-indigo-100 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Package size={20} />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm tracking-tight">Orden #{p.id.slice(-6).toUpperCase()}</p>
                  <p className={`text-[10px] font-black uppercase tracking-tighter mt-0.5 ${
                    p.status === 'generada' ? 'text-amber-500' : p.status === 'enviada' ? 'text-blue-500' : 'text-emerald-500'
                  }`}>{p.status}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-slate-900 text-base">$ {p.total}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  {p.status === 'entregada' ? 'Finalizado' : 'En proceso'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="text-slate-200" size={32} />
            </div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Aún no realizaste pedidos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrdersHistory;
