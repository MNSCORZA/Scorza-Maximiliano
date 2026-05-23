import { useState } from 'react';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../fireBase/config';
import { saveLog } from '../fireBase/dataBase';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export const useProductsManager = (admin, onEdit, onDeleteCustom) => {
  const { user, userData } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState(''); 
  const [bulkValue, setBulkValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEditIntercept = (product) => {
    onEdit(product);
    setIsFormOpen(true);
  };

  const handleToggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = (currentPageItems) => {
    const currentPageIds = currentPageItems.map(p => p.id);
    const allSelectedOnPage = currentPageIds.every(id => selectedIds.includes(id));

    if (allSelectedOnPage) {
      setSelectedIds(prev => prev.filter(id => !currentPageIds.includes(id)));
    } else {
      setSelectedIds(prev => {
        const structuralUnique = new Set([...prev, ...currentPageIds]);
        return Array.from(structuralUnique);
      });
    }
  };

  const handleBulkExecute = async () => {
    if (!bulkAction) return;
    if ((bulkAction === 'precio' || bulkAction === 'rebajar' || bulkAction === 'stock') && !bulkValue) {
      toast.error('Por favor, ingresá un valor para la modificación');
      return;
    }

    setIsProcessing(true);
    try {
      const batch = writeBatch(db);
      const affectedProducts = admin.products.filter(p => selectedIds.includes(p.id));
      let descriptionLog = '';

      if (bulkAction === 'precio') {
        const percentage = Number(bulkValue);
        affectedProducts.forEach(p => {
          const currentPrice = Number(p.precio);
          const incremental = currentPrice * (percentage / 100);
          const finalPrice = Math.round(currentPrice + incremental);
          const productRef = doc(db, "productos", p.id);
          batch.update(productRef, { 
            precio: finalPrice,
            precioAnterior: 0,
            tieneDescuento: false,
            porcentajeDescuento: 0
          });
        });
        descriptionLog = `Aumentó el precio un ${percentage}% de forma masiva a un bloque de ${selectedIds.length} productos.`;
      } 
      else if (bulkAction === 'rebajar') {
        const percentage = Number(bulkValue);
        if (percentage <= 0 || percentage >= 100) {
          toast.error('El porcentaje de descuento debe ser entre 1 y 99');
          setIsProcessing(false);
          return;
        }
        affectedProducts.forEach(p => {
          const basePrice = p.precioAnterior && Number(p.precioAnterior) > Number(p.precio) 
            ? Number(p.precioAnterior) 
            : Number(p.precio);
          const discountAmount = basePrice * (percentage / 100);
          const finalPrice = Math.round(basePrice - discountAmount);
          const productRef = doc(db, "productos", p.id);
          batch.update(productRef, { 
            precio: finalPrice,
            precioAnterior: basePrice,
            tieneDescuento: true,
            porcentajeDescuento: percentage
          });
        });
        descriptionLog = `Aplicó un descuento masivo del ${percentage}% OFF a un bloque de ${selectedIds.length} productos.`;
      }
      else if (bulkAction === 'stock') {
        const targetStock = Number(bulkValue);
        affectedProducts.forEach(p => {
          const productRef = doc(db, "productos", p.id);
          batch.update(productRef, { stock: targetStock });
        });
        descriptionLog = `Actualizó el stock a ${targetStock} unidades de forma masiva a un bloque de ${selectedIds.length} productos.`;
      } 
      else if (bulkAction === 'eliminar') {
        affectedProducts.forEach(p => {
          const productRef = doc(db, "productos", p.id);
          batch.delete(productRef);
        });
        descriptionLog = `Eliminó permanentemente del catálogo un bloque masivo de ${selectedIds.length} productos.`;
      }

      await batch.commit();
      await saveLog(user.uid, user.email, userData?.nombre || 'Admin Masivo', 'Acción Masiva', descriptionLog);

      toast.success('¡Acción masiva aplicada con éxito!');
      resetBulkSelection();
      if (admin.refreshProducts) await admin.refreshProducts();
    } catch (error) {
      console.error(error);
      toast.error('Hubo un inconveniente al procesar la actualización masiva');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetBulkSelection = () => {
    setSelectedIds([]);
    setBulkAction('');
    setBulkValue('');
  };

  const closeAndResetForm = () => {
    if (isFormOpen && admin.isEditing) {
      admin.setIsEditing(false);
      admin.setFormData({ 
        titulo: "", descripcion: "", precio: "", stock: "", 
        categoria: "", marca: "", imagenUrl: "", envioGratis: false, 
        tieneDescuento: false, porcentajeDescuento: "" 
      });
    }
    setIsFormOpen(!isFormOpen);
  };

  return {
    isFormOpen,
    selectedIds,
    bulkAction,
    bulkValue,
    isProcessing,
    setIsFormOpen,
    setBulkAction,
    setBulkValue,
    handleEditIntercept,
    handleToggleSelect,
    handleToggleSelectAll,
    handleBulkExecute,
    resetBulkSelection,
    closeAndResetForm
  };
};
