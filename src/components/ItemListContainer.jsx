import { useEffect, useState } from "react";
import { ItemList } from "./ItemList";
import { useParams } from "react-router";
import { Loader } from "./Loader";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const url = "https://dummyjson.com/products";
    const urlCategory = `https://dummyjson.com/products/category/${categoryName}`;
    fetch(categoryName ? urlCategory : url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data.products);
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <div className="flex flex-wrap justify-center gap-3 ">
      {isLoading ? <Loader /> : <ItemList items={items} />}
    </div>
  );
};
