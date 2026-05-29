import React, { useState } from 'react';
import CRMUserList from './CRMUserList';
import User360Panel from './User360Panel';
import { useCRMManager } from '../../hooks/useCRMManager';
import { Users, ShieldAlert } from 'lucide-react';

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
  handleDeleteProduct,
  handleUserRoleChange, 
  handleUserCreate
}) => {
  const crm = useCRMManager();
  const [subTab, setSubTab] = useState('crm'); 

  switch (activeTab) {
    
    case 'productos':
      return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/40">
            <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">Administración de Productos</h2>
          </div>
        </div>
      );

    case 'pedidos':
      return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/40">
            <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">Panel de Pedidos</h2>
            <p className="text-xs text-gray-400 font-bold uppercase mt-1">Monitoreo de ventas y estados de facturación.</p>
          </div>
        </div>
      );

    case 'usuarios':
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">Panel de Usuarios</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Control de accesos y perfiles de compra.</p>
          </div>

          <div className="flex gap-2 p-1.5 bg-gray-100/80 rounded-2xl w-fit">
            <button
              onClick={() => setSubTab('crm')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                subTab === 'crm' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Users size={14} />
              Fichas CRM 360°
            </button>
            <button
              onClick={() => setSubTab('permisos')}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                subTab === 'permisos' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <ShieldAlert size={14} />
              Alta y Permisos
            </button>
          </div>

          {subTab === 'crm' ? (
            <>
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
            </>
          ) : (
            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/40 space-y-6">
              <h3 className="text-sm font-black uppercase text-gray-800 tracking-wide">Asignación de Roles y Nuevos Operadores</h3>
              
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center text-xs font-bold text-gray-400 uppercase">
                Acá se despliega tu lógica nativa de alta, `handleUserCreate` y mapeo de privilegios/roles.
              </div>
            </div>
          )}
        </div>
      );

    default:
      return (
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/40 text-center">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
            Seleccioná una pestaña válida del menú superior.
          </p>
        </div>
      );
  }
};

export default AdminContentSwitcher;
