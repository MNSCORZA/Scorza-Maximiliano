import React, { useState } from 'react';
import ProductsManager from './ProductsManager';
import OrdersManager from './OrdersManager';
import UsersManager from './UsersManager';
import { AdminBanners } from './AdminBanners';
import { AdminBrands } from './AdminBrands';
import AdminAnalytics from './AdminAnalytics';
import { AdminCoupons } from './AdminCoupons';
import AbandonedCarts from './AbandonedCarts';
import ReglasCarrito from './ReglasCarrito';
import AdminLogs from './AdminLogs';
import { AdminBackup } from './AdminBackup';
import CRMUserList from './CRMUserList';
import User360Panel from './User360Panel';
import { useCRMManager } from '../../hooks/useCRMManager';

const AdminContentSwitcher = ({ 
  activeTab, 
  admin, 
  user, 
  userData, 
  processedProducts, 
  stockFilter, 
  setStockFilter, 
  handleCustomFormSubmit, 
  handleEdit, 
  handleDeleteProduct 
}) => {
  const crm = useCRMManager();
  const [subTabUsuarios, setSubTabUsuarios] = useState('crm'); 
  const tabNormalizada = activeTab ? activeTab.toLowerCase().trim() : '';

  switch (tabNormalizada) {
    case 'productos':
      return (
        <ProductsManager 
          admin={{ 
            ...admin, 
            products: processedProducts,
            stockFilter,
            setStockFilter,
            handleSubmit: handleCustomFormSubmit 
          }} 
          onEdit={handleEdit} 
          onDeleteCustom={handleDeleteProduct}
        />
      );
    case 'pedidos': 
      return <OrdersManager />;
    case 'usuarios': 
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">Panel de Usuarios</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Control de accesos y perfiles de compra.</p>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl max-w-sm">
            <button
              onClick={() => setSubTabUsuarios('crm')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                subTabUsuarios === 'crm'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Fichas CRM 360°
            </button>
            <button
              onClick={() => setSubTabUsuarios('alta')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                subTabUsuarios === 'alta'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Alta y Permisos
            </button>
          </div>

          {subTabUsuarios === 'crm' ? (
            <div className="space-y-6 animate-fade-in">
              <CRMUserList 
                users={crm.users} 
                loading={crm.loading} 
                onOpenUser360={crm.handleOpenUser360} 
                getUserCRMDetails={crm.getUserCRMDetails} 
              />
              <User360Panel 
                isOpen={crm.selectedUser !== null} 
                onClose={crm.handleCloseUser360} 
                user={crm.selectedUser} 
                crmDetails={crm.selectedUser ? crm.getUserCRMDetails(crm.selectedUser.id) : { userOrders: [], ltv: 0 }} 
                notesValue={crm.crmNotes} 
                onNotesChange={crm.setCrmNotes} 
                onSaveNotes={crm.handleSaveNotes} 
                isSaving={crm.savingNotes} 
              />
            </div>
          ) : (
            <div className="animate-fade-in">
              <UsersManager admin={admin} currentUser={user} />
            </div>
          )}
        </div>
      );
    case 'banners': 
      return <AdminBanners />;
    case 'marcas': 
      return <AdminBrands />;
    case 'métricas': 
      return <AdminAnalytics />;
    case 'cupones': 
      return <AdminCoupons />;
    case 'carritos': 
      return <AbandonedCarts />;
    case 'reglas': 
      return <ReglasCarrito />;
    case 'historial': 
      return <AdminLogs />;
    case 'respaldos': 
      return <AdminBackup currentUser={user} userData={userData} />;
    default: 
      return null;
  }
};

export default React.memo(AdminContentSwitcher);
