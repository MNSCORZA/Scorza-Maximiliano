import React from 'react';
import { Trash2, Shield, User } from 'lucide-react';
import { db } from '../../fireBase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';

const UserTable = ({ users, currentUser, isStaffView, onUpdatePerms, admin }) => {

  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar a ${nombre}?`)) {
      try {
        await deleteDoc(doc(db, "usuarios", id));
        toast.success("Usuario eliminado");
        if (admin?.refreshUsers) admin.refreshUsers();
      } catch (error) {
        toast.error("Error al eliminar");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400">
            <tr>
              <th className="p-6">Usuario</th>
              {isStaffView && <th className="p-6">Permisos</th>}
              <th className="p-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50/30 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <User size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 leading-tight truncate">{u.nombre}</p>
                      <p className="text-[10px] font-medium text-gray-400 truncate">{u.email}</p>
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
                            className="w-4 h-4 rounded border-gray-200 text-indigo-600 focus:ring-0"
                          />
                          <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-indigo-600">
                            {perm === 'isAdmin' ? 'Admin' : perm}
                          </span>
                        </label>
                      ))}
                    </div>
                  </td>
                )}
                <td className="p-6 text-right">
                  {u.id !== currentUser?.uid && (
                    <button onClick={() => handleDelete(u.id, u.nombre)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100">
        {users.map((u) => (
          <div key={u.id} className="p-5 bg-white space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                  <User size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-black text-gray-900 text-xs uppercase truncate">{u.nombre}</p>
                  <p className="text-[10px] font-bold text-gray-400 truncate">{u.email}</p>
                </div>
              </div>
              {u.id !== currentUser?.uid && (
                <button onClick={() => handleDelete(u.id, u.nombre)} className="p-2.5 bg-red-50 text-red-500 rounded-xl shrink-0 active:bg-red-500 active:text-white">
                  <Trash2 size={18} />
                </button>
              )}
            </div>

            {isStaffView && (
              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                <p className="text-[9px] font-black text-gray-300 uppercase mb-3 flex items-center gap-2">
                  <Shield size={12}/> Permisos
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {['isAdmin', 'editar', 'borrar'].map((perm) => (
                    <button
                      key={perm}
                      onClick={() => onUpdatePerms(u.id, perm, !u.permisos?.[perm])}
                      className={`py-2.5 rounded-lg text-[9px] font-black uppercase transition-all ${
                        u.permisos?.[perm] ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white border border-gray-100 text-gray-300'
                      }`}
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
