import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import OrderTable from './OrderTable';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "orders"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      setOrders(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateOrderStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "orders", id), { status: newStatus });
      await fetchOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronizando Ventas...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-black uppercase text-xs tracking-widest text-slate-900">Registro de Ventas</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{orders.length} pedidos totales</p>
        </div>
      </div>
      <OrderTable orders={orders} onUpdateStatus={handleUpdateOrderStatus} updatingId={updatingId} />
    </div>
  );
};

export default OrdersManager;
