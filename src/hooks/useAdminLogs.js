import { useState, useEffect } from 'react';
import { db } from '../fireBase/config';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export const useAdminLogs = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAllLogs = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "logs"), orderBy("fecha", "desc"));
        const snap = await getDocs(q);
        const records = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllLogs(records);
        setFilteredLogs(records);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAllLogs();
  }, []);

  useEffect(() => {
    let result = [...allLogs];

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(l => 
        (l.userNombre && l.userNombre.toLowerCase().includes(term)) ||
        (l.userEmail && l.userEmail.toLowerCase().includes(term)) ||
        (l.detalles && l.detalles.toLowerCase().includes(term)) ||
        (l.accion && l.accion.toLowerCase().includes(term))
      );
    }

    if (actionFilter !== 'todos') {
      result = result.filter(l => l.accion === actionFilter);
    }

    setFilteredLogs(result);
    setCurrentPage(1);
  }, [searchTerm, actionFilter, allLogs]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);

  return {
    currentItems,
    loading,
    searchTerm,
    actionFilter,
    currentPage,
    totalPages,
    filteredLogsLength: filteredLogs.length,
    indexOfFirstItem,
    indexOfLastItem,
    setSearchTerm,
    setActionFilter,
    setCurrentPage
  };
};
