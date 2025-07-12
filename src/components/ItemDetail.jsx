import { ItemCount } from "./ItemCount";
import { Loader } from "./Loader";

export const ItemDetail = ({ item }) => {
  if (!item) {
    return <Loader />;
  }

  return (
    <div className="flex  flex-col items-center justify-center mx-8 my-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h1 className="flex mb-8 mt-8 font-bold tracking-tight text-gray-900 dark:text-white text-4xl m-6">
        {item?.title}
      </h1>
      <img className=" h-100 w-100 " src={item?.thumbnail} alt={item?.title} />
      <p className="m-3 font-semibold text-2xl text-gray-700 dark:text-gray-400">
        {item?.description}
      </p>
      <div className="flex m-4 p-4 gap-10 text-gray-50 items-center">
        <p className="text-3xl">$ {item?.price}</p>
        <p className="text-2xl">{item?.availabilityStatus}</p>
      </div>
      <div className="flex gap-10 mb-8">
        <ItemCount item={item} />
        
      </div>
    </div>
  );
};
