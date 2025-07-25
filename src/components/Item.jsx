import { useNavigate } from "react-router";

export const Item = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className=" p-7 m-4 max-w-sm max-h-sm bg-white border border-gray-300 rounded-lg shadow-md ">
      <img
        className="w-max h-max hover:scale-115 transition-all duration-300"
        src={item?.imagenUrl}
        alt={item?.titulo}
      />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {item?.titulo}
        </h5>

        <div className=" flex justify-between items-center text-gray-900 text-lg">
          ${item?.precio}
          <button
            onClick={() => navigate(`/item/${item?.id}`)}
            className="bg-black/30 border rounded-2xl p-2 flex items-center justify-center hover:text-black hover:border-black hover:border hover:bg-white hover:cursor-pointer"
          >
            ver mas
          </button>
        </div>
      </div>
    </div>
  );
};
