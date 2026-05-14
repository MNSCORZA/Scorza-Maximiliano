import React from 'react';
import { User, Mail, Trash2, ShieldCheck } from 'lucide-react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../fireBase/config';
import { toast } from 'sonner';

const UserTable = ({ users, currentUser, isStaffView, onUpdatePerms, admin }) => {
  
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
    <div className="p-8 divide-y divide-slate-50">
      {users.map((u) => (
        <div key={u.id} className="py-8 first:pt-0 last:pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner">
                <User size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight">{u.nombre}</h4>
                  {u.rol && <span className="text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest bg-slate-100 text-slate-500">{u.rol}</span>}
                </div>
                <p className="text-slate-400 text-[11px] font-bold mt-0.5">{u.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center">
              <button className="p-3.5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                <Mail size={20} />
              </button>
              {u.id !== currentUser?.uid && (
                <button onClick={() => handleDelete(u.id, u.nombre)} className="p-3.5 bg-slate-50 text-red-400 rounded-2xl hover:bg-red-50 transition-all active:scale-90">
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          </div>

          {isStaffView && (
            <div className="mt-6 bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100/50">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
                <ShieldCheck size={14} className="text-indigo-600" /> Permisos
              </p>
              <div className="flex flex-wrap gap-3">
                {['isAdmin', 'ver', 'editar', 'borrar'].map((perm) => (
                  <button 
                    key={perm}
                    onClick={() => onUpdatePerms(u.id, perm, !u.permisos?.[perm])}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all ${u.permisos?.[perm] ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-300 border border-slate-100'}`}
                  >
                    {perm === 'isAdmin' ? 'ADMIN' : perm}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserTable;
