import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { ItemDetail } from "./ItemDetail";
import { getItemId } from "../fireBase/dataBase";

export const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getItemId(id).then((data) => {
      setItem(data);
    });
  }, [id]);

  return (
    <div>
      <ItemDetail item={item} />
    </div>
  );
};
