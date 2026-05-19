import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../fireBase/config';
import { DollarSign, TrendingUp, ShoppingBag, AlertTriangle, Flame, Snowflake, Ghost } from 'lucide-react';

const AdminAnalytics = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataSync = async () => {
      try {
        const [ordersSnap, productsSnap] = await Promise.all([
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "productos"))
        ]);
        
        setOrders(ordersSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setProducts(productsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    dataSync();
  }, []);

  if (loading) {
    return (
      <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Procesando Métricas del Negocio...</div>
      </div>
    );
  }

  const entregadas = orders.filter(o => o.status === 'entregada');
  const facturacionTotal = entregadas.reduce((acc, curr) => acc + Number(curr.total || 0), 0);
  const ticketPromedio = entregadas.length > 0 ? facturacionTotal / entregadas.length : 0;

  const hoyStr = new Date().toLocaleDateString('es-AR');
  const facturacionHoy = entregadas.reduce((acc, order) => {
    if (!order.date) return acc;
    const orderDate = order.date.seconds 
      ? new Date(order.date.seconds * 1000) 
      : new Date(order.date);
    return orderDate.toLocaleDateString('es-AR') === hoyStr ? acc + Number(order.total || 0) : acc;
  }, 0);

  const catalogoOrdenado = [...products].sort((a, b) => Number(b.ventas || 0) - Number(a.ventas || 0));
  
  const masVendidos = catalogoOrdenado.filter(p => Number(p.ventas || 0) > 0).slice(0, 3);
  const menosVendidos = catalogoOrdenado.filter(p => Number(p.ventas || 0) > 0).slice(-3).reverse();
  const sinVentas = products.filter(p => !p.ventas || Number(p.ventas) === 0);

  return (
    <div className="space-y-8">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 shadow-sm">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Facturación Histórica</p>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">$ {facturacionTotal.toLocaleString('es-AR')}</h3>
            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-tight mt-0.5">Órdenes Finalizadas</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 shadow-sm">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Caja del Día ({hoyStr})</p>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">$ {facturacionHoy.toLocaleString('es-AR')}</h3>
            <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-tight mt-0.5">Dinero Ingresado Hoy</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-5">
          <div className="bg-amber-50 p-4 rounded-2xl text-amber-600 shadow-sm">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Ticket Promedio</p>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">$ {Math.round(ticketPromedio).toLocaleString('es-AR')}</h3>
            <p className="text-[9px] font-bold text-amber-600 uppercase tracking-tight mt-0.5">Inversión por Cliente</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h4 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900 mb-6">
              <Flame size={16} className="text-orange-500"/> Los 3 Más Vendidos
            </h4>
            <div className="space-y-3">
              {masVendidos.map((p, i) => (
                <div key={p.id} className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black flex items-center justify-center">#{i+1}</span>
                    <div>
                      <p className="font-black text-slate-800 text-xs tracking-tight">{p.titulo}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{p.categoria}</p>
                    </div>
                  </div>
                  <span className="bg-orange-50 text-orange-600 text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                    {p.ventas} vtas.
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h4 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900 mb-6">
              <Snowflake size={16} className="text-blue-400"/> Menor Rotación (Bajas Ventas)
            </h4>
            <div className="space-y-3">
              {menosVendidos.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl">
                  <div>
                    <p className="font-black text-slate-800 text-xs tracking-tight">{p.titulo}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Stock Disponible: {p.stock} u.</p>
                  </div>
                  <span className="bg-slate-100 text-slate-600 text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
                    {p.ventas || 0} vtas.
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm h-fit">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-black text-xs uppercase tracking-widest flex items-center gap-2 text-slate-900">
              <Ghost size={16} className="text-violet-500"/> Alerta de Stock Estancado
            </h4>
            <span className="bg-rose-50 border border-rose-100 text-rose-600 text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider flex items-center gap-1 animate-pulse">
              <AlertTriangle size={10}/> {sinVentas.length} Alertas
            </span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-6 leading-relaxed">
            Productos con stock disponible en depósito pero que registran cero ventas históricos. Considerá lanzar una oferta relámpago con estos artículos.
          </p>
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {sinVentas.length > 0 ? (
              sinVentas.map(p => (
                <div key={p.id} className="flex items-center justify-between p-3.5 border border-dashed border-slate-200 rounded-2xl hover:border-violet-300 transition-colors">
                  <div className="max-w-[70%]">
                    <p className="font-black text-slate-700 text-xs tracking-tight truncate">{p.titulo}</p>
                    <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">{p.categoria}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-rose-500 text-xs">{p.stock} u. libres</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">0% Rotación</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-300 font-bold text-xs uppercase tracking-widest">
                ¡Excelente! Todo tu catálogo se está moviendo.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;
