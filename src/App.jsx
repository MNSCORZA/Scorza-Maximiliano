import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router";
import { NavBar } from "./components/NavBar";
import { ItemListContainer } from "./components/ItemListContainer";
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
import { CartProvider } from "./context/CartProvider";
import { FavoritesProvider } from "./context/FavoritesContext";
import AdminContainer from "./pages/AdminContainer";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { ResetPassword } from "./pages/ResetPassword";
import UserPanel from "./pages/UserPanel";
import { SideCart } from "./components/SideCart";
import { Favoritos } from "./components/Favoritos";
import { OfertasContainer } from "./components/OfertasContainer";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, userData, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !userData?.permisos?.isAdmin) return <Navigate to="/" />;
  return children;
};

const WhatsAppWrapper = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  return <WhatsAppBtn />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col">
              <ScrollToTop />
              <NavBar />
              <SideCart />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomeContent />} />
                  <Route path="/Catalogo" element={<ItemListContainer />} />
                  <Route path="/categoria/:categoryName" element={<ItemListContainer />} />
                  <Route path="/item/:id" element={<ItemDetailContainer />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favoritos" element={<Favoritos />} />
                  <Route path="/ofertas" element={<OfertasContainer />} />
                  <Route path="/form" element={<Formulario />} />
                  <Route path="/orden-confirmacion/:orderId" element={<OrdenConfirmacion />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminContainer /></ProtectedRoute>} />
                  <Route path="/mi-cuenta" element={<ProtectedRoute><UserPanel /></ProtectedRoute>} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppWrapper />
              <Toaster position="top-right" richColors />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
