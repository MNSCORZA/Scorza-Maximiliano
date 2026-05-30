import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { toast } from 'sonner';
import { AlertTriangle, MapPin, Phone, Mail, Settings, ToggleLeft, ToggleRight } from 'lucide-react';

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

  const tienePermisosEdicion = userData?.permisos?.editar === true || userData?.permisos?.isAdmin === true;

  useEffect(() => {
    const fetchConfig = async () => {
      const docSnap = await getDoc(doc(db, 'config', 'global'));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setConfigData({
          maintenanceMode: !!data.maintenanceMode,
          footer: {
            address: data.footer?.address || '',
            phone: data.footer?.phone || '',
            email: data.footer?.email || '',
            socials: {
              instagram: data.footer?.socials?.instagram || '',
              facebook: data.footer?.socials?.facebook || '',
              whatsapp: data.footer?.socials?.whatsapp || ''
            }
          }
        });
      }
    };
    fetchConfig();
  }, []);

  const handleToggleMaintenance = () => {
    setConfigData(prev => ({ ...prev, maintenanceMode: !prev.maintenanceMode }));
  };

  const handleFooterChange = (field, value) => {
    setConfigData(prev => ({
      ...prev,
      footer: { ...prev.footer, [field]: value }
    }));
  };

  const handleSocialChange = (platform, value) => {
    setConfigData(prev => ({
      ...prev,
      footer: {
        ...prev.footer,
        socials: { ...prev.footer.socials, [platform]: value }
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!tienePermisosEdicion) return;
    setIsSaving(true);
    try {
      await setDoc(doc(db, 'config', 'global'), configData);
      toast.success('Cambios guardados con éxito');
    } catch (error) {
      toast.error('Error al guardar');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-3xl mx-auto space-y-6 p-4">
      <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${configData.maintenanceMode ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'}`}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Modo Mantenimiento</h3>
            <p className="text-sm text-slate-500">Pausa la navegación y compras del sitio.</p>
          </div>
        </div>
        <button type="button" onClick={handleToggleMaintenance}>
          {configData.maintenanceMode ? <ToggleRight size={48} className="text-amber-500" /> : <ToggleLeft size={48} className="text-slate-300" />}
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Settings size={18} className="text-indigo-600" />
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Configuración del Footer</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-slate-400" size={16} />
            <input placeholder="Dirección" value={configData.footer.address} onChange={(e) => handleFooterChange('address', e.target.value)} className="w-full pl-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-slate-400" size={16} />
            <input placeholder="Teléfono" value={configData.footer.phone} onChange={(e) => handleFooterChange('phone', e.target.value)} className="w-full pl-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
          </div>
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
          <input placeholder="Email" value={configData.footer.email} onChange={(e) => handleFooterChange('email', e.target.value)} className="w-full pl-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <input placeholder="Instagram" value={configData.footer.socials.instagram} onChange={(e) => handleSocialChange('instagram', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none" />
          <input placeholder="Facebook" value={configData.footer.socials.facebook} onChange={(e) => handleSocialChange('facebook', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none" />
          <input placeholder="WhatsApp" value={configData.footer.socials.whatsapp} onChange={(e) => handleSocialChange('whatsapp', e.target.value)} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none" />
        </div>
      </div>
      <button type="submit" disabled={isSaving || !tienePermisosEdicion} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 disabled:opacity-50 transition-all">
        {isSaving ? 'Guardando...' : 'Guardar Cambios Globales'}
      </button>
    </form>
  );
};