import React from 'react';
import { useCouponsManager } from '../../hooks/useCouponsManager';
import { ShieldAlert, Ticket } from 'lucide-react';
import { CouponForm } from './CouponForm';
import { CouponCard } from './CouponCard';

export const AdminCoupons = () => {
  const {
    cupones,
    codigo,
    porcentaje,
    montoMinimo,
    fechaExpiracion,
    limiteUsos,
    targetUserId,
    loading,
    setCodigo,
    setPorcentaje,
    setMontoMinimo,
    setFechaExpiracion,
    setLimiteUsos,
    setTargetUserId,
    handleAgregar,
    handleBorrar
  } = useCouponsManager();

  return (
    <div className="w-full max-w-4xl mx-auto font-sans bg-white rounded-3xl border border-gray-100 shadow-sm p-4 sm:p-8 mt-4">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-lg sm:text-xl font-black text-gray-900 uppercase tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <Ticket size={20} className="text-indigo-600" /> Control de Cupones Avanzado
        </h2>
        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
          Configurá beneficios con expiración automática, límites comerciales o exclusivos por usuario
        </p>
      </div>

      <CouponForm
        onSubmit={handleAgregar}
        codigo={codigo} setCodigo={setCodigo}
        porcentaje={porcentaje} setPorcentaje={setPorcentaje}
        montoMinimo={montoMinimo} setMontoMinimo={setMontoMinimo}
        fechaExpiracion={fechaExpiracion} setFechaExpiracion={setFechaExpiracion}
        limiteUsos={limiteUsos} setLimiteUsos={setLimiteUsos}
        targetUserId={targetUserId} setTargetUserId={setTargetUserId}
        loading={loading}
      />

      {cupones.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 bg-gray-50/50">
          <ShieldAlert size={20} className="text-gray-300" />
          <p className="text-[10px] font-black uppercase tracking-wider">No hay cupones activos</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cupones.map((c) => (
            <CouponCard key={c.id} coupon={c} onBorrar={handleBorrar} />
          ))}
        </div>
      )}
    </div>
  );
};
