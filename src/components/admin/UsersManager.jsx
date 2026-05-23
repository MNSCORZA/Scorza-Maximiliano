import React from 'react';
import { UserCheck, Briefcase, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUsersManager } from '../../hooks/useUsersManager';
import UserTable from './UserTable';
import UserModal from './UserModal';

const UsersManager = ({ admin, currentUser }) => {
  const {
    userSubTab,
    showUserModal,
    searchQuery,
    currentPage,
    totalPages,
    newUser,
    currentUsers,
    totalClientes,
    totalStaff,
    totalRegistros,
    setUserSubTab,
    setShowUserModal,
    setSearchQuery,
    setCurrentPage,
    setNewUser,
    handleCreateStaff,
    handleUpdatePerms
  } = useUsersManager(admin);

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
          type="button"
          onClick={() => setUserSubTab('clientes')} 
          className={`flex items-center justify-center gap-2 flex-1 lg:flex-initial px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
            userSubTab === 'clientes' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <UserCheck size={14}/> Clientes ({totalClientes})
        </button>
        <button 
          type="button"
          onClick={() => setUserSubTab('staff')} 
          className={`flex items-center justify-center gap-2 flex-1 lg:flex-initial px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
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
              {totalRegistros} registros encontrados
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
                type="button"
                onClick={() => setShowUserModal(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm shrink-0 cursor-pointer border-none"
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
          onUpdatePerms={handleUpdatePerms} 
        />

        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/20">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="p-2.5 rounded-xl border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="p-2.5 rounded-xl border bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
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
