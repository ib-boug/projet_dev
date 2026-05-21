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

        setGames(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer les jeux.");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, [platform, ordering]);

  if (loading) return <p>Chargement des jeux...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Games</h1>

      <div className="flex gap-4 mb-6">
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="bg-white text-black px-4 py-2 rounded"
        >
          <option value="">Toutes les plateformes</option>
          <option value="4">PC</option>
          <option value="187">PlayStation 5</option>
          <option value="1">Xbox One</option>
          <option value="7">Nintendo Switch</option>
        </select>

        <select
          value={ordering}
          onChange={(e) => setOrdering(e.target.value)}
          className="bg-white text-black px-4 py-2 rounded"
        >
          <option value="">Tri par défaut</option>
          <option value="-rating">Meilleures notes</option>
          <option value="-released">Plus récents</option>
          <option value="name">Nom A-Z</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white text-black rounded p-4"
          >
            <img
              src={
                game.background_image ||
                "https://placehold.co/600x400/000000/FFFFFF?text=No+Image"
              }
              alt={game.name}
              className="w-full h-48 object-cover rounded mb-3"
            />

            <Link to={`/games/${game.id}`}>
              <h2 className="font-bold underline">
                {game.name}
              </h2>
            </Link>

            <p>⭐ {game.rating}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Games;