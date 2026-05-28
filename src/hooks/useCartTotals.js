import { useState, useEffect } from "react";
import { getCartRules } from "../fireBase/dataBase";

export const useCartTotals = (cart) => {
  const [totals, setTotals] = useState({ base: 0, descuentoAutomatico: 0, total: 0, envioGratis: false });

  useEffect(() => {
    const fetchRulesAndCalculate = async () => {
      const calculatedBase = cart.reduce((acc, prod) => {
        const precio = typeof prod.precio === "number" ? prod.precio : parseFloat(prod.precio) || 0;
        const cantidad = typeof prod.cantidad === "number" ? prod.cantidad : parseInt(prod.cantidad) || 0;
        return acc + precio * cantidad;
      }, 0);

      let autoDiscount = 0;
      let freeShipping = false;

      try {
        const rules = await getCartRules();

        rules.forEach(rule => {
          const tipoRegla = (rule.tipo || "").toLowerCase();
          const marcaRegla = (rule.marcaTarget || "").toLowerCase().trim();
          const categoriaRegla = (rule.categoriaTarget || "").toLowerCase().trim();

          if (tipoRegla.includes("segunda_unidad") || tipoRegla.includes("2da unidad")) {
            const itemsDeMarca = cart.filter(item => (item.marca || "").toLowerCase().trim() === marcaRegla);
            
            itemsDeMarca.forEach(item => {
              if (item.cantidad >= 2) {
                const cantidadPares = Math.floor(item.cantidad / 2);
                const porcentaje = Number(rule.porcentajeDescuento) || 50;
                autoDiscount += cantidadPares * (item.precio * (porcentaje / 100));
              }
            });

            if (rule.envioGratis && cart.some(item => (item.marca || "").toLowerCase().trim() === marcaRegla)) {
              freeShipping = true;
            }
          }

          if (tipoRegla.includes("envio_gratis_marca") || (tipoRegla.includes("marca") && rule.envioGratis)) {
            const tieneMarca = cart.some(item => (item.marca || "").toLowerCase().trim() === marcaRegla);
            if (tieneMarca) {
              freeShipping = true;
            }
          }

          if (tipoRegla.includes("monto_y_categoria")) {
            const tieneCategoria = cart.some(item => (item.categoria || "").toLowerCase().trim() === categoriaRegla);
            if (calculatedBase >= Number(rule.montoMinimo) && tieneCategoria) {
              freeShipping = true;
            }
          }

          if (tipoRegla.includes("envio_gratis_monto") || (rule.montoMinimo && rule.envioGratis && !rule.categoriaTarget)) {
            if (calculatedBase >= Number(rule.montoMinimo)) {
              freeShipping = true;
            }
          }
        });
      } catch (error) {
        console.error(error);
      }

      setTotals({
        base: calculatedBase,
        descuentoAutomatico: autoDiscount,
        total: Math.max(0, calculatedBase - autoDiscount),
        envioGratis: freeShipping
      });
    };

    fetchRulesAndCalculate();
  }, [cart]);

  return totals;
};
