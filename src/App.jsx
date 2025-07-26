import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Cart } from "./components/Cart";
import { NotFound } from "./components/NotFound";
import { Toaster } from "sonner";
import { Formulario } from "./components/Formulario";
import { OrdenConfirmacion } from "./components/OrdenConfirmacion";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route
            path="/categoria/:categoryName"
            element={<ItemListContainer />}
          />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/form" element={<Formulario />} />
          <Route
            path="/orden-confirmacion/:orderId"
            element={<OrdenConfirmacion />}
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
