import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";
import { Minus, Plus, ShoppingCart } from "lucide-react";

export const ItemCount = ({ item }) => {
  const [count, setCount] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleSuma = () => setCount(count + 1);
  const handleResta = () => count > 1 && setCount(count - 1);

  const handleAddToCart = () => {
    addToCart({ ...item, cantidad: count });

    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
    audio.volume = 0.5;
    audio.play();

    toast.success('¡Producto agregado!', {
      description: `${count}x ${item.titulo} ya está en tu carrito.`,
      duration: 3000,
      style: {
        borderRadius: '20px',
        padding: '16px',
        border: '1px solid #e5e7eb'
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm">
        <button
          onClick={handleResta}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all active:scale-90"
        >
          <Minus size={16} strokeWidth={3} />
        </button>

        <span className="text-xl font-black text-gray-900 tabular-nums">
          {count}
        </span>

        <button
          onClick={handleSuma}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all active:scale-90"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="group relative w-full bg-blue-600 text-white font-black py-4 px-6 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all duration-300 overflow-hidden"
      >
        <div className="flex items-center justify-center gap-3 relative z-10">
          <ShoppingCart size={18} strokeWidth={2.5} />
          <span className="uppercase tracking-widest text-xs">Agregar al carrito</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>
    </div>
  );
};
