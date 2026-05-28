import { doc, updateDoc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../fireBase/config';
import { saveLog } from '../fireBase/dataBase';

export const TABS_CONFIG = [
  { id: 'productos', label: 'productos', permissionKey: 'productos' },
  { id: 'pedidos', label: 'pedidos', permissionKey: 'pedidos' },
  { id: 'usuarios', label: 'usuarios', permissionKey: 'isAdmin' },
  { id: 'banners', label: 'banners', permissionKey: 'banners' },
  { id: 'marcas', label: 'marcas', permissionKey: 'marcas' },
  { id: 'métricas', label: 'métricas', permissionKey: 'metricas' },
  { id: 'cupones', label: 'cupones', permissionKey: 'cupones' },
  { id: 'carritos', label: 'carritos', permissionKey: 'carritos' },
  { id: 'reglas', label: 'reglas', permissionKey: 'carritos' },
  { id: 'historial', label: 'historial', permissionKey: 'historial' },
  { id: 'respaldos', label: 'respaldos', permissionKey: 'isAdmin' }
];

export const hasTabPermission = (tabId, userData) => {
  if (!userData?.permisos) return false;
  if (userData.permisos.isAdmin) return true;
  if (tabId === 'productos') return true; 

  const config = TABS_CONFIG.find(t => t.id === tabId);
  return config ? !!userData.permisos[config.permissionKey] : false;
};

export const saveProductService = async (user, userData, adminData, isEditing, currentId) => {
  let basePrice = Number(adminData.precio);
  const currentStock = Number(adminData.stock);
  const hasDiscount = adminData.tieneDescuento;
  const discountPercent = Number(adminData.porcentajeDescuento || 0);

  let finalPrice = basePrice;
  let previousPrice = null;

  if (hasDiscount && discountPercent > 0) {
    previousPrice = basePrice;
    finalPrice = basePrice - (basePrice * (discountPercent / 100));
  }

  const productData = {
    ...adminData,
    precio: finalPrice,
    precioAnterior: previousPrice,
    stock: currentStock,
    tieneDescuento: hasDiscount,
    porcentajeDescuento: hasDiscount ? discountPercent : 0,
    marca: adminData.marca ? adminData.marca.trim() : ""
  };

  const adminName = userData?.nombre || 'Admin';

  if (isEditing && currentId) {
    await updateDoc(doc(db, "productos", currentId), productData);
    await saveLog(user.uid, user.email, adminName, 'Editar Producto', `Modificó el artículo: "${adminData.titulo}"`);
  } else {
    productData.ventas = productData.ventas || 0;
    await addDoc(collection(db, "productos"), productData);
    await saveLog(user.uid, user.email, adminName, 'Crear Producto', `Publicó un nuevo artículo: "${productData.titulo}"`);
  }
};

export const deleteProductService = async (user, userData, productId, productTitle) => {
  const adminName = userData?.nombre || 'Admin';
  await deleteDoc(doc(db, "productos", productId));
  await saveLog(user.uid, user.email, adminName, 'Eliminar Producto', `Removió del catálogo: "${productTitle}"`);
};
