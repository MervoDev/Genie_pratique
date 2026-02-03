import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import TopStatistics from "./pages/TopStatistics";
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
            <Link to="/statistics" className="nav-link">Statistiques</Link>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/statistics" element={<TopStatistics />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
