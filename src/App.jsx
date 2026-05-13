import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { NavBar } from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import { Cart } from "./components/Cart";
import { NotFound } from "./components/NotFound";
import { Toaster } from "sonner";
import { Formulario } from "./components/Formulario";
import { OrdenConfirmacion } from "./components/OrdenConfirmacion";
import { Footer } from "./components/Footer";
import HomeContent from "./components/HomeContent";
import { ScrollToTop } from "./components/ScrollToTop";
import WhatsAppBtn from "./components/WhatsAppBtn";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminContainer from "./pages/AdminContainer";
import { Login } from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" />;
};

const WhatsAppWrapper = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  return <WhatsAppBtn />;
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <BrowserRouter>
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route path="/Catalogo" element={<ItemListContainer />} />
              <Route path="/categoria/:categoryName" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/form" element={<Formulario />} />
              <Route path="/orden-confirmacion/:orderId" element={<OrdenConfirmacion />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><AdminContainer /></ProtectedRoute>} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppWrapper />
          <ScrollToTop />
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </div>
    </AuthProvider>
  );
}

export default App;