import React from 'react';
import { MessageSquare, Loader2, ChevronDown } from 'lucide-react';

const ArrepentimientosTable = ({ requests, onUpdateStatus, updatingId }) => {
  
  // 1. Validamos si no hay ninguna solicitud en la pestaña o búsqueda actual
  if (requests.length === 0) {
    return (
      <div className="p-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
        No se encontraron solicitudes
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse text-left">
        {/* CABECERA DE LA TABLA */}
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Cliente</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Contacto</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Nro Orden</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Motivo</th>
            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Acciones</th>
          </tr>
        </thead>
        
        {/* CUERPO DE LA TABLA */}
        <tbody className="divide-y divide-gray-50">
          {requests.map((req) => (
            {/* AQUÍ VAMOS A RELLENAR LAS FILAS EN EL SIGUIENTE PASO */}
<tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
  
  {/* COLUMNA 1: CLIENTE */}
  <td className="px-6 py-4 whitespace-nowrap text-left">
    <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
      {req.nombre}
    </div>
    <div className="text-[10px] font-bold text-gray-400 lowercase tracking-normal mt-0.5">
      {req.email}
    </div>
  </td>

  {/* ACÁ VA A IR LA COLUMNA DE CONTACTO EN EL SIGUIENTE PASO */}

</tr>

          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArrepentimientosTable;
