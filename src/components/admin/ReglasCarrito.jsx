import React, { useState, useEffect } from 'react';
import { db } from '../../fireBase/config';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Sliders } from 'lucide-react';
import { toast } from 'sonner';
import ReglasCarritoCard from './ReglasCarritoCard';
import NuevaReglaForm from './NuevaReglaForm';

const ReglasCarrito = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleCreateRule = async (datos, resetFormulario) => {
    try {
      const nuevaRegla = {
        tipo: datos.tipo,
        activa: true,
        marcaTarget: datos.tipo === 'marca_segunda_unidad_descuento' ? datos.marcaTarget.trim() : null,
        porcentajeDescuento: datos.tipo === 'marca_segunda_unidad_descuento' ? Number(datos.porcentajeDescuento) : null,
        categoriaTarget: datos.tipo === 'envio_gratis_monto_y_categoria' ? datos.categoriaTarget.trim() : null,
        montoMinimo: datos.tipo === 'envio_gratis_monto_y_categoria' ? Number(datos.montoMinimo) : null
      };

      await addDoc(collection(db, "reglas_carrito"), nuevaRegla);
      toast.success("Regla creada correctamente");
      resetFormulario();
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

      <NuevaReglaForm onCreateRule={handleCreateRule} />

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
