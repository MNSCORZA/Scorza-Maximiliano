import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { exportToExcel, exportToPDF } from '../../services/reportGenerator';
import { 
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  Filter
} from 'lucide-react';

export const AnalyticsReports = () => {
  const [rawOrders, setRawOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('validas');

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const fetched = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setRawOrders(fetched);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchAllOrders();
  }, []);

  const getFilteredOrders = () => {
    return rawOrders.filter(order => {
      if (statusFilter === 'validas') {
        if (order.status !== 'entregada' && order.status !== 'generada') return false;
      } else if (statusFilter !== 'todas') {
        if (order.status !== statusFilter) return false;
      }

      if (!order.date) return false;
      const orderDate = order.date.seconds ? order.date.toDate() : new Date(order.date);
      
      if (startDate) {
        const start = new Date(startDate + 'T00:00:00');
        if (orderDate < start) return false;
      }
      
      if (endDate) {
        const end = new Date(endDate + 'T23:59:59');
        if (orderDate > end) return false;
      }

      return true;
    });
  };

  const handleExportExcel = () => {
    const ordersToExport = getFilteredOrders();
    exportToExcel(ordersToExport, startDate, endDate, statusFilter);
  };

  const handleExportPDF = () => {
    const ordersToExport = getFilteredOrders();
    exportToPDF(ordersToExport, startDate, endDate, statusFilter);
  };

  if (loadingOrders) return null;

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div>
          <h4 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900 mb-1">
            <Download size={15} className="text-indigo-600"/> Exportación Inteligente de Reportes
          </h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            Calculá costos de reposición, balances contables de IVA y rendición de ingresos filtrados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end flex-grow xl:max-w-4xl">
          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Calendar size={10}/> Desde:
            </label>
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-300 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Calendar size={10}/> Hasta:
            </label>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-300 focus:bg-white transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Filter size={10}/> Estado:
            </label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 outline-none focus:border-indigo-300 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="validas">Comerciales (Entregadas / Generadas)</option>
              <option value="todas">Todas las órdenes</option>
              <option value="generada">Solo Generadas</option>
              <option value="entregada">Solo Entregadas</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={handleExportExcel}
              className="bg-emerald-50 text-emerald-600 border border-emerald-100 p-2.5 rounded-xl font-black text-[9px] uppercase tracking-wider flex flex-col items-center justify-center gap-1 hover:bg-emerald-600 hover:text-white hover:shadow-md transition-all group"
            >
              <FileSpreadsheet size={14} className="group-hover:scale-110 transition-transform"/>
              Excel
            </button>
            <button 
              onClick={handleExportPDF}
              className="bg-rose-50 text-rose-600 border border-rose-100 p-2.5 rounded-xl font-black text-[9px] uppercase tracking-wider flex flex-col items-center justify-center gap-1 hover:bg-rose-600 hover:text-white hover:shadow-md transition-all group"
            >
              <FileText size={14} className="group-hover:scale-110 transition-transform"/>
              PDF Contable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
