import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center bg-white border border-gray-100 rounded-3xl shadow-2xl p-10 md:p-16 max-w-lg w-full transform transition-all">
        <div className="relative mb-8">
          <h1 className="text-9xl font-black text-indigo-100 select-none">
            404
          </h1>
          <span className="absolute inset-0 flex items-center justify-center text-6xl">
            🔍
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          ¡Ups! Perdidos en el espacio
        </h2>

        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          La página que buscas no existe o fue movida a otra galaxia. 
          ¿Volvemos a la tienda?
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 mx-auto"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Regresar al Inicio
        </button>
      </div>
    </div>
  );
};