import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { getBannerSettings } from '../fireBase/dataBase';

export const FeaturesAndBrands = ({ productos }) => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getBannerSettings('countdown_offer');
        if (data) setSettings(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (!settings || !settings.active || !settings.endDate) return;

    const calculateTime = () => {
      const difference = +new Date(settings.endDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [settings]);

  // Lógica para extraer marcas reales en tiempo de ejecución basadas en tus productos
  const marcasReales = useMemo(() => {
    if (!productos || productos.length === 0) return [];

    const palabrasNoPermitidas = [
      'kit', 'filtro', 'lampara', 'aspiradora', 'bomba', 'aceite', 'pastilla', 
      'cable', 'freno', 'bateria', 'juego', 'soporte', 'optica', 'led'
    ];

    const marcasSet = new Set();

    productos.forEach((prod) => {
      if (prod.stock <= 0 || !prod.titulo) return;

      // Limpiamos el título y lo separamos en palabras
      const palabras = prod.titulo
        .trim()
        .replace(/[-–—]/g, ' ') // Cambiamos guiones por espacios
        .split(/\s+/);

      if (palabras.length === 0) return;

      // Evaluamos la primera palabra del título del producto
      let marcaCandidata = palabras[0].toLowerCase();

      // Si la primera palabra es genérica (ej: "Filtro"), intentamos con la segunda (ej: "Bosch")
      if (palabrasNoPermitidas.includes(marcaCandidata) && palabras.length > 1) {
        marcaCandidata = palabras[1].toLowerCase();
      }

      // Si pasa el filtro y tiene una longitud razonable, la guardamos manteniendo el formato original
      if (!palabrasNoPermitidas.includes(marcaCandidata) && marcaCandidata.length > 1) {
        // Encontramos cómo se escribe originalmente en tu título (respetando mayúsculas/minúsculas)
        const palabraOriginal = palabras.find(p => p.toLowerCase() === marcaCandidata) || palabras[0];
        marcasSet.add(palabraOriginal);
      }
    });

    // Lo convertimos a un array limpio y ordenado alfabéticamente
    return Array.from(marcasSet).sort().map(marca => ({
      name: marca,
      slug: marca.toLowerCase()
    }));
  }, [productos]);

  const handleBrandClick = (slug) => {
    navigate(`/Catalogo?marca=${slug}`);
  };

  const bgStyles = {
    azul: {
      top: "from-gray-900 via-indigo-950 to-blue-950",
      bottom: "bg-blue-600/20",
      button: "text-gray-900 bg-white hover:bg-orange-500 hover:text-white",
      subTag: "text-blue-400"
    },
    rojo: {
      top: "from-neutral-950 via-red-950 to-neutral-900",
      bottom: "bg-red-600/20",
      button: "text-white bg-red-600 hover:bg-red-700",
      subTag: "text-red-400"
    },
    premium: {
      top: "from-neutral-950 via-neutral-900 to-neutral-800",
      bottom: "bg-amber-500/10 border-t lg:border-t-0 lg:border-l border-amber-500/20",
      button: "text-neutral-900 bg-amber-500 hover:bg-amber-600 font-black",
      subTag: "text-amber-400"
    }
  };

  const currentStyle = settings ? (bgStyles[settings.colorPalette] || bgStyles.azul) : bgStyles.azul;

  return (
    <section className="py-12 bg-white font-sans">
      <div className="container mx-auto px-4 max-w-7xl space-y-16">

        {settings && settings.active && (
          <div className={`grid grid-cols-1 lg:grid-cols-3 rounded-2xl overflow-hidden bg-gradient-to-br ${currentStyle.top} text-white shadow-xl`}>
            <div className="p-8 md:p-12 lg:col-span-2 flex flex-col justify-between space-y-6">
              <div>
                <span className="bg-orange-500 text-white font-black text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                  {settings.tagText}
                </span>
                <h3 className="text-2xl md:text-4xl font-black tracking-tight mt-4 leading-tight">
                  {settings.title}
                </h3>
                <p className="text-sm text-gray-300 mt-2 max-w-xl">
                  {settings.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">Termina en:</span>
                <div className="flex gap-2">
                  {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((value, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/10 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg text-orange-400 tabular-nums">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${currentStyle.bottom} border-t lg:border-t-0 lg:border-l border-white/10 p-8 flex flex-col justify-center items-start lg:items-center text-left lg:text-center relative overflow-hidden`}>
              <div className="relative z-10 space-y-4 w-full lg:max-w-xs">
                <div className={`text-xs font-bold ${currentStyle.subTag} uppercase tracking-widest`}>
                  {settings.bottomTitle}
                </div>
                <div className="text-xl font-extrabold tracking-tight">
                  {settings.bottomSubtitle}
                </div>
                <Link to={settings.link || "/Catalogo"} className="block w-full">
                  <button className={`w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-md ${currentStyle.button}`}>
                    <span>{settings.buttonText || "Aprovechar Oferta"}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {marcasReales.length > 0 && (
          <div className="pt-4">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Garantía de Calidad</span>
              <h4 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">Nuestras Marcas Disponibles</h4>
            </div>

            <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-none opacity-95 hover:opacity-100 transition-opacity duration-300">
              {marcasReales.map((brand, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBrandClick(brand.slug)}
                  className="bg-gray-50 border border-gray-150 rounded-xl p-4 min-w-[140px] sm:min-w-[180px] h-20 flex items-center justify-center transition-all duration-300 cursor-pointer snap-center shrink-0 shadow-sm hover:shadow-md hover:border-blue-300 group"
                >
                  <span className="font-black text-gray-500 tracking-widest text-xs sm:text-sm uppercase group-hover:text-blue-600 transition-colors duration-200 text-center break-words">
                    {brand.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
