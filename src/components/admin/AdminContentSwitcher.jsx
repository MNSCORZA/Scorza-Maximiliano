import React from 'react';
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

  if (activeTab === 'usuarios') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">Gestión Integral de Clientes (CRM)</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Historial unificado, fichas 360 y notas de operadores.</p>
          </div>
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
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100">
      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
        Contenedor base para la pestaña activa: <span className="text-indigo-600 font-black">{activeTab}</span>
      </p>
    </div>
  );
};

export default AdminContentSwitcher;
