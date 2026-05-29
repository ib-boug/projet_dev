import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #0f172a)",
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
            fontSize: "6rem",
            marginBottom: "10px",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "20px",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "30px",
          }}
        >
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          style={{
            background: "#6366f1",
            color: "white",
            padding: "14px 28px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;