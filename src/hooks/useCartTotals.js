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
          if (rule.tipo === "marca_segunda_unidad_descuento") {
            const itemsDeMarca = cart.filter(item => (item.marca || "").toLowerCase() === (rule.marcaTarget || "").toLowerCase());
            itemsDeMarca.forEach(item => {
              if (item.cantidad >= 2) {
                const cantidadPares = Math.floor(item.cantidad / 2);
                autoDiscount += cantidadPares * (item.precio * (rule.porcentajeDescuento / 100));
              }
            });
          }

          if (rule.tipo === "envio_gratis_monto_y_categoria") {
            const tieneCategoria = cart.some(item => (item.categoria || "").toLowerCase() === (rule.categoriaTarget || "").toLowerCase());
            if (calculatedBase >= rule.montoMinimo && tieneCategoria) {
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
