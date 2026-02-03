# 🚀 Guide de Déploiement sur Vercel

## 📋 Prérequis

1. **Compte Vercel** : [vercel.com](https://vercel.com)
2. **Repository GitHub** : Code déjà pushé sur GitHub
3. **Node.js** : Version 18+ recommandée

## 🔧 Configuration Vercel

### Option 1: Déploiement via Interface Web

1. **Connecter le Repository**
   - Aller sur [vercel.com](https://vercel.com)
   - Cliquer "New Project"
   - Importer depuis GitHub : `MervoDev/Genie_pratique`

2. **Configuration du Build**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Variables d'Environnement**
   ```
   VITE_API_BASE_URL=https://your-backend-api.vercel.app
   VITE_MODE=production
   ```

### Option 2: Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer depuis le dossier racine
cd Genie_pratique
vercel

# Suivre les instructions :
# - Set up and deploy? Yes
# - Which scope? Votre compte
# - Link to existing project? No
# - Project name? genie-pratique
# - Directory? frontend
```

## 🌐 Configuration Domaine

### Domaine Custom (Optionnel)
1. Dans le dashboard Vercel
2. Aller dans Settings > Domains
3. Ajouter votre domaine personnalisé

### URLs par Défaut
- **Production** : `https://genie-pratique.vercel.app`
- **Preview** : URLs générées automatiquement pour chaque PR

## 🔄 Déploiement Automatique

### Branches
- **main** → Déploiement en production
- **Autres branches** → Déploiements de preview

### Workflow
1. Push sur `main` → Déploiement automatique
2. Pull Request → Preview deployment
3. Merge PR → Mise à jour production

## 🛠 Backend API

### Option 1: API Mock (Actuel)
L'application fonctionne avec des données de test intégrées.

### Option 2: Backend Réel
1. Déployer votre API backend sur Vercel/Netlify/Railway
2. Mettre à jour `VITE_API_BASE_URL` dans les variables d'environnement
3. Configurer CORS sur votre backend

## 📊 Monitoring

### Analytics Vercel
- Activé automatiquement
- Métriques de performance
- Logs de déploiement

### Optimisations
- **Build Cache** : Activé par défaut
- **Edge Network** : CDN global
- **Compression** : Gzip/Brotli automatique

## 🐛 Troubleshooting

### Erreurs Communes

1. **Build Failed**
   ```bash
   # Tester localement
   cd frontend
   npm run build
   ```

2. **Routes 404**
   - Vérifier `vercel.json` pour les rewrites
   - S'assurer que React Router est configuré

3. **Variables d'Environnement**
   - Préfixer avec `VITE_`
   - Redéployer après modification

### Logs
```bash
# Voir les logs de déploiement
vercel logs [deployment-url]
```

## 🎯 Checklist de Déploiement

- [ ] Code pushé sur GitHub
- [ ] Tests passent localement
- [ ] Build réussit localement
- [ ] Variables d'environnement configurées
- [ ] Domaine configuré (si nécessaire)
- [ ] SSL activé (automatique sur Vercel)

## 📱 Test Post-Déploiement

1. **Fonctionnalités**
   - [ ] Navigation entre pages
   - [ ] Ajout d'achat
   - [ ] Affichage historique
   - [ ] Statistiques
   - [ ] Bilan financier

2. **Responsive**
   - [ ] Mobile
   - [ ] Tablet
   - [ ] Desktop

3. **Performance**
   - [ ] Temps de chargement < 3s
   - [ ] Lighthouse Score > 90

---

🎉 **Votre application est maintenant déployée !**

URL de production : `https://genie-pratique.vercel.app`