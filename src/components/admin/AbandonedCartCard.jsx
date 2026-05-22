import React from 'react';
import { ShoppingBag, Clock, User, DollarSign, Trash2, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const AbandonedCartCard = ({ cart, onDelete, formatDate, calculateCartTotal }) => {
  const handleWhatsAppNotification = () => {
    const rawPhone = cart.clienteInfo?.telefono || cart.telefono;
    const phoneNumber = rawPhone ? rawPhone.replace(/[^0-9]/g, '') : '';

    if (!phoneNumber) {
      toast.error('Este cliente no dejó un teléfono de contacto');
      return;
    }

    const clienteNombre = cart.clienteInfo?.nombre || cart.nombre || 'Cliente';
    const listaProductos = (cart.items || [])
      .map(item => `- ${item.titulo} (Cant: ${item.cantidad || 1})`)
      .join('\n');

    const mensaje = `Hola *${clienteNombre}*! 👋 Te contactamos de *De Todo*.\n\nVimos que dejaste algunos productos guardados en tu carrito:\n${listaProductos}\n\nTe podemos ayudar a finalizar tu compra o si tenés alguna duda con el envío nos avisás! 😊`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start border-b border-slate-50 pb-4 mb-4">
          <div className="flex flex-col gap-1 text-slate-500 max-w-[70%]">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="text-xs font-black uppercase tracking-wider truncate">
                {cart.clienteInfo?.nombre ? `${cart.clienteInfo.nombre} ${cart.clienteInfo.apellido || ''}` : `ID: ${cart.uid || cart.id}`}
              </span>
            </div>
            {(cart.clienteInfo?.telefono || cart.telefono) && (
              <span className="text-[10px] text-slate-400 font-bold pl-6">Tel: {cart.clienteInfo?.telefono || cart.telefono}</span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={handleWhatsAppNotification} 
              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 active:scale-95 border border-transparent hover:border-indigo-100 rounded-xl transition-all cursor-pointer flex items-center justify-center bg-slate-50/50 sm:bg-transparent shadow-sm sm:shadow-none" 
              title="Notificar por WhatsApp"
            >
              <MessageSquare size={16} />
            </button>
            <button 
              onClick={() => onDelete(cart.id)} 
              className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 active:scale-95 rounded-xl transition-all cursor-pointer"
              title="Eliminar registro"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {Array.isArray(cart.items) && cart.items.map((item, idx) => (
            <div key={item.id || idx} className="flex items-center justify-between gap-4 bg-slate-50 p-3 rounded-2xl">
              <div className="flex items-center gap-3 truncate">
                {item.imagenUrl || item.img ? (
                  <img src={item.imagenUrl || item.img} alt={item.titulo} className="w-10 h-10 object-cover rounded-xl bg-white border border-slate-100 flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                    <ShoppingBag size={16} />
                  </div>
                )}
                <div className="truncate">
                  <h4 className="text-xs font-black text-slate-800 truncate">{item.titulo}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cant: {item.cantidad || 1}</p>
                </div>
              </div>
              <span className="text-xs font-black text-slate-700 flex-shrink-0">
                ${(Number(item.precio) * (item.cantidad || 1)).toLocaleString('es-AR')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-50 pt-4 mt-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={14} />
          <span className="text-[10px] font-bold uppercase tracking-wider">{formatDate(cart.updatedAt)}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl self-end sm:self-auto">
          <DollarSign size={14} className="-mr-0.5" />
          <span className="text-xs font-black uppercase tracking-wider">Total: ${calculateCartTotal(cart.items).toLocaleString('es-AR')}</span>
        </div>
      </div>
    </div>
  );
};

export default AbandonedCartCard;
