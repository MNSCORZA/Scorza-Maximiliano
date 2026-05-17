import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export const CartWidget = () => {
  const { getCantidad, toggleCart } = useContext(CartContext);
  const cantidad = getCantidad();

  return (
    <div 
      onClick={toggleCart}
      className="relative flex items-center justify-center p-2.5 cursor-pointer group transition-all"
    >
      <div className="relative text-slate-700 group-hover:text-slate-900 transition-colors">
        <ShoppingCart size={26} strokeWidth={2} />

        {cantidad > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white shadow-md border border-white animate-in scale-in duration-300">
            {cantidad}
          </span>
        )}
      </div>
    </div>
  );
};
