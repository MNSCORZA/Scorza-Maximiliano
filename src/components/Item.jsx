import { useNavigate } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";
import { ShoppingCart, ArrowRight } from "lucide-react";

export const Item = ({ item }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const hasStock = item?.stock > 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...item, cantidad: 1 });
    
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
    audio.volume = 0.5;
    audio.play();

    toast.success('¡Agregado!', {
      description: `${item.titulo} ya está en tu carrito.`,
      duration: 2000,
      style: { borderRadius: '20px' }
    });
  };

  return (
    <div 
      onClick={() => hasStock && navigate(`/item/${item?.id}`)}
      className={`flex flex-col w-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer active:scale-[0.98] ${!hasStock ? 'opacity-75' : ''}`}
    >
      <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-4">
        <img
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          src={item?.imagenUrl || item?.img}
          alt={item?.titulo}
          loading="lazy"
        />
        {!hasStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Sin Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h5 className="mb-2 text-[11px] font-bold text-gray-900 line-clamp-2 min-h-[32px] group-hover:text-blue-600 transition-colors uppercase">
          {item?.titulo}
        </h5>

        <div className="flex flex-col mb-4">
          <span className="text-[10px] font-bold text-gray-400 uppercase">{hasStock ? `${item.stock} disp.` : 'Agotado'}</span>
          <span className="text-xl font-black text-blue-600">${item?.precio}</span>
        </div>

        <div className="grid grid-cols-5 gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={!hasStock}
            className="col-span-4 bg-blue-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-gray-200"
          >
            <ShoppingCart size={14} strokeWidth={2.5} />
            <span className="text-[10px] font-black uppercase tracking-widest">Agregar</span>
          </button>
          <button className="col-span-1 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
            <ArrowRight size={16} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};
