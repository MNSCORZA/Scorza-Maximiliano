import React from 'react';
import { Mail, CreditCard } from 'lucide-react';
import { paymentMethods } from '../constants/footerData';

export const FooterSubscribe = () => {
  return (
    <div>
      <h4 className="font-bold text-[12px] mb-4 uppercase tracking-widest text-blue-400 border-b border-gray-800 pb-2">Suscribite</h4>
      <p className="text-xs text-gray-400 mb-3">Recibí ofertas exclusivas antes que nadie.</p>
      
      <div className="flex mb-4 max-w-[260px] group">
        <input 
          type="email" 
          placeholder="Tu email" 
          className="bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 w-full text-xs text-white outline-none focus:border-blue-500 transition-colors"
        />
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center">
          <Mail size={14} />
        </button>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2 font-bold text-[11px] text-white uppercase tracking-wider">
          <CreditCard size={14} className="text-blue-400" /> Medios de Pago
        </div>
        <div className="flex flex-wrap gap-1.5">
           {paymentMethods.map(pago => (
             <span key={pago} className="text-[9px] font-black border border-gray-700 px-2 py-0.5 rounded text-gray-300 bg-gray-850">
               {pago}
             </span>
           ))}
        </div>
      </div>
    </div>
  );
};
