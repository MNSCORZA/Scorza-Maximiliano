import React from 'react';
import { Calendar } from 'lucide-react';

export const NewsletterRow = ({ item }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Reciente';
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 px-6 md:px-8 flex justify-between items-center hover:bg-slate-50/50 transition-all">
      <span className="text-xs md:text-sm font-bold text-slate-800 tracking-tight">{item.email}</span>
      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 whitespace-nowrap">
        <Calendar size={12} className="text-slate-300" />
        {formatDate(item.fecha)}
      </span>
    </div>
  );
};
