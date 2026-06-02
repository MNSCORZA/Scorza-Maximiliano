import React from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import ArrepDropdown from './ArrepDropdown';

const ArrepTable = ({ requests, onUpdateStatus, updatingId }) => {

  const formatDate = (firebaseDate) => {
    if (!firebaseDate) return 'S/D';
    try {
      const date = firebaseDate.toDate ? firebaseDate.toDate() : new Date(firebaseDate.seconds * 1000);
      return date.toLocaleDateString('es-AR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Fecha inválida';
    }
  };

  const handleSendArrepentimientoWhatsApp = (req) => {
    const rawPhone = req.telefono;
    const phoneNumber = rawPhone ? rawPhone.replace(/[^0-9]/g, '') : '';

    if (!phoneNumber) {
      toast.error('Esta solicitud no posee un teléfono de contacto válido');
      return;
    }

    const clienteNombre = req.nombre || 'Cliente';
    const orderRef = req.nroOrden || 'N/A';
    let mensaje = '';

    if (req.estado === 'Pendiente') {
      mensaje = `Hola *${clienteNombre}*! 👋 Te contactamos de *De Todo*.\n\nRecibimos tu solicitud de arrepentimiento sobre la orden *#${orderRef}*. Ya la pasamos al sector administrativo para revisar el caso y procesar la revocación correspondiente. Nos mantenemos en contacto por este medio!`;
    } else if (req.estado === 'En Proceso') {
      mensaje = `Hola *${clienteNombre}*! 👋 Con respecto a tu solicitud de arrepentimiento por la orden *#${orderRef}*, te comentamos que ya está siendo procesada.\n\nPronto te enviaremos la confirmación de la cancelación o la orden de reintegro de los fondos.`;
    } else if (req.estado === 'Finalizado') {
      mensaje = `Hola *${clienteNombre}*! 👋 Te informamos que tu solicitud de arrepentimiento sobre la orden *#${orderRef}* ya fue gestionada y *Finalizada* con éxito. 😊\n\nCualquier duda quedamos a tu disposición.`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  if (requests.length === 0) {
    return (
      <div className="p-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
        No se encontraron solicitudes
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/40 text-[10px] font-black uppercase text-gray-400 tracking-widest">
            <th className="px-8 py-5">Cliente</th>
            <th className="px-8 py-5">Contacto</th>
            <th className="px-8 py-5">Nro Orden</th>
            <th className="px-8 py-5">Fecha</th>
            <th className="px-8 py-5">Motivo</th>
            <th className="px-8 py-5 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {requests.map((req) => {
            const isRowUpdating = updatingId === req.id;

            return (
              <tr 
                key={req.id} 
                className={`transition-colors group align-top ${
                  isRowUpdating ? 'bg-gray-50/80 opacity-60 pointer-events-none' : 'hover:bg-gray-50/40'
                }`}
              >
                <td className="px-8 py-6">
                  <p className="font-black text-xs text-gray-900 tracking-tight">{req.nombre}</p>
                  <p className="text-[10px] text-gray-400 font-bold lowercase mt-0.5 select-all break-all max-w-[200px]">{req.email}</p>
                </td>

                <td className="px-8 py-6">
                  <p className="text-[10px] text-indigo-600 font-black select-all">{req.telefono || 'Sin Teléfono'}</p>
                </td>

                <td className="px-8 py-6">
                  <span className="inline-block font-black text-xs text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                    #{req.nroOrden}
                  </span>
                </td>

                <td className="px-8 py-6 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                  {formatDate(req.fechaSolicitud)}
                </td>

                <td className="px-8 py-6 max-w-xs">
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

                <td className="px-8 py-6 text-right overflow-visible">
                  <div className="inline-flex items-center gap-2 justify-end w-full relative">
                    {isRowUpdating ? (
                      <Loader2 size={16} className="text-indigo-600 animate-spin mr-1" />
                    ) : (
                      <button 
                        onClick={() => handleSendArrepentimientoWhatsApp(req)}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 active:scale-95 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-transparent hover:border-indigo-100 bg-slate-50/50 sm:bg-transparent shadow-sm sm:shadow-none"
                        title="Enviar notificación de arrepentimiento"
                      >
                        <MessageSquare size={16} />
                      </button>
                    )}
                    <ArrepDropdown 
                      req={req} 
                      onUpdateStatus={onUpdateStatus} 
                      updatingId={updatingId} 
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArrepTable;
