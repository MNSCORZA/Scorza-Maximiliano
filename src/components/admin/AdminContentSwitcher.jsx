import React from 'react';
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
      return <UsersManager admin={admin} currentUser={user} />;
    case 'crm':
    case 'clientes crm 360':
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">Fichas CRM 360°</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Historial unificado de clientes y comportamiento de compra.</p>
          </div>
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
