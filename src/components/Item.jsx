import { useNavigate } from "react-router";

export const Item = ({ item }) => {
  const navigate = useNavigate();
  const hasStock = item?.stock > 0;

  return (
    <div 
      onClick={() => hasStock && navigate(`/item/${item?.id}`)}
      className={`flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer active:scale-[0.98] ${!hasStock ? 'opacity-75' : ''}`}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500 ease-in-out"
          src={item?.imagenUrl}
          alt={item?.titulo}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400?text=Sin+Imagen";
          }}
        />

        {!hasStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg">
              Sin Stock
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h5 className="mb-4 text-xl font-bold tracking-tight text-gray-900 line-clamp-2 min-h-[3.5rem] group-hover:text-indigo-600 transition-colors">
          {item?.titulo}
        </h5>

        <div className="mt-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {hasStock ? `${item.stock} disponibles` : 'Agotado'}
            </span>
            <span className="text-2xl font-black text-indigo-600">
              ${item?.precio}
            </span>
          </div>

          <div className={`p-2 rounded-full transition-all duration-300 ${hasStock ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-gray-100 text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};