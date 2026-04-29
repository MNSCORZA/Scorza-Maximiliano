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

  const toggleSideBar = () => setSideBar(!sideBar);
  const closeSidebar = () => setSideBar(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoadingCategories(true);
    getCategories()
      .then((data) => {
        if (isMounted) setCategories(data);
      })
      .catch(() => {
        if (isMounted) setCategories([]);
      })
      .finally(() => {
        if (isMounted) setIsLoadingCategories(false);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <header className="bg-white w-full shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <img
          onClick={() => navigate("/")}
          className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
          src={Logo}
          alt="Logo"
        />
        <div className="flex items-center gap-4">
          <CartWidget />
          <button 
            onClick={toggleSideBar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-8 h-8 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <Banner />

      {sideBar && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <nav
        className={`fixed top-0 left-0 z-[70] h-full w-72 bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold tracking-wider">MENÚ</h2>
            <button onClick={closeSidebar} className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <button 
              onClick={() => { navigate("/"); closeSidebar(); }}
              className="flex items-center w-full px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors"
            >
              <span className="text-lg">Inicio</span>
            </button>

            <div className="overflow-hidden rounded-xl bg-gray-800/50">
              <button 
                {...productos.trigger}
                className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg">Categorías</span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-300 ${productos.open ? "rotate-180" : ""}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div {...productos.collapse} className="bg-gray-800/30">
                <ul className="px-4 py-2 space-y-1">
                  {isLoadingCategories ? (
                    <li className="px-4 py-2 text-gray-500 text-sm">Cargando...</li>
                  ) : (
                    categories.map((cat) => (
                      <li key={cat}>
                        <NavLink
                          to={`/categoria/${cat}`}
                          onClick={closeSidebar}
                          className={({ isActive }) => 
                            `block px-4 py-2 rounded-lg text-sm transition-all ${
                              isActive ? "text-indigo-400 bg-indigo-400/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                            }`
                          }
                        >
                          {cat}
                        </NavLink>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            <button 
              onClick={() => { navigate("/cart"); closeSidebar(); }}
              className="flex items-center w-full px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-lg"
            >
              Carrito
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}