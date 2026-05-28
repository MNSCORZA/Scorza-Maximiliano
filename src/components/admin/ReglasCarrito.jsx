import React, { useState, useEffect } from 'react';
import { db } from '../../fireBase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Sliders, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ReglasCarritoCard from './ReglasCarritoCard';

const ReglasCarrito = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState('marca_segunda_unidad_descuento');
  const [marcaTarget, setMarcaTarget] = useState('');
  const [categoriaTarget, setCategoriaTarget] = useState('');
  const [porcentajeDescuento, setPorcentajeDescuento] = useState('');
  const [montoMinimo, setMontoMinimo] = useState('');

  const fetchRules = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "reglas_carrito"));
      const rulesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRules(rulesList);
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron cargar las reglas del carrito");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      const nuevaRegla = {
        tipo,
        activa: true,
        marcaTarget: tipo === 'marca_segunda_unidad_descuento' ? marcaTarget.trim() : null,
        porcentajeDescuento: tipo === 'marca_segunda_unidad_descuento' ? Number(porcentajeDescuento) : null,
        categoriaTarget: tipo === 'envio_gratis_monto_y_categoria' ? categoriaTarget.trim() : null,
        montoMinimo: tipo === 'envio_gratis_monto_y_categoria' ? Number(montoMinimo) : null
      };

      await addDoc(collection(db, "reglas_carrito"), nuevaRegla);
      toast.success("Regla creada correctamente");
      setMarcaTarget('');
      setCategoriaTarget('');
      setPorcentajeDescuento('');
      setMontoMinimo('');
      fetchRules();
    } catch (error) {
      console.error(error);
      toast.error("No se pudo crear la regla");
    }
  };

  const handleDeleteRule = async (ruleId) => {
    try {
      await deleteDoc(doc(db, "reglas_carrito", ruleId));
      toast.success("Regla eliminada correctamente");
      setRules(rules.filter(rule => rule.id !== ruleId));
    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar la regla");
    }
  };

  const handleToggleRule = async (ruleId, currentStatus) => {
    try {
      await updateDoc(doc(db, "reglas_carrito", ruleId), { activa: !currentStatus });
      toast.success("Estado de la regla actualizado");
      setRules(rules.map(rule => rule.id === ruleId ? { ...rule, activa: !currentStatus } : rule));
    } catch (error) {
      console.error(error);
      toast.error("No se pudo actualizar la regla");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Sliders size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Reglas del Carrito</h2>
            <p className="text-xs text-slate-400 font-medium">Configurá promociones automáticas y envíos gratis.</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-4">Nueva Regla Automática</h3>
        <form onSubmit={handleCreateRule} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Tipo de Regla</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
            >
              <option value="marca_segunda_unidad_descuento">Descuento en 2da Unidad por Marca</option>
              <option value="envio_gratis_monto_y_categoria">Envío Gratis por Monto Mínimo y Categoría</option>
            </select>
          </div>

          {tipo === 'marca_segunda_unidad_descuento' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Marca Target</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Osram"
                  value={marcaTarget}
                  onChange={(e) => setMarcaTarget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">% Descuento en 2da Unidad</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="100"
                  placeholder="Ej: 50"
                  value={porcentajeDescuento}
                  onChange={(e) => setPorcentajeDescuento(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Categoría Target</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Iluminación"
                  value={categoriaTarget}
                  onChange={(e) => setCategoriaTarget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Monto Mínimo ($)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Ej: 15000"
                  value={montoMinimo}
                  onChange={(e) => setMontoMinimo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Crear Regla</span>
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">Reglas Activas e Historial</h3>
        
        {rules.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">No hay reglas programadas actualmente</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rules.map((rule) => (
              <ReglasCarritoCard
                key={rule.id}
                rule={rule}
                onToggle={handleToggleRule}
                onDelete={handleDeleteRule}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReglasCarrito;
