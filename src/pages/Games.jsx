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
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #111827, #312e81)",
        color: "white",
        padding: "40px",
      }}
    >
      <section style={{ marginBottom: "35px" }}>
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          🎮 Explore Games
        </h1>

        <p style={{ color: "#cbd5e1", fontSize: "1.1rem" }}>
          Discover, filter and sort games from the RAWG database.
        </p>
      </section>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "35px",
          background: "rgba(255,255,255,0.08)",
          padding: "20px",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span>Plateforme</span>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            aria-label="Filtrer par plateforme"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              minWidth: "230px",
            }}
          >
            <option value="">Toutes les plateformes</option>
            <option value="4">PC</option>
            <option value="187">PlayStation 5</option>
            <option value="1">Xbox One</option>
            <option value="7">Nintendo Switch</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span>Tri</span>
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
            aria-label="Trier les jeux"
            style={{
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              minWidth: "230px",
            }}
          >
            <option value="">Tri par défaut</option>
            <option value="-rating">Meilleures notes</option>
            <option value="-released">Plus récents</option>
            <option value="name">Nom A-Z</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", color: "#cbd5e1", padding: "40px" }}>
          Chargement des jeux...
        </p>
      ) : error ? (
        <p style={{ color: "#ef4444" }}>{error}</p>
      ) : games.length === 0 ? (
        <p style={{ textAlign: "center", color: "#cbd5e1", padding: "40px" }}>
          Aucun jeu ne correspond à ces critères sur cette page.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {games.map((game) => (
            <article
              key={game.id}
              style={{
                background: "#1e293b",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 50px rgba(168,85,247,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 20px 40px rgba(0,0,0,0.35)";
              }}
            >
              <img
                src={game.background_image}
                alt={game.name}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "190px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "18px" }}>
                <Link
                  to={`/games/${game.id}`}
                  aria-label={`Voir les détails de ${game.name}`}
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
                    marginBottom: "8px",
                  }}
                >
                  ⭐ {game.rating?.toFixed(1)} / 5
                </p>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.9rem",
                  }}
                >
                  Released: {game.released || "Unknown"}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Games;