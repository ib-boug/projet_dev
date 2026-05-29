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
      <main
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #020617, #111827, #312e81)",
          color: "white",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "20px",
          }}
        >
          ❤️ Favorites
        </h1>

        <p
          style={{
            color: "#cbd5e1",
          }}
        >
          Aucun jeu en favori.
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #111827, #312e81)",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          marginBottom: "30px",
        }}
      >
         Favorites
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {favorites.map((game) => (
          <article
            key={game.id}
            style={{
              background: "#1e293b",
              borderRadius: "18px",
              padding: "20px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
            }}
          >
            <Link
              to={`/games/${game.id}`}
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              <h2
                style={{
                  fontSize: "1.3rem",
                  marginBottom: "12px",
                }}
              >
                {game.name}
              </h2>
            </Link>

            <p
              style={{
                color: "#facc15",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              ⭐ {game.rating}
            </p>

            <button
              type="button"
              onClick={() => handleRemoveFavorite(game.id)}
              style={{
                background: "#a855f7",
                color: "white",
                border: "none",
                padding: "12px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Retirer des favoris
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Favorites;