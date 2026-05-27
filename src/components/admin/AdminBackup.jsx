import React, { useState } from 'react';
import { Download, UploadCloud, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { exportAllCollectionsData, restoreCollectionData, saveLog } from '../../fireBase/dataBase';
import { toast } from 'sonner';

export const AdminBackup = ({ currentUser, userData }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleExport = async () => {
    if (!userData?.permisos?.isAdmin) {
      toast.error('Acceso denegado', { description: 'Requieres rol de Administrador Superior.' });
      return;
    }

    setIsExporting(true);
    try {
      const data = await exportAllCollectionsData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const fecha = new Date().toISOString().split('T')[0];
      
      a.href = url;
      a.download = `backup_detodo_${fecha}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await saveLog(currentUser.uid, currentUser.email, userData?.nombre || 'Admin', 'Exportar Respaldo', 'Descargó una copia completa de la base de datos.');
      toast.success('Respaldo generado con éxito');
    } catch (error) {
      console.error(error);
      toast.error('Error al generar copia de seguridad');
    } finally {
      setIsExporting(false);
    }
  };

  const processFile = async (file) => {
    if (!userData?.permisos?.isAdmin) {
      toast.error('Acceso denegado', { description: 'Operación restringida a SuperAdmin.' });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setIsImporting(true);
        const json = JSON.parse(e.target.result);
        
        if (!json.productos && !json.cupones && !json.banners) {
          throw new Error('Estructura de archivo de respaldo no válida.');
        }

        await restoreCollectionData(json);
        await saveLog(currentUser.uid, currentUser.email, userData?.nombre || 'Admin', 'Rollback Base de Datos', 'Restauró el sistema usando un archivo JSON externo.');
        toast.success('Base de datos restaurada correctamente');
        setTimeout(() => window.location.reload(), 1500);
      } catch (error) {
        console.error(error);
        toast.error('Error al procesar la restauración', { description: error.message });
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm max-w-4xl mx-auto">
      <div className="mb-8">
        <h3 className="font-black uppercase text-slate-800 tracking-tighter text-xl mb-2">Respaldos de Base de Datos</h3>
        <p className="text-gray-400 text-xs font-medium">Clona localmente o restaura tus productos, cupones, banners y usuarios en segundos sin costos de servidor.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-slate-100 rounded-2xl p-6 flex flex-col justify-between bg-slate-50/50">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Download size={24} />
            </div>
            <h4 className="font-black uppercase text-slate-700 text-xs tracking-wider mb-2">Generar Backup Completo</h4>
            <p className="text-gray-400 text-[11px] leading-relaxed mb-6">Extrae toda la información operativa del catálogo, configuraciones visuales y registros del e-commerce directamente en un archivo descargable.</p>
          </div>
          <button onClick={handleExport} disabled={isExporting} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-50">
            {isExporting ? <RefreshCw className="animate-spin" size={14} /> : <Download size={14} />}
            {isExporting ? 'Procesando...' : 'Descargar JSON'}
          </button>
        </div>

        <div onDragEnter={handleDrag} className="relative">
          <div onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all h-full ${dragActive ? 'border-amber-500 bg-amber-50/20' : 'border-slate-200 bg-white'}`}>
            <input type="file" id="upload-backup" accept=".json" onChange={handleFileChange} className="hidden" disabled={isImporting} />
            
            {isImporting ? (
              <div className="flex flex-col items-center">
                <RefreshCw className="animate-spin text-amber-500 mb-4" size={32} />
                <h4 className="font-black uppercase text-amber-600 text-xs tracking-wider mb-1">Escribiendo Firestore</h4>
                <p className="text-gray-400 text-[10px]">Limpiando colecciones viejas e inyectando datos...</p>
              </div>
            ) : (
              <label htmlFor="upload-backup" className="cursor-pointer flex flex-col items-center w-full h-full justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 mt-2">
                  <UploadCloud size={24} />
                </div>
                <div>
                  <h4 className="font-black uppercase text-slate-700 text-xs tracking-wider mb-2">Restaurar Sistema (Rollback)</h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed px-4 mb-4">Arrastra el archivo JSON de respaldo aquí o haz clic para examinar tu dispositivo.</p>
                </div>
                <div className="w-full bg-amber-50 rounded-xl p-3 flex items-start gap-2 text-left mb-1">
                  <AlertTriangle className="text-amber-600 shrink-0" size={14} />
                  <p className="text-[9px] text-amber-800 font-medium leading-normal">Esta acción reemplazará los datos actuales del catálogo de forma permanente por la versión del archivo cargado.</p>
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
