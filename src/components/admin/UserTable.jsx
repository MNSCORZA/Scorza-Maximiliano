import React from 'react';
import { Mail, Trash2 } from 'lucide-react';

const UserTable = ({ users = [], currentUser, onResetPass, onDelete, onUpdatePerms }) => (
  <table className="w-full text-left">
    <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
      <tr><th className="p-6">Usuario</th><th className="p-6 text-center">Permisos</th><th className="p-6 text-center">Acciones</th></tr>
    </thead>
    <tbody className="divide-y divide-gray-50">
      {users && users.length > 0 ? (
        users.map(u => (
          <tr key={u.id} className="hover:bg-gray-50/20 transition-all">
            <td className="p-6"><p className="font-bold text-gray-900">{u.nombre || 'Sin nombre'}</p><p className="text-xs text-gray-400">{u.email}</p></td>
            <td className="p-6"><div className="flex justify-center gap-4">
              {['isAdmin', 'editar', 'borrar'].map(perm => (
                <input key={perm} type="checkbox" checked={u.permisos?.[perm] || false} onChange={e => onUpdatePerms(u.id, perm, e.target.checked)} className="w-5 h-5 accent-indigo-600" />
              ))}
            </div></td>
            <td className="p-6"><div className="flex justify-center gap-2">
              <button onClick={() => onResetPass(u.email)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Mail size={18} /></button>
              <button onClick={() => onDelete(u.id, u.email)} className={`p-3 rounded-xl transition-all shadow-sm ${u.id === currentUser?.uid ? 'bg-gray-50 text-gray-300 cursor-not-allowed' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`} disabled={u.id === currentUser?.uid}><Trash2 size={18} /></button>
            </div></td>
          </tr>
        ))
      ) : (
        <tr><td colSpan="3" className="p-10 text-center text-gray-400 text-[10px] uppercase font-black tracking-widest">Cargando personal...</td></tr>
      )}
    </tbody>
  </table>
);

export default UserTable;