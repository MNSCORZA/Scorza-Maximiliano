import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { ItemDetail } from "./ItemDetail";
import { getItemId } from "../fireBase/dataBase";
import { Loader } from "./Loader";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    
    getItemId(id)
      .then((data) => {
        setItem(data);
      })
      .catch((error) => {
        console.error("Error al obtener producto:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white">
      {item ? <ItemDetail item={item} /> : <p className="text-center py-20">Producto no encontrado</p>}
    </div>
  );
};