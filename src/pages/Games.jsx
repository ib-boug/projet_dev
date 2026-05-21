import { useEffect, useState } from "react";
import { getGames } from "../services/gamesService";
import { Link } from "react-router-dom";

function Games() {
  const [games, setGames] = useState([]);
  const [platform, setPlatform] = useState("");
  const [ordering, setOrdering] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        setError("");

        const data = await getGames({
          platforms: platform || undefined,
          ordering: ordering || undefined,
        });

        let finalGames = data.results || [];

        if (ordering === "-released") {
        finalGames = [...finalGames].sort((a, b) => {
            if (!a.released) return 1;
            if (!b.released) return -1;
            
            return new Date(b.released) - new Date(a.released);
        });
        }

        setGames(finalGames);

      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les jeux.");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [platform, ordering]);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Games</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <label className="flex flex-col gap-2">
          <span>Plateforme</span>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded"
            aria-label="Filtrer par plateforme"
          >
            <option value="">Toutes les plateformes</option>
            <option value="4">PC</option>
            <option value="187">PlayStation 5</option>
            <option value="1">Xbox One</option>
            <option value="7">Nintendo Switch</option>
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span>Tri</span>
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            className="bg-white text-black px-4 py-2 rounded"
            aria-label="Trier les jeux"
          >
            <option value="">Tri par défaut</option>
            <option value="-rating">Meilleures notes</option>
            <option value="-released">Plus récents</option>
            <option value="name">Nom A-Z</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-10">Chargement des jeux...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : games.length === 0 ? (
        <p className="text-gray-400 text-center py-10">Aucun jeu ne correspond à ces critères sur cette page.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div key={game.id} className="bg-white text-black rounded p-4 flex flex-col justify-between">
              <div>
                <img
                  src={game.background_image}
                  alt={game.name}
                  className="w-full h-48 object-cover rounded mb-3"
                  loading="lazy"
                />

                <Link to={`/games/${game.id}`} aria-label={`Voir les détails de ${game.name}`}>
                  <h2 className="font-bold underline hover:text-blue-600 transition-colors">{game.name}</h2>
                </Link>
              </div>

              <p className="mt-2">⭐ {game.rating.toFixed(1)} / 5</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Games;