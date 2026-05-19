import React, { useState } from 'react';
import { X, UserPlus, Shield, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const UserModal = ({ isOpen, onClose, newUser, setNewUser, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(e);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 transition-all">
        <div className="p-8 bg-indigo-600 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <UserPlus size={22} />
            <h3 className="font-black uppercase text-xs tracking-widest">Nuevo Personal</h3>
          </div>
          <button 
            disabled={isSubmitting}
            onClick={onClose} 
            className="p-2 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-30"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-8 md:p-10 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text" placeholder="NOMBRE COMPLETO" required
                disabled={isSubmitting}
                className="w-full bg-gray-50 border border-transparent py-4 pl-12 pr-6 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-indigo-500/20 transition-all disabled:opacity-50"
                value={newUser.nombre}
                onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="email" placeholder="EMAIL" required
                disabled={isSubmitting}
                className="w-full bg-gray-50 border border-transparent py-4 pl-12 pr-6 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-indigo-500/20 transition-all disabled:opacity-50"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="CONTRASEÑA" 
                required
                disabled={isSubmitting}
                className="w-full bg-gray-50 border border-transparent py-4 pl-12 pr-12 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-indigo-500/20 transition-all disabled:opacity-50"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              />
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="bg-indigo-50/40 p-5 rounded-[32px] border border-indigo-50/20 space-y-4">
            <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
              <Shield size={13} /> Permisos Iniciales
            </p>
            <div className="grid grid-cols-3 gap-2">
              {['isAdmin', 'editar', 'borrar'].map((perm) => {
                const isChecked = newUser.permisos?.[perm] || false;
                return (
                  <button
                    key={perm} 
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setNewUser({
                      ...newUser, 
                      permisos: { ...newUser.permisos, [perm]: !isChecked }
                    })}
                    className={`py-3 px-2 rounded-xl text-[8px] font-black uppercase tracking-wider transition-all border ${
                      isChecked 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                    }`}
                  >
                    {perm === 'isAdmin' ? 'Admin' : perm}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4.5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all flex items-center justify-center gap-2 enabled:hover:bg-indigo-700 enabled:active:scale-[0.98] disabled:opacity-60"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Crear Usuario'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
