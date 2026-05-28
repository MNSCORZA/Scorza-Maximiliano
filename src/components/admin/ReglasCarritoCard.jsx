import React from 'react';
import { Trash2, Tag, Truck } from 'lucide-react';

const ReglasCarritoCard = ({ rule, onToggle, onDelete }) => {
  return (
    <div className={`bg-white border ${rule.activa ? 'border-slate-100 shadow-sm' : 'border-slate-200/60 opacity-60'} rounded-3xl p-6 flex flex-col justify-between transition-all`}>
      <div>
        <div className="flex justify-between items-start border-b border-slate-50 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${rule.tipo === 'marca_segunda_unidad_descuento' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {rule.tipo === 'marca_segunda_unidad_descuento' ? <Tag size={18} /> : <Truck size={18} />}
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-tight">
                {rule.tipo === 'marca_segunda_unidad_descuento' ? 'Descuento 2da Unidad' : 'Envío Gratis'}
              </h4>
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${rule.activa ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                {rule.activa ? 'Activa' : 'Pausada'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggle(rule.id, rule.activa)}
              className="text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-500 transition-colors"
            >
              {rule.activa ? 'Pausar' : 'Activar'}
            </button>
            <button
              onClick={() => onDelete(rule.id)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs font-bold text-slate-600">
          {rule.tipo === 'marca_segunda_unidad_descuento' ? (
            <>
              <p>Aplica a la marca: <span className="font-black text-slate-800 uppercase">{rule.marcaTarget}</span></p>
              <p>Beneficio: <span className="font-black text-indigo-600">{rule.porcentajeDescuento}% OFF</span> en la segunda unidad de un mismo ítem.</p>
            </>
          ) : (
            <>
              <p>Aplica a la categoría: <span className="font-black text-slate-800 uppercase">{rule.categoriaTarget}</span></p>
              <p>Requisito: Carrito base mayor o igual a <span className="font-black text-slate-800">${rule.montoMinimo.toLocaleString('es-AR')}</span></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReglasCarritoCard;
