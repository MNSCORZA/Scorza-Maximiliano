import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyOrders = () => {
  return (
    <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[2rem]">
      <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-50">
        <Inbox className="text-slate-300" size={26} />
      </div>
      <p className="text-slate-800 font-black text-sm tracking-tight mb-1">Tu historial está vacío</p>
      <p className="text-slate-400 font-medium text-xs max-w-xs mx-auto">
        Cuando realices tu primera compra, vas a poder seguir el estado del envío desde acá.
      </p>
    </div>
  );
};

export default EmptyOrders;
