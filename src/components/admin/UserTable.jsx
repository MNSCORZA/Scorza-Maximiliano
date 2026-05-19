import React, { useState } from 'react';
import { Trash2, Shield, User } from 'lucide-react';
import { db } from '../../fireBase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';

const UserTable = ({ users, currentUser, isStaffView, onUpdatePerms, admin }) => {
  const [actionId, setActionId] = useState(null);

  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar a ${nombre}?`)) {
      setActionId(id);
      try {
        await deleteDoc(doc(db, "usuarios", id));
        toast.success("Usuario eliminado correctamente");
        if (admin?.refreshUsers) admin.refreshUsers();
      } catch (error) {
        toast.error("Error al eliminar el usuario");
      } finally {
        setActionId(null);
      }
    }
  };

  const handleTogglePerm = async (id, perm, currentVal) => {
    setActionId(id);
    try {
      await onUpdatePerms(id, perm, !currentVal);
    } catch (error) {
      toast.error("No se pudo actualizar el permiso");
    } finally {
      setActionId(null);
    }
  };

  if (users.length === 0) {
    return (
      <div className="p-16 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
        No se encontraron usuarios en esta sección
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/40 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-100">
            <tr>
              <th className="px-8 py-5">Usuario</th>
              {isStaffView && <th className="px-8 py-5">Permisos de Acceso</th>}
              <th className="px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => {
              const isMe = u.id === currentUser?.uid;
              const isUpdating = actionId === u.id;

              return (
                <tr key={u.id} className={`transition-colors ${isUpdating ? 'bg-gray-50/50 opacity-60 pointer-events-none' : 'hover:bg-gray-50/30'}`}>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isMe ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <User size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-xs text-gray-900 tracking-tight">{u.nombre}</p>
                          {isMe && (
                            <span className="bg-indigo-50 text-indigo-600 font-black text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-md">
                              Tú
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5 select-all">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  
                  {isStaffView && (
                    <td className="px-8 py-6">
                      <div className="flex gap-4">
                        {['isAdmin', 'editar', 'borrar'].map((perm) => {
                          const hasPerm = u.permisos?.[perm] || false;
                          return (
                            <label key={perm} className={`flex items-center gap-2 cursor-pointer group ${isMe ? 'opacity-50 pointer-events-none' : ''}`}>
                              <input
                                type="checkbox"
                                checked={hasPerm}
                                disabled={isMe || isUpdating}
                                onChange={() => handleTogglePerm(u.id, perm, hasPerm)}
                                className="w-4 h-4 rounded border-gray-200 text-indigo-600 focus:ring-0 cursor-pointer"
                              />
                              <span className={`text-[9px] font-black uppercase transition-colors ${hasPerm ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-700'}`}>
                                {perm === 'isAdmin' ? 'Admin' : perm}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </td>
                  )}
                  
                  <td className="px-8 py-6 text-right">
                    {!isMe && (
                      <button 
                        disabled={isUpdating}
                        onClick={() => handleDelete(u.id, u.nombre)} 
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100">
        {users.map((u) => {
          const isMe = u.id === currentUser?.uid;
          const isUpdating = actionId === u.id;

          return (
            <div key={u.id} className={`p-5 bg-white space-y-4 transition-opacity ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isMe ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500'}`}>
                    <User size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-gray-900 text-xs uppercase truncate tracking-tight">{u.nombre}</p>
                      {isMe && (
                        <span className="bg-indigo-50 text-indigo-600 font-black text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-md">
                          Tú
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 truncate mt-0.5 select-all">{u.email}</p>
                  </div>
                </div>
                {!isMe && (
                  <button 
                    disabled={isUpdating}
                    onClick={() => handleDelete(u.id, u.nombre)} 
                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl shrink-0 transition-all active:scale-95"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {isStaffView && (
                <div className="bg-gray-50/60 rounded-2xl p-4 border border-gray-100/70">
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-3 flex items-center gap-2 tracking-wider">
                    <Shield size={12}/> Permisos de Rol
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {['isAdmin', 'editar', 'borrar'].map((perm) => {
                      const hasPerm = u.permisos?.[perm] || false;
                      return (
                        <button
                          key={perm}
                          disabled={isMe || isUpdating}
                          onClick={() => handleTogglePerm(u.id, perm, hasPerm)}
                          className={`py-2.5 rounded-xl text-[9px] font-black uppercase transition-all tracking-wider ${
                            hasPerm 
                              ? 'bg-indigo-600 text-white shadow-sm' 
                              : 'bg-white border border-gray-100 text-gray-400'
                          } ${isMe ? 'opacity-40' : ''}`}
                        >
                          {perm === 'isAdmin' ? 'Admin' : perm}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserTable;
