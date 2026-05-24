import React, { useRef, useState } from 'react';
import { Download, Upload, FileSpreadsheet, Loader2 } from 'lucide-react';
import { writeBatch, doc, collection } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { saveLog } from '../../fireBase/dataBase';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const BulkUploadZone = ({ refreshProducts }) => {
  const { user, userData } = useAuth();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const downloadTemplate = () => {
    const headers = [
      'titulo',
      'descripcion',
      'precio',
      'precioAnterior',
      'categoria',
      'marca',
      'stock',
      'porcentajeDescuento',
      'imagenUrl',
      'envioGratis',
      'tieneDescuento'
    ];
    
    const exampleRow = [
      'Filtro de Aceite Up 1.0',
      'Filtro de aceite original para Volkswagen Up motor 1.0 mpi',
      '14500',
      '16000',
      'Repuestos',
      'Volkswagen',
      '25',
      '10',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b',
      'true',
      'true'
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), exampleRow.join(',')].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "plantilla_productos_detodo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.info("Plantilla descargada correctamente");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      const text = event.target.result;
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      
      if (lines.length <= 1) {
        toast.error("El archivo seleccionado está vacío o no contiene filas de datos");
        setLoading(false);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/['"']/g, ''));
      const requiredHeaders = ['titulo', 'precio', 'categoria', 'stock'];
      const missing = requiredHeaders.filter(h => !headers.includes(h));

      if (missing.length > 0) {
        toast.error(`Estructura inválida. Faltan las columnas obligatorias: ${missing.join(', ')}`);
        setLoading(false);
        return;
      }

      try {
        const batch = writeBatch(db);
        const productsCollection = collection(db, "productos");
        let validProductsCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const currentLine = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
          if (currentLine.length !== headers.length) continue;

          const rowData = {};
          headers.forEach((header, index) => {
            let val = currentLine[index]?.trim().replace(/^"|"$/g, '') || '';
            rowData[header] = val;
          });

          const rowNum = i + 1;
          if (!rowData.titulo) {
            throw new Error(`Fila ${rowNum}: El campo 'titulo' es obligatorio.`);
          }
          if (isNaN(Number(rowData.precio)) || Number(rowData.precio) <= 0) {
            throw new Error(`Fila ${rowNum}: El 'precio' debe ser un número mayor a 0.`);
          }
          if (!rowData.categoria) {
            throw new Error(`Fila ${rowNum}: El campo 'categoria' es obligatorio.`);
          }
          if (isNaN(Number(rowData.stock)) || Number(rowData.stock) < 0) {
            throw new Error(`Fila ${rowNum}: El 'stock' debe ser un número igual o mayor a 0.`);
          }

          const newProductRef = doc(productsCollection);
          const finalProduct = {
            titulo: rowData.titulo,
            descripcion: rowData.descripcion || '',
            precio: Number(rowData.precio),
            precioAnterior: rowData.precioAnterior ? Number(rowData.precioAnterior) : 0,
            categoria: rowData.categoria,
            marca: rowData.marca || '',
            stock: Number(rowData.stock),
            porcentajeDescuento: rowData.porcentajeDescuento ? Number(rowData.porcentajeDescuento) : 0,
            imagenUrl: rowData.imagenUrl || 'https://placehold.co/600x600/f8fafc/cbd5e1?text=Sin+Imagen',
            envioGratis: rowData.envioGratis?.toLowerCase() === 'true',
            tieneDescuento: rowData.tieneDescuento?.toLowerCase() === 'true'
          };

          batch.set(newProductRef, finalProduct);
          validProductsCount++;
        }

        if (validProductsCount > 0) {
          await batch.commit();
          await saveLog(
            user.uid, 
            user.email, 
            userData?.nombre || 'Admin Carga Masiva', 
            'Carga Masiva', 
            `Efectuó una inserción masiva de ${validProductsCount} nuevos productos a través de archivo CSV.`
          );
          toast.success(`¡Carga masiva finalizada! Se crearon ${validProductsCount} productos.`);
          if (refreshProducts) await refreshProducts();
        } else {
          toast.error("No se encontraron registros procesables en el archivo");
        }

      } catch (err) {
        toast.error(err.message || "Error al procesar los datos del archivo masivo");
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-xl shadow-slate-100/40 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
          <FileSpreadsheet size={22} />
        </div>
        <div>
          <h4 className="font-black text-xs text-slate-900 uppercase tracking-wider">Carga de Productos Masiva</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Descargá nuestra plantilla base o subí tu listado completo</p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={downloadTemplate}
          className="flex items-center justify-center gap-2 px-4 h-11 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-slate-200 cursor-pointer"
        >
          <Download size={14} /> Plantilla
        </button>

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".csv" 
          className="hidden" 
        />
        
        <button
          type="button"
          disabled={loading}
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 px-5 h-11 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md shadow-indigo-100 cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Procesando...
            </>
          ) : (
            <>
              <Upload size={14} /> Subir CSV
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BulkUploadZone;
