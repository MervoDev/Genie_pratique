import { useEffect, useState } from "react";
import { getProducts } from "../service/products.service";
import type { Product } from "../service/products.service";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>🛒 Gestion des Achats</h1>
        <p>Suivez vos dépenses, analysez vos habitudes d'achat et optimisez votre budget</p>
        
        <div className="quick-actions">
          <Link to="/add" className="action-card primary">
            <div className="action-icon">➕</div>
            <h3>Ajouter un Achat</h3>
            <p>Enregistrez rapidement vos nouveaux achats</p>
          </Link>
          
          <Link to="/history" className="action-card">
            <div className="action-icon">📋</div>
            <h3>Historique</h3>
            <p>Consultez tous vos achats passés</p>
          </Link>
          
          <Link to="/statistics" className="action-card">
            <div className="action-icon">📊</div>
            <h3>Statistiques</h3>
            <p>Découvrez vos produits favoris</p>
          </Link>
          
          <Link to="/financial" className="action-card">
            <div className="action-icon">💰</div>
            <h3>Bilan Financier</h3>
            <p>Analysez vos dépenses mensuelles</p>
          </Link>
        </div>
      </div>

      {products.length > 0 && (
        <div className="recent-activity">
          <h2>Activité Récente</h2>
          <div className="products-grid">
            {products.slice(0, 6).map(p => (
              <div key={p.id} className="product-card">
                <strong>{p.name}</strong>
                <span>{p.price} FCFA</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
