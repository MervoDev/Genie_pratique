import { useState } from "react";
import { createPurchase } from "../service/products.service";
import { useNavigate } from "react-router-dom";

export default function AddPurchase() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(
    new Date().toISOString().slice(0, 16) // Format datetime-local
  );
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName.trim()) {
      alert("Veuillez saisir le nom du produit");
      return;
    }
    
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      alert("Veuillez saisir un prix valide (nombre positif)");
      return;
    }

    setLoading(true);
    try {
      await createPurchase({
        productName: productName.trim(),
        price: priceValue,
        purchaseDate: new Date(purchaseDate).toISOString()
      });
      
      alert("Achat enregistré avec succès !");
      
      // Réinitialiser le formulaire
      setProductName("");
      setPrice("");
      setPurchaseDate(new Date().toISOString().slice(0, 16));
      
      // Rediriger vers l'historique
      navigate("/history");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'achat:", error);
      alert("Erreur lors de l'enregistrement de l'achat. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-purchase">
      <div className="form-container">
        <h2>Enregistrer un Achat</h2>
        <p className="form-description">
          Ajoutez un nouvel achat à votre historique pour suivre vos dépenses
        </p>
        
        <form onSubmit={handleSubmit} className="purchase-form">
          <div className="form-group">
            <label htmlFor="productName">Nom du Produit *</label>
            <input
              id="productName"
              type="text"
              placeholder="Ex: Riz, Lait, Pain..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Prix (FCFA) *</label>
            <input
              id="price"
              type="number"
              placeholder="0"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="purchaseDate">Date et Heure d'Achat *</label>
            <input
              id="purchaseDate"
              type="datetime-local"
              value={purchaseDate}
              onChange={(e) => setPurchaseDate(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn-secondary"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer l'Achat"}
            </button>
          </div>
        </form>

        <div className="form-tips">
          <h4>💡 Conseils</h4>
          <ul>
            <li>Soyez précis dans le nom du produit pour de meilleures statistiques</li>
            <li>Vérifiez le prix avant de valider</li>
            <li>La date peut être modifiée si l'achat n'a pas été fait maintenant</li>
          </ul>
        </div>
      </div>
    </div>
  );
}