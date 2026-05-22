import React, { useState, useEffect } from 'react';
import { db } from '../../fireBase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ShoppingBag, Clock, User, DollarSign, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const AbandonedCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "carritos"));
      const cartsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCarts(cartsList);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los carritos abandonados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const handleDeleteCart = async (cartId) => {
    try {
      await deleteDoc(doc(db, "carritos", cartId));
      toast.success("Carrito eliminado correctamente");
      setCarts(carts.filter(cart => cart.id !== cartId));
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar el carrito");
    }
  };

  const handleWhatsAppNotification = (cart) => {
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

  const calculateCartTotal = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((acc, item) => acc + (Number(item.precio) * (item.cantidad || 1)), 0);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Fecha desconocida";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Carritos Abandonados</h2>
            <p className="text-xs text-slate-400 font-medium">Monitoreá los productos que los usuarios dejaron guardados.</p>
          </div>
        </div>
      </div>

      {carts.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-4">
            <ShoppingBag size={32} />
          </div>
          <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">No hay carritos abandonados actualmente</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {carts.map((cart) => (
            <div key={cart.id} className="bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between">
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
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleWhatsAppNotification(cart)} className="p-2 text-green-600 hover:bg-green-50 rounded-xl transition-all cursor-pointer" title="Notificar por WhatsApp">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.491 5.341 1.493 5.344 0 9.71-4.348 9.713-9.688.002-2.586-1.002-5.019-2.83-6.848-1.829-1.83-4.259-2.831-6.852-2.831-5.352 0-9.722 4.35-9.725 9.69-.001 2.145.56 4.237 1.624 6.096L2.832 21.36l4.636-1.21-.821-.496z"/>
                      </svg>
                    </button>
                    <button onClick={() => handleDeleteCart(cart.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default AbandonedCarts;
