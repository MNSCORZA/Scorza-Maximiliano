import React, { useState, useEffect } from 'react';
import { db } from '../../fireBase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ShieldAlert, Ticket } from 'lucide-react';
import { toast } from 'sonner';
import { CouponForm } from './CouponForm';
import { CouponCard } from './CouponCard';

export const AdminCoupons = () => {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [porcentaje, setPorcentaje] = useState('');
  const [montoMinimo, setMontoMinimo] = useState('');
  const [fechaExpiracion, setFechaExpiracion] = useState('');
  const [limiteUsos, setLimiteUsos] = useState('');
  const [loading, setLoading] = useState(false);

  const cuponesRef = collection(db, 'cupones');

  const fetchCupones = async () => {
    try {
      const querySnapshot = await getDocs(cuponesRef);
      setCupones(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar los cupones");
    }
  };

  useEffect(() => { fetchCupones(); }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!codigo.trim() || !porcentaje || loading) return;
    setLoading(true);
    try {
      await addDoc(cuponesRef, {
        codigo: codigo.trim().toUpperCase(),
        porcentaje: Number(porcentaje),
        montoMinimo: montoMinimo ? Number(montoMinimo) : 0,
        fechaExpiracion: fechaExpiracion || null,
        limiteUsos: limiteUsos ? Number(limiteUsos) : null,
        usosActuales: 0
      });
      setCodigo(''); setPorcentaje(''); setMontoMinimo(''); setFechaExpiracion(''); setLimiteUsos('');
      toast.success("Cupón configurado exitosamente");
      await fetchCupones();
    } catch (error) {
      console.error(error);
      toast.error("Error al crear el cupón");
    } finally {
      setLoading(false);
    }
  };

  const handleBorrar = async (id) => {
    try {
      await deleteDoc(doc(db, 'cupones', id));
      toast.success("Cupón eliminado");
      await fetchCupones();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar el cupón");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-sans bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-8 mt-4">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <Ticket size={20} className="text-indigo-600" /> Control de Cupones Avanzado
        </h2>
        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
          Configurá beneficios con expiración automática y límites comerciales
        </p>
      </div>

      <CouponForm
        onSubmit={handleAgregar}
        codigo={codigo} setCodigo={setCodigo}
        porcentaje={porcentaje} setPorcentaje={setPorcentaje}
        montoMinimo={montoMinimo} setMontoMinimo={setMontoMinimo}
        fechaExpiracion={fechaExpiracion} setFechaExpiracion={setFechaExpiracion}
        limiteUsos={limiteUsos} setLimiteUsos={setLimiteUsos}
        loading={loading}
      />

      {cupones.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 bg-gray-50/50">
          <ShieldAlert size={20} className="text-gray-300" />
          <p className="text-[10px] font-black uppercase tracking-wider">No hay cupones activos</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cupones.map((c) => (
            <CouponCard key={c.id} coupon={c} onBorrar={handleBorrar} />
          ))}
        </div>
      )}
    </div>
  );
};
