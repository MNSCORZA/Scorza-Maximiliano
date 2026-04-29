export const Banner = () => {
  return (
    <div className="bg-indigo-600 overflow-hidden py-3 shadow-inner">
      <div className="relative flex whitespace-nowrap">
        <div className="animate-marquee flex items-center">
          <span className="text-white text-sm sm:text-base font-bold tracking-wide uppercase px-4">
            ¡Precios que no podrás creer! 🚀 Desata el ahorro con nuestras Ofertas
            Exclusivas y llévate hasta un 50% de descuento en artículos
            seleccionados. • Tu compra superior a $50 tiene envío GRATIS a
            todo el país. • ¡Explora ahora y no te pierdas estas
            oportunidades únicas por tiempo limitado!
          </span>
          <span className="text-white text-sm sm:text-base font-bold tracking-wide uppercase px-4">
            ¡Precios que no podrás creer! 🚀 Desata el ahorro con nuestras Ofertas
            Exclusivas y llévate hasta un 50% de descuento en artículos
            seleccionados. • Tu compra superior a $50 tiene envío GRATIS a
            todo el país. • ¡Explora ahora y no te pierdas estas
            oportunidades únicas por tiempo limitado!
          </span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </div>
  );
};