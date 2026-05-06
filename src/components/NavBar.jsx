import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router';
import { Search, ShoppingCart, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { db } from '../firebase/config'; 
import { collection, getDocs } from 'fireBase/firestore';
import logoImg from '../assets/images/Logo.png';

const MobileMenu = ({ isOpen, setIsOpen, searchValue, setSearchValue, handleSearch, categorias }) => {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    const path = cat ? `/Catalogo?category=${cat}` : '/Catalogo';
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className={`fixed inset-0 z-[9999] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
      <div 
        className={`absolute inset-0 bg-gray-900/70 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={() => setIsOpen(false)}
      />
      <div className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-8 bg-white border-b border-gray-50">
          <span className="font-black text-[10px] tracking-[0.3em] text-gray-400 uppercase">Menú Principal</span>
          <button onClick={() => setIsOpen(false)} className="p-2 text-gray-900 bg-gray-100 rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-white">
          <form onSubmit={handleSearch} className="mb-10 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-transform group-focus-within:scale-110">
              <Search className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            </div>
            <input 
              type="text" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="¿Qué estás buscando?" 
              className="w-full bg-gray-100/50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-[12px] font-bold text-gray-700 placeholder:text-gray-400 focus:bg-white focus:border-indigo-600/20 focus:ring-4 focus:ring-indigo-600/5 outline-none transition-all shadow-inner"
            />
          </form>
          <nav className="flex flex-col gap-1">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-4 px-2 border-b border-gray-50 group">
              <span className="text-xs font-black uppercase tracking-widest text-gray-900">Inicio</span>
              <ChevronRight size={16} className="text-gray-300" />
            </Link>
            <div className="border-b border-gray-50">
              <button onClick={() => setShowCategories(!showCategories)} className="w-full flex items-center justify-between py-4 px-2 group">
                <span className="text-xs font-black uppercase tracking-widest text-gray-900 group-hover:text-indigo-600 transition-colors">Productos</span>
                <ChevronDown size={16} className={`text-gray-300 transition-transform duration-300 ${showCategories ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${showCategories ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                <button onClick={() => handleCategoryClick(null)} className="w-full text-left block py-3 px-6 text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 rounded-xl mb-2">
                  Ver Todo el Catálogo
                </button>
                {categorias.map((cat) => (
                  <button key={cat} onClick={() => handleCategoryClick(cat)} className="w-full text-left block py-3 px-6 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-indigo-600 transition-colors border-l-2 border-transparent hover:border-indigo-600 ml-2">
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
  const { getCantidad } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const cats = querySnapshot.docs.map(doc => doc.data().categoria);
        const uniqueCats = [...new Set(cats)].filter(c => c);
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
      <nav className={`sticky top-0 z-[50] transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md py-2 shadow-md' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-6 shrink-0">
              <button onClick={() => setIsOpen(true)} className="p-2 text-gray-900 hover:bg-gray-100 rounded-xl transition-colors">
                <Menu size={24} />
              </button>
              <Link to="/" className="flex items-center group">
                <img src={logoImg} alt="De Todo Logo" className="h-18 w-auto object-contain group-hover:scale-105 transition-transform" />
              </Link>
            </div>
            <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search size={18} className="text-gray-400 group-focus-within:text-indigo-600 group-focus-within:scale-110 transition-all" />
              </div>
              <input 
                type="text" 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
                placeholder="Busca productos, marcas y más..." 
                className="w-full bg-gray-100/80 border-2 border-transparent px-12 py-2.5 rounded-2xl text-[13px] font-medium text-gray-700 outline-none transition-all focus:bg-white focus:border-indigo-600/30 focus:ring-4 focus:ring-indigo-600/5 placeholder:text-gray-400 shadow-inner"
              />
            </form>
            <div className="flex items-center gap-1 shrink-0">
              <Link to="/cart" className="relative p-2.5 text-gray-900 hover:bg-indigo-50 rounded-xl transition-all group">
                <ShoppingCart size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                {getCantidad() > 0 && <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">{getCantidad()}</span>}
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} searchValue={searchValue} setSearchValue={setSearchValue} handleSearch={handleSearch} categorias={categorias} />
    </>
  );
};