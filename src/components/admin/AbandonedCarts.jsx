import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { ShoppingBag, Clock, User, DollarSign } from 'lucide-react';

const AbandonedCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'carritos'), where('status', '==', 'activo'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.items && data.items.length > 0) {
          docs.push({ id: doc.id, ...data });
        }
      });
      setCarts(docs);
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const calculateCartTotal = (items) => {
    return items.reduce((acc, item) => acc + (Number(item.precio) * (item.cantidad || 1)), 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/40 text-slate-900">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl">
          <ShoppingBag size={20} />
        </div>
        <div>
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-800">Carritos Abandonados</h2>
          <p className="text-xs text-slate-400 font-medium">Usuarios registrados que no finalizaron la orden de pago</p>
        </div>
      </div>

      {carts.length === 0 ? (
        <p className="text-xs text-slate-400 py-12 text-center font-bold uppercase tracking-wider">No hay carritos abandonados registrados</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carts.map((cart) => {
            const total = calculateCartTotal(cart.items);
            const date = cart.updatedAt?.toDate();
            const timeString = date ? date.toLocaleString('es-AR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : '---';

            return (
              <div key={cart.id} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between gap-5">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <User size={13} className="text-indigo-500" />
                      <span className="text-[11px] font-black tracking-tight uppercase">ID: {cart.id.slice(0, 10)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9px] bg-white border border-slate-200/60 px-2 py-1 rounded-lg font-black text-slate-400 tracking-wider">
                      <Clock size={10} />
                      {timeString}
                    </div>
                  </div>

                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                    {cart.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-xl border border-slate-200/40 shadow-sm shadow-slate-100">
                        <span className="text-slate-600 font-bold truncate max-w-[150px]">{item.titulo}</span>
                        <span className="font-black text-indigo-600 text-[11px] bg-indigo-50 px-2 py-0.5 rounded-md">x{item.cantidad || 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-200/60">
                  <span className="text-[9px] uppercase font-black tracking-widest text-slate-400">Total retenido</span>
                  <div className="flex items-center font-black text-emerald-600 text-sm bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-100">
                    <DollarSign size={13} />
                    {total.toLocaleString('es-AR')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AbandonedCarts;
