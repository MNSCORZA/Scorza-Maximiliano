import { useContext } from "react";
import { Link } from "react-router-main"; // Ajustá esta importación según tu router
import { useAuth } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { Heart, ShoppingCart, User, Settings, LogOut, LogIn } from "lucide-react";

export function NavBar() {
  const { user, userData, logout } = useAuth();
  const { favorites } = useContext(FavoritesContext);
  const { getCantidad, toggleCart } = useCart(); // Asegurate de mapear tus funciones del carrito

  return (
    <nav className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div>
          <Link to="/">
            <img src="/logo.png" alt="De Todo" className="h-8 w-auto" />
          </Link>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-50 p-1 pr-4 rounded-full border border-slate-100">
                <Link to={userData?.rol === 'admin' ? "/admin" : "/mi-cuenta"} className="bg-slate-900 p-2 rounded-full text-white hover:scale-105 transition-transform shadow-sm">
                  {userData?.rol === 'admin' ? <Settings size={16} /> : <User size={16} />}
                </Link>
                <div className="leading-tight">
                  <p className="text-[9px] font-black uppercase text-slate-400">Hola,</p>
                  <p className="text-xs font-bold text-slate-900">{userData?.nombre || 'Usuario'}</p>
                </div>
                <button onClick={logout} className="ml-1 text-slate-400 hover:text-rose-500 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm">
                <LogIn size={16} />
                <span>Ingresar</span>
              </Link>
            )}
          </div>

          {user && (
            <Link 
              to="/favoritos" 
              className="relative p-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition-all group cursor-pointer"
            >
              <Heart size={24} strokeWidth={2} className="group-hover:scale-105 transition-transform text-slate-700" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {favorites.length}
                </span>
              )}
            </Link>
          )}

          <div 
            onClick={toggleCart} 
            className="relative p-2.5 text-slate-700 hover:bg-slate-50 rounded-xl transition-all group cursor-pointer"
          >
            <ShoppingCart size={24} strokeWidth={2} className="group-hover:scale-105 transition-transform" />
            {getCantidad() > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {getCantidad()}
              </span>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
}
