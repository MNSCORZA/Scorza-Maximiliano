import React from 'react';
import { Plus, Calendar, Users, DollarSign } from 'lucide-react';

export const CouponForm = ({
  onSubmit,
  codigo, setCodigo,
  porcentaje, setPorcentaje,
  montoMinimo, setMontoMinimo,
  fechaExpiracion, setFechaExpiracion,
  limiteUsos, setLimiteUsos,
  loading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-100 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Código único</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="EJ: CYBER20"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-gray-800"
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Porcentaje OFF</label>
          <input
            type="number"
            value={porcentaje}
            onChange={(e) => setPorcentaje(e.target.value)}
            placeholder="Ej: 15"
            min="1"
            max="100"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-gray-800"
            required
            disabled={loading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase text-gray-400 ml-1 flex items-center gap-0.5"><DollarSign size={10}/> Monto Mínimo</label>
          <input
            type="number"
            value={montoMinimo}
            onChange={(e) => setMontoMinimo(e.target.value)}
            placeholder="Ej: 30000"
            min="0"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-gray-800"
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase text-gray-400 ml-1 flex items-center gap-1"><Calendar size={10}/> Fecha de Vencimiento</label>
          <input
            type="date"
            value={fechaExpiracion}
            onChange={(e) => setFechaExpiracion(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold uppercase outline-none focus:border-indigo-500/30 tracking-wider text-gray-700"
            disabled={loading}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-black uppercase text-gray-400 ml-1 flex items-center gap-1"><Users size={10}/> Cantidad Máxima de usos Global</label>
          <input
            type="number"
            value={limiteUsos}
            onChange={(e) => setLimiteUsos(e.target.value)}
            placeholder="Ej: 50"
            min="1"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-gray-800"
            disabled={loading}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm active:scale-98 mt-2"
        disabled={loading}
      >
        <Plus size={14} /> {loading ? 'CREANDO...' : 'CREAR CUPÓN CON LIMITACIONES'}
      </button>
    </form>
  );
};
