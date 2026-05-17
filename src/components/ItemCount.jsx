import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";
import { Minus, Plus, ShoppingBag } from "lucide-react";

export const ItemCount = ({ item }) => {
  const [count, setCount] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleSuma = () => count < item.stock && setCount(count + 1);
  const handleResta = () => count > 1 && setCount(count - 1);

  const handleAddToCart = () => {
    addToCart({ ...item, cantidad: count });

    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});

    toast('¡Agregado al carrito!', {
      description: `${count}x ${item.titulo} listo para llevar.`,
      duration: 3000,
      style: {
        borderRadius: '16px',
        padding: '12px 16px',
        background: '#0f172a',
        color: '#ffffff',
        border: 'none'
      }
    });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center gap-3">
      <div className="flex items-center justify-between bg-white rounded-xl p-1 border border-slate-200/80 w-full sm:w-1/3 shadow-sm">
        <button
          onClick={handleResta}
          disabled={count <= 1}
          className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 disabled:opacity-40 rounded-lg text-slate-600 transition-all active:scale-95"
        >
          <Minus size={14} strokeWidth={2.5} />
        </button>

        <span className="text-base font-black text-slate-900 tabular-nums">
          {count}
        </span>

        <button
          onClick={handleSuma}
          disabled={count >= item.stock}
          className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 disabled:opacity-40 rounded-lg text-slate-600 transition-all active:scale-95"
        >
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="group relative flex-1 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all duration-300 active:scale-[0.99]"
      >
        <div className="flex items-center justify-center gap-2.5">
          <ShoppingBag size={16} strokeWidth={2} />
          <span className="uppercase tracking-wider text-xs">Añadir al Carrito</span>
        </div>
      </button>
    </div>
  );
};
