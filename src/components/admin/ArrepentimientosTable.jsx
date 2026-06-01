import React from 'react';
import { MessageSquare, Loader2, ChevronDown } from 'lucide-react';

const ArrepentimientoRow = ({ req, onUpdateStatus, updatingId }) => {
  const formattedDate = req.fechaSolicitud?.seconds
    ? new Date(req.fechaSolicitud.seconds * 1000).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '---';

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-left">
        <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
          {req.nombre}
        </div>
        <div className="text-[10px] font-bold text-gray-400 lowercase tracking-normal mt-0.5">
          {req.email}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-left">
        <span className="text-[10px] font-bold text-gray-600 tracking-wider">
          {req.telefono || 'Sin teléfono'}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-left">
        <span className="px-2 py-1 bg-gray-100 text-gray-800 text-[9px] font-black rounded-md tracking-wider uppercase">
          {req.nroOrden}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-left text-[10px] font-bold text-gray-500 tracking-wider">
        {formattedDate}
      </td>

      <td className="px-6 py-4 text-left max-w-xs">
        {req.motivo ? (
          <div className="flex items-start gap-1.5 text-gray-600 group relative cursor-help">
            <MessageSquare size={13} className="text-gray-400 shrink-0 mt-0.5" />
            <span className="text-[10px] font-bold tracking-wide truncate block max-w-[160px]">
              {req.motivo}
            </span>
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50 bg-slate-900 text-white text-[9px] p-2 rounded-lg shadow-xl max-w-xs normal-case font-medium whitespace-normal">
              {req.motivo}
            </div>
          </div>
        ) : (
          <span className="text-[10px] font-bold text-gray-300 italic tracking-wider">Sin motivo</span>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right relative">
        {updatingId === req.id ? (
          <div className="flex justify-end items-center pr-6">
            <Loader2 size={14} className="animate-spin text-indigo-600" />
          </div>
        ) : (
          <div className="inline-block text-left group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-600 bg-white hover:bg-gray-50 transition-colors">
              <span>Acciones</span>
              <ChevronDown size={10} className="text-gray-400" />
            </button>

            <div className="absolute right-6 top-12 w-32 bg-white border border-gray-100 rounded-xl shadow-xl hidden group-hover:block group-focus-within:block z-40 p-1">
              {['Pendiente', 'En Proceso', 'Finalizado'].map((status) => (
                <button
                  key={status}
                  disabled={req.estado === status}
                  onClick={() => onUpdateStatus(req.id, status)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors ${
                    req.estado === status
                      ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

const ArrepentimientosTable = ({ requests, onUpdateStatus, updatingId }) => {
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
        <tbody className="divide-y divide-gray-50">
          {requests.map((req) => (
            <ArrepentimientoRow
              key={req.id}
              req={req}
              onUpdateStatus={onUpdateStatus}
              updatingId={updatingId}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArrepentimientosTable;
