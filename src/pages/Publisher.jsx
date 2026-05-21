import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPublisherGames } from "../services/gamesService";

function Publisher() {
  const { id } = useParams();

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPublisherGames() {
      try {
        setLoading(true);
        setError("");

        const data = await getPublisherGames(id);
        setGames(data.results || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les jeux de cet éditeur.");
      } finally {
        setLoading(false);
      }
    }

    fetchPublisherGames();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Jeux de l’éditeur</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game.id} className="bg-white text-black rounded p-4">
            <Link to={`/games/${game.id}`}>
              <h2 className="font-bold underline">{game.name}</h2>
            </Link>

            <p>⭐ {game.rating}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Publisher;