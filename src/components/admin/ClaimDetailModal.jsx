import React from 'react';
import { X, AlertCircle, MessageSquare } from 'lucide-react';

export const ClaimDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  const motivo = order.claimReason || order.motivoReclamo || order.motivo || order.claim?.reason;
  const comentario = order.claimComment || order.comentarioReclamo || order.comentario || order.claim?.comment;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg p-8 rounded-[2rem] shadow-2xl space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Detalle del Reclamo</h2>
            <p className="text-xs font-bold text-slate-400 uppercase">Orden #{order.id.slice(-6).toUpperCase()}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors border-none bg-transparent cursor-pointer">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100">
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <AlertCircle size={12} /> Motivo reportado
            </p>
            <p className="text-sm font-bold text-rose-900">{motivo || "No especificado"}</p>
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MessageSquare size={12} /> Comentarios adicionales
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 italic leading-relaxed border border-slate-100 whitespace-pre-wrap">
              {comentario ? `"${comentario}"` : "Sin comentarios adicionales del cliente."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
