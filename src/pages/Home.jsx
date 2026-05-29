import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        background: "linear-gradient(135deg, #020617, #111827, #312e81)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          🎮 Discover Your Next Favorite Game
        </h1>

       

        <button
          onClick={() => navigate("/games")}
          style={{
            padding: "16px 32px",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            background: "#a855f7",
            color: "white",
            boxShadow: "0 10px 30px rgba(139,92,246,0.35)",
            transition: "all 0.2s ease",
          }}
        >
          Browse Games
        </button>
      </div>
    </div>
  );
}

export default Home;