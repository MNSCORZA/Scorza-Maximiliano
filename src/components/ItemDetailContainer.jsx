import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { db } from "../fireBase/config";
import { doc, getDoc } from "firebase/firestore";
import { ItemDetail } from "./ItemDetail";
import { Loader } from "./Loader";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "productos", id);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productoData = { ...snapshot.data(), id: snapshot.id };
          setItem(productoData);

          const historial = JSON.parse(localStorage.getItem("historial_vistos")) || [];
          const historialFiltrado = historial.filter(prod => prod.id !== productoData.id);
          
          const nuevoHistorial = [
            {
              id: productoData.id,
              titulo: productoData.titulo,
              precio: productoData.precio,
              imagenUrl: productoData.imagenUrl,
            },
            ...historialFiltrado
          ].slice(0, 4);

          localStorage.setItem("historial_vistos", JSON.stringify(nuevoHistorial));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader /></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {item && <ItemDetail item={item} />}
    </div>
  );
};
