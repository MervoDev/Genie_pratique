import { useEffect, useState } from "react";
import { getTopProducts, TopProduct } from "../service/products.service";

export default function TopStatistics() {
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const data = await getTopProducts();
        setTopProducts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des statistiques...</div>;
  }

  return (
    <div className="top-statistics">
      <h2>Top Produits - Statistiques</h2>
      <p>Produits les plus achetés (par nombre d'occurrences)</p>
      
      {topProducts.length === 0 ? (
        <div className="no-data">
          <p>Aucune donnée disponible. Ajoutez des achats pour voir les statistiques.</p>
        </div>
      ) : (
        <div className="statistics-list">
          {topProducts.map((product, index) => (
            <div key={product.productName} className="stat-item">
              <div className="rank">#{index + 1}</div>
              <div className="product-info">
                <h3>{product.productName}</h3>
                <p>{product.count} achat{product.count > 1 ? 's' : ''}</p>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${(product.count / topProducts[0].count) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}