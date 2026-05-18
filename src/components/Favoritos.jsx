import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import { Item } from "./Item";
import { ProductSkeleton } from "./ProductSkeleton";
import { AuthRequiredBlock } from "./AuthRequiredBlock";
import { FavoritesEmpty } from "./FavoritesEmpty";

export function Favoritos() {
  const { favorites } = useContext(FavoritesContext);
  const { user, loading: authLoading } = useAuth();

  const isInitialLoading = authLoading || (user && !favorites);

  if (isInitialLoading) {
    return (
      <div className="bg-gray-50 min-h-screen pb-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[1, 2, 3, 4].map((n) => (
              <ProductSkeleton key={n} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthRequiredBlock />;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Mis Favoritos
          </h1>
          <p className="text-sm text-gray-500">
            {favorites.length} {favorites.length === 1 ? "producto guardado" : "productos guardados"}
          </p>
        </div>

        {favorites.length === 0 ? (
          <FavoritesEmpty />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {favorites.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <Item item={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
