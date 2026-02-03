import { useEffect, useState } from "react";
import { getPurchases, Purchase, getFinancialSummary } from "../service/products.service";

interface FinancialData {
  totalAmount: number;
  totalPurchases: number;
  averageAmount: number;
  monthlyBreakdown: {
    month: string;
    amount: number;
    count: number;
  }[];
}

export default function FinancialSummary() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | 'month' | 'year'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchasesData, financialSummary] = await Promise.all([
          getPurchases(),
          getFinancialSummary().catch(() => null) // Fallback si l'API n'existe pas encore
        ]);
        
        setPurchases(purchasesData);
        
        // Si l'API n'existe pas, calculons localement
        if (!financialSummary) {
          const calculatedData = calculateFinancialData(purchasesData);
          setFinancialData(calculatedData);
        } else {
          setFinancialData(financialSummary);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données financières:", error);
        // Calcul local en cas d'erreur
        const calculatedData = calculateFinancialData(purchases);
        setFinancialData(calculatedData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateFinancialData = (purchasesData: Purchase[]): FinancialData => {
    const totalAmount = purchasesData.reduce((sum, purchase) => sum + purchase.price, 0);
    const totalPurchases = purchasesData.length;
    const averageAmount = totalPurchases > 0 ? totalAmount / totalPurchases : 0;

    // Regroupement par mois
    const monthlyMap = new Map<string, { amount: number; count: number }>();
    
    purchasesData.forEach(purchase => {
      const date = new Date(purchase.purchaseDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { amount: 0, count: 0 });
      }
      
      const current = monthlyMap.get(monthKey)!;
      current.amount += purchase.price;
      current.count += 1;
    });

    const monthlyBreakdown = Array.from(monthlyMap.entries())
      .map(([key, data]) => {
        const [year, month] = key.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return {
          month: date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }),
          amount: data.amount,
          count: data.count
        };
      })
      .sort((a, b) => b.month.localeCompare(a.month));

    return {
      totalAmount,
      totalPurchases,
      averageAmount,
      monthlyBreakdown
    };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getFilteredPurchases = () => {
    const now = new Date();
    switch (selectedPeriod) {
      case 'month':
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        return purchases.filter(p => {
          const purchaseDate = new Date(p.purchaseDate);
          return purchaseDate.getMonth() === currentMonth && 
                 purchaseDate.getFullYear() === currentYear;
        });
      case 'year':
        return purchases.filter(p => {
          const purchaseDate = new Date(p.purchaseDate);
          return purchaseDate.getFullYear() === now.getFullYear();
        });
      default:
        return purchases;
    }
  };

  const filteredPurchases = getFilteredPurchases();
  const filteredTotal = filteredPurchases.reduce((sum, p) => sum + p.price, 0);

  if (loading) {
    return <div className="loading">Chargement du bilan financier...</div>;
  }

  return (
    <div className="financial-summary">
      <div className="summary-header">
        <h2>Bilan Financier</h2>
        <div className="period-selector">
          <label>Période:</label>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value as 'all' | 'month' | 'year')}
            className="period-select"
          >
            <option value="all">Toute la période</option>
            <option value="year">Cette année</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>

      {filteredPurchases.length === 0 ? (
        <div className="no-data">
          <p>Aucune donnée financière disponible pour cette période.</p>
        </div>
      ) : (
        <>
          <div className="financial-cards">
            <div className="financial-card total">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <h3>Montant Total</h3>
                <p className="amount">{formatPrice(filteredTotal)}</p>
              </div>
            </div>

            <div className="financial-card count">
              <div className="card-icon">🛒</div>
              <div className="card-content">
                <h3>Nombre d'Achats</h3>
                <p className="count-value">{filteredPurchases.length}</p>
              </div>
            </div>

            <div className="financial-card average">
              <div className="card-icon">📊</div>
              <div className="card-content">
                <h3>Montant Moyen</h3>
                <p className="amount">
                  {formatPrice(filteredPurchases.length > 0 ? filteredTotal / filteredPurchases.length : 0)}
                </p>
              </div>
            </div>
          </div>

          {selectedPeriod === 'all' && financialData?.monthlyBreakdown && (
            <div className="monthly-breakdown">
              <h3>Répartition Mensuelle</h3>
              <div className="breakdown-list">
                {financialData.monthlyBreakdown.map((month, index) => (
                  <div key={index} className="breakdown-item">
                    <div className="month-info">
                      <h4>{month.month}</h4>
                      <p>{month.count} achat{month.count > 1 ? 's' : ''}</p>
                    </div>
                    <div className="month-amount">
                      {formatPrice(month.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="recent-purchases">
            <h3>Achats de la Période Sélectionnée</h3>
            <div className="purchases-preview">
              {filteredPurchases.slice(0, 5).map((purchase) => (
                <div key={purchase.id} className="purchase-preview-item">
                  <span className="product-name">{purchase.productName}</span>
                  <span className="purchase-price">{formatPrice(purchase.price)}</span>
                </div>
              ))}
              {filteredPurchases.length > 5 && (
                <p className="more-purchases">
                  ... et {filteredPurchases.length - 5} autre{filteredPurchases.length - 5 > 1 ? 's' : ''} achat{filteredPurchases.length - 5 > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}