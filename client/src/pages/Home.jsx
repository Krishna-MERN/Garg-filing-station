import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Top Title Bar */}
      <div className="top-title">
        Garg Filling Station Management System
      </div>

      {/* Header */}
      <div className="header">
        <div className="header-left">
          <img src="/logo.png" alt="HP Gas" />

          <div>
            <h2>HP Gas Agency Portal</h2>
            <p>Authorized LPG Distribution Management System</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="home">

        <p className="home-sub">
          Welcome to the official management portal for stock, sales and profit tracking.
        </p>

        <div className="home-grid">

          <button
            className="home-card"
            onClick={() => navigate("/stock")}
          >
            <h2>📦 Manage Stock</h2>
            <p>Update filled and empty cylinders</p>
          </button>

          <button
            className="home-card"
            onClick={() => navigate("/selling")}
          >
            <h2>💰 Selling POS</h2>
            <p>Sell cylinders and update stock</p>
          </button>

          <button
            className="home-card"
            onClick={() => navigate("/profit")}
          >
            <h2>📊 Profit Report</h2>
            <p>View daily and monthly profit</p>
          </button>

        </div>

      </div>

      {/* Footer */}
      <div className="footer">
        © 2026 Garg Filling Station | Authorized HP Gas Distributor
      </div>

    </div>
  );
}

export default Home;