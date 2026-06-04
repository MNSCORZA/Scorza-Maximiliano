import React, { useState } from 'react';
import { ShoppingBag, Calendar, RefreshCw, ChevronDown, ChevronUp, AlertCircle, X, Send } from 'lucide-react';
import { toast } from 'sonner';
import { createOrderClaim } from '../../services/claims';

const getStatusStyles = (status) => {
  switch (status?.toLowerCase()) {
    case 'generada':
    case 'pendiente':
      return 'bg-amber-50 text-amber-600 border-amber-100';
    case 'enviada':
    case 'en camino':
      return 'bg-blue-50 text-blue-600 border-blue-100';
    case 'entregada':
    case 'finalizado':
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'reclamo':
      return 'bg-rose-50 text-rose-600 border-rose-100';
    default:
      return 'bg-slate-50 text-slate-600 border-slate-100';
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'Reciente';
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const OrderItem = ({ pedido, onAddToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [claimReason, setClaimReason] = useState('');
  const [claimComment, setClaimComment] = useState('');
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);

  const handleReorder = (e) => {
    e.stopPropagation();
    if (!pedido.items || !onAddToCart) return;

    pedido.items.forEach(item => {
      onAddToCart({
        id: item.id,
        titulo: item.titulo || item.nombre,
        precio: item.precio,
        imagenUrl: item.imagenUrl || item.imgUrl || item.img || null,
        cantidad: item.cantidad || 1
      });
    });

    toast.success("Todos los productos de la orden fueron añadidos al carrito");
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!claimReason) {
      toast.error("Por favor, seleccioná un motivo para tu reclamo");
      return;
    }

    setIsSubmittingClaim(true);
    try {
      await createOrderClaim(pedido.id, claimReason, claimComment);
      toast.success("Reclamo enviado de forma segura. El equipo lo revisará a la brevedad.");
      setIsClaimModalOpen(false);
      setClaimReason('');
      setClaimComment('');
      window.location.reload();
    } catch (error) {
      toast.error("Hubo un error al procesar el reclamo");
    } finally {
      setIsSubmittingClaim(false);
    }
  };

  return (
    <div className="group border border-slate-100 bg-white p-5 rounded-[2rem] flex flex-col gap-4 hover:shadow-xl hover:shadow-slate-100/50 hover:border-indigo-100 transition-all duration-300">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-slate-50 p-3.5 rounded-2xl text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <ShoppingBag size={20} />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-black text-slate-800 text-sm tracking-tight">
                Orden #{pedido.id.slice(-6).toUpperCase()}
              </p>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border tracking-wider ${getStatusStyles(pedido.status)}`}>
                {pedido.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-slate-400 text-[11px] font-medium flex-wrap">
              <span className="flex items-center gap-1">
                <Calendar size={12} className="text-slate-300" />
                {formatDate(pedido.date || pedido.fecha)}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 hidden sm:inline-block"></span>
              <span className="text-slate-500 font-bold">
                {pedido.items?.length || 0} {pedido.items?.length === 1 ? 'artículo' : 'artículos'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest sm:hidden">Total pagado</p>
          <div className="flex items-center gap-2">
            <p className="font-black text-slate-900 text-lg tracking-tight">
              $ {pedido.total?.toLocaleString('es-AR')}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={handleReorder}
                className="p-1.5 bg-slate-50 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Volver a comprar"
              >
                <RefreshCw size={16} />
              </button>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 bg-slate-50 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                title="Ver productos"
              >
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && pedido.items && pedido.items.length > 0 && (
        <div className="border-t border-slate-50 pt-4 mt-1 space-y-3 animate-fadeIn">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Detalle de productos</p>

          {pedido.items.map((item, idx) => (
            <div key={item.id || idx} className="flex items-center justify-between bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/50">
              <div className="flex items-center gap-3">
                {(item.imagenUrl || item.imgUrl || item.img) && (
                  <img 
                    src={item.imagenUrl || item.imgUrl || item.img} 
                    alt={item.titulo} 
                    className="w-10 h-10 object-cover rounded-xl bg-white border border-slate-100 flex-shrink-0"
                  />
                )}
                <div>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">
                    {item.titulo || item.nombre || "Producto sin nombre"}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    Cantidad: <span className="font-bold text-slate-600">{item.cantidad}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs font-black text-slate-700 whitespace-nowrap">
                $ {(item.precio * item.cantidad)?.toLocaleString('es-AR')}
              </p>
            </div>
          ))}

          {pedido.status?.toLowerCase() === 'entregada' && (
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsClaimModalOpen(true)}
                className="px-5 py-3 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
              >
                <AlertCircle size={14} /> ¿Tuviste algún problema con tu pedido?
              </button>
            </div>
          )}
        </div>
      )}

      {isClaimModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md p-6 rounded-[2.5rem] shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900">
                <AlertCircle size={16} className="text-rose-500" /> Iniciar Reclamo
              </h3>
              <button 
                type="button"
                onClick={() => setIsClaimModalOpen(false)}
                className="p-2 text-slate-400 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleClaimSubmit} className="space-y-4">
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-1 block">
                  Motivo del problema
                </label>
                <select
                  value={claimReason}
                  onChange={(e) => setClaimReason(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-2.5 px-3 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all cursor-pointer"
                >
                  <option value="">Selecciona una opción...</option>
                  <option value="Llegó roto/fallado">Llegó roto / fallado</option>
                  <option value="No es el tamaño/modelo que pedí">No es el tamaño o modelo que pedí</option>
                  <option value="Me faltaron artículos">Me faltaron artículos en el paquete</option>
                  <option value="Me arrepentí de la compra">Me arrepentí de la compra</option>
                </select>
              </div>

              <div>
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-1 block">
                  Contanos más detalles
                </label>
                <textarea
                  value={claimComment}
                  onChange={(e) => setClaimComment(e.target.value)}
                  placeholder="Ej: La caja vino golpeada y falta un accesorio..."
                  rows={3}
                  className="w-full bg-slate-50 border-2 border-transparent rounded-xl py-2.5 px-4 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmittingClaim}
                  className="flex-1 bg-rose-600 text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-100 cursor-pointer border-none disabled:bg-rose-400"
                >
                  {isSubmittingClaim ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={14} /> Enviar Reclamo
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsClaimModalOpen(false)}
                  className="px-5 bg-slate-100 text-slate-500 py-3.5 rounded-xl text-[10px] font-black uppercase hover:bg-slate-200 transition-all cursor-pointer border-none"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderItem;
