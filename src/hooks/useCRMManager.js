import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { db } from '../fireBase/config';

export const useCRMManager = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [crmNotes, setCrmNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Estados de paginación y filtros
  const [visibleUsersCount, setVisibleUsersCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');
  const [minLtvFilter, setMinLtvFilter] = useState('all'); // 'all', '10000', '50000', '100000'

  useEffect(() => {
    const fetchCRMBaseData = async () => {
      try {
        setLoading(true);
        const usersSnap = await getDocs(collection(db, 'usuarios'));
        const ordersSnap = await getDocs(collection(db, 'orders'));

        const usersList = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const ordersList = ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setAllUsers(usersList);
        setOrders(ordersList);
      } catch (error) {
        console.error("Error cargando CRM data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCRMBaseData();
  }, []);

  const getUserCRMDetails = (userId) => {
    const userOrders = orders.filter(o => o.userId === userId || o.uid === userId);
    const ltv = userOrders.reduce((acc, order) => acc + (Number(order.total) || 0), 0);
    return { userOrders, ltv };
  };

  const handleOpenUser360 = (user) => {
    setSelectedUser(user);
    setCrmNotes(user.notasCRM || '');
  };

  const handleCloseUser360 = () => {
    setSelectedUser(null);
    setCrmNotes('');
  };

  const handleSaveNotes = async () => {
    if (!selectedUser) return;
    try {
      setSavingNotes(true);
      // Simulación o pegado directo a tu función de guardado
      selectedUser.notasCRM = crmNotes;
      setAllUsers([...allUsers]);
    } catch (error) {
      console.error(error);
    } finally {
      setSavingNotes(false);
    }
  };

  // Lógica de filtrado en cliente combinando datos calculados
  const filteredUsers = allUsers.filter(u => {
    const { ltv } = getUserCRMDetails(u.id);
    const fullName = `${u.nombre || ''} ${u.apellido || ''}`.toLowerCase();
    const email = (u.email || '').toLowerCase();
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch = fullName.includes(search) || email.includes(search);
    
    let matchesLtv = true;
    if (minLtvFilter !== 'all') {
      matchesLtv = ltv >= Number(minLtvFilter);
    }

    return matchesSearch && matchesLtv;
  });

  const paginatedUsers = filteredUsers.slice(0, visibleUsersCount);
  const hasMore = filteredUsers.length > visibleUsersCount;

  const handleLoadMore = () => {
    setVisibleUsersCount(prev => prev + 8);
  };

  return {
    users: paginatedUsers,
    loading,
    selectedUser,
    crmNotes,
    setCrmNotes,
    savingNotes,
    searchTerm,
    setSearchTerm,
    minLtvFilter,
    setMinLtvFilter,
    hasMore,
    handleLoadMore,
    handleOpenUser360,
    handleCloseUser360,
    handleSaveNotes,
    getUserCRMDetails
  };
};
