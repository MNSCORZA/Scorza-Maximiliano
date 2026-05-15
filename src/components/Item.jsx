import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

export const Item = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const hasStock = item?.stock > 0;

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita que al clickear el botón se dispare el detalle
    addToCart({ ...item, cantidad: 1 });
    
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
    audio.volume = 0.5;
    audio.play();

    toast.success('¡Agregado!', {
      description: `${item.titulo} en el carrito.`,
      duration: 2000,
      style: { borderRadius: '20px' }
    });
  };

  return (
    <div 
      onClick={() => hasStock && navigate(`/item/${item?.id}`)}
      className={`flex flex-col w-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer active:scale-[0.98] ${!hasStock ? 'opacity-75' : ''}`}
    >
      <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-4">
        <img
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          src={item?.imagenUrl || item?.img}
          alt={item?.titulo}
          loading="lazy"
        />
        {!hasStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Sin Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h5 className="mb-1 text-[11px] font-bold text-gray-800 line-clamp-2 min-h-[32px] uppercase">
          {item?.titulo}
        </h5>

        <div className="flex flex-col mb-4">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
            {hasStock ? `${item.stock} disponibles` : 'Agotado'}
          </span>
          <span className="text-xl font-black text-blue-600">
            ${item?.precio}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!hasStock}
          className="mt-auto w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all disabled:bg-gray-200 shadow-lg shadow-blue-100 disabled:shadow-none"
        >
          <ShoppingCart size={16} strokeWidth={2.5} />
          <span className="text-[11px] font-black uppercase tracking-widest">Agregar</span>
        </button>
      </div>
    </div>
  );
};
