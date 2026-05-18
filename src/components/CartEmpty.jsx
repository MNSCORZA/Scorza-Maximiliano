import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, ArrowRight } from "lucide-react";

export const CartEmpty = () => {
  const [recomendados, setRecomendados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const historial = JSON.parse(localStorage.getItem("historial_vistos")) || [];
    setRecomendados(historial);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-md border border-slate-100 text-center mx-auto mb-12">
          <div className="w-16 h-16 bg-slate-50 text-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Tu carrito está vacío</h2>
          <p className="text-slate-400 text-sm mb-8">Parece que aún no has agregado ningún producto a tu compra.</p>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-md hover:bg-slate-800 transition-all active:scale-[0.98]"
          >
            Explorar catálogo
          </button>
        </div>

        {recomendados.length > 0 && (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-6 px-2">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Productos que te interesaron
              </h3>
              <button 
                onClick={() => navigate("/")} 
                className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors underline flex items-center gap-1"
              >
                <span>Ver más</span>
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recomendados.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    navigate(`/item/${prod.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="group cursor-pointer bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-md hover:border-slate-200 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square w-full bg-slate-50/30 rounded-xl overflow-hidden mb-3 flex items-center justify-center border border-slate-100/50 p-2">
                      <img
                        src={prod.imagenUrl}
                        alt={prod.titulo}
                        className="max-h-24 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-slate-700 line-clamp-2 group-hover:text-slate-900 transition-colors leading-snug">
                      {prod.titulo}
                    </h4>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-50 flex items-baseline justify-between gap-1">
                    <span className="text-base font-black text-slate-900">
                      ${prod.precio}
                    </span>
                    <span className="text-[9px] font-black uppercase text-green-600 tracking-tight shrink-0">
                      Ver artículo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
