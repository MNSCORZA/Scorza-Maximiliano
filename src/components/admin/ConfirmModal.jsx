import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl p-10 text-center border border-gray-100">
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
          {type === 'danger' ? <AlertTriangle size={40} /> : <Info size={40} />}
        </div>
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">{title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-8 uppercase tracking-widest">{message}</p>
        <div className="flex flex-col gap-3">
          <button onClick={onConfirm} className={`w-full py-4 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest ${type === 'danger' ? 'bg-red-500' : 'bg-indigo-600'}`}>Confirmar</button>
          <button onClick={onClose} className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
