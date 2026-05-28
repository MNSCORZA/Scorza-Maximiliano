import React from "react";
import { Ticket } from "lucide-react";

export const CartCouponInput = ({ inputCupón, setInputCupón, cupónAplicado, descuento, handleValidarCupón }) => {
  return (
    <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Ticket size={18} className="text-slate-400 shrink-0" />
        <input 
          type="text" 
          placeholder="¿TENÉS UN CUPÓN?" 
          value={inputCupón}
          onChange={(e) => setInputCupón(e.target.value)}
          disabled={!!cupónAplicado}
          className="bg-white border rounded-xl px-4 py-2.5 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-slate-800 w-full sm:w-48 disabled:opacity-60"
        />
        <button
          onClick={handleValidarCupón}
          disabled={!!cupónAplicado}
          className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50"
        >
          Aplicar
        </button>
      </div>
      {cupónAplicado && (
        <span className="text-[10px] font-black uppercase bg-emerald-50 border border-emerald-100 text-emerald-600 px-3 py-1.5 rounded-xl tracking-widest">
          Activo: {cupónAplicado} (-{descuento}%)
        </span>
      )}
    </div>
  );
};
