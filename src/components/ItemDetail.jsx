import { ItemCount } from "./ItemCount";
import { Loader } from "./Loader";

export const ItemDetail = ({ item }) => {
  if (!item) {
    return <Loader />;
  }

  const sinImpuestos = typeof item.precio === "number" ? item.precio / 1.21 : 0;

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4">
          <img 
            className="w-full max-w-lg aspect-square object-contain hover:scale-105 transition-transform duration-500" 
            src={item.imagenUrl} 
            alt={item.titulo} 
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-10 lg:p-16">
          <div className="flex-grow">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {item.titulo}
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              {item.descripcion}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 pb-10 border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-black text-indigo-600">
                  ${item.precio}
                </span>
                <span className="text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                  Sin impuestos: ${sinImpuestos.toFixed(2)}
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full w-fit">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-bold text-sm">
                  Stock disponible: {item.stock}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <ItemCount item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};