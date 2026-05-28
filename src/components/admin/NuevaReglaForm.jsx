import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Percent, Truck, Plus, BadgePercent, Coins, UserCheck, Layers } from 'lucide-react';

const OpcionesDropdown = ({ isOpen, tipo, opciones, onSelect }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute z-50 w-full mt-1.5 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/80 max-h-60 overflow-y-auto">
      {opciones.map((opcion) => (
        <button
          key={opcion.id}
          type="button"
          onClick={() => onSelect(opcion.id)}
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
  );
};

const CamposDescuentoMarca = ({ marca, setMarca, porcentaje, setPorcentaje }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Marca Target</label>
      <input
        type="text"
        required
        placeholder="Ej: Osram"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
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
        value={porcentaje}
        onChange={(e) => setPorcentaje(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
      />
    </div>
  </div>
);

const CamposEnvioGratis = ({ categoria, setCategoria, monto, setMonto }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Categoría Target</label>
      <input
        type="text"
        required
        placeholder="Ej: Iluminación"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
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
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
      />
    </div>
  </div>
);

const CamposDescuentoTotal = ({ monto, setMonto, porcentaje, setPorcentaje }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Monto Mínimo Requerido ($)</label>
      <input
        type="number"
        required
        min="1"
        placeholder="Ej: 30000"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
      />
    </div>
    <div>
      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">% Descuento al Total</label>
      <input
        type="number"
        required
        min="1"
        max="100"
        placeholder="Ej: 10"
        value={porcentaje}
        onChange={(e) => setPorcentaje(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
      />
    </div>
  </div>
);

const CamposLlevaPaga = ({ categoria, setCategoria, lleva, setLleva, paga, setPaga }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Categoría Target</label>
      <input
        type="text"
        required
        placeholder="Ej: Accesorios (o 'Todos')"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Lleva Cantidad (X)</label>
        <input
          type="number"
          required
          min="2"
          placeholder="Ej: 3"
          value={lleva}
          onChange={(e) => setLleva(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
        />
      </div>
      <div>
        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Paga Cantidad (Y)</label>
        <input
          type="number"
          required
          min="1"
          placeholder="Ej: 2"
          value={paga}
          onChange={(e) => setPaga(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
        />
      </div>
    </div>
  </div>
);

const CamposMetodoPago = ({ metodo, setMetodo, porcentaje, setPorcentaje }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Método de Pago</label>
      <select
        value={metodo}
        onChange={(e) => setMetodo(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
      >
        <option value="transferencia">Transferencia Bancaria / Efectivo</option>
        <option value="tarjeta_debito">Tarjeta de Débito</option>
        <option value="mercado_pago">Mercado Pago</option>
      </select>
    </div>
    <div>
      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">% Descuento Aplicado</label>
      <input
        type="number"
        required
        min="1"
        max="100"
        placeholder="Ej: 15"
        value={porcentaje}
        onChange={(e) => setPorcentaje(e.target.value)}
        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
      />
    </div>
  </div>
);

const CamposPrimeraCompra = ({ porcentaje, setPorcentaje }) => (
  <div>
    <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">% Descuento Primera Compra</label>
    <input
      type="number"
      required
      min="1"
      max="100"
      placeholder="Ej: 15"
      value={porcentaje}
      onChange={(e) => setPorcentaje(e.target.value)}
      className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 outline-none focus:border-indigo-500/30"
    />
  </div>
);

export const NuevaReglaForm = ({ onCreateRule }) => {
  const opcionesReglas = [
    { id: 'marca_segunda_unidad_descuento', label: 'Descuento en 2da Unidad por Marca (2do al X%)', icon: <Percent size={16} className="text-indigo-500" /> },
    { id: 'envio_gratis_monto_y_categoria', label: 'Envío Gratis por Monto Mínimo y Categoría', icon: <Truck size={16} className="text-emerald-500" /> },
    { id: 'descuento_total_monto_minimo', label: 'Descuento % en el Total por Monto Mínimo', icon: <BadgePercent size={16} className="text-amber-500" /> },
    { id: 'lleva_x_paga_y', label: 'Promo Multi-unidad (Ej: 3x2, 2x1) por Categoría', icon: <Layers size={16} className="text-purple-500" /> },
    { id: 'descuento_metodo_pago', label: 'Descuento Fijo/% por Método de Pago', icon: <Coins size={16} className="text-cyan-500" /> },
    { id: 'descuento_primera_compra', label: 'Beneficio Exclusivo Primera Compra', icon: <UserCheck size={16} className="text-rose-500" /> }
  ];

  const [tipo, setTipo] = useState('marca_segunda_unidad_descuento');
  const [marcaTarget, setMarcaTarget] = useState('');
  const [categoriaTarget, setCategoriaTarget] = useState('');
  const [porcentajeDescuento, setPorcentajeDescuento] = useState('');
  const [montoMinimo, setMontoMinimo] = useState('');
  const [llevaCantidad, setLlevaCantidad] = useState('');
  const [pagaCantidad, setPagaCantidad] = useState('');
  const [metodoPago, setMetodoPago] = useState('transferencia');

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
      marcaTarget: tipo === 'marca_segunda_unidad_descuento' ? marcaTarget.trim() : null,
      categoriaTarget: ['envio_gratis_monto_y_categoria', 'lleva_x_paga_y'].includes(tipo) ? categoriaTarget.trim() : null,
      porcentajeDescuento: ['marca_segunda_unidad_descuento', 'descuento_total_monto_minimo', 'descuento_metodo_pago', 'descuento_primera_compra'].includes(tipo) ? Number(porcentajeDescuento) : null,
      montoMinimo: ['envio_gratis_monto_y_categoria', 'descuento_total_monto_minimo'].includes(tipo) ? Number(montoMinimo) : null,
      llevaCantidad: tipo === 'lleva_x_paga_y' ? Number(llevaCantidad) : null,
      pagaCantidad: tipo === 'lleva_x_paga_y' ? Number(pagaCantidad) : null,
      metodoPago: tipo === 'descuento_metodo_pago' ? metodoPago : null
    };

    onCreateRule(datosRegla, () => {
      setMarcaTarget('');
      setCategoriaTarget('');
      setPorcentajeDescuento('');
      setMontoMinimo('');
      setLlevaCantidad('');
      setPagaCantidad('');
      setMetodoPago('transferencia');
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
              <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <OpcionesDropdown 
              isOpen={isOpen} 
              tipo={tipo} 
              opciones={opcionesReglas} 
              onSelect={(id) => { setTipo(id); setIsOpen(false); }} 
            />
          </div>
        </div>

        {tipo === 'marca_segunda_unidad_descuento' && (
          <CamposDescuentoMarca marca={marcaTarget} setMarca={setMarcaTarget} porcentaje={porcentajeDescuento} setPorcentaje={setPorcentajeDescuento} />
        )}

        {tipo === 'envio_gratis_monto_y_categoria' && (
          <CamposEnvioGratis categoria={categoriaTarget} setCategoria={setCategoriaTarget} monto={montoMinimo} setMonto={setMontoMinimo} />
        )}

        {tipo === 'descuento_total_monto_minimo' && (
          <CamposDescuentoTotal monto={montoMinimo} setMonto={setMontoMinimo} porcentaje={porcentajeDescuento} setPorcentaje={setPorcentajeDescuento} />
        )}

        {tipo === 'lleva_x_paga_y' && (
          <CamposLlevaPaga categoria={categoriaTarget} setCategoria={setCategoriaTarget} lleva={llevaCantidad} setLleva={setLlevaCantidad} paga={pagaCantidad} setPaga={setPagaCantidad} />
        )}

        {tipo === 'descuento_metodo_pago' && (
          <CamposMetodoPago metodo={metodoPago} setMetodo={setMetodoPago} porcentaje={porcentajeDescuento} setPorcentaje={setPorcentajeDescuento} />
        )}

        {tipo === 'descuento_primera_compra' && (
          <CamposPrimeraCompra porcentaje={porcentajeDescuento} setPorcentaje={setPorcentajeDescuento} />
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
