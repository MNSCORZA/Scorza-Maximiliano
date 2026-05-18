import { Link } from "react-router";

export const AuthRequiredBlock = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-md mx-auto text-center py-20 px-4 bg-white rounded-2xl shadow-sm border border-gray-100 mt-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Iniciá sesión para continuar</h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Guardamos tus favoritos en tu cuenta para que puedas acceder a ellos desde cualquier computadora o celular.
          </p>
          <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
