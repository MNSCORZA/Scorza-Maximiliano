import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
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
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/Catalogo?search=${searchValue}`);
      setIsOpen(false);
    }
  };

  const MobileMenu = () => {
    return createPortal(
      <div className={`fixed inset-0 lg:hidden transition-all duration-500 ${isOpen ? 'z-[9999] visible' : 'z-[-1] invisible'}`}>
        <div 
          className={`absolute inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsOpen(false)}
        />
        
        <div className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-[20px_0_60px_-15px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between p-8 bg-white border-b border-gray-50">
            <span className="font-black text-[10px] tracking-[0.3em] text-gray-400 uppercase">Menú Principal</span>
            <button onClick={() => setIsOpen(false)} className="p-2 text-gray-900 bg-gray-100 rounded-xl active:bg-red-500 active:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 bg-white">
            <form onSubmit={handleSearch} className="mb-10 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="BUSCAR..." 
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-600/20 transition-all"
              />
            </form>

            <nav className="flex flex-col gap-1">
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-4 px-2 border-b border-gray-50 active:bg-gray-50 transition-colors">
                <span className="text-sm font-black uppercase tracking-widest text-gray-900">Inicio</span>
                <ChevronRight size={16} className="text-gray-300" />
              </Link>
              <Link to="/Catalogo" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-4 px-2 border-b border-gray-50 active:bg-gray-50 transition-colors">
                <span className="text-sm font-black uppercase tracking-widest text-gray-900">Productos</span>
                <ChevronRight size={16} className="text-gray-300" />
              </Link>
            </nav>

            <div className="mt-10 mb-8">
              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-200">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Tu Cuenta</p>
                <h4 className="text-xl font-black leading-tight mb-5">¡Hola de nuevo!</h4>
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform">
                  Iniciar Sesión
                </button>
                <User className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <nav className={`sticky top-0 z-[50] transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md py-2 shadow-sm' : 'bg-white py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-xl">
                <Menu size={24} />
              </button>
              
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                  <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
                </div>
                <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">De Todo</span>
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <Link to="/cart" className="relative p-2.5 text-gray-900 hover:bg-indigo-50 rounded-xl transition-all">
                <ShoppingCart size={22} strokeWidth={2.5} />
                {getCantidad() > 0 && (
                  <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {getCantidad()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu />
    </>
  );
};