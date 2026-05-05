import React from 'react';
import { Link } from 'react-router';
import { Home, ChevronRight, ShieldCheck, Truck, RefreshCw, Star, ArrowRight, LayoutGrid } from 'lucide-react';
import { ItemCount } from './ItemCount';

export const ItemDetail = ({ item }) => {
  return (
    <div className="py-8 animate-in fade-in duration-700 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-500 mb-8 bg-white w-fit px-4 py-2.5 rounded-full shadow-sm border border-gray-100">
          <Link to="/" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
            <Home size={14} strokeWidth={2.5} /> <span>INICIO</span>
          </Link>
          <ChevronRight size={12} className="text-gray-300" />
          <Link to="/Catalogo" className="hover:text-indigo-600 transition-colors">CATÁLOGO</Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-indigo-600 uppercase tracking-wider truncate max-w-[150px]">
            {item.titulo}
          </span>
        </nav>

        <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="bg-white p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-50">
              <div className="relative group">
                <img 
                  src={item.imagenUrl} 
                  alt={item.titulo} 
                  className="max-h-[500px] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500?text=Imagen+No+Disponible";
                  }}
                />
                {item.envioGratis && (
                  <div className="absolute top-0 left-0 bg-green-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl shadow-green-100">
                    ENVÍO GRATIS
                  </div>
                )}
              </div>
            </div>

            <div className="p-10 lg:p-16 flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-xs font-bold text-gray-400 italic uppercase">Producto Verificado</span>
              </div>

              <h1 className="text-5xl font-black text-gray-900 mb-6 leading-[1.1] uppercase tracking-tight">
                {item.titulo}
              </h1>

              <p className="text-gray-500 text-xl mb-10 leading-relaxed font-medium">
                {item.descripcion}
              </p>

              <div className="flex items-baseline gap-5 mb-2">
                <span className="text-6xl font-black text-indigo-600">${item.precio}</span>
                {item.precioAnterior && (
                  <span className="text-xl text-gray-300 line-through font-bold">
                    ${item.precioAnterior}
                  </span>
                )}
              </div>
              
              <p className="text-[10px] font-black text-gray-400 mb-10 tracking-[0.2em] uppercase">
                Stock: {item.stock} unidades
              </p>

              <div className="bg-gray-50 rounded-[32px] p-8 mb-10 border border-gray-100">
                <ItemCount item={item} />
              </div>

              <div className="grid grid-cols-3 gap-6 mt-auto">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600"><Truck size={20} /></div>
                  <span className="text-[9px] font-black text-gray-400 uppercase leading-tight">Envío<br/>Seguro</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600"><ShieldCheck size={20} /></div>
                  <span className="text-[9px] font-black text-gray-400 uppercase leading-tight">Garantía<br/>Oficial</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600"><RefreshCw size={20} /></div>
                  <span className="text-[9px] font-black text-gray-400 uppercase leading-tight">Cambio<br/>Simple</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-indigo-600 rounded-[32px] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 uppercase leading-none">Más de esta<br/>categoría</h3>
              <p className="text-indigo-100 mb-8 max-w-[200px] text-sm font-medium">Descubrí productos similares de {item.categoria}.</p>
              <Link to={`/categoria/${item.categoria}`} className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-2 hover:bg-indigo-50 transition-colors">
                Ver todo <ArrowRight size={14} />
              </Link>
            </div>
            <LayoutGrid className="absolute -right-8 -bottom-8 text-white/10 w-48 h-48 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>

          <div className="bg-white border border-gray-100 rounded-[32px] p-10 relative overflow-hidden group shadow-sm">
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 uppercase leading-none text-gray-900">¿Buscás<br/>ofertas?</h3>
              <p className="text-gray-400 mb-8 max-w-[200px] text-sm font-medium">Encontrá los mejores precios en nuestro catálogo completo.</p>
              <Link to="/Catalogo" className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest inline-flex items-center gap-2 hover:bg-black transition-colors">
                Ir al catálogo <ArrowRight size={14} />
              </Link>
            </div>
            <Truck className="absolute -right-8 -bottom-8 text-gray-50 w-48 h-48 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
          </div>
        </div>

      </div>
    </div>
  );
};