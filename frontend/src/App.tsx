import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import ProductList from "./pages/ProductsList";
import AddPurchase from "./pages/AddPurchase";
import TopStatistics from "./pages/TopStatistics";
import PurchaseHistory from "./pages/PurchaseHistory";
import FinancialSummary from "./pages/FinancialSummary";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo" onClick={closeMenu}>
              Gestion Achats
            </Link>
            <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
              <Link to="/" className="nav-link" onClick={closeMenu}>Accueil</Link>
              <Link to="/add" className="nav-link" onClick={closeMenu}>Ajouter</Link>
              <Link to="/history" className="nav-link" onClick={closeMenu}>Historique</Link>
              <Link to="/statistics" className="nav-link" onClick={closeMenu}>Statistiques</Link>
              <Link to="/financial" className="nav-link" onClick={closeMenu}>Bilan</Link>
            </div>
            <div className="nav-toggle" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddPurchase />} />
            <Route path="/history" element={<PurchaseHistory />} />
            <Route path="/statistics" element={<TopStatistics />} />
            <Route path="/financial" element={<FinancialSummary />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
