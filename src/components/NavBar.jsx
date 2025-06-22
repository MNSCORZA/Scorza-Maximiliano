import { useEffect, useState } from "react";
import { CartWidget } from "./CartWidget";
import { Link } from "react-router";

export function NavBar() {
  const [nav, setnav] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((data) => data.json())
      .then((data) => setnav(data));
  }, []);

  return (
    <nav className="bg-blue-400 flex items-center justify-between p-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white   hover:scale-150 transition-all duration-100  hover:rotate-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path 
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          )}
        </svg>
      </button>

      <div
        className={`
          ${isOpen ? "block" : "hidden"}
          absolute top-full left-0 w-40 
          bg-blue-400 border p-2 border-blue-600 rounded-md shadow-lg z-20
        `}
      >
        <ul className="flex-col p-2">
          {nav.map((categoria) => (
            <li
              key={categoria}
              className="text-white py-2 hover:bg-blue-500 rounded-md transition-colors cursor-pointer"
            >
             <Link to={`/categoria/${categoria}`}>{categoria}</Link>
            </li>
          ))}
        </ul>
      </div>
      <h1 className="text-2xl text-white font-bold p-2">DE TODO</h1>

      <CartWidget />
    </nav>
  );
}
