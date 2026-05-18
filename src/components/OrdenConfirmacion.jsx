import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { db } from "../fireBase/config";
import { doc, getDoc } from "firebase/firestore";
import confetti from "canvas-confetti";

export function OrdenConfirmacion() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);
      if (orderSnap.exists()) {
        setOrder(orderSnap.data());
      }
      setLoading(false);
    };

    fetchOrder();
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4f46e5", "#818cf8", "#ffffff"],
    });
  }, [orderId]);

  const handlePrint = () => window.print();

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-indigo-600 animate-pulse uppercase tracking-widest text-xs">Generando Comprobante...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center font-black text-red-500 uppercase tracking-widest text-xs">Orden no encontrada</div>;

  const fecha = order.date?.toDate();
  const fechaFormateada = fecha ? `${fecha.toLocaleDateString()} - ${fecha.getHours()}:${fecha.getMinutes().toString().padStart(2, '0')}hs` : "---";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 print:bg-white print:p-0">
      <div className="max-w-3xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 animate-fade-in-up print:shadow-none print:border-none print:rounded-none">

        <div className="bg-indigo-600 p-8 text-white flex justify-between items-center print:bg-white print:text-black print:border-b-2 print:border-gray-100">
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">De Todo</h1>
            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">E-commerce Laferrere</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Fecha de Compra</p>
            <p className="font-bold text-sm">{fechaFormateada}</p>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-2 gap-8 mb-10 pb-8 border-b border-gray-50">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cliente</p>
              <p className="font-bold text-gray-900 uppercase">{order.buyer.nombre} {order.buyer.apellido}</p>
              <p className="text-xs text-gray-500">{order.buyer.telefono}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ID de Orden</p>
              <p className="font-mono font-black text-indigo-600 text-sm">{orderId}</p>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 text-center">Detalle del Pedido</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-start py-4 border-b border-gray-50 italic">
                  <div className="flex-1">
                    <p className="font-black text-gray-800 text-sm uppercase leading-tight">{item.titulo}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">
                      {item.cantidad} unidades x ${Number(item.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <p className="font-black text-gray-900 ml-4">${(item.cantidad * item.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-3xl p-8 flex justify-between items-center print:bg-white print:border-2 print:border-gray-100">
            <div>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Total Final Pagado</p>
              <p className="text-4xl font-black text-indigo-700 tracking-tighter">${Number(order.total).toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="no-print">
              <div className="bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 no-print">
            <button 
              onClick={handlePrint} 
              className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 uppercase text-xs tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Descargar / Imprimir Comprobante
            </button>
            <Link 
              to="/" 
              className="w-full text-center text-gray-400 font-black py-4 uppercase text-[10px] tracking-widest hover:text-indigo-600 transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>

          <p className="text-center text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em] mt-10 print:text-black">
            Gracias por confiar en De Todo E-commerce
          </p>
        </div>
      </div>
    </div>
  );
}
