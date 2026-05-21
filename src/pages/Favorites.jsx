import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFavorites } from "../contexts/FavoritesContext";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  function handleRemoveFavorite(id) {
    removeFavorite(id);
    toast.error("Jeu retiré des favoris");
  }

  if (favorites.length === 0) {
    return (
      <main className="min-h-screen bg-black text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Favoris</h1>
        <p>Aucun jeu en favori.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Favoris</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((game) => (
          <div key={game.id} className="bg-white text-black rounded p-4">
            <Link to={`/games/${game.id}`}>
              <h2 className="font-bold underline">{game.name}</h2>
            </Link>

            <p>⭐ {game.rating}</p>

            <button
              type="button"
              onClick={() => handleRemoveFavorite(game.id)}
              className="mt-3 bg-black text-white px-3 py-2 rounded cursor-pointer"
            >
              Retirer
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Favorites;