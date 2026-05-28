import React from "react";
import { Truck } from "lucide-react";

export const CartShippingProgressBar = ({ envioGratis, totalConReglas, montoMinimoEnvio }) => {
  if (envioGratis) {
    return (
      <div className="mx-6 mb-4 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2 text-xs text-emerald-700 font-black uppercase tracking-wide">
        <Truck size={16} />
        <span>¡Envío gratis aplicado automáticamente!</span>
      </div>
    );
  }

  if (montoMinimoEnvio <= 0) return null;

  const faltanteEnvio = montoMinimoEnvio - totalConReglas;
  const porcentajeBarra = Math.min(100, (totalConReglas / montoMinimoEnvio) * 100);

  return (
    <div className="mx-6 mb-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-wide text-slate-600">
        <span className="flex items-center gap-1">
          <Truck size={14} className="text-indigo-500" />
          Te faltan ${faltanteEnvio.toFixed(2)} para el envío gratis
        </span>
        <span className="text-slate-400">${totalConReglas.toFixed(2)} / ${montoMinimoEnvio}</span>
      </div>
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${porcentajeBarra}%` }}
        />
      </div>
    </div>
  );
};
