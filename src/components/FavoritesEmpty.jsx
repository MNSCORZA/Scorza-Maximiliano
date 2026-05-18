import { Link } from "react-router";

export const FavoritesEmpty = () => {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-4 bg-white rounded-2xl shadow-sm border border-gray-100 mt-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-500 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Tu lista está vacía</h2>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">
        ¡No te quedes con las ganas! Explorá nuestro catálogo y guardá los productos que más te gusten haciendo clic en el corazón.
      </p>
      <Link to="/Catalogo" className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto">
        Volver a la tienda
      </Link>
    </div>
  );
};
