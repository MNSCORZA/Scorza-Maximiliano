import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Package, ShoppingBag, AlertTriangle, ShieldAlert } from 'lucide-react';
import { listenAlertasNotRead, markAlertaAsRead } from '../fireBase/dataBase';

export const NotificationBell = () => {
  const [alertas, setAlertas] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const prevAlertasCount = useRef(0);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = listenAlertasNotRead((nuevasAlertas) => {
      if (nuevasAlertas.length > prevAlertasCount.current) {
        const ultimaAlerta = nuevasAlertas[0];
        
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.15);
        } catch (e) {
          console.log(e);
        }

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(ultimaAlerta.titulo || "Nueva Alerta Crítica", {
            body: ultimaAlerta.mensaje,
            icon: "/favicon.ico"
          });
        }
      }
      
      setAlertas(nuevasAlertas);
      prevAlertasCount.current = nuevasAlertas.length;
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (tipo) => {
    switch (tipo) {
      case 'stock_critico':
        return <Package className="text-amber-500" size={16} />;
      case 'pedido_alto_valor':
        return <ShoppingBag className="text-emerald-500" size={16} />;
      case 'reclamo':
        return <AlertTriangle className="text-rose-500" size={16} />;
      case 'seguridad':
        return <ShieldAlert className="text-indigo-500" size={16} />;
      default:
        return <Bell className="text-slate-500" size={16} />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="relative p-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition-all group cursor-pointer block"
      >
        <Bell size={24} strokeWidth={2} className="group-hover:scale-105 transition-transform" />
        {alertas.length > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce">
            {alertas.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl z-[60] py-2 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="px-4 py-2 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">Alertas Críticas</h3>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              {alertas.length} activas
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {alertas.length === 0 ? (
              <div className="px-4 py-6 text-center text-slate-400 text-xs font-medium">
                Todo bajo control. Sin alertas pendientes.
              </div>
            ) : (
              alertas.map((alerta) => (
                <div 
                  key={alerta.id} 
                  className="px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex gap-3 items-start transition-colors"
                >
                  <div className="p-2 bg-slate-50 rounded-xl mt-0.5 shrink-0">
                    {getIcon(alerta.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{alerta.titulo}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{alerta.mensaje}</p>
                  </div>
                  <button 
                    onClick={() => markAlertaAsRead(alerta.id)}
                    className="p-1 text-slate-300 hover:text-emerald-500 rounded-md hover:bg-emerald-50 transition-all shrink-0 self-center"
                  >
                    <Check size={14} strokeWidth={3} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
