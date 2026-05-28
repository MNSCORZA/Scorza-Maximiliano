import React from "react";
import { Truck, CheckCircle2 } from "lucide-react";

export const CartShippingProgressBar = ({ envioGratis, totalConReglas, montoMinimoEnvio }) => {
  if (montoMinimoEnvio <= 0) return null;

  const faltanteEnvio = montoMinimoEnvio - totalConReglas;
  const esGratis = envioGratis || faltanteEnvio <= 0;
  const porcentajeBarra = esGratis ? 100 : Math.min(100, (totalConReglas / montoMinimoEnvio) * 100);

  return (
    <div className="mx-6 mb-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2.5 transition-all duration-300">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-wide">
        {esGratis ? (
          <span className="flex items-center gap-1.5 text-emerald-600 transition-colors">
            <CheckCircle2 size={14} className="animate-bounce" />
            ¡Tu envío es totalmente gratis!
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-slate-600">
            <Truck size={14} className="text-indigo-500" />
            Te faltan ${faltanteEnvio.toFixed(2)} para el envío gratis
          </span>
        )}
        
        <span className={esGratis ? "text-emerald-500 font-bold" : "text-slate-400"}>
          ${totalConReglas.toFixed(2)} / ${montoMinimoEnvio}
        </span>
      </div>

      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            esGratis ? "bg-emerald-500" : "bg-indigo-600"
          }`}
          style={{ width: `${porcentajeBarra}%` }}
        />
      </div>
    </div>
  );
};
