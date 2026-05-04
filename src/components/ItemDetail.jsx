import { ItemCount } from "./ItemCount";
import { Loader } from "./Loader";
import { CategoryCard } from "./CategoryCard";

export const ItemDetail = ({ item }) => {
  if (!item) return <Loader />;

  const sinImpuestos = typeof item.precio === "number" ? item.precio / 1.21 : 0;
  const hasStock = item.stock > 0;

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden mb-12">
        <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-4 relative">
          <img 
            className={`w-full max-w-lg aspect-square object-contain transition-transform duration-500 ${hasStock ? 'hover:scale-105' : 'grayscale'}`} 
            src={item.imagenUrl} 
            alt={item.titulo} 
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-10 lg:p-16">
          <div className="flex-grow">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {item.titulo}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">{item.descripcion}</p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 pb-10 border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-4xl sm:text-5xl font-black text-indigo-600">${item.precio}</span>
                <span className="text-sm text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                  Sin IVA: ${sinImpuestos.toFixed(2)}
                </span>
              </div>

              <div className={`flex items-center gap-2 px-4 py-2 rounded-full w-fit ${hasStock ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className={`w-2 h-2 rounded-full ${hasStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className={`font-bold text-sm ${hasStock ? 'text-green-700' : 'text-red-700'}`}>
                  {hasStock ? `Stock: ${item.stock}` : 'Sin stock'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-gray-50 p-6 rounded-2xl border border-gray-100">
            {hasStock ? (
              <ItemCount item={item} />
            ) : (
              <p className="text-center text-gray-500 font-medium italic">Producto momentáneamente sin unidades.</p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">Continuar explorando</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryCard 
            title="Catálogo Completo"
            image="https://images.unsplash.com/photo-1530124560677-bdaea02c3a66?q=80&w=1000&auto=format&fit=crop" 
            route="/Catalogo"
          />
          <CategoryCard 
            title={`Más ${item.categoria}`}
            image="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=1000&auto=format&fit=crop"
            route={`/categoria/${item.categoria}`}
          />
        </div>
      </div>
    </div>
  );
};