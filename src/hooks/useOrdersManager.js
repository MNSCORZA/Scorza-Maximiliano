import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from '../fireBase/config';

export const useOrdersManager = () => {
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
    const currentStatus = order.status?.toLowerCase() || '';

    let matchesStatus = currentStatus === statusTab.toLowerCase();
    if (statusTab === 'reclamo') {
      matchesStatus = currentStatus.startsWith('reclamo') || currentStatus.startsWith('resuelto');
    }

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

  const getCountByStatus = (status) => {
    if (status === 'reclamo') {
      return orders.filter(o => {
        const currentStatus = o.status?.toLowerCase() || '';
        return currentStatus.startsWith('reclamo') || currentStatus.startsWith('resuelto');
      }).length;
    }
    return orders.filter(o => o.status === status).length;
  };

  return {
    orders,
    loading,
    updatingId,
    statusTab,
    searchQuery,
    currentPage,
    totalPages,
    currentOrders,
    filteredOrdersLength: filteredOrders.length,
    setStatusTab,
    setSearchQuery,
    setCurrentPage,
    handleUpdateOrderStatus,
    getCountByStatus
  };
};
