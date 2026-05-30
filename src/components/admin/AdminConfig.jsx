import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { saveLog } from '../../fireBase/dataBase';
import { toast } from 'sonner';
import { AlertTriangle, Layout, Save, ToggleLeft, ToggleRight, MapPin, Phone, Mail, Facebook } from 'lucide-react';

export const AdminConfig = ({ user, userData }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [configData, setConfigData] = useState({
    maintenanceMode: false,
    footer: {
      address: '',
      phone: '',
      email: '',
      socials: { instagram: '', facebook: '', whatsapp: '' }
    }
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'config', 'global'));
        if (docSnap.exists()) {
          setConfigData(docSnap.data());
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchConfig();
  }, []);

  const handleToggleMaintenance = () => {
    setConfigData(prev => ({
      ...prev,
      maintenanceMode: !prev.maintenanceMode
    }));
  };

  const handleFooterChange = (field, value) => {
    setConfigData(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        [field]: value
      }
    }));
  };

  const handleSocialChange = (platform, value) => {
    setConfigData(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        socials: {
          ...prev.footer.socials,
          [platform]: value
        }
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userData?.permisos?.editar) {
      toast.error('Acceso denegado', { description: 'No posees permisos de edición.' });
      return;
    }

    setIsSaving(true);
    try {
      await updateDoc(doc(db, 'config', 'global'), configData);
      const adminName = userData?.nombre || 'Admin';
      await saveLog(user.uid, user.email, adminName, 'Configuración Sistema', `Actualizó preferencias globales (Mantenimiento: ${configData.maintenanceMode ? 'ACTIVO' : 'INACTIVO'})`);
      toast.success('Configuración guardada correctamente');
    } catch (error) {
      console.error(error);
      toast.error('Error al guardar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-xl font-black uppercase text-gray-900 tracking-tight">Preferencias del Sistema</h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Control de estado de la tienda y personalización del footer.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-2xl ${configData.maintenanceMode ? 'bg-amber-50 text-amber-500' : 'bg-indigo-50 text-indigo-600'}`}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-black text-xs uppercase tracking-wider text-gray-900">Modo Mantenimiento (Pausa)</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-md">
                Al activarse, la tienda pública se congelará mostrando una pantalla informativa. Los clientes no podrán navegar ni comprar hasta que sea desactivado.
              </p>
            </div>
          </div>
          <button type="button" onClick={handleToggleMaintenance} className="focus:outline-none transition-colors">
            {configData.maintenanceMode ? (
              <ToggleRight size={56} className="text-amber-500 cursor-pointer" />
            ) : (
              <ToggleLeft size={56} className="text-gray-300 cursor-pointer" />
            )}
          </button>
        </div>

        {configData.maintenanceMode && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-amber-800 text-xs font-bold uppercase tracking-wider">
            ⚠️ El sitio web se encuentra actualmente pausado para los clientes públicos.
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <Layout size={18} className="text-indigo-600" />
          <h3 className="font-black text-xs uppercase tracking-wider text-gray-900">Gestión de Datos de Contacto (Footer)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Dirección Física</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 text-gray-400" size={16} />
              <input type="text" value={configData.footer.address} onChange={(e) => handleFooterChange('address', e.target.value)} placeholder="Ej: Av. Mitre 1234, Laferrere" className="w-full bg-gray-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-medium text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Teléfono de Soporte</label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-gray-400" size={16} />
              <input type="text" value={configData.footer.phone} onChange={(e) => handleFooterChange('phone', e.target.value)} placeholder="Ej: +54 11 1234-5678" className="w-full bg-gray-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-medium text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Email Comercial</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={16} />
              <input type="email" value={configData.footer.email} onChange={(e) => handleFooterChange('email', e.target.value)} placeholder="Ej: ventas@detodo.com" className="w-full bg-gray-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-medium text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Enlace de Instagram</label>
            <div className="relative">
              <Share2 className="absolute left-4 top-3.5 text-gray-400" size={16} />
              <input type="text" value={configData.footer.socials.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} placeholder="https://instagram.com/..." className="w-full bg-gray-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-medium text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Enlace de Facebook</label>
            <div className="relative">
              <Facebook className="absolute left-4 top-3.5 text-gray-400" size={16} />
              <input type="text" value={configData.footer.socials.facebook} onChange={(e) => handleSocialChange('facebook', e.target.value)} placeholder="https://facebook.com/..." className="w-full bg-gray-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-medium text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400">Enlace o Número WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-4 top-3.5 text-gray-400" size={16} />
              <input type="text" value={configData.footer.socials.whatsapp || ''} onChange={(e) => handleSocialChange('whatsapp', e.target.value)} placeholder="https://wa.me/..." className="w-full bg-gray-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-xs font-medium text-gray-900 outline-none focus:border-indigo-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isSaving} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-500 transition-all flex items-center gap-2 disabled:opacity-50">
          <Save size={14} />
          {isSaving ? 'Guardando...' : 'Guardar Configuración'}
        </button>
      </div>
    </form>
  );
};
