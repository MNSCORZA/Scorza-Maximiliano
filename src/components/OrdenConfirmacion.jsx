import { useParams, Link } from "react-router";

export function OrdenConfirmacion() {
  const { orderId } = useParams();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-6">
      <div className="text-center p-8 sm:p-12 bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-gray-100 animate-fadeIn">
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
          ¡Gracias por tu compra! 🎉
        </h2>
        
        <p className="text-lg text-gray-500 mb-8">
          Tu orden ha sido procesada exitosamente y ya estamos preparando tus productos.
        </p>

        <div className="bg-indigo-50 rounded-2xl p-6 mb-10 border border-indigo-100">
          <p className="text-sm uppercase tracking-widest font-bold text-indigo-400 mb-2">
            Número de Orden
          </p>
          <p className="text-xl sm:text-2xl font-mono font-black text-indigo-700 break-all select-all">
            {orderId}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-indigo-200 transition-all duration-300 active:scale-95 text-lg"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}