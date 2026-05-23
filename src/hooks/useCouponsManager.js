import { useState, useEffect } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';

export const useCouponsManager = () => {
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
        porcentaje: Number(porcentaje),
        montoMinimo: montoMinimo ? Number(montoMinimo) : 0,
        fechaExpiracion: fechaExpiracion || null,
        limiteUsos: limiteUsos ? Number(limiteUsos) : null,
        usosActuales: 0
      });
      setCodigo('');
      setPorcentaje('');
      setMontoMinimo('');
      setFechaExpiracion('');
      setLimiteUsos('');
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

  return {
    cupones,
    codigo,
    porcentaje,
    montoMinimo,
    fechaExpiracion,
    limiteUsos,
    loading,
    setCodigo,
    setPorcentaje,
    setMontoMinimo,
    setFechaExpiracion,
    setLimiteUsos,
    handleAgregar,
    handleBorrar
  };
};
