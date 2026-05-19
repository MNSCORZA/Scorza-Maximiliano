import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../fireBase/config';
import { UserCheck, Briefcase } from 'lucide-react';
import UserTable from './UserTable';
import UserModal from './UserModal';

const UsersManager = ({ admin, currentUser }) => {
  const [userSubTab, setUserSubTab] = useState('clientes');
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ nombre: '', email: '', password: '', permisos: { isAdmin: false, ver: true, editar: false, borrar: false } });

  const filteredUsers = admin.users?.filter(u => {
    const isStaff = u.permisos?.isAdmin || u.rol === 'empleado' || u.rol === 'admin';
    return userSubTab === 'staff' ? isStaff : !isStaff;
  }) || [];

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    const cred = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    await setDoc(doc(db, "usuarios", cred.user.uid), { 
      nombre: newUser.nombre, 
      email: newUser.email, 
      permisos: newUser.permisos, 
      rol: newUser.permisos.isAdmin ? "admin" : "empleado" 
    });
    setShowUserModal(false);
    admin.refreshUsers();
  };

  return (
    <div className="space-y-6">
      <UserModal 
        isOpen={showUserModal} 
        onClose={() => setShowUserModal(false)} 
        newUser={newUser} 
        setNewUser={setNewUser} 
        onSubmit={handleCreateStaff} 
      />

      <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-fit">
        <button onClick={() => setUserSubTab('clientes')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${userSubTab === 'clientes' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'}`}><UserCheck size={14}/> Clientes</button>
        <button onClick={() => setUserSubTab('staff')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${userSubTab === 'staff' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'}`}><Briefcase size={14}/> Staff</button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
         <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-50">
            <div>
              <h2 className="font-black uppercase text-xs tracking-widest text-slate-900">{userSubTab === 'staff' ? 'Gestión de Personal' : 'Base de Clientes'}</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{filteredUsers.length} Usuarios</p>
            </div>
            {userSubTab === 'staff' && <button onClick={() => setShowUserModal(true)} className="bg-indigo-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Nuevo</button>}
         </div>
         <UserTable 
           users={filteredUsers} currentUser={currentUser} isStaffView={userSubTab === 'staff'} admin={admin}
           onUpdatePerms={async (id, p, v) => { await updateDoc(doc(db, "usuarios", id), {[`permisos.${p}`]: v}); admin.refreshUsers(); }} 
         />
      </div>
    </div>
  );
};

export default UsersManager;
