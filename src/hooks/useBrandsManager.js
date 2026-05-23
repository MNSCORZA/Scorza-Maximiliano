import { useState, useEffect } from 'react';
import { db } from '../fireBase/config';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';

export const useBrandsManager = () => {
  const [marcas, setMarcas] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [editandoNombre, setEditandoNombre] = useState('');
  const [loading, setLoading] = useState(false);

  const marcasRef = collection(db, 'marcas');

  const fetchMarcas = async () => {
    try {
      const querySnapshot = await getDocs(marcasRef);
      const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMarcas(lista);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || loading) return;
    setLoading(true);
    try {
      await addDoc(marcasRef, { nombre: nuevoNombre.trim() });
      setNuevoNombre('');
      await fetchMarcas();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrar = async (id) => {
    try {
      await deleteDoc(doc(db, 'marcas', id));
      await fetchMarcas();
    } catch (error) {
      console.error(error);
    }
  };

  const handleIniciarEdicion = (marca) => {
    setEditandoId(marca.id);
    setEditandoNombre(marca.nombre);
  };

  const handleGuardarEdicion = async (id) => {
    if (!editandoNombre.trim()) return;
    try {
      await updateDoc(doc(db, 'marcas', id), { nombre: editandoNombre.trim() });
      setEditandoId(null);
      await fetchMarcas();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    marcas,
    nuevoNombre,
    editandoId,
    editandoNombre,
    loading,
    setNuevoNombre,
    setEditandoId,
    setEditandoNombre,
    handleAgregar,
    handleBorrar,
    handleIniciarEdicion,
    handleGuardarEdicion
  };
};
