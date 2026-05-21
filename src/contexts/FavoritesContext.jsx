import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(game) {
    setFavorites((prev) => {
      const alreadyExists = prev.some((fav) => fav.id === game.id);

      if (alreadyExists) return prev;

      return [...prev, game];
    });
  }

  function removeFavorite(id) {
    setFavorites((prev) =>
      prev.filter((game) => game.id !== id)
    );
  }

  function isFavorite(id) {
    return favorites.some((game) => game.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}