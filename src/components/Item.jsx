import { useNavigate } from "react-router";

export const Item = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className=" p-7 m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800/90 dark:border-gray-700">
      <img src={item.thumbnail} alt={item.title} />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.description}
        </p>
        <div className=" flex justify-between items-center text-gray-50 text-lg">
          ${item.price}
          <button
            onClick={() => navigate(`/item/${item.id}`)}
            className="bg-black/30 border rounded-2xl p-2 flex items-center justify-center hover:text-black hover:border-black hover:border hover:bg-white hover:cursor-pointer"
          >
            ver mas
          </button>
        </div>
      </div>
    </div>
  );
};
