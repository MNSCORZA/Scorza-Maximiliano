import React from 'react';
import { Trash2, Shield, User } from 'lucide-react';
import { db } from '../../fireBase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';

const UserTable = ({ users, currentUser, isStaffView, onUpdatePerms, admin }) => {
  
  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar a ${nombre}? Esta acción es irreversible.`)) {
      try {
        await deleteDoc(doc(db, "usuarios", id));
        toast.success("Usuario eliminado correctamente");
        if (admin?.refreshUsers) admin.refreshUsers();
      } catch (error) {
        toast.error("Error al eliminar el usuario");
      }
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Vista Escritorio */}
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400">
            <tr>
              <th className="p-6">Usuario</th>
              {isStaffView && <th className="p-6">Permisos</th>}
              <th className="p-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 leading-tight">{u.nombre}</p>
                      <p className="text-[10px] font-medium text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                {isStaffView && (
                  <td className="p-6">
                    <div className="flex gap-4">
                      {['isAdmin', 'editar', 'borrar'].map((perm) => (
                        <label key={perm} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={u.permisos?.[perm] || false}
                            onChange={(e) => onUpdatePerms(u.id, perm, e.target.checked)}
                            className="w-5 h-5 rounded-lg border-gray-200 text-indigo-600 focus:ring-0 transition-all cursor-pointer"
                          />
                          <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-indigo-600 transition-colors">
                            {perm.replace('isAdmin', 'Admin')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </td>
                )}
                <td className="p-6">
                  <div className="flex justify-center">
                    {u.id !== currentUser?.uid && (
                      <button 
                        onClick={() => handleDelete(u.id, u.nombre)} 
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm text-[10px] font-black uppercase tracking-widest"
                      >
                        <Trash2 size={14} /> Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vista Móvil */}
      <div className="md:hidden divide-y divide-gray-100">
        {users.map((u) => (
          <div key={u.id} className="p-6 bg-white space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <User size={20} />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-xs">{u.nombre}</p>
                  <p className="text-[10px] text-gray-400">{u.email}</p>
                </div>
              </div>
              {u.id !== currentUser?.uid && (
                <button onClick={() => handleDelete(u.id, u.nombre)} className="p-3 bg-red-50 text-red-500 rounded-xl">
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {isStaffView && (
              <div className="bg-gray-50/50 rounded-2xl p-4">
                <p className="text-[9px] font-black text-gray-300 uppercase mb-3 flex items-center gap-2">
                  <Shield size={12}/> Permisos
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {['isAdmin', 'editar', 'borrar'].map((perm) => (
                    <button
                      key={perm}
                      onClick={() => onUpdatePerms(u.id, perm, !u.permisos?.[perm])}
                      className={`p-2 rounded-lg text-[9px] font-black uppercase ${u.permisos?.[perm] ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-300'}`}
                    >
                      {perm === 'isAdmin' ? 'Admin' : perm}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTable;
