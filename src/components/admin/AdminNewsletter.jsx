import React, { useState, useEffect } from 'react';
import { db } from '../../fireBase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Mail, Copy, Check, Calendar } from 'lucide-react';
import { Loader } from '../Loader';
import { toast } from 'sonner';

const AdminNewsletter = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const q = query(collection(db, 'newsletter'), orderBy('fecha', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEmails(data);
      } catch (error) {
        console.error(error);
        toast.error('Error al cargar la lista de suscriptores');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  const handleCopyAll = () => {
    if (emails.length === 0) return;
    
    const allEmailsString = emails.map(e => e.email).join(', ');
    navigator.clipboard.writeText(allEmailsString);
    setCopied(true);
    toast.success('Todos los emails fueron copiados al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

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
              <div key={item.id} className="p-4 px-6 md:px-8 flex justify-between items-center hover:bg-slate-50/50 transition-all">
                <span className="text-xs md:text-sm font-bold text-slate-800 tracking-tight">{item.email}</span>
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5 whitespace-nowrap">
                  <Calendar size={12} className="text-slate-300" />
                  {formatDate(item.fecha)}
                </span>
              </div>
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
