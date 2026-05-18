import React from 'react';
import { Truck, ShieldCheck, RefreshCw } from 'lucide-react';

export const ProductBenefits = () => {
  return (
    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
      <div className="flex flex-col items-center text-center gap-1">
        <div className="w-9 h-9 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center">
          <Truck size={16} />
        </div>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Envío Rápido</span>
      </div>
      <div className="flex flex-col items-center text-center gap-1">
        <div className="w-9 h-9 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center">
          <ShieldCheck size={16} />
        </div>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Compra Segura</span>
      </div>
      <div className="flex flex-col items-center text-center gap-1">
        <div className="w-9 h-9 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center">
          <RefreshCw size={16} />
        </div>
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Cambio Oficial</span>
      </div>
    </div>
  );
};
