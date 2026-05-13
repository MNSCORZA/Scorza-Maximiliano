import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../fireBase/config';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { Lock } from 'lucide-react';

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
  const [showUserModal, setShowUserModal] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => {} });
  const [newUser, setNewUser] = useState({ nombre: '', email: '', password: '', permisos: { isAdmin: false, ver: true, editar: false, borrar: false } });

  const handleEdit = (p) => {
    admin.setFormData(p);
    admin.setCurrentId(p.id);
    admin.setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="p-20 text-center font-black text-gray-300 uppercase">Cargando De Todo...</div>;

  if (!user || !userData?.permisos) return <div className="text-center p-20 font-black uppercase text-red-500"><Lock className="mx-auto mb-4"/> Acceso Denegado</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 min-h-screen bg-gray-50">
      <ConfirmModal {...confirmConfig} onClose={() => setConfirmConfig(p => ({...p, isOpen: false}))} />

      <UserModal 
        isOpen={showUserModal} onClose={() => setShowUserModal(false)} 
        newUser={newUser} setNewUser={setNewUser} 
        onSubmit={async (e) => {
          e.preventDefault();
          const cred = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
          await setDoc(doc(db, "usuarios", cred.user.uid), { nombre: newUser.nombre, email: newUser.email, permisos: newUser.permisos });
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
                onDelete={(id) => setConfirmConfig({ isOpen: true, title: '¿Eliminar?', message: 'Se borrará del catálogo.', type: 'danger', onConfirm: async () => { /* lógica delete */ } })}
                onSort={(key) => admin.setSortConfig(p => ({ key, direction: p.key === key && p.direction === 'asc' ? 'desc' : 'asc' }))}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
           <div className="p-8 flex justify-between items-center border-b">
              <h2 className="font-black uppercase text-xs tracking-widest">Gestión de Personal</h2>
              <button onClick={() => setShowUserModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase">Nuevo Usuario</button>
           </div>
           <UserTable users={admin.users} currentUser={user} onUpdatePerms={async (id, p, v) => { await updateDoc(doc(db, "usuarios", id), {[`permisos.${p}`]: v}); admin.refreshUsers(); }} />
        </div>
      )}
    </div>
  );
};

export default AdminContainer;
