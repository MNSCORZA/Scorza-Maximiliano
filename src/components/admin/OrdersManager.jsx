import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { Search, Package, Truck, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import OrderTable from './OrderTable';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  
  const [statusTab, setStatusTab] = useState('generada');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [statusTab, searchQuery]);

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

  const filteredOrders = orders.filter(order => {
    const matchesStatus = order.status === statusTab;
    
    const clientName = `${order.buyer?.nombre || ''} ${order.buyer?.apellido || ''}`.toLowerCase();
    const clientEmail = (order.buyer?.email || '').toLowerCase();
    const orderId = order.id.toLowerCase();
    const search = searchQuery.toLowerCase();
    
    const matchesSearch = clientName.includes(search) || 
                          clientEmail.includes(search) || 
                          orderId.includes(search);

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronizando Ventas...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm gap-1 w-full lg:w-max">
        <button 
          onClick={() => setStatusTab('generada')} 
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            statusTab === 'generada' ? 'bg-amber-50 text-amber-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Package size={14}/> Pendientes ({orders.filter(o => o.status === 'generada').length})
        </button>
        <button 
          onClick={() => setStatusTab('enviada')} 
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            statusTab === 'enviada' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Truck size={14}/> En Camino ({orders.filter(o => o.status === 'enviada').length})
        </button>
        <button 
          onClick={() => setStatusTab('entregada')} 
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            statusTab === 'entregada' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <CheckCircle size={14}/> Entregadas ({orders.filter(o => o.status === 'entregada').length})
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-black uppercase text-xs tracking-widest text-slate-900">
              {statusTab === 'generada' ? 'Pedidos por Procesar' : statusTab === 'enviada' ? 'Envíos en Curso' : 'Historial de Entregas'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
              {filteredOrders.length} encontrados en esta sección
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text"
              placeholder="Buscar cliente, email o id..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-700 placeholder-gray-400 focus:bg-white focus:border-indigo-500/20 outline-none transition-all"
            />
          </div>
        </div>

        <OrderTable orders={currentOrders} onUpdateStatus={handleUpdateOrderStatus} updatingId={updatingId} />

        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="p-2.5 rounded-xl border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="p-2.5 rounded-xl border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersManager;
