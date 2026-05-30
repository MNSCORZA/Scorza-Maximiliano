import React from 'react';
import { Wrench } from 'lucide-react';

export const MaintenanceBlock = () => {
  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center p-6 z-[9999] font-sans">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-24 h-24 bg-amber-500/10 text-amber-500 rounded-[36px] flex items-center justify-center mb-2 mx-auto animate-pulse">
          <Wrench size={44} />
        </div>
        <div className="text-2xl font-black tracking-tighter uppercase text-white">
          De Todo <span className="text-blue-500">Ecommerce</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-gray-100 uppercase tracking-wide">Sitio en Mantenimiento</h1>
          <p className="text-xs text-gray-400 leading-relaxed font-medium">
            Estamos realizando actualizaciones de stock y optimización de precios para brindarte el mejor servicio. Volveremos a estar operativos en unos minutos. ¡Gracias por tu paciencia!
          </p>
        </div>
        <div className="pt-4 border-t border-gray-900 text-[9px] font-bold text-gray-600 uppercase tracking-widest">
          Soporte Técnico Operativo
        </div>
      </div>
    </div>
  );
};
