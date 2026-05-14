import { useParams, Link } from "react-router";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export function OrdenConfirmacion() {
  const { orderId } = useParams();

  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4f46e5", "#818cf8", "#ffffff"],
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-6 bg-gray-50 print:bg-white">
      <div className="text-center p-8 sm:p-12 bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-100 animate-fade-in-up print:shadow-none print:border-none">
        <div className="mb-6 flex justify-center no-print">
          <div className="bg-green-100 p-4 rounded-full">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 uppercase tracking-tighter">¡Gracias por tu compra! 🎉</h2>
        <p className="text-lg text-gray-500 mb-8">Tu orden ha sido procesada exitosamente y ya estamos preparando tus productos.</p>
        <div className="bg-indigo-50 rounded-2xl p-6 mb-6 border border-indigo-100">
          <p className="text-sm uppercase tracking-widest font-bold text-indigo-400 mb-2">Número de Orden</p>
          <p className="text-xl sm:text-2xl font-mono font-black text-indigo-700 break-all select-all">{orderId}</p>
        </div>
        <button onClick={handlePrint} className="no-print mb-8 text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em] hover:text-indigo-800 transition-colors flex items-center justify-center gap-2 mx-auto">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Imprimir Comprobante
        </button>
        <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
          <Link to="/" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-indigo-200 transition-all duration-300 active:scale-95 text-lg">Volver al Inicio</Link>
        </div>
      </div>
    </div>
  );
}
