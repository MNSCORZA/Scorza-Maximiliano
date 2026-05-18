import { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { addFavoriteToFirebase, removeFavoriteFromFirebase } from "../fireBase/dataBase";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../fireBase/config";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      return;
    }

    const userRef = doc(db, "usuarios", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFavorites(userData.favoritos || []);
      }
    }, (error) => {
      console.error(error);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleFavorite = async (product) => {
    if (!user) return;

    const isFav = favorites.some((item) => item.id === product.id);
    if (isFav) {
      const productToRemove = favorites.find((item) => item.id === product.id);
      await removeFavoriteFromFirebase(user.uid, product.id, productToRemove);
    } else {
      await addFavoriteToFirebase(user.uid, product);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((item) => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
