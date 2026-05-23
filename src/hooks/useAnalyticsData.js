import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../fireBase/config';

export const useAnalyticsData = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [carritos, setCarritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataSync = async () => {
      try {
        const [ordersSnap, productsSnap, carritosSnap] = await Promise.all([
          getDocs(collection(db, "orders")),
          getDocs(collection(db, "productos")),
          getDocs(collection(db, "carritos"))
        ]);

        setOrders(ordersSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setProducts(productsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setCarritos(carritosSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error cargando analíticas:", error);
      } finally {
        setLoading(false);
      }
    };
    dataSync();
  }, []);

  if (loading) {
    return { loading, metrics: null };
  }

  const ordenesValidas = orders.filter(o => o.status === 'entregada' || o.status === 'generada');
  const facturacionTotal = ordenesValidas.reduce((acc, curr) => acc + Number(curr.total || 0), 0);
  const ticketPromedio = ordenesValidas.length > 0 ? facturacionTotal / ordenesValidas.length : 0;

  const hoyStr = new Date().toLocaleDateString('es-AR');
  const facturacionHoy = ordenesValidas.reduce((acc, order) => {
    if (!order.date) return acc;
    try {
      const orderDate = order.date.seconds ? order.date.toDate() : new Date(order.date);
      return orderDate.toLocaleDateString('es-AR') === hoyStr ? acc + Number(order.total || 0) : acc;
    } catch (e) {
      return acc;
    }
  }, 0);

  const ordenesConCupon = ordenesValidas.filter(o => o.cuponAplicadoId);
  const totalCarritosCreados = ordenesValidas.length + carritos.length;
  const tasaRecuperacion = totalCarritosCreados > 0 ? (ordenesValidas.length / totalCarritosCreados) * 100 : 100;

  const dineroEstancadoCarritos = carritos.reduce((acc, cart) => {
    const totalCarrito = cart.items?.reduce((sub, item) => sub + (Number(item.precio || 0) * Number(item.cantidad || 1)), 0) || 0;
    return acc + totalCarrito;
  }, 0);

  const catalogoOrdenado = [...products].sort((a, b) => Number(b.ventas || 0) - Number(a.ventas || 0));
  const masVendidos = catalogoOrdenado.filter(p => Number(p.ventas || 0) > 0).slice(0, 3);
  const menosVendidos = catalogoOrdenado.filter(p => Number(p.ventas || 0) > 0).slice(-3).reverse();
  const sinVentas = products.filter(p => !p.ventas || Number(p.ventas) === 0);

  return {
    loading,
    metrics: {
      facturacionTotal,
      ticketPromedio,
      facturacionHoy,
      hoyStr,
      totalPedidosConDescuento: ordenesConCupon.length,
      porcentajeUsoCupones: orders.length > 0 ? Math.round((ordenesConCupon.length / orders.length) * 100) : 0,
      tasaRecuperacion,
      cantCarritosAbandonados: carritos.length,
      dineroEstancadoCarritos,
      masVendidos,
      menosVendidos,
      sinVentas,
      cantVentas: ordenesValidas.length
    }
  };
};
