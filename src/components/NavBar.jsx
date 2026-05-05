import { useState, useEffect } from "react";
import { CartWidget } from "./CartWidget";
import { NavLink, useNavigate } from "react-router";
import Logo from "../assets/images/Logo.png";
import { Banner } from "./Banner";
import { getCategories } from "../fireBase/dataBase";
import { Search } from "lucide-react";

export function NavBar() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/Catalogo?search=${searchTerm.toLowerCase()}`);
      setSearchTerm("");
    }
  };

  const useCollapse = () => {
    const [open, setOpen] = useState(false);
    const trigger = { onClick: (e) => { e.stopPropagation(); setOpen(!open); }, role: "button" };
    const collapse = { style: { display: open ? "block" : "none" } };
    return { open, trigger, collapse };
  };

  const productos = useCollapse();
  const toggleSideBar = () => setSideBar(!sideBar);
  const closeSidebar = () => setSideBar(false);

  useEffect(() => {
    setIsLoadingCategories(true);
    getCategories().then((data) => setCategories(data)).finally(() => setIsLoadingCategories(false));
  }, []);

  return (
    <header className="bg-white w-full shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <img onClick={() => navigate("/")} className="h-16 md:h-20 w-auto cursor-pointer" src={Logo} alt="Logo" />
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative hidden md:block">
          <input type="text" placeholder="Buscar en De Todo..." className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button type="submit" className="absolute right-3 top-2 text-gray-400"><Search size={18} /></button>
        </form>
        <div className="flex items-center gap-4"><CartWidget /><button onClick={toggleSideBar} className="p-2"><Search size={24} className="md:hidden" /></button></div>
      </div>
      <Banner />
      {sideBar && <div className="fixed inset-0 bg-black/50 z-[60]" onClick={closeSidebar} />}
      <nav className={`fixed top-0 left-0 z-[70] h-full w-72 bg-gray-900 text-white transform transition-transform ${sideBar ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6">
          <button onClick={closeSidebar} className="mb-8">Cerrar</button>
          <div className="space-y-4">
            <button onClick={() => { navigate("/"); closeSidebar(); }}>Inicio</button>
            <div {...productos.trigger} className="cursor-pointer">Categorías</div>
            <div {...productos.collapse} className="pl-4 space-y-2">
              {categories.map(cat => <NavLink key={cat} to={`/categoria/${cat}`} onClick={closeSidebar} className="block text-sm text-gray-400">{cat}</NavLink>)}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}