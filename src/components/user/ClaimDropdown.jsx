import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const ClaimDropdown = ({ claimReason, setClaimReason }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const reasons = [
    "Llegó roto/fallado",
    "No es el tamaño/modelo que pedí",
    "Me faltaron artículos",
    "Me arrepentí de la compra"
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2 mb-1 block">
        Motivo del problema
      </label>
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-slate-50 border border-transparent rounded-xl py-3 px-4 text-xs font-bold text-slate-700 flex items-center justify-between transition-all outline-none focus:bg-white focus:border-indigo-600/20"
      >
        <span className={claimReason ? 'text-slate-800' : 'text-slate-400'}>
          {claimReason || "Selecciona una opción..."}
        </span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-100 rounded-2xl shadow-xl z-[10000] py-1.5 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {reasons.map((reason) => (
            <button
              key={reason}
              type="button"
              onClick={() => {
                setClaimReason(reason);
                setIsDropdownOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors ${
                claimReason === reason 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {reason}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
