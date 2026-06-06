import React, { useEffect, useState } from 'react';
import { getAvailableCouponsForUser } from '../../fireBase/dataBase';
import { useAuth } from '../../context/AuthContext';
import { Ticket, Copy, Check, ShieldAlert, DollarSign, Calendar } from 'lucide-react';

const UserCoupons = () => {
  const { user } = useAuth();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchUserCoupons = async () => {
      if (user?.uid) {
        const available = await getAvailableCouponsForUser(user.uid);
        setCoupons(available);
      }
      setLoading(false);
    };
    fetchUserCoupons();
  }, [user]);

  const handleCopy = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Buscando tus beneficios...</p>
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center gap-3 text-slate-400">
        <ShieldAlert size={24} className="text-slate-300" />
        <p className="text-[10px] font-black uppercase tracking-widest">No tenés cupones disponibles en este momento</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
      <div>
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-900">Mis Cupones y Beneficios</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Disponibles para aplicar en tu próxima compra</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {coupons.map((coupon) => (
          <div 
            key={coupon.id} 
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
              coupon.userId 
                ? 'bg-violet-50/40 border-violet-100 shadow-sm shadow-violet-50' 
                : 'bg-slate-50/50 border-slate-100'
            }`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl border select-all ${
                  coupon.userId 
                    ? 'bg-white text-violet-700 border-violet-200' 
                    : 'bg-white text-indigo-600 border-slate-200'
                }`}>
                  {coupon.codigo}
                </span>
                <span className={`text-xs font-black px-2.5 py-1.5 rounded-xl ${
                  coupon.userId ? 'bg-violet-600 text-white' : 'bg-slate-900 text-white'
                }`}>
                  {coupon.porcentaje}% OFF
                </span>
                {coupon.userId && (
                  <span className="text-[9px] font-black bg-violet-100 text-violet-700 px-2 py-1 rounded-lg uppercase tracking-wide">
                    Exclusivo Nota de Crédito
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 flex-wrap text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                {coupon.montoMinimo > 0 && (
                  <span className="flex items-center gap-0.5 text-amber-600 font-extrabold">
                    <DollarSign size={11}/> Mínimo: ${coupon.montoMinimo.toLocaleString('es-AR')}
                  </span>
                )}
                <span className="flex items-center gap-0.5">
                  <Calendar size={11}/> Vence: {coupon.fechaExpiracion ? new Date(coupon.fechaExpiracion + 'T00:00:00').toLocaleDateString('es-AR') : 'NUNCA'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(coupon.id, coupon.codigo)}
              className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer border outline-none ${
                copiedId === coupon.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100'
                  : coupon.userId
                    ? 'bg-white text-violet-700 border-violet-200 hover:bg-violet-50'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {copiedId === coupon.id ? (
                <>
                  <Check size={12} /> ¡Copiado!
                </>
              ) : (
                <>
                  <Copy size={12} /> Copiar Código
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCoupons;
