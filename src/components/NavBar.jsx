import { CartWidget } from "./CartWidget";

const categorias = [
  { id: "frutas", nombre: "Frutas" },
  { id: "verduras", nombre: "Verduras" },
  { id: "organicos", nombre: "Orgánicos" },
  { id: "legumbres-y-granos", nombre: "Legumbres y Granos" },
  { id: "otros-productos", nombre: "Otros Productos" },
  { id: "ofertas", nombre: "Ofertas" },
];
export const NavBar = () => {
  return (
    <nav className="bg-blue-400 flex items-center justify-between p-4">
      <CartWidget />
      <div className="flex-grow flex justify-center">
        <ul className="flex gap-14">
          {categorias.map((categoria) => (
            <li key={categoria.id} className="text-white hover:shadow-black transition-all hover:text-blue-800 cursor-pointer">
              {categoria.nombre}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
