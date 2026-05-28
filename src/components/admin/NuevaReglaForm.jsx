import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Percent, Truck, Plus } from 'lucide-react';

const NuevaReglaForm = ({ onCreateRule }) => {
  const opcionesReglas = [
    { 
      id: 'marca_segunda_unidad_descuento', 
      label: 'Descuento en 2da Unidad por Marca', 
      icon: <Percent size={16} className="text-indigo-500" /> 
    },
    { 
      id: 'envio_gratis_monto_y_categoria', 
      label: 'Envío Gratis por Monto Mínimo y Categoría', 
      icon: <Truck size={16} className="text-emerald-500" /> 
    }
  ];

  const [tipo, setTipo] = useState('marca_segunda_unidad_descuento');
  const [marcaTarget, setMarcaTarget] = useState('');
  const [categoriaTarget, setCategoriaTarget] = useState('');
  const [porcentajeDescuento, setPorcentajeDescuento] = useState('');
  const [montoMinimo, setMontoMinimo] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedRegla = opcionesReglas.find(opc => opc.id === tipo) || opcionesReglas[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const datosRegla = {
      tipo,
      marcaTarget: tipo === 'marca_segunda_unidad_descuento' ? marcaTarget : null,
      porcentajeDescuento: tipo === 'marca_segunda_unidad_descuento' ? porcentajeDescuento : null,
      categoriaTarget: tipo === 'envio_gratis_monto_y_categoria' ? categoriaTarget : null,
      montoMinimo: tipo === 'envio_gratis_monto_y_categoria' ? montoMinimo : null
    };

    onCreateRule(datosRegla, () => {
      setMarcaTarget('');
      setCategoriaTarget('');
      setPorcentajeDescuento('');
      setMontoMinimo('');
    });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
      <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider mb-4">Nueva Regla Automática</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-2" ref={dropdownRef}>
          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Tipo de Regla</label>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100/70 transition-all outline-none focus:border-indigo-500/30"
            >
              <div className="flex items-center gap-2">
                {selectedRegla.icon}
                <span>{selectedRegla.label}</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
              />
            </button>

            {isOpen && (
              <div className="absolute z-50 w-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/80 overflow-hidden">
                {opcionesReglas.map((opcion) => (
                  <button
                    key={opcion.id}
                    type="button"
                    onClick={() => {
                      setTipo(opcion.id);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-2 text-left transition-colors ${
                      tipo === opcion.id 
                        ? "bg-indigo-50/60 text-indigo-700" 
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {opcion.icon}
                    <span>{opcion.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
  );
};

export default NuevaReglaForm;
