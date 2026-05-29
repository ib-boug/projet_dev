import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "rgba(18, 18, 18, 0.95)",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontSize: "1.3rem",
          fontWeight: "bold",
        }}
      >
        🎮 RAWG Explorer
      </Link>

      <input
        type="text"
        placeholder="Search games..."
        aria-label="Search games"
        style={{
          width: "35%",
          padding: "12px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "#1f2937",
          color: "white",
          outline: "none",
        }}
      />

      <div style={{ display: "flex", gap: "28px" }}>
        {["Home", "Games", "Favorites"].map((item) => (
          <Link
            key={item}
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
