import React from 'react';
import { Trash2, Eye } from 'lucide-react';

export const CouponCard = ({ coupon, onBorrar }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl gap-3 shadow-sm">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg inline-block">
            {coupon.codigo}
          </span>
          <span className="text-xs font-black text-slate-700 bg-slate-100 px-2.5 py-1.5 rounded-lg">
            {coupon.porcentaje}% OFF
          </span>
          {coupon.montoMinimo > 0 && (
            <span className="text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded-lg">
              MIN: ${coupon.montoMinimo.toLocaleString('es-AR')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 flex-wrap text-[10px] font-bold text-slate-400 uppercase tracking-tight">
          <span className="flex items-center gap-1">
            <Eye size={12}/> Usos: {coupon.usosActuales || 0} / {coupon.limiteUsos ? coupon.limiteUsos : '∞'}
          </span>
          <span>
            • Vence: {coupon.fechaExpiracion ? new Date(coupon.fechaExpiracion + 'T00:00:00').toLocaleDateString('es-AR') : 'NUNCA'}
          </span>
          <span className="text-violet-600 font-extrabold bg-violet-50 px-1.5 py-0.5 rounded">
            1 Uso por Cliente
          </span>
        </div>
      </div>
      <button
        onClick={() => onBorrar(coupon.id)}
        className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100 cursor-pointer flex items-center justify-center self-end sm:self-center"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};
