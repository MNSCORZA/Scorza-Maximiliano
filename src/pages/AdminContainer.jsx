import React, { useState, useEffect } from 'react';
import * as ProductService from '../services/productService';
import { db, auth } from '../fireBase/config';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Trash2, Edit3, UserPlus, X, Lock, Mail, AlertTriangle, Info } from 'lucide-react';
import ProductForm from '../components/admin/ProductForm';
import UserTable from '../components/admin/UserTable';

const AdminSkeleton = () => (
  <div className="max-w-7xl mx-auto p-6 lg:p-12 min-h-screen bg-gray-50 animate-pulse">
    <div className="flex gap-4 mb-12"><div className="w-32 h-12 bg-gray-200 rounded-2xl"></div><div className="w-32 h-12 bg-gray-200 rounded-2xl"></div></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-1"><div className="bg-white p-8 rounded-[32px] h-[500px] border border-gray-100 shadow-sm"></div></div>
      <div className="lg:col-span-2"><div className="bg-white rounded-[32px] border border-gray-100 shadow-sm h-[600px]"></div></div>
    </div>
  </div>
);

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[40px] shadow-2xl overflow-hidden p-10 text-center border border-gray-100">
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 ${type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>{type === 'danger' ? <AlertTriangle size={40} /> : <Info size={40} />}</div>
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-2">{title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-8 uppercase tracking-widest px-4">{message}</p>
        <div className="flex flex-col gap-3">
          <button onClick={onConfirm} className={`w-full py-4 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg ${type === 'danger' ? 'bg-red-500 shadow-red-100 hover:bg-red-600' : 'bg-indigo-600 shadow-indigo-100 hover:bg-indigo-700'}`}>Confirmar</button>
          <button onClick={onClose} className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const AdminContainer = () => {
  const { user, userData, loading } = useAuth();
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('productos');
  const [showUserModal, setShowUserModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({ titulo: '', descripcion: '', precio: '', stock: '', categoria: '', imagenUrl: '', envioGratis: false });
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => {} });
  const [newUser, setNewUser] = useState({ nombre: '', email: '', password: '', permisos: { isAdmin: false, ver: true, editar: false, borrar: false } });

  useEffect(() => {
    if (!loading && userData?.permisos) {
      refreshProducts();
      if (userData.permisos.isAdmin) refreshUsers();
    }
  }, [userData, loading]);

  const refreshProducts = async () => {
    const data = await ProductService.getProducts();
    setProducts(data || []);
  };

  const refreshUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      setUsers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) { console.error(e); }
  };

  const openConfirm = (config) => setConfirmConfig({ ...config, isOpen: true });
  const closeConfirm = () => setConfirmConfig({ ...confirmConfig, isOpen: false });

  const handleUpdatePerms = async (uid, perm, value) => {
    await updateDoc(doc(db, "usuarios", uid), { [`permisos.${perm}`]: value });
    refreshUsers();
  };

  const handleResetPassword = async (email) => {
    openConfirm({
      title: "Restablecer",
      message: `¿Enviar correo de recuperación a ${email}?`,
      type: 'info',
      onConfirm: async () => {
        try { await sendPasswordResetEmail(auth, email); closeConfirm(); } catch (err) { alert(err.message); }
      }
    });
  };

  const handleDeleteUser = async (uid, email) => {
    if (uid === user.uid) return alert("No puedes borrar tu cuenta.");
    openConfirm({
      title: "Eliminar Usuario",
      message: `¿Eliminar a ${email}? Perderá el acceso al panel.`,
      type: 'danger',
      onConfirm: async () => {
        try { await deleteDoc(doc(db, "usuarios", uid)); refreshUsers(); closeConfirm(); } catch (err) { alert(err.message); }
      }
    });
  };

  const handleDeleteProduct = (pid) => {
    openConfirm({
      title: "¿Eliminar?",
      message: "Este producto desaparecerá del catálogo definitivamente.",
      type: 'danger',
      onConfirm: async () => { await ProductService.deleteProduct(pid); refreshProducts(); closeConfirm(); }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSave = { ...formData, precio: Number(formData.precio), stock: Number(formData.stock) };
    if (isEditing) await ProductService.updateProduct(currentId, dataToSave);
    else await ProductService.createProduct({ ...dataToSave, ventas: 0 });
    setFormData({ titulo: '', descripcion: '', precio: '', stock: '', categoria: '', imagenUrl: '', envioGratis: false });
    setIsEditing(false);
    refreshProducts();
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
      await setDoc(doc(db, "usuarios", cred.user.uid), { nombre: newUser.nombre, email: newUser.email, permisos: newUser.permisos });
      setShowUserModal(false);
      setNewUser({ nombre: '', email: '', password: '', permisos: { isAdmin: false, ver: true, editar: false, borrar: false } });
      refreshUsers();
    } catch (err) { alert(err.message); }
  };

  if (loading || (user && !userData)) return <AdminSkeleton />;

  const permisos = userData?.permisos;
  if (!user || (!permisos?.isAdmin && !permisos?.ver && !permisos?.editar && !permisos?.borrar)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <div className="bg-white p-12 rounded-[40px] shadow-2xl max-w-sm w-full border border-gray-100">
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6"><Lock size={40} className="text-red-500" /></div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-2">Acceso Denegado</h2>
          <button onClick={() => window.location.href = '/'} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest mt-6">Regresar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 min-h-screen font-sans bg-gray-50">
      <ConfirmModal {...confirmConfig} onClose={closeConfirm} />
      {showUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 bg-indigo-600 text-white flex justify-between items-center">
              <h3 className="font-black uppercase text-xs tracking-widest flex items-center gap-2"><UserPlus size={18}/> Nuevo Usuario</h3>
              <button onClick={() => setShowUserModal(false)}><X size={20}/></button>
            </div>
            <form onSubmit={handleCreateUser} className="p-8 space-y-4">
              <input type="text" placeholder="Nombre" className="w-full bg-gray-50 p-4 rounded-xl text-sm border outline-none" value={newUser.nombre} onChange={e => setNewUser({...newUser, nombre: e.target.value})} required />
              <input type="email" placeholder="Email" className="w-full bg-gray-50 p-4 rounded-xl text-sm border outline-none" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} required />
              <input type="password" placeholder="Contraseña" className="w-full bg-gray-50 p-4 rounded-xl text-sm border outline-none" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} required />
              <div className="bg-gray-50 p-5 rounded-2xl space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Permisos</p>
                <div className="grid grid-cols-2 gap-3">
                  {['isAdmin', 'editar', 'borrar'].map(p => (
                    <label key={p} className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                      <input type="checkbox" checked={newUser.permisos[p]} onChange={e => setNewUser({...newUser, permisos: {...newUser.permisos, [p]: e.target.checked}})} className="w-4 h-4 accent-indigo-600" /> {p}
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Crear Cuenta</button>
            </form>
          </div>
        </div>
      )}
      <div className="flex gap-4 mb-12">
        <button onClick={() => setActiveTab('productos')} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'productos' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-400 border'}`}>Productos</button>
        {permisos.isAdmin && <button onClick={() => setActiveTab('usuarios')} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'usuarios' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-gray-400 border'}`}>Usuarios</button>}
      </div>
      {activeTab === 'productos' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1"><ProductForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isEditing={isEditing} /></div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400">
                  <tr><th className="p-6">Producto</th><th className="p-6 hidden md:table-cell">Info</th><th className="p-6 text-center">Acciones</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="p-6 flex items-center gap-4">
                        <img src={p.imagenUrl} className="w-16 h-16 rounded-2xl object-cover bg-gray-50 shadow-sm border border-gray-100" alt="" />
                        <div><p className="font-bold text-gray-900 leading-tight mb-1">{p.titulo}</p><p className="text-xs text-indigo-600 font-black">${p.precio}</p></div>
                      </td>
                      <td className="p-6 hidden md:table-cell"><p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{p.categoria}</p><p className="text-xs font-bold text-gray-600">{p.stock} u.</p></td>
                      <td className="p-6"><div className="flex justify-center gap-3">
                        <button onClick={() => { setFormData(p); setCurrentId(p.id); setIsEditing(true); window.scrollTo({top:0, behavior:'smooth'}); }} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"><Edit3 size={18}/></button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18}/></button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center"><h2 className="text-lg font-black uppercase tracking-tighter">Personal</h2><button onClick={() => setShowUserModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Nuevo</button></div>
          <UserTable users={users} currentUser={user} onResetPass={handleResetPassword} onDelete={handleDeleteUser} onUpdatePerms={handleUpdatePerms} />
        </div>
      )}
    </div>
  );
};

export default AdminContainer;