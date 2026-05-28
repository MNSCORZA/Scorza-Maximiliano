import React, { useState, useEffect } from 'react';
import { db } from '../../fireBase/config';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import AbandonedCartCard from './AbandonedCartCard';

const AbandonedCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "carritos"), where("esAbandonado", "==", true));
      const querySnapshot = await getDocs(q);
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
            <AbandonedCartCard
              key={cart.id}
              cart={cart}
              onDelete={handleDeleteCart}
              formatDate={formatDate}
              calculateCartTotal={calculateCartTotal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AbandonedCarts;
