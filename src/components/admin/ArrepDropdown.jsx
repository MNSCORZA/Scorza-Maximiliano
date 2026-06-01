import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';

const ArrepDropdown = ({ req, onUpdateStatus, updatingId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isRowUpdating = updatingId === req.id;

  const statusStyles = {
    'Pendiente': 'bg-amber-50 text-amber-600 border-amber-100',
    'En Proceso': 'bg-blue-50 text-blue-600 border-blue-100',
    'Finalizado': 'bg-emerald-50 text-emerald-600 border-emerald-100'
  };

  const statusLabels = {
    'Pendiente': 'Pendiente',
    'En Proceso': 'En Proceso',
    'Finalizado': 'Finalizado'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 justify-end w-full relative">
      {isRowUpdating ? (
        <Loader2 size={16} className="text-indigo-600 animate-spin mr-1" />
      ) : null}

      <div className="relative" ref={isOpen ? dropdownRef : null}>
        <button
          disabled={isRowUpdating}
          onClick={() => setIsOpen(!isOpen)}
          className={`text-[10px] font-black uppercase tracking-widest px-3 py-2.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
            statusStyles[req.estado] || 'bg-white text-gray-600 border-gray-200'
          }`}
        >
          {statusLabels[req.estado] || 'Acciones'}
          <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          /* 
            CAMBIO CLAVE: Usamos 'bottom-full mb-1.5' para que abra hacia ARRIBA.
            Como es la primera y única fila, abrir hacia arriba evita la guillotina del contenedor.
          */
          <div className="absolute right-0 bottom-full mb-1.5 w-32 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 py-1.5 animate-in fade-in slide-in-from-bottom-1 duration-150">
            {Object.keys(statusLabels).map((statusKey) => (
              <button
                key={statusKey}
                onClick={() => {
                  onUpdateStatus(req.id, statusKey);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${
                  req.estado === statusKey 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {statusLabels[statusKey]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrepDropdown;