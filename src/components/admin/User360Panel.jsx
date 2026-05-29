import React from 'react';
import { X, User, Phone, Mail, MapPin, DollarSign, ShoppingBag, Heart, FileText, Save, Loader2 } from 'lucide-react';

const User360Panel = ({ isOpen, onClose, user, crmDetails, notesValue, onNotesChange, onSaveNotes, isSaving }) => {
  if (!isOpen || !user) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />
      
      <div className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg uppercase">
              {user.nombre ? user.nombre.charAt(0) : <User size={20} />}
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-base uppercase tracking-tight">{user.nombre || "Sin Nombre"} {user.apellido || ""}</h3>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{user.rol || "Cliente"}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 rounded-xl transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white flex justify-between items-center shadow-xl shadow-indigo-100">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Life Time Value (LTV)</p>
              <p className="text-3xl font-black tracking-tighter mt-1">
                ${Number(crmDetails.ltv).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <DollarSign size={28} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <User size={14} /> Información de Contacto Unificada
            </h4>
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-100">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gray-400 shrink-0" />
                <span className="font-bold text-gray-700 break-all">{user.email || "No registrado"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-gray-400 shrink-0" />
                <span className="font-bold text-gray-700">{user.codArea || ""} {user.telefono || "No registrado"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FileText size={16} className="text-gray-400 shrink-0" />
                <span className="font-bold text-gray-400">DNI: <span className="text-gray-700">{user.dni || "No informado"}</span></span>
              </div>
              <div className="flex items-start gap-3 text-sm pt-2 border-t border-gray-200/60">
                <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-gray-900 uppercase text-xs">{user.direccion || "Sin dirección cargada"}</p>
                  {(user.localidad || user.provincia) && (
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{user.localidad || ""}, {user.provincia || ""}</p>
                  )}
                  {user.cp && <p className="text-[10px] font-bold text-gray-400 mt-0.5">CP {user.cp}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <FileText size={14} /> Notas Internas de Operadores
            </h4>
            <div className="space-y-2">
              <textarea
                value={notesValue}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="Escribí observaciones importantes sobre este cliente (ej: Preferencias de entrega, reclamos previos, atención prioritaria)..."
                rows={4}
                className="w-full bg-amber-50/50 border-2 border-amber-100 rounded-2xl p-4 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-indigo-600/20 transition-all resize-none shadow-sm placeholder:text-gray-400"
              />
              <button
                onClick={onSaveNotes}
                disabled={isSaving}
                className="w-full bg-gray-900 hover:bg-indigo-600 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-wider disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Guardar Notas del Operador
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <ShoppingBag size={14} /> Historial de Órdenes ({crmDetails.userOrders.length})
            </h4>
            {crmDetails.userOrders.length === 0 ? (
              <p className="text-xs text-gray-400 font-bold italic bg-gray-50 p-4 rounded-xl text-center">Este cliente no registra compras aún.</p>
            ) : (
              <div className="space-y-3">
                {crmDetails.userOrders.map((order) => (
                  <div key={order.id} className="border border-gray-100 rounded-2xl p-4 bg-white flex flex-col gap-2 shadow-sm hover:border-gray-200 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-black text-indigo-600">{order.id}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${order.status === 'entregada' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end pt-1 border-t border-gray-50">
                      <div className="text-[11px] text-gray-500 font-bold uppercase">
                        {order.items?.length || 0} {order.items?.length === 1 ? 'Producto' : 'Productos'}
                      </div>
                      <span className="font-black text-gray-900 text-sm">
                        ${Number(order.total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Heart size={14} /> Productos Favoritos ({user.favoritos?.length || 0})
            </h4>
            {!user.favoritos || user.favoritos.length === 0 ? (
              <p className="text-xs text-gray-400 font-bold italic bg-gray-50 p-4 rounded-xl text-center">Sin favoritos.</p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {user.favoritos.map((fav, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3 border border-gray-100">
                    {(fav.imagenUrl || fav.img) && (
                      <img src={fav.imagenUrl || fav.img} alt={fav.titulo} className="w-10 h-10 rounded-lg object-cover bg-white border border-gray-100 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-black text-gray-800 uppercase truncate leading-tight">{fav.titulo}</p>
                      <p className="text-[10px] font-bold text-indigo-600 mt-0.5">${Number(fav.precio).toLocaleString('es-AR')}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User360Panel;
