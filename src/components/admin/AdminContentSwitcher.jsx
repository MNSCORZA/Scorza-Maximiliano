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
  switch (activeTab) {
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
