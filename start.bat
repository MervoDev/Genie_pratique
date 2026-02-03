@echo off
echo ========================================
echo    🚀 Démarrage de l'application
echo ========================================
echo.

cd frontend

echo 📦 Installation des dépendances...
call npm install

echo.
echo 🌟 Démarrage du serveur de développement...
echo 👉 L'application sera disponible sur http://localhost:5173
echo.

call npm run dev

pause