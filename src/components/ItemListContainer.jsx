import { useEffect, useState } from "react";
import { ItemList } from "./ItemList";
import { useParams } from "react-router";
import { Loader } from "./Loader";
import { getItems, getItemsByCategory } from "../fireBase/dataBase";
import { NotFound } from "./NotFound";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const fetchItems = categoryName
      ? getItemsByCategory(categoryName)
      : getItems();

    fetchItems
      .then((res) => {
        setItems(res);
      })
      .catch((error) => {
        (<NotFound />), error;
        setItems([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryName]);

  return (
    <div className="flex bg-gray-100 flex-wrap justify-center gap-3 ">
      {isLoading ? <Loader /> : <ItemList items={items} />}
    </div>
  );
};
