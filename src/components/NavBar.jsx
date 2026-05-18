import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Menu, LogIn, LogOut, Settings, User, Heart } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FavoritesContext } from '../context/FavoritesContext';
import { getCategories } from '../fireBase/dataBase';
import { MobileMenu } from './MobileMenu';
import logoImg from '../assets/images/Logo.png';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categorias, setCategorias] = useState([]);
  const { getCantidad, toggleCart } = useContext(CartContext);
  const { user, userData, logout } = useAuth();
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const uniqueCats = await getCategories();
        setCategorias(uniqueCats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategorias();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/Catalogo?search=${searchValue}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={`sticky top-0 z-[50] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-2 shadow-sm border-b border-slate-100' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 shrink-0">
              <button onClick={() => setIsOpen(true)} className="p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center group">
                <img src={logoImg} alt="Logo" className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-102" />
              </Link>
            </div>

            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search size={16} className="text-slate-400 group-focus-within:text-slate-600 transition-all" />
              </div>
              <input 
                type="text" 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
                placeholder="Busca productos..." 
                className="w-full bg-slate-50 border border-slate-100 px-11 py-2.5 rounded-xl text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-slate-200 transition-all shadow-sm"
              />
            </form>

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
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in scale-in duration-300">
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
                  <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-in scale-in duration-300">
                    {getCantidad()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} categorias={categorias} />
    </>
  );
};
