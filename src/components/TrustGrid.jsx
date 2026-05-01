import React from 'react';
import { Truck, ShieldCheck, Headphones } from 'lucide-react';

const TrustItem = ({ Icon, title, subtitle }) => (
  <div className="flex items-center gap-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
    <Icon className="text-blue-600" style={{ width: '28px', height: '28px' }} />
    <div className="leading-tight">
      <h4 className="font-bold text-sm text-gray-900">{title}</h4>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  </div>
);

const TrustGrid = () => {
  return (
    <section className="bg-[#f5f5f5] py-8 border-b border-gray-200">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <TrustItem Icon={Truck} title="Envíos a todo el país" subtitle="Rápido y seguro a tu puerta." />
        <TrustItem Icon={ShieldCheck} title="Garantía Certificada" subtitle="Solo repuestos homologados." />
        <TrustItem Icon={Headphones} title="Asesoría Directa" subtitle="Soporte técnico por WhatsApp." />
      </div>
    </section>
  );
};

export default TrustGrid;