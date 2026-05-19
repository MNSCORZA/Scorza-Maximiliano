import React, { useState, useEffect } from 'react';
import { db } from '../../fireBase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Plus, Trash2, ShieldAlert, Ticket } from 'lucide-react';

export const AdminCoupons = () => {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [loading, setLoading] = useState(false);

  const cuponesRef = collection(db, 'cupones');

  const fetchCupones = async () => {
    try {
      const querySnapshot = await getDocs(cuponesRef);
      setCupones(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCupones();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!codigo.trim() || !porcentaje || loading) return;
    setLoading(true);
    try {
      await addDoc(cuponesRef, {
        codigo: codigo.trim().toUpperCase(),
        porcentaje: Number(porcentaje)
      });
      setCodigo('');
      setPorcentaje('');
      await fetchCupones();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrar = async (id) => {
    try {
      await deleteDoc(doc(db, 'cupones', id));
      await fetchCupones();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-sans bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-8 mt-4">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <Ticket size={20} className="text-indigo-600" /> Control de Cupones
        </h2>
        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
          Creá y gestioná códigos de descuento porcentuales para el checkout
        </p>
      </div>

      <form onSubmit={handleAgregar} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="EJ: CYBER20, PROMO50"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-gray-800"
          disabled={loading}
        />
        <input
          type="number"
          value={porcentaje}
          onChange={(e) => setPorcentaje(e.target.value)}
          placeholder="Porcentaje (Ej: 15)"
          min="1"
          max="100"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-gray-800"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm active:scale-98"
          disabled={loading}
        >
          <Plus size={14} /> {loading ? 'CREANDO...' : 'CREAR CUPÓN'}
        </button>
      </form>

      {cupones.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 bg-gray-50/50">
          <ShieldAlert size={20} className="text-gray-300" />
          <p className="text-[10px] font-black uppercase tracking-wider">No hay cupones activos</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cupones.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg inline-block">
                  {c.codigo}
                </span>
                <span className="text-xs font-black text-slate-700">
                  Beneficio: {c.porcentaje}% OFF
                </span>
              </div>
              <button
                onClick={() => handleBorrar(c.id)}
                className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100 cursor-pointer flex items-center justify-center"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
