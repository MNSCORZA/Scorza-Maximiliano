import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";

export const CartWidget = () => {
  const { getCantidad } = useContext(CartContext);
  const cantidad = getCantidad();
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate("/cart")}
      className="relative flex items-center justify-center p-3 cursor-pointer group transition-all duration-300"
    >
      <div className="relative">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8 text-gray-700 group-hover:text-indigo-600 transition-colors" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
          />
        </svg>

        {cantidad > 0 && (
          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-sm animate-fadeIn">
            {cantidad}
          </span>
        )}
      </div>
    </div>
  );
};