# Gestion des Achats - Application Web MVC

Une application web moderne pour enregistrer et analyser vos achats avec des fonctionnalités de statistiques et de suivi financier.

## 🚀 Fonctionnalités

### ✅ Fonctionnalités Implémentées

#### 1. **Ajout d'Achat** (`/add`)
- Formulaire intuitif pour enregistrer un achat
- Validation des données (nom produit, prix positif, date)
- Interface utilisateur moderne et responsive

#### 2. **Historique des Achats** (`/history`) 
- Affichage de tous les achats triés par date
- Options de tri : du plus récent au plus ancien (et vice versa)
- Formatage des dates et prix en français
- Interface claire avec compteur d'achats

#### 3. **Top Statistiques** (`/statistics`)
- Calcul du produit le plus acheté par nombre d'occurrences
- Affichage sous forme de classement avec barres de progression
- Visualisation claire des tendances d'achat

#### 4. **Bilan Financier** (`/financial`)
- Montant total des dépenses
- Nombre total d'achats
- Montant moyen par achat
- Répartition mensuelle des dépenses
- Filtrage par période (mois, année, tout)

## 🛠️ Architecture Technique

### Frontend (React + TypeScript)
```
frontend/
├── src/
│   ├── api/           # Configuration Axios
│   ├── components/    # Composants réutilisables
│   ├── pages/         # Pages de l'application
│   │   ├── AddPurchase.tsx      # Ajout d'achat
│   │   ├── PurchaseHistory.tsx  # Historique
│   │   ├── TopStatistics.tsx    # Statistiques
│   │   └── FinancialSummary.tsx # Bilan financier
│   ├── service/       # Services API
│   └── App.tsx        # Routage principal
```

### Gestion des Branches Git
Le projet utilise une approche **feature branch** :
- `main` : branche principale
- `fonctionnalité/top-statistiques` : Statistiques des produits
- `fonctionnalité/historique-achats` : Historique trié
- `fonctionnalité/bilan-financier` : Bilan financier

## 🎯 Workflow Git Optimisé

Pour éviter les allers-retours entre branches :

```bash
# Créer et basculer sur nouvelle branche
git checkout -b fonctionnalité/nom-feature

# Développer la fonctionnalité...

# Commit et push direct
git add .
git commit -m "feat: description de la fonctionnalité"
git push origin fonctionnalité/nom-feature
```

## 📱 Interface Utilisateur

- **Design moderne** : Interface clean avec navigation intuitive
- **Responsive** : Adapté mobile et desktop
- **Feedback utilisateur** : Messages de confirmation et d'erreur
- **Accessibilité** : Labels, contrastes et navigation clavier

## 🔧 Installation et Démarrage

```bash
# Cloner le projet
git clone https://github.com/MervoDev/Genie_pratique.git
cd Genie_pratique/frontend

# Installer les dépendances
npm install

# Démarrer en développement
npm run dev
```

## 📊 Données et API

L'application est conçue pour fonctionner avec une API REST qui gère :
- `GET /purchases` : Liste des achats
- `POST /purchases` : Créer un achat
- `GET /purchases/top-products` : Statistiques des produits
- `GET /purchases/financial-summary` : Résumé financier

## 🎨 Technologies Utilisées

- **React 18** avec TypeScript
- **React Router** pour la navigation
- **Axios** pour les appels API
- **CSS3** avec design moderne
- **Vite** comme bundler

## 📈 Prochaines Étapes

- Intégration avec le backend
- Tests unitaires
- Déploiement
- Fonctionnalités avancées (filtres, export, etc.)

---

*Développé avec ❤️ pour une gestion efficace des achats*