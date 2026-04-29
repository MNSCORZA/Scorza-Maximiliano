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
    let isMounted = true;
    setIsLoading(true);

    const fetchItems = categoryName
      ? getItemsByCategory(categoryName)
      : getItems();

    fetchItems
      .then((res) => {
        if (isMounted) setItems(res);
      })
      .catch(() => {
        if (isMounted) setItems([]);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryName]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {categoryName && (
          <h2 className="text-3xl font-bold text-gray-800 mb-8 capitalize border-b pb-4">
            Categoría: {categoryName}
          </h2>
        )}
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ItemList items={items} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <NotFound />
          </div>
        )}
      </div>
    </main>
  );
};