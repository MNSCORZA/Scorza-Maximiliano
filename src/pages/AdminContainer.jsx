import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../fireBase/config';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { Lock, UserCheck, Briefcase } from 'lucide-react';

import ProductForm from '../components/admin/ProductForm';
import UserTable from '../components/admin/UserTable';
import AdminFilters from '../components/admin/AdminFilters';
import ProductTable from '../components/admin/ProductTable';
import ConfirmModal from '../components/admin/ConfirmModal';
import UserModal from '../components/admin/UserModal';

const AdminContainer = () => {
  const { user, userData, loading } = useAuth();
  const admin = useAdmin(user, userData, loading);

  const [activeTab, setActiveTab] = useState('productos');
  const [userSubTab, setUserSubTab] = useState('clientes');
  const [showUserModal, setShowUserModal] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => {} });
  const [newUser, setNewUser] = useState({ nombre: '', email: '', password: '', permisos: { isAdmin: false, ver: true, editar: false, borrar: false } });

  const filteredUsers = admin.users?.filter(u => {
    const isStaff = u.permisos?.isAdmin || u.rol === 'empleado' || u.rol === 'admin';
    return userSubTab === 'staff' ? isStaff : !isStaff;
  }) || [];

  const handleEdit = (p) => {
    admin.setFormData(p);
    admin.setCurrentId(p.id);
    admin.setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading || (user && !userData)) return null;

  if (!user || !userData?.permisos) {
    return (
      <div className="text-center p-20 flex flex-col items-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[32px] flex items-center justify-center mb-6">
          <Lock size={40}/>
        </div>
        <h2 className="font-black uppercase text-red-500 tracking-tighter text-2xl">Acceso Denegado</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 min-h-screen bg-gray-50">
      <ConfirmModal {...confirmConfig} onClose={() => setConfirmConfig(p => ({...p, isOpen: false}))} />

      <UserModal 
        isOpen={showUserModal} onClose={() => setShowUserModal(false)} 
        newUser={newUser} setNewUser={setNewUser} 
        onSubmit={async (e) => {
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
        }} 
      />

      <div className="flex gap-4 mb-12">
        {['productos', 'usuarios'].map(tab => (
          (tab !== 'usuarios' || userData.permisos.isAdmin) && (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-400 border'}`}>
              {tab}
            </button>
          )
        ))}
      </div>

      {activeTab === 'productos' ? (
        <>
          <AdminFilters {...admin} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
            <div className="lg:col-span-1">
              <ProductForm formData={admin.formData} setFormData={admin.setFormData} isEditing={admin.isEditing} />
            </div>
            <div className="lg:col-span-2">
              <ProductTable 
                products={admin.products} 
                onEdit={handleEdit} 
                onDelete={(id) => setConfirmConfig({ isOpen: true, title: '¿Eliminar?', message: 'Se borrará del catálogo.', type: 'danger', onConfirm: async () => {} })}
                onSort={(key) => admin.setSortConfig(p => ({ key, direction: p.key === key && p.direction === 'asc' ? 'desc' : 'asc' }))}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm w-fit">
            <button onClick={() => setUserSubTab('clientes')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${userSubTab === 'clientes' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'}`}>
              <UserCheck size={14}/> Clientes
            </button>
            <button onClick={() => setUserSubTab('staff')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${userSubTab === 'staff' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400'}`}>
              <Briefcase size={14}/> Staff
            </button>
          </div>

          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-8 flex justify-between items-center border-b">
                <div>
                  <h2 className="font-black uppercase text-xs tracking-widest text-slate-900">{userSubTab === 'staff' ? 'Gestión de Personal' : 'Base de Clientes'}</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mt-1">{filteredUsers.length} Usuarios</p>
                </div>
                {userSubTab === 'staff' && (
                  <button onClick={() => setShowUserModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md shadow-indigo-100">
                    Nuevo Staff
                  </button>
                )}
             </div>

             <UserTable 
               users={filteredUsers} 
               currentUser={user} 
               isStaffView={userSubTab === 'staff'}
               admin={admin}
               onUpdatePerms={async (id, p, v) => { 
                 await updateDoc(doc(db, "usuarios", id), {[`permisos.${p}`]: v}); 
                 admin.refreshUsers(); 
               }} 
             />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContainer;
