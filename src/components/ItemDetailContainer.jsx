import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { ItemDetail } from "./ItemDetail";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data));
  }, [id]);

  return (
    <div>
      <ItemDetail item={item} />
    </div>
  );
};
