import React, { useState, useEffect } from 'react';
import { db } from '../../fireBase/config';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { Plus, Trash2, Edit2, Check, X, ShieldAlert } from 'lucide-react';

export const AdminBrands = () => {
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
      console.error("Error al leer marcas:", error);
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
      console.error("Error al agregar marca:", error);
      alert("Error de Firebase: Revisá las Reglas de Seguridad en tu consola.");
    } finally {
      setLoading(false);
    }
  };

  const handleBorrar = async (id) => {
    try {
      await deleteDoc(doc(db, 'marcas', id));
      fetchMarcas();
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
      fetchMarcas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto font-sans bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-8 mt-4">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight">Control de Marcas</h2>
        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
          Gestioná las tarjetas estéticas del Home
        </p>
      </div>

      <form onSubmit={handleAgregar} className="flex flex-col gap-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Ej: OSRAM, BOSCH, X-28..."
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-indigo-500/30 tracking-wider text-gray-800"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-sm active:scale-98"
          disabled={loading}
        >
          <Plus size={14} /> {loading ? 'AGREGANDO...' : 'AGREGAR MARCA'}
        </button>
      </form>

      {marcas.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 bg-gray-50/50">
          <ShieldAlert size={20} className="text-gray-300" />
          <p className="text-[10px] font-black uppercase tracking-wider">No hay marcas online</p>
        </div>
      ) : (
        <div className="space-y-3">
          {marcas.map((marca) => (
            <div 
              key={marca.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-150 rounded-2xl gap-3 shadow-2xs"
            >
              <div className="flex-1">
                {editandoId === marca.id ? (
                  <input
                    type="text"
                    value={editandoNombre}
                    onChange={(e) => setEditandoNombre(e.target.value)}
                    className="bg-gray-50 border border-indigo-500/30 rounded-xl px-3 py-2 text-xs font-black uppercase outline-none w-full tracking-wider text-gray-800"
                  />
                ) : (
                  <span className="text-xs font-black uppercase tracking-wider text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg inline-block">
                    {marca.nombre}
                  </span>
                )}
              </div>
              
              <div className="flex justify-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                {editandoId === marca.id ? (
                  <>
                    <button
                      onClick={() => handleGuardarEdicion(marca.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors border border-green-200 cursor-pointer flex items-center justify-center gap-1 text-[10px] font-black uppercase"
                    >
                      <Check size={14} /> Guardar
                    </button>
                    <button
                      onClick={() => setEditandoId(null)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer flex items-center justify-center gap-1 text-[10px] font-black uppercase"
                    >
                      <X size={14} /> Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleIniciarEdicion(marca)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100 cursor-pointer flex items-center justify-center gap-1 text-[10px] font-black uppercase"
                    >
                      <Edit2 size={12} /> Editar
                    </button>
                    <button
                      onClick={() => handleBorrar(marca.id)}
                      className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100 cursor-pointer flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
