import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../fireBase/config';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';

export const Arrepentimiento = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    nroOrden: '',
    motivo: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email || !formData.nroOrden) {
      toast.error('Por favor, completa los campos obligatorios.');
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, 'arrepentimientos'), {
        ...formData,
        estado: 'Pendiente',
        fechaSolicitud: serverTimestamp()
      });
      toast.success('Solicitud enviada con éxito. Nos contactaremos a la brevedad.');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error('Hubo un error al procesar tu solicitud. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 text-slate-100 px-4 py-12">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-white mb-2">Botón de Arrepentimiento</h2>
        <p className="text-sm text-slate-400 text-center mb-6">
          Si te arrepentiste de una compra, completá este formulario para solicitar la cancelación. Tienes 10 días corridos desde que recibiste el producto.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nombre Completo *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email de Contacto *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="juan@ejemplo.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Teléfono</label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="11 2345-6789"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Número de Orden / Pedido *</label>
            <input
              type="text"
              name="nroOrden"
              value={formData.nroOrden}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Ej: DT-94827"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Detalle / Motivo (Opcional)</label>
            <textarea
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              rows="3"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
              placeholder="Contanos brevemente el motivo..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-50 text-white font-medium py-2.5 px-4 rounded-lg transition-colors mt-6 shadow-lg shadow-blue-900/20"
          >
            {loading ? 'Procesando...' : 'Confirmar Revocación'}
          </button>
        </form>
      </div>
    </div>
  );
};
