import { useState, useEffect } from 'react';
import { getAllUsers, getAllOrders, updateUserInternalNotes } from '../fireBase/dataBase';
import { toast } from 'sonner';

export const useCRMManager = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [crmNotes, setCrmNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchCRMData = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await getAllUsers();
      const fetchedOrders = await getAllOrders();
      setUsers(fetchedUsers);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar la información del CRM");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCRMData();
  }, []);

  const handleOpenUser360 = (user) => {
    setSelectedUser(user);
    setCrmNotes(user.notas || "");
  };

  const handleCloseUser360 = () => {
    setSelectedUser(null);
    setCrmNotes("");
  };

  const handleSaveNotes = async () => {
    if (!selectedUser) return;
    try {
      setSavingNotes(true);
      await updateUserInternalNotes(selectedUser.id, crmNotes);
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, notas: crmNotes } : u));
      setSelectedUser(prev => ({ ...prev, notas: crmNotes }));
      toast.success("Notas internas guardadas correctamente");
    } catch (error) {
      console.error(error);
      toast.error("Error al guardar las notas");
    } finally {
      setSavingNotes(false);
    }
  };

  const getUserCRMDetails = (userId) => {
    const userOrders = orders.filter(o => o.userId === userId || o.uid === userId);
    const ltv = userOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    return {
      userOrders,
      ltv
    };
  };

  return {
    users,
    loading,
    selectedUser,
    crmNotes,
    setCrmNotes,
    savingNotes,
    handleOpenUser360,
    handleCloseUser360,
    handleSaveNotes,
    getUserCRMDetails,
    refreshCRM: fetchCRMData
  };
};
