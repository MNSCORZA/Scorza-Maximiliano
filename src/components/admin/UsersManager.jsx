import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../fireBase/config';
import { UserCheck, Briefcase, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import UserTable from './UserTable';
import UserModal from './UserModal';

const UsersManager = ({ admin, currentUser }) => {
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

  useEffect(() => {
    setCurrentPage(1);
  }, [userSubTab, searchQuery]);

  const handleCreateStaff = async (e) => {
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
      admin.refreshUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const allUsers = admin.users || [];
  
  const totalClientes = allUsers.filter(u => !(u.permisos?.isAdmin || u.rol === 'empleado' || u.rol === 'admin')).length;
  const totalStaff = allUsers.filter(u => u.permisos?.isAdmin || u.rol === 'empleado' || u.rol === 'admin').length;

  const filteredUsers = allUsers.filter(u => {
    const isStaff = u.permisos?.isAdmin || u.rol === 'empleado' || u.rol === 'admin';
    const matchesTab = userSubTab === 'staff' ? isStaff : !isStaff;
    
    const search = searchQuery.toLowerCase();
    const matchesSearch = (u.nombre || '').toLowerCase().includes(search) || 
                          (u.email || '').toLowerCase().includes(search);

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <UserModal 
        isOpen={showUserModal} 
        onClose={() => setShowUserModal(false)} 
        newUser={newUser} 
        setNewUser={setNewUser} 
        onSubmit={handleCreateStaff} 
      />

      <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-full lg:w-max gap-1">
        <button 
          onClick={() => setUserSubTab('clientes')} 
          className={`flex items-center justify-center gap-2 flex-1 lg:flex-initial px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            userSubTab === 'clientes' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <UserCheck size={14}/> Clientes ({totalClientes})
        </button>
        <button 
          onClick={() => setUserSubTab('staff')} 
          className={`flex items-center justify-center gap-2 flex-1 lg:flex-initial px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
            userSubTab === 'staff' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Briefcase size={14}/> Staff ({totalStaff})
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-50">
          <div>
            <h2 className="font-black uppercase text-xs tracking-widest text-slate-900">
              {userSubTab === 'staff' ? 'Gestión de Personal' : 'Base de Clientes'}
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">
              {filteredUsers.length} registros encontrados
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl text-xs font-bold text-gray-700 placeholder-gray-400 focus:bg-white focus:border-indigo-500/20 outline-none transition-all"
              />
            </div>

            {userSubTab === 'staff' && (
              <button 
                onClick={() => setShowUserModal(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm shrink-0"
              >
                Nuevo
              </button>
            )}
          </div>
        </div>

        <UserTable 
          users={currentUsers} 
          currentUser={currentUser} 
          isStaffView={userSubTab === 'staff'} 
          admin={admin}
          onUpdatePerms={async (id, perm, value) => { 
            await updateDoc(doc(db, "usuarios", id), { [`permisos.${perm}`]: value }); 
            admin.refreshUsers(); 
          }} 
        />

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

export default UsersManager;
