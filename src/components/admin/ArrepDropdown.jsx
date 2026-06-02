import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Loader2 } from 'lucide-react';

const ArrepDropdown = ({ req, onUpdateStatus, updatingId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
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

  const updateCoords = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updateCoords();
      window.addEventListener('resize', updateCoords);
      window.addEventListener('scroll', updateCoords, true);
    }
    return () => {
      window.removeEventListener('resize', updateCoords);
      window.removeEventListener('scroll', updateCoords, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        disabled={isRowUpdating}
        onClick={() => setIsOpen(!isOpen)}
        className={`text-[10px] font-black uppercase tracking-widest px-3 py-2.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
          statusStyles[req.estado] || 'bg-white text-gray-600 border-gray-200'
        }`}
      >
        {statusLabels[req.estado] || 'Acciones'}
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: `${coords.top + 6}px`,
            left: `${coords.left + coords.width - 128}px`,
          }}
          className="w-32 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[9999] py-1.5 animate-in fade-in slide-in-from-top-1 duration-150"
        >
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
        </div>,
        document.body
      )}
    </div>
  );
};

export default ArrepDropdown;
