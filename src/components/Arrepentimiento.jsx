import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../fireBase/config'; // Sube a src/ y entra a fireBase
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { InputField } from './InputField'; // Mismo nivel
import { TextAreaField } from './TextAreaField'; // Mismo nivel

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
    <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-16">
      <div className="max-w-lg w-full bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-8 md:p-10 rounded-2xl shadow-2xl shadow-black/50">
        
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
            Botón de Arrepentimiento
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            Si te arrepentiste de una compra, completá este formulario. Tenés <span className="text-slate-200 font-medium">10 días corridos</span> desde que recibiste el producto.
          </p>
        </div>

        
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Nombre Completo"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Juan Pérez"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Email de Contacto"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="juan@ejemplo.com"
            />
            <InputField
              label="Teléfono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="11 2345-6789"
            />
          </div>

          <InputField
            label="Número de Orden / Pedido"
            name="nroOrden"
            value={formData.nroOrden}
            onChange={handleChange}
            required
            placeholder="Ej: DT-94827"
          />

          <TextAreaField
            label="Detalle / Motivo (Opcional)"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            placeholder="Contanos brevemente el motivo de la cancelación..."
          />

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 mt-8 shadow-lg shadow-blue-600/10 hover:shadow-blue-500/20 text-sm tracking-wide uppercase"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Procesando...
              </span>
            ) : (
              'Confirmar Revocación'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
