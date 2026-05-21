import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getGameDetails,
  getGameAchievements,
  getGameTrailers,
} from "../services/gamesService";
import { useFavorites } from "../contexts/FavoritesContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function GameDetails() {
  const { id } = useParams();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [game, setGame] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGame() {
      try {
        setLoading(true);
        setError("");

        const gameData = await getGameDetails(id);
        const achievementsData = await getGameAchievements(id);
        const trailersData = await getGameTrailers(id);

        setGame(gameData);
        setAchievements(achievementsData.results || []);
        setTrailers(trailersData.results || []);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le jeu.");
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  if (!game) return <p>Jeu introuvable.</p>;

  const favorite = isFavorite(game.id);

  function handleFavoriteClick() {
    if (favorite) {
      removeFavorite(game.id);
      toast.error("Jeu retiré des favoris");
    } else {
      addFavorite(game);
      toast.success("Jeu ajouté aux favoris");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">{game.name}</h1>

      <button
        type="button"
        onClick={handleFavoriteClick}
        className="bg-white text-black px-4 py-2 rounded mb-4 cursor-pointer hover:bg-gray-200 transition"
        aria-label={ favorite ? "Retirer ce jeu des favoris": "Ajouter ce jeu aux favoris"}
      >
        {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>

      <img
        src={ game.background_image ||"https://placehold.co/1200x600/000000/FFFFFF?text=No+Image"}
        alt={game.name}
        className="w-full max-w-3xl rounded mb-6"
      />

      <p className="mb-6">{game.description_raw}</p>

      <h2 className="text-2xl font-bold mb-2">Platforms</h2>
      <ul className="mb-6">
        {game.platforms?.map((platform) => (
          <li key={platform.platform.id}>{platform.platform.name}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-2">Publishers</h2>
      <ul className="mb-6">
        {game.publishers?.map((publisher) => (
            <li key={publisher.id}>
            <Link to={`/publisher/${publisher.id}`} className="underline text-blue-400">
                {publisher.name}
            </Link>
            </li>
        ))}
        </ul>

      <h2 className="text-2xl font-bold mb-2">Tags</h2>
      <ul className="mb-6">
        {game.tags?.slice(0, 10).map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-2">Achievements</h2>
      <ul className="mb-6">
        {achievements.slice(0, 5).map((achievement) => (
          <li key={achievement.id}>
            {achievement.name} - {achievement.percent}%
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-2">Trailer</h2>
      {trailers.length > 0 ? (
        <video controls className="w-full max-w-2xl rounded" aria-label="Trailer du jeu">
          <source src={trailers[0].data.max} type="video/mp4" />
        </video>
      ) : (
        <p>Aucun trailer disponible.</p>
      )}
    </main>
  );
}

export default GameDetails;