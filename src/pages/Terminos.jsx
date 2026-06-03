import { useState } from 'react';
import { terminosSections } from '../constants/terminosData';

export const Terminos = () => {
  const [activeSection, setActiveSection] = useState(terminosSections[0].id);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-20">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 px-4 text-center shadow-inner">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Términos y Condiciones
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Por favor, leé detenidamente los términos legales que regulan el uso de nuestra plataforma y las condiciones de compra.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
              Índice Legal
            </h3>
            {terminosSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeSection === sec.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>
        </aside>

        <section className="col-span-1 lg:col-span-3 space-y-8">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm flex gap-4 items-start">
            <span className="text-2xl mt-0.5">⚠️</span>
            <div className="text-sm text-amber-800 leading-relaxed">
              <span className="font-bold block mb-1">Información importante para el comprador</span>
              Este documento constituye un contrato legal entre vos y nuestra tienda. Te recomendamos prestar especial atención a las secciones de <span className="font-bold">Compatibilidad de Repuestos</span> y <span className="font-bold">Plazos de Devolución</span> antes de concretar tu orden.
            </div>
          </div>

          <div className="space-y-8">
            {terminosSections.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm transition-all hover:border-slate-300"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
                  {sec.title}
                </h2>
                
                <div className="bg-slate-50 border-l-4 border-blue-500 rounded-r-xl p-4 mb-5 text-sm text-slate-600 font-medium leading-relaxed">
                  {sec.summary}
                </div>

                <p className="text-slate-600 text-[15px] sm:text-base leading-relaxed text-justify whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
