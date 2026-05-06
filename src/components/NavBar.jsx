import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Menu, X, ChevronRight, User } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { getCantidad } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/Catalogo?search=${searchValue}`);
      setIsOpen(false);
    }
  };

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md py-2 shadow-sm' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
              </div>
              <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">
                De Todo
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 ml-4">
              <Link to="/" className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-indigo-600 transition-colors">Inicio</Link>
              <Link to="/Catalogo" className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-indigo-600 transition-colors">Catálogo</Link>
            </div>
          </div>

          <form 
            onSubmit={handleSearch}
            className="hidden lg:flex items-center bg-gray-100/50 px-5 py-2.5 rounded-2xl border border-gray-100 w-full max-w-md mx-8 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-200 transition-all"
          >
            <Search className="text-gray-400" size={18} />
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="¿Buscás algo específico?" 
              className="bg-transparent border-none focus:ring-0 text-xs font-bold ml-3 w-full text-gray-700 placeholder:text-gray-400 placeholder:uppercase placeholder:tracking-widest"
            />
          </form>

          <div className="flex items-center gap-1 lg:gap-3">
            <Link to="/cart" className="relative p-2.5 text-gray-900 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group">
              <ShoppingCart size={22} strokeWidth={2.5} />
              {getCantidad() > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                  {getCantidad()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Menú Lateral (Mobile) */}
      <div className={`fixed inset-0 z-[150] lg:hidden transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay oscuro */}
        <div 
          className={`absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsOpen(false)}
        />
        
        {/* Contenedor del Menú Blanco */}
        <div className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) h-full ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Contenido con scroll interno y fondo blanco forzado */}
          <div className="flex flex-col h-full bg-white overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-10">
                <span className="font-black text-xs tracking-[0.3em] text-gray-400 uppercase">Menú Principal</span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-gray-900 bg-gray-100 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSearch} className="mb-10 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="BUSCAR..." 
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-xs font-black focus:ring-2 focus:ring-indigo-600/10 focus:bg-white transition-all uppercase tracking-widest"
                />
              </form>

              <div className="flex flex-col gap-2">
                <Link to="/" onClick={() => setIsOpen(false)} className="group flex items-center justify-between py-4 px-2 border-b border-gray-50">
                  <span className="text-sm font-black uppercase tracking-widest text-gray-900 group-hover:text-indigo-600 transition-colors">Inicio</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/Catalogo" onClick={() => setIsOpen(false)} className="group flex items-center justify-between py-4 px-2 border-b border-gray-50">
                  <span className="text-sm font-black uppercase tracking-widest text-gray-900 group-hover:text-indigo-600 transition-colors">Productos</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-10">
                <div className="bg-indigo-600 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Tu Cuenta</p>
                  <h4 className="text-lg font-black leading-tight mb-4">¡Hola de nuevo!</h4>
                  <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all shadow-md">
                    Iniciar Sesión
                  </button>
                  <User className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};