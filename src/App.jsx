import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './fireBase/config';
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
import { ConfigProvider, useConfig } from "./context/ConfigContext";
import { MaintenanceBlock } from "./components/MaintenanceBlock";
import AdminContainer from "./pages/AdminContainer";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { ResetPassword } from "./pages/ResetPassword";
import UserPanel from "./pages/UserPanel";
import { SideCart } from "./components/SideCart";
import { Favoritos } from "./components/Favoritos";
import { OfertasContainer } from "./components/OfertasContainer";
import { Arrepentimiento } from "./components/Arrepentimiento";
import { Ayuda } from "./pages/Ayuda";
import { Terminos } from "./pages/Terminos";

const ConfigContext = createContext();

export const ConfigContextComponent = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState({
    maintenanceMode: false,
    footer: {
      address: '',
      phone: '',
      email: '',
      socials: { instagram: '', facebook: '', whatsapp: '' }
    }
  });
  const [loadingConfig, setLoadingConfig] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'config', 'global'), (docSnap) => {
      if (docSnap.exists()) {
        setSiteConfig(docSnap.data());
      }
      setLoadingConfig(false);
    }, (error) => {
      console.error(error);
      setLoadingConfig(false);
    });

    return () => unsub();
  }, []);

  return (
    <ConfigContext.Provider value={{ siteConfig, loadingConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfigContext = () => useContext(ConfigContext);

const ProtectedRoute = ({ children, adminOnly = false, requireEdit = false, requireDelete = false }) => {
  const { user, userData, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !userData?.permisos?.isAdmin) return <Navigate to="/" />;
  if (requireEdit && !userData?.permisos?.editar) return <Navigate to="/admin" />;
  if (requireDelete && !userData?.permisos?.borrar) return <Navigate to="/admin" />;
  return children;
};

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isDocAdmin = location.pathname.startsWith('/admin');
  const { siteConfig, loadingConfig } = useConfig();
  const { userData } = useAuth();

  if (!loadingConfig && siteConfig.maintenanceMode && !userData?.permisos) {
    return <MaintenanceBlock />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <NavBar />
      <SideCart />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      {!isDocAdmin && <WhatsAppBtn />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConfigProvider>
          <CartProvider>
            <FavoritesProvider>
              <LayoutWrapper>
                <Routes>
                  <Route path="/" element={<HomeContent />} />
                  <Route path="/Catalogo" element={<ItemListContainer />} />
                  <Route path="/categoria/:categoryName" element={<ItemListContainer />} />
                  <Route path="/item/:id" element={<ItemDetailContainer />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/favoritos" element={<Favoritos />} />
                  <Route path="/ofertas" element={<OfertasContainer />} />
                  <Route path="/arrepentimiento" element={<Arrepentimiento />} />
                  <Route path="/ayuda" element={<Ayuda />} />
                  <Route path="/terminos" element={<Terminos />} />
                  <Route path="/form" element={<Formulario />} />
                  <Route path="/orden-confirmacion/:orderId" element={<OrdenConfirmacion />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminContainer /></ProtectedRoute>} />
                  <Route path="/mi-cuenta" element={<ProtectedRoute><UserPanel /></ProtectedRoute>} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </LayoutWrapper>
              <Toaster position="top-right" richColors />
            </FavoritesProvider>
          </CartProvider>
        </ConfigProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
