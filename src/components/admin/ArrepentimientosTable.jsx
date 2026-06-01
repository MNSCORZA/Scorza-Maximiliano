import React, { useState } from 'react';
import TableRow from './TableRow';

const ArrepentimientosTable = ({ requests, onUpdateStatus, updatingId }) => {
  // Estado para controlar qué dropdown de cambio de estado está abierto por su ID
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  if (!requests || requests.length === 0) {
    return (
      <div className="p-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white">
        No se encontraron solicitudes en esta categoría
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Cliente</th>
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contacto</th>
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nro Orden</th>
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fecha Solicitud</th>
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Motivo</th>
            <th className="p-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {requests.map((request) => (
            <TableRow
              key={request.id}
              request={request}
              onUpdateStatus={onUpdateStatus}
              updatingId={updatingId}
              isDropdownOpen={activeDropdownId === request.id}
              toggleDropdown={() => 
                setActiveDropdownId(activeDropdownId === request.id ? null : request.id)
              }
              closeDropdown={() => setActiveDropdownId(null)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArrepentimientosTable;
