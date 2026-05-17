import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Menu, X, ChevronRight, ChevronDown, LogIn, LogOut, Settings, User } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getCategories } from '../fireBase/dataBase';
import logoImg from '../assets/images/Logo.png';

const MobileMenu = ({ isOpen, setIsOpen, searchValue, setSearchValue, handleSearch, categorias }) => {
  const [showCategories, setShowCategories] = useState(false);
  const { user, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    navigate(`/Catalogo?category=${encodeURIComponent(cat)}`);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={`fixed inset-0 z-[9999] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={() => setIsOpen(false)}
      />
      <div className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 bg-white border-b border-slate-100">
          <span className="font-black text-[10px] tracking-[0.3em] text-slate-400 uppercase">Menú Principal</span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-900 bg-slate-100 rounded-xl hover:bg-rose-50 hover:text-rose-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100/80">
            {user ? (
              <div className="flex flex-col gap-4">
                <Link to="/mi-cuenta" onClick={() => setIsOpen(false)} className="flex items-center justify-between group no-underline">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-900 p-2 rounded-xl text-white group-hover:scale-105 transition-transform">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-400 leading-none">Hola,</p>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-slate-800 transition-colors">{userData?.nombre || 'Usuario'}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                </Link>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  {userData?.rol === 'admin' ? (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="text-[11px] font-black uppercase tracking-tight text-slate-900 hover:underline flex items-center gap-1">
                      <Settings size={14} /> Panel Admin
                    </Link>
                  ) : (
                    <Link to="/mi-cuenta" onClick={() => setIsOpen(false)} className="text-[11px] font-black uppercase tracking-tight text-slate-900 hover:underline">
                      Mi Perfil
                    </Link>
                  )}
                  <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors ml-auto">
                    <LogOut size={15} /> Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider">
                <LogIn size={16} /> Ingresar
              </Link>
            )}
          </div>

          <form onSubmit={handleSearch} className="mb-8 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="text-slate-400" size={16} />
            </div>
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="¿Qué estás buscando?" 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 outline-none focus:bg-white focus:border-slate-200 shadow-sm"
            />
          </form>

          <nav className="flex flex-col gap-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-4 px-2 border-b border-slate-50">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">Inicio</span>
              <ChevronRight size={16} className="text-slate-300" />
            </Link>
            <div className="border-b border-slate-50">
              <button onClick={() => setShowCategories(!showCategories)} className="w-full flex items-center justify-between py-4 px-2 group">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">Productos</span>
                <ChevronDown size={16} className={`text-slate-300 transition-transform ${showCategories ? 'rotate-180 text-slate-900' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${showCategories ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                {categorias.map((cat) => (
                  <button key={cat} onClick={() => handleCategoryClick(cat)} className="w-full text-left block py-2.5 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors border-l-2 border-transparent hover:border-slate-900 ml-2">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [categorias, setCategorias] = useState([]);
  const { getCantidad, toggleCart } = useContext(CartContext);
  const { user, userData, logout } = useAuth();
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
