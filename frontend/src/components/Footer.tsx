export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h3>🛒 Gestion Achats</h3>
          <p>Votre application de confiance pour gérer et analyser vos achats quotidiens.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="LinkedIn">💼</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/add">Ajouter Achat</a></li>
            <li><a href="/history">Historique</a></li>
            <li><a href="/statistics">Statistiques</a></li>
          </ul>
        </div>

        {/* Features */}
        <div className="footer-section">
          <h4>Fonctionnalités</h4>
          <ul>
            <li><a href="/financial">Bilan Financier</a></li>
            <li><a href="/statistics">Top Produits</a></li>
            <li><a href="/history">Suivi des Dépenses</a></li>
            <li><a href="#">Rapports</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <div className="contact-info">
            <p>📧 floratogbonon@gmail.com</p>
            <p>📞 +229 01 43 09 41 36</p>
            <p>📍 AGLA, Cotonou Bénin</p>
            <p>🌐 Développé avec React & TypeScript</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2026 Gestion Achats. Tous droits réservés.</p>
          <div className="tech-stack">
            <span>⚛️ React</span>
            <span>📘 TypeScript</span>
            <span>🎨 CSS3</span>
            <span>⚡ Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}