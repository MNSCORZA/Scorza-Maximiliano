import { useNavigate } from "react-router";

export const Item = ({ item }) => {
  const navigate = useNavigate();
  const hasStock = item?.stock > 0;

  return (
    <div 
      onClick={() => hasStock && navigate(`/item/${item?.id}`)}
      className={`flex flex-col w-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer active:scale-[0.98] ${!hasStock ? 'opacity-75' : ''}`}
    >
      <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-4">
        <img
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          src={item?.imagenUrl || item?.img} // Soporta ambos nombres de propiedad
          alt={item?.titulo}
          loading="lazy"
        />

        {!hasStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              Sin Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h5 className="mb-2 text-sm font-bold text-gray-900 line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors uppercase">
          {item?.titulo}
        </h5>

        <div className="mt-auto flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
              {hasStock ? `${item.stock} disp.` : 'Agotado'}
            </span>
            <span className="text-xl font-black text-blue-600">
              ${item?.precio}
            </span>
          </div>

          <div className={`p-2 rounded-lg transition-all ${hasStock ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-gray-100 text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
