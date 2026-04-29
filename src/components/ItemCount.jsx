import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "sonner";

export const ItemCount = ({ item }) => {
  const [count, setCount] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleSuma = () => setCount(count + 1);
  const handleResta = () => (count > 1 ? setCount(count - 1) : setCount(1));
  
  const handleAddToCart = () => {
    addToCart({ ...item, cantidad: count });
    toast.success(`${item.titulo} se agregó al carrito!`, {
      description: `Cantidad: ${count}`,
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
      <div className="flex items-center justify-between w-full bg-gray-100 rounded-full p-1 border border-gray-300">
        <button
          onClick={handleResta}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full text-gray-900 shadow-sm hover:bg-indigo-700 hover:text-white transition-colors duration-200 focus:outline-none"
        >
          <span className="text-xl font-bold">-</span>
        </button>

        <span className="text-xl font-semibold text-gray-900 tabular-nums">
          {count}
        </span>

        <button
          onClick={handleSuma}
          className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-full text-gray-900 shadow-sm hover:bg-indigo-700 hover:text-white transition-colors duration-200 focus:outline-none"
        >
          <span className="text-xl font-bold">+</span>
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-indigo-800 transform active:scale-95 transition-all duration-200 text-lg uppercase tracking-wider"
      >
        Agregar al carrito
      </button>
    </div>
  );
};