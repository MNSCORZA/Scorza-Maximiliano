import React, { useState } from 'react';
import { Mail, CreditCard } from 'lucide-react';
import { paymentMethods } from '../constants/footerData';
import { db } from '../fireBase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';

export const FooterSubscribe = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error('Por favor, ingresá un correo electrónico');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Por favor, ingresá un correo electrónico válido');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'newsletter'), {
        email: email.trim().toLowerCase(),
        fecha: serverTimestamp()
      });
      
      toast.success('¡Te suscribiste correctamente al newsletter!');
      setEmail('');
    } catch (error) {
      console.error(error);
      toast.error('Hubo un problema al procesar tu suscripción');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="font-bold text-[12px] mb-4 uppercase tracking-widest text-blue-400 border-b border-gray-800 pb-2">Suscribite</h4>
      <p className="text-xs text-gray-400 mb-3">Recibí ofertas exclusivas antes que nadie.</p>

      <form onSubmit={handleSubscribe} className="flex mb-4 max-w-[260px] group">
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu email" 
          disabled={isSubmitting}
          className="bg-gray-800 border border-gray-700 rounded-l-lg px-3 py-2 w-full text-xs text-white outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-r-lg transition-colors flex items-center justify-center disabled:opacity-50"
        >
          <Mail size={14} />
        </button>
      </form>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2 font-bold text-[11px] text-white uppercase tracking-wider">
          <CreditCard size={14} className="text-blue-400" /> Medios de Pago
        </div>
        <div className="flex flex-wrap gap-1.5">
           {paymentMethods.map(pago => (
             <span key={pago} className="text-[9px] font-black border border-gray-700 px-2 py-0.5 rounded text-gray-300 bg-gray-900/50">
               {pago}
             </span>
           ))}
        </div>
      </div>
    </div>
  );
};
