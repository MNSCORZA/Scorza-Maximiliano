import React from 'react';
import { X, UserPlus, Shield } from 'lucide-react';

const UserModal = ({ isOpen, onClose, newUser, setNewUser, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <UserPlus size={24} />
            <h3 className="font-black uppercase text-sm tracking-widest">Nuevo Usuario</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-10 space-y-6">
          <div className="space-y-4">
            <input 
              type="text" placeholder="NOMBRE COMPLETO" required
              className="w-full bg-gray-50 border-none py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              value={newUser.nombre}
              onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
            />
            <input 
              type="email" placeholder="EMAIL" required
              className="w-full bg-gray-50 border-none py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            />
            <input 
              type="password" placeholder="CONTRASEÑA" required
              className="w-full bg-gray-50 border-none py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            />
          </div>

          <div className="bg-indigo-50/50 p-6 rounded-[32px] space-y-4">
            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
              <Shield size={14} /> Permisos Iniciales
            </p>
            <div className="grid grid-cols-2 gap-3">
              {['isAdmin', 'editar', 'borrar'].map((perm) => (
                <button
                  key={perm} type="button"
                  onClick={() => setNewUser({...newUser, permisos: {...newUser.permisos, [perm]: !newUser.permisos[perm]}})}
                  className={`py-3 px-4 rounded-xl text-[8px] font-black uppercase tracking-tighter border transition-all ${newUser.permisos[perm] ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-400'}`}
                >
                  {perm === 'isAdmin' ? 'Administrador' : perm}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:scale-[1.02] active:scale-95 transition-all">
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
