import { useState } from 'react';
import { helpCategories, helpQuestions } from '../constants/helpData';
import { HelpAccordion } from '../components/HelpAccordion';
import { useConfig } from '../context/ConfigContext';

export const Ayuda = () => {
  const [activeCategory, setActiveCategory] = useState('envios');
  const [searchQuery, setSearchQuery] = useState('');
  const { siteConfig } = useConfig();
  const footer = siteConfig?.footer || {};

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredQuestions = helpQuestions.filter((item) => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (searchQuery.trim() !== '') {
      return matchesSearch;
    }
    
    return item.categoryId === activeCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-16">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4 text-center shadow-inner">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Centro de Ayuda
        </h1>
        <p className="text-slate-400 text-base sm:text-lg max-w-md mx-auto mb-8">
          ¿En qué podemos ayudarte hoy? Buscá tu duda o navegá por las categorías.
        </p>
        <div className="max-w-xl mx-auto relative px-2">
          <input
            type="text"
            placeholder="Buscar por palabra clave (ej: envío, garantía)..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-5 pr-12 py-3.5 rounded-full bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg text-sm sm:text-base transition-all"
          />
          <span className="absolute right-6 top-3.5 text-slate-400 text-xl pointer-events-none">
            🔍
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12">
        {searchQuery.trim() === '' && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {helpCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold shadow-sm transition-all duration-200 border text-sm sm:text-base ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-[1.02]'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.title}
              </button>
            ))}
          </div>
        )}

        {searchQuery.trim() !== '' && (
          <div className="mb-6 text-slate-500 text-sm sm:text-base text-center sm:text-left px-2">
            Resultados de búsqueda para: <span className="font-semibold text-slate-800">"{searchQuery}"</span>
          </div>
        )}

        <div className="max-w-3xl mx-auto space-y-4 px-1 min-h-[250px]">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((item) => (
              <HelpAccordion
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <span className="text-4xl block mb-3">📋</span>
              <p className="text-slate-500 font-medium text-lg">
                No encontramos respuestas para tu búsqueda.
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Intentá con otras palabras o contactanos directamente abajo.
              </p>
            </div>
          )}
        </div>

        <div className="mt-20 max-w-4xl mx-auto border-t border-slate-200 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              ¿Aún tenés dudas?
            </h2>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Si no encontraste lo que buscabas, nuestro equipo de soporte está listo para asistirte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm hover:shadow-md transition-all">
              <span className="text-3xl block mb-3">📞</span>
              <h3 className="font-bold text-slate-800 mb-1">Llamanos</h3>
              <p className="text-blue-600 font-semibold text-lg">{footer.phone || '0800-123-4567'}</p>
              <p className="text-xs text-slate-400 mt-2">Lunes a Viernes de 9 a 18 hs</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm hover:shadow-md transition-all">
              <span className="text-3xl block mb-3">✉️</span>
              <h3 className="font-bold text-slate-800 mb-1">Escribinos</h3>
              <a href={`mailto:${footer.email}`} className="text-blue-600 font-semibold text-base break-all hover:underline">
                {footer.email || 'soporte@detodo.com'}
              </a>
              <p className="text-xs text-slate-400 mt-2">Te responderemos a la brevedad</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm hover:shadow-md transition-all sm:col-span-2 md:col-span-1">
              <span className="text-3xl block mb-3">📍</span>
              <h3 className="font-bold text-slate-800 mb-1">Punto de Retiro</h3>
              <p className="text-slate-600 text-sm font-medium">{footer.address || 'Gregorio de Laferrere, Buenos Aires'}</p>
              <p className="text-xs text-slate-400 mt-2">Coordinar retiro previamente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
