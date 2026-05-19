import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import OrderTable from './OrderTable';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
    await updateDoc(doc(db, "orders", id), { status: newStatus });
    fetchOrders();
  };

  if (loading) return <div className="p-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Cargando ventas...</div>;

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50">
        <h2 className="font-black uppercase text-xs tracking-widest text-slate-900">Registro de Ventas</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{orders.length} pedidos totales</p>
      </div>
      <OrderTable orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
    </div>
  );
};

export default OrdersManager;
