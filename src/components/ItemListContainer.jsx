import { useEffect, useState } from "react";
import { ItemList } from "./ItemList";
import { useParams } from "react-router";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    const url = "https://dummyjson.com/products";
    const urlCategory = `https://dummyjson.com/products/category/${categoryName}`;
    fetch(categoryName ? urlCategory : url)
      .then((response) => response.json())
      .then((data) => setItems(data.products));
  }, [categoryName]);

  return (
    <div className="flex flex-wrap justify-center gap-3 ">
       <ItemList items={items} />
    </div>
   
  );
};
