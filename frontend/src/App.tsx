import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductsList";
import AddPurchase from "./pages/AddPurchase";
import TopStatistics from "./pages/TopStatistics";
import PurchaseHistory from "./pages/PurchaseHistory";
import FinancialSummary from "./pages/FinancialSummary";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">Gestion Achats</Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Produits</Link>
            <Link to="/add" className="nav-link">Ajouter</Link>
            <Link to="/history" className="nav-link">Historique</Link>
            <Link to="/statistics" className="nav-link">Statistiques</Link>
            <Link to="/financial" className="nav-link">Bilan</Link>
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
    </BrowserRouter>
  );
}

export default App;
