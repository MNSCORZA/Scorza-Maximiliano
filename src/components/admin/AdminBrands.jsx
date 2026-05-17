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
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMarcas();
  }, []);

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;
    setLoading(true);
    try {
      await addDoc(marcasRef, { nombre: nuevoNombre.trim() });
      setNuevoNombre('');
      fetchMarcas();
    } catch (error) {
      console.error(error);
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
    <div className="p-6 max-w-4xl mx-auto font-sans bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
      <div className="mb-8">
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Control de Tarjetas de Marcas</h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Agregá, modificá o eliminá las marcas que se muestran en el Home</p>
      </div>

      <form onSubmit={handleAgregar} className="flex gap-3 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-200">
        <input
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="EJ: OSRAM, BOSCH, X-28..."
          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-black uppercase outline-none focus:border-blue-600/30 tracking-wider"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
          disabled={loading}
        >
          <Plus size={16} /> {loading ? 'AGREGANDO...' : 'AGREGAR MARCA'}
        </button>
      </form>

      {marcas.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400">
          <ShieldAlert size={24} />
          <p className="text-xs font-black uppercase tracking-wider">No hay marcas cargadas en la base de datos</p>
        </div>
      ) : (
        <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre de la Marca</th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {marcas.map((marca) => (
                <tr key={marca.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    {editandoId === marca.id ? (
                      <input
                        type="text"
                        value={editandoNombre}
                        onChange={(e) => setEditandoNombre(e.target.value)}
                        className="bg-white border border-blue-500/30 rounded-lg px-3 py-1.5 text-xs font-black uppercase outline-none w-full max-w-sm tracking-wider text-gray-800"
                      />
                    ) : (
                      <span className="text-xs font-black uppercase tracking-wider text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
                        {marca.nombre}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {editandoId === marca.id ? (
                        <>
                          <button
                            onClick={() => handleGuardarEdicion(marca.id)}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors border border-green-200 cursor-pointer"
                          >
                            <Check size={14} />
                          </button>
                          <button
                            onClick={() => setEditandoId(null)}
                            className="p-2 bg-gray-50 text-gray-500 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleIniciarEdicion(marca)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100 cursor-pointer"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleBorrar(marca.id)}
                            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-100 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
