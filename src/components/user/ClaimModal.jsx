import React, { useState } from 'react';
import { AlertCircle, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import { createOrderClaim } from '../../services/claims';
import { ClaimDropdown } from './ClaimDropdown';

export const ClaimModal = ({ orderId, onClose }) => {
  const [claimReason, setClaimReason] = useState('');
  const [claimComment, setClaimComment] = useState('');
  const [isSubmittingClaim} = useState(false);
  const [isSubmittingClaimState, setIsSubmittingClaimState] = useState(false);

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!claimReason) {
      toast.error("Por favor, seleccioná un motivo para tu reclamo");
      return;
    }

    setIsSubmittingClaimState(true);
    try {
      await createOrderClaim(orderId, claimReason, claimComment);
      toast.success("Reclamo enviado de forma segura. El equipo lo revisará a la brevedad.");
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error("Hubo un error al procesar el reclamo");
    } finally {
      setIsSubmittingClaimState(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900">
            <AlertCircle size={16} className="text-rose-500" /> Iniciar Reclamo
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleClaimSubmit} className="space-y-4">
          <ClaimDropdown claimReason={claimReason} setClaimReason={setClaimReason} />

          <div>
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-1 block">
              Contanos más detalles
            </label>
            <textarea
              value={claimComment}
              onChange={(e) => setClaimComment(e.target.value)}
              placeholder="Ej: La caja vino golpeada y falta un accesorio..."
              rows={3}
              className="w-full bg-slate-50 border border-transparent rounded-xl py-2.5 px-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isSubmittingClaimState}
              className="flex-1 bg-rose-600 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-100 cursor-pointer border-none disabled:bg-rose-400"
            >
              {isSubmittingClaimState ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send size={14} /> Enviar Reclamo
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 bg-slate-100 text-slate-500 py-3.5 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all cursor-pointer border-none"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
