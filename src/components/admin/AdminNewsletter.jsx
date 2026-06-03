import React from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { useNewsletter } from '../../hooks/useNewsletter';
import { NewsletterRow } from './NewsletterRow';
import { Loader } from '../Loader';

const AdminNewsletter = () => {
  const { emails, loading, copied, handleCopyAll } = useNewsletter();

  if (loading) {
    return (
      <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 min-h-[400px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight flex items-center gap-2">
            <Mail className="text-indigo-600" size={22} /> Lista de Newsletter
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">
            Usuarios registrados que desean recibir ofertas y novedades comerciales.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          disabled={emails.length === 0}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copiado' : 'Copiar todos los mails'}
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center px-6 md:px-8">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha de Registro</span>
        </div>

        <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
          {emails.length > 0 ? (
            emails.map((item) => (
              <NewsletterRow key={item.id} item={item} />
            ))
          ) : (
            <div className="text-center py-16">
              <Mail className="mx-auto text-slate-200 mb-2" size={32} />
              <p className="text-sm font-black text-slate-800">No hay suscriptores registrados</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">Cuando un usuario se sume desde el footer aparecerá acá.</p>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 px-6 md:px-8 flex justify-end">
          <span className="text-[10px] font-black bg-white border border-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Total: {emails.length} {emails.length === 1 ? 'Suscriptor' : 'Suscriptores'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsletter;
