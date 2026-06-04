import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Loader2, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const OrderStatusDropdown = ({ order, onUpdateStatus, updatingId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isRowUpdating = updatingId === order.id;

  const statusStyles = {
    generada: 'bg-amber-50 text-amber-600 border-amber-100',
    enviada: 'bg-blue-50 text-blue-600 border-blue-100',
    entregada: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    reclamo: 'bg-rose-50 text-rose-600 border-rose-100',
    'reclamo resuelto - nota de crédito': 'bg-slate-100 text-slate-600 border-slate-200',
    'reclamo resuelto - reenvío': 'bg-slate-100 text-slate-600 border-slate-200'
  };

  const statusLabels = {
    generada: 'Generada',
    enviada: 'Enviada',
    entregada: 'Entregada',
    reclamo: 'Reclamo Abierto',
    'reclamo resuelto - nota de crédito': 'Resuelto (N. Crédito)',
    'reclamo resuelto - reenvío': 'Resuelto (Reenvío)'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendOrderWhatsApp = () => {
    const rawPhone = order.buyer?.telefono;
    const phoneNumber = rawPhone ? rawPhone.replace(/[^0-9]/g, '') : '';

    if (!phoneNumber) {
      toast.error('Esta orden no posee un teléfono de contacto válido');
      return;
    }

    const clienteNombre = order.buyer?.nombre || 'Cliente';
    const orderRef = order.id.slice(-6).toUpperCase();
    let mensaje = '';

    if (order.status === 'generada') {
      mensaje = `Hola *${clienteNombre}*! 👋 Te contactamos de *De Todo*.\n\nRecibimos correctamente tu orden *#${orderRef}* y está en proceso de preparación. En cuanto despachemos tu paquete te avisamos por acá! Muchas gracias por tu compra. 😊`;
    } else if (order.status === 'enviada') {
      mensaje = `Hola *${clienteNombre}*! 👋 Tu pedido *#${orderRef}* de *De Todo* ya fue despachado y está en camino! 🚚✨\n\nPronto estará llegando a tu domicilio. ¡Que lo disfrutes!`;
    } else if (order.status === 'entregada') {
      mensaje = `Hola *${clienteNombre}*! 👋 Vimos que tu pedido *#${orderRef}* ya figura como entregado. 🥰\n\nEsperamos que todo haya llegado perfecto. Si te gustó, no dudes en recomendarnos!`;
    } else if (order.status?.toLowerCase() === 'reclamo') {
      mensaje = `Hola *${clienteNombre}*! 👋 Recibimos tu reclamo sobre la orden *#${orderRef}*. Ya lo estamos revisando con el equipo para darte una solución lo antes posible. Gracias por tu paciencia!`;
    }

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  const currentStatusKey = order.status?.toLowerCase() || 'generada';

  return (
    <div className="inline-flex items-center gap-2 justify-end w-full relative">
      {isRowUpdating ? (
        <Loader2 size={16} className="text-indigo-600 animate-spin mr-1" />
      ) : (
        <button 
          onClick={handleSendOrderWhatsApp}
          className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 active:scale-95 rounded-xl transition-all cursor-pointer flex items-center justify-center border border-transparent hover:border-indigo-100 bg-slate-50/50 sm:bg-transparent shadow-sm sm:shadow-none"
          title="Enviar notificación al cliente"
        >
          <MessageSquare size={16} />
        </button>
      )}

      <div className="relative" ref={isOpen ? dropdownRef : null}>
        <button
          disabled={isRowUpdating}
          onClick={() => setIsOpen(!isOpen)}
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-2.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${statusStyles[currentStatusKey] || 'bg-slate-50 text-slate-600'}`}
        >
          {statusLabels[currentStatusKey] || order.status}
          <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
            {Object.keys(statusLabels).map((statusKey) => (
              <button
                key={statusKey}
                onClick={() => {
                  onUpdateStatus(order.id, statusKey);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${
                  currentStatusKey === statusKey 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {statusLabels[statusKey]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusDropdown;
