import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { doc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../fireBase/config';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { saveLog } from '../fireBase/dataBase';

// Importaciones corregidas con destructuración según tus módulos reales
import ConfirmModal from '../components/admin/ConfirmModal';
import ProductsManager from '../components/admin/ProductsManager';
import OrdersManager from '../components/admin/OrdersManager';
import UsersManager from '../components/admin/UsersManager';
import { AdminBanners } from '../components/admin/AdminBanners';
import { AdminBrands } from '../components/admin/AdminBrands';
import { AdminAnalytics } from '../components/admin/AdminAnalytics';
import { AdminCoupons } from '../components/admin/AdminCoupons';
import AdminLogs from '../components/admin/AdminLogs';
import AbandonedCarts from '../components/admin/AbandonedCarts';

const AdminContainer = () => {
  const { user, userData, loading } = useAuth();
  const admin = useAdmin(user, userData, loading);
  const [activeTab, setActiveTab] = useState('productos');
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', type: 'danger', onConfirm: () => {} });

  const handleCustomFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let basePrice = Number(admin.formData.precio);
      const currentStock = Number(admin.formData.stock);
      const hasDiscount = admin.formData.tieneDescuento;
      const discountPercent = Number(admin.formData.porcentajeDescuento || 0);

      let finalPrice = basePrice;
      let previousPrice = null;

      if (hasDiscount && discountPercent > 0) {
        previousPrice = basePrice;
        finalPrice = basePrice - (basePrice * (discountPercent / 100));
      }

      const productData = {
        ...admin.formData, precio: finalPrice, precioAnterior: previousPrice,
        stock: currentStock, tieneDescuento: hasDiscount, porcentajeDescuento: hasDiscount ? discountPercent : 0
      };

      if (admin.isEditing && admin.currentId) {
        await updateDoc(doc(db, "productos", admin.currentId), productData);
        await saveLog(user.uid, user.email, userData?.nombre || 'Admin', 'Editar Producto', `Modificó el artículo: "${admin.formData.titulo}"`);
        toast.success('¡Cambios guardados!', { description: `"${admin.formData.titulo}" se actualizó.` });
      } else {
        productData.ventas = productData.ventas || 0;
        await addDoc(collection(db, "productos"), productData);
        await saveLog(user.uid, user.email, userData?.nombre || 'Admin', 'Crear Producto', `Publicó un nuevo artículo: "${productData.titulo}"`);
        toast.success('¡Producto publicado!', { description: `"${productData.titulo}" ya está en catálogo.` });
      }

      admin.setFormData({ titulo: "", descripcion: "", precio: "", stock: "", categoria: "", imagenUrl: "", envioGratis: false, tieneDescuento: false, porcentajeDescuento: "" });
      admin.setIsEditing(false);
      admin.setCurrentId(null);

      if (admin.refreshProducts) admin.refreshProducts();
    } catch (error) {
      console.error(error);
      toast.error('Hubo un error al guardar los cambios');
    }
  };

  const handleEdit = (p) => {
    admin.setFormData({
      ...p, precio: p.precioAnterior ? p.precioAnterior : p.precio,
      tieneDescuento: p.tieneDescuento || false, porcentajeDescuento: p.porcentajeDescuento || ""
    });
    admin.setCurrentId(p.id);
    admin.setIsEditing(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleDeleteProduct = (id) => {
    const targetProduct = admin.products.find(p => p.id === id);
    const productTitle = targetProduct ? targetProduct.titulo : id;

    setConfirmConfig({
      isOpen: true,
      title: '¿Eliminar?',
      message: 'Se borrará del catálogo.',
      type: 'danger',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, "productos", id));
          await saveLog(user.uid, user.email, userData?.nombre || 'Admin', 'Eliminar Producto', `Removió del catálogo: "${productTitle}"`);
          toast.success('Producto eliminado');
          setConfirmConfig(p => ({...p, isOpen: false}));
          if (admin.refreshProducts) admin.refreshProducts();
        } catch (error) {
          console.error(error);
          toast.error('Error al intentar eliminar');
        }
      }
    });
  };

  if (loading || (user && !userData)) return null;

  if (!user || !userData?.permisos) {
    return (
      <div className="text-center p-20 flex flex-col items-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-[32px] flex items-center justify-center mb-6"><Lock size={40}/></div>
        <h2 className="font-black uppercase text-red-500 tracking-tighter text-2xl">Acceso Denegado</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 min-h-screen bg-gray-50">
      <ConfirmModal {...confirmConfig} onClose={() => setConfirmConfig(p => ({...p, isOpen: false}))} />

      <div className="flex gap-4 mb-12 overflow-x-auto pb-4">
        {['productos', 'pedidos', 'usuarios', 'banners', 'marcas', 'métricas', 'cupones', 'carritos', 'historial'].map(tab => (
          (tab !== 'usuarios' && tab !== 'historial' || userData.permisos.isAdmin) && (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white text-gray-400 border border-slate-100'}`}>
              {tab}
            </button>
          )
        ))}
      </div>

      {activeTab === 'productos' && (
        <ProductsManager 
          admin={{ ...admin, handleSubmit: handleCustomFormSubmit }} 
          onEdit={handleEdit} 
          onDeleteCustom={handleDeleteProduct}
        />
      )}

      {activeTab === 'pedidos' && <OrdersManager />}
      {activeTab === 'usuarios' && <UsersManager admin={admin} currentUser={user} />}
      {activeTab === 'banners' && <AdminBanners />}
      {activeTab === 'marcas' && <AdminBrands />}
      {activeTab === 'métricas' && <AdminAnalytics />}
      {activeTab === 'cupones' && <AdminCoupons />}
      {activeTab === 'carritos' && <AbandonedCarts />}
      {activeTab === 'historial' && <AdminLogs />}
    </div>
  );
};

export default AdminContainer;
