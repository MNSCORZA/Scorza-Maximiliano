import React from 'react';
import { Mail, Trash2, Shield, User } from 'lucide-react';
import { db } from '../../fireBase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';

const UserTable = ({ users, currentUser, isStaffView, onUpdatePerms, admin, onResetPass }) => {
  
  const handleDelete = async (id, nombre) => {
    if (window.confirm(`¿Eliminar a ${nombre}?`)) {
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
    <div className="overflow-hidden">
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
                  <div className="flex justify-center gap-2">
                    <button onClick={() => onResetPass(u.email)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <Mail size={16} />
                    </button>
                    {u.id !== currentUser?.uid && (
                      <button onClick={() => handleDelete(u.id, u.nombre)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-gray-100">
        {users.map((u) => (
          <div key={u.id} className="p-6 bg-white space-y-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-black text-gray-900 uppercase tracking-tighter text-sm">{u.nombre}</p>
                  <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">{u.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onResetPass(u.email)} className="p-3 bg-gray-50 text-gray-400 rounded-xl active:bg-blue-600 active:text-white transition-all">
                  <Mail size={18} />
                </button>
                {u.id !== currentUser?.uid && (
                  <button onClick={() => handleDelete(u.id, u.nombre)} className="p-3 bg-gray-50 text-red-400 rounded-xl active:bg-red-600 active:text-white transition-all">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>

            {isStaffView && (
              <div className="bg-gray-50/50 rounded-2xl p-4">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Shield size={12}/> Permisos de acceso
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {['isAdmin', 'editar', 'borrar'].map((perm) => (
                    <button
                      key={perm}
                      onClick={() => onUpdatePerms(u.id, perm, !u.permisos?.[perm])}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                        u.permisos?.[perm] 
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                          : 'bg-white border-gray-100 text-gray-300'
                      }`}
                    >
                      <span className="text-[8px] font-black uppercase tracking-tighter">
                        {perm === 'isAdmin' ? 'Admin' : perm}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {users.length === 0 && (
        <div className="p-20 text-center text-gray-300 font-black uppercase text-[10px] tracking-[0.3em]">
          No hay usuarios para mostrar
        </div>
      )}
    </div>
  );
};

export default UserTable;
