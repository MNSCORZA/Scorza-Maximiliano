export const Banner = () => {
  return (
    <div>
      <marquee
        behavior="scroll"
        direction="left"
        className="flex items-center gap-4 text-2xl text-center text-gray-900 text-bold m-2 "
      >
        ¡Precios que no podrás creer! 🚀 Desata el ahorro con nuestras Ofertas
        Exclusivas y llévate hasta un 50% de descuento en artículos
        seleccionados. ¿Lo mejor? Tu compra superior a $50 tiene envío gratis a
        todo el país. Es el momento perfecto para renovar, encontrar ese regalo
        especial o darte un gusto. ¡Explora ahora y no te pierdas estas
        oportunidades únicas por tiempo limitado!
      </marquee>
    </div>
  );
};
