import { useState, useEffect } from "react";
import { CartWidget } from "./CartWidget";
import { NavLink, useNavigate } from "react-router";
import Logo from "../assets/images/Logo.png";
import { Banner } from "./Banner";
import { getCategories } from "../fireBase/dataBase";

export function NavBar() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const useCollapse = () => {
    const [open, setOpen] = useState(false);
    const trigger = {
      onClick: (e) => {
        e.stopPropagation();
        setOpen(!open);
      },
      role: "button",
    };
    const collapse = {
      style: { display: open ? "block" : "none" },
    };
    return { open, trigger, collapse };
  };

  const productos = useCollapse();

  const toggleSideBar = () => {
    setSideBar(!sideBar);
  };

  const closeSidebar = () => {
    setSideBar(false);
  };

  useEffect(() => {
    setIsLoadingCategories(true);
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error al cargar las categorías desde Firebase:", error);
        setCategories([]);
      })
      .finally(() => {
        setIsLoadingCategories(false);
      });
  }, []); // Depende

  return (
    <div className="bg-gray-100 w-full">
      <div className="  flex items-center justify-between">
        <img
          onClick={() => navigate("/")}
          className="size-40 cursor-pointer"
          src={Logo}
          alt="Logo"
        />
        <CartWidget />
      </div>
      <Banner />
      <div className=" flex">
        <nav
          className={`fixed top-0 left-0 z-1 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-gray-900 w-60 ${
            !sideBar ? "-translate-x-full" : "translate-x-0"
          }`}
          onClick={closeSidebar}
        >
          <nav
            className=" mt-5 text-sm font-medium text-gray-500"
            aria-label="Main Navigation"
          >
            <a className="flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
              <svg
                className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1
              1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
              </svg>
              <span onClick={() => navigate("/")}>Pagina principal</span>
            </a>

            <a className="flex items-center px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
              <svg
                className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span onClick={() => navigate("/cart")}>Carrito</span>
            </a>
            <div {...productos.trigger}>
              <div className="flex items-center justify-between px-4 py-3 transition cursor-pointer group hover:bg-gray-800 hover:text-gray-200">
                <div className="flex items-center">
                  <svg
                    className="shrink-0 w-5 h-5 mr-2 text-gray-400 transition group-hover:text-gray-300"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553L16.5 4H5.414l-.894-3H3zM6 16a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  <span>Productos</span>
                </div>
                <svg
                  className={`shrink-0 w-6 h-6 ml-2 transition transform ${
                    productos.open ? "rotate-90" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="mb-4" {...productos.collapse}>
                <ul className="flex-col p-2">
                  {isLoadingCategories ? (
                    <li className="text-white py-2">Cargando categorías...</li>
                  ) : categories.length > 0 ? (
                    categories.map((categoria) => (
                      <li
                        key={categoria}
                        className="text-white py-2 hover:bg-blue-500 rounded-md transition-colors cursor-pointer"
                      >
                        <NavLink to={`/categoria/${categoria}`}>
                          {categoria}
                        </NavLink>
                      </li>
                    ))
                  ) : (
                    <li className="text-white py-2">
                      No se encontraron categorías.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </nav>

        <header className=" hover:cursor-pointer flex items-center justify-between w-full px-4 h-14">
          <button onClick={toggleSideBar}>
            <svg
              className="hover:cursor-pointer w-8 h-8 hover:scale-110 transition-all duration-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </header>
      </div>
    </div>
  );
}
