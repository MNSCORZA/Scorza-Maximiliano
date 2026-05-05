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
    toast.success(`${item.nombre || item.titulo} agregado`, {
      description: `Sumaste ${count} unidades al carrito.`,
      duration: 2500,
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Selector de cantidad con estilo moderno */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
        <button
          onClick={handleResta}
          className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 transition-all active:scale-90"
        >
          <Minus size={18} strokeWidth={3} />
        </button>

        <span className="text-2xl font-black text-gray-900 tabular-nums">
          {count}
        </span>

        <button
          onClick={handleSuma}
          className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 transition-all active:scale-90"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>

      {/* Botón de compra corregido y con efectos */}
      <button
        onClick={handleAddToCart}
        className="group relative w-full bg-indigo-600 text-white font-black py-5 px-8 rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all duration-300 overflow-hidden"
      >
        <div className="flex items-center justify-center gap-3 relative z-10">
          <ShoppingCart size={20} strokeWidth={2.5} className="group-hover:animate-bounce" />
          <span className="uppercase tracking-[0.1em] text-sm">Agregar al carrito</span>
        </div>
        
        {/* Efecto de brillo visual */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </button>
    </div>
  );
};