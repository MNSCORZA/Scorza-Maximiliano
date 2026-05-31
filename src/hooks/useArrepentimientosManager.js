import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../fireBase/config';
import { saveLog } from '../fireBase/dataBase';
import { toast } from 'sonner';

export const useArrepentimientosManager = (user, userData) => {
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [statusTab, setStatusTab] = useState('Pendiente');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'arrepentimientos'), orderBy('fechaSolicitud', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(data);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const targetReq = requests.find(r => r.id === id);
      const adminName = userData?.nombre || 'Admin';

      await updateDoc(doc(db, 'arrepentimientos', id), {
        estado: newStatus
      });

      await saveLog(
        user.uid,
        user.email,
        adminName,
        'Gestionar Arrepentimiento',
        `Cambió el estado de la solicitud de la orden #${targetReq?.nroOrden || id} a: "${newStatus}"`
      );

      toast.success('Estado actualizado correctamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al intentar cambiar el estado');
    } finally {
      setUpdatingId(null);
    }
  };

  const getCountByStatus = (status) => {
    return requests.filter(r => r.estado === status).length;
  };

  const filteredRequests = requests.filter(r => {
    if (r.estado !== statusTab) return false;
    
    if (searchQuery.trim() !== '') {
      const queryLower = searchQuery.toLowerCase();
      const nombre = (r.nombre || '').toLowerCase();
      const email = (r.email || '').toLowerCase();
      const nroOrden = (r.nroOrden || '').toLowerCase();
      return nombre.includes(queryLower) || email.includes(queryLower) || nroOrden.includes(queryLower);
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  return {
    loading,
    updatingId,
    statusTab,
    searchQuery,
    currentPage,
    totalPages,
    currentRequests,
    filteredRequestsLength: filteredRequests.length,
    setStatusTab: (tab) => { setStatusTab(tab); setCurrentPage(1); },
    setSearchQuery: (query) => { setSearchQuery(query); setCurrentPage(1); },
    setCurrentPage,
    handleUpdateStatus,
    getCountByStatus
  };
};
