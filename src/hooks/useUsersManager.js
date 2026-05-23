import { useState, useEffect, useMemo, useCallback } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../fireBase/config';

export const useUsersManager = (admin) => {
  const [userSubTab, setUserSubTab] = useState('clientes');
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [newUser, setNewUser] = useState({ 
    nombre: '', 
    email: '', 
    password: '', 
    permisos: { isAdmin: false, ver: true, editar: false, borrar: false } 
  });

  // Resetear paginación al cambiar filtros o subpestañas
  useEffect(() => {
    setCurrentPage(1);
  }, [userSubTab, searchQuery]);

  const allUsers = useMemo(() => admin.users || [], [admin.users]);

  // Contadores memorizados
  const counts = useMemo(() => {
    let clientes = 0;
    let staff = 0;
    allUsers.forEach(u => {
      const isStaff = u.permisos?.isAdmin || u.rol === 'empleado' || u.rol === 'admin';
      if (isStaff) staff++;
      else clientes++;
    });
    return { clientes, staff };
  }, [allUsers]);

  // Lista filtrada en tiempo real memorizada
  const filteredUsers = useMemo(() => {
    const search = searchQuery.toLowerCase();
    return allUsers.filter(u => {
      const isStaff = u.permisos?.isAdmin || u.rol === 'empleado' || u.rol === 'admin';
      const matchesTab = userSubTab === 'staff' ? isStaff : !isStaff;
      const matchesSearch = (u.nombre || '').toLowerCase().includes(search) || 
                            (u.email || '').toLowerCase().includes(search);
      return matchesTab && matchesSearch;
    });
  }, [allUsers, userSubTab, searchQuery]);

  // Paginación calculada
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentUsers = useMemo(() => {
    return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredUsers, indexOfFirstItem, indexOfLastItem]);

  // Crear nuevo personal en Firebase Auth e inyectarlo en Firestore
  const handleCreateStaff = useCallback(async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      await setDoc(doc(db, "usuarios", cred.user.uid), { 
        nombre: newUser.nombre, 
        email: newUser.email, 
        permisos: newUser.permisos, 
        rol: newUser.permisos.isAdmin ? "admin" : "empleado" 
      });
      setShowUserModal(false);
      setNewUser({ nombre: '', email: '', password: '', permisos: { isAdmin: false, ver: true, editar: false, borrar: false } });
      if (admin.refreshUsers) admin.refreshUsers();
    } catch (error) {
      console.error(error);
      throw error; // El modal captura esto para apagar su spinner
    }
  }, [newUser, admin]);

  // Actualización transaccional de permisos en tiempo real
  const handleUpdatePerms = useCallback(async (id, perm, value) => {
    await updateDoc(doc(db, "usuarios", id), { [`permisos.${perm}`]: value }); 
    if (admin.refreshUsers) admin.refreshUsers(); 
  }, [admin]);

  return {
    userSubTab,
    showUserModal,
    searchQuery,
    currentPage,
    totalPages,
    newUser,
    currentUsers,
    totalClientes: counts.clientes,
    totalStaff: counts.staff,
    totalRegistros: filteredUsers.length,
    setUserSubTab,
    setShowUserModal,
    setSearchQuery,
    setCurrentPage,
    setNewUser,
    handleCreateStaff,
    handleUpdatePerms
  };
};
