import { useEffect, useState } from "react";
import { getPurchases } from "../service/products.service";
import type { Purchase } from "../service/products.service";

export default function PurchaseHistory() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await getPurchases();
        setPurchases(data);
      } catch (error) {
        console.error("Erreur lors du chargement de l'historique:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const sortedPurchases = [...purchases].sort((a, b) => {
    const dateA = new Date(a.purchaseDate).getTime();
    const dateB = new Date(b.purchaseDate).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <div className="loading">Chargement de l'historique...</div>;
  }

  return (
    <div className="purchase-history">
      <div className="history-header">
        <h2>Historique des Achats</h2>
        <div className="sort-controls">
          <label>Trier par date:</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value as 'desc' | 'asc')}
            className="sort-select"
          >
            <option value="desc">Plus récent au plus ancien</option>
            <option value="asc">Plus ancien au plus récent</option>
          </select>
        </div>
      </div>

      {sortedPurchases.length === 0 ? (
        <div className="no-data">
          <p>Aucun achat enregistré pour le moment.</p>
          <p>Commencez par ajouter vos premiers achats !</p>
        </div>
      ) : (
        <div className="purchases-list">
          <div className="purchases-count">
            <p>{sortedPurchases.length} achat{sortedPurchases.length > 1 ? 's' : ''} enregistré{sortedPurchases.length > 1 ? 's' : ''}</p>
          </div>
          
          {sortedPurchases.map((purchase) => (
            <div key={purchase.id} className="purchase-item">
              <div className="purchase-main">
                <div className="product-name">
                  <h3>{purchase.productName}</h3>
                </div>
                <div className="purchase-price">
                  {formatPrice(purchase.price)}
                </div>
              </div>
              <div className="purchase-date">
                <span className="date-label">Acheté le:</span>
                <span className="date-value">{formatDate(purchase.purchaseDate)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}