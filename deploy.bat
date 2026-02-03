@echo off
echo ========================================
echo    🚀 Déploiement sur Vercel
echo ========================================
echo.

echo 📦 Test du build local...
cd frontend
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Erreur de build !
    pause
    exit /b 1
)

echo ✅ Build réussi !
echo.

echo 🌐 Déploiement sur Vercel...
cd ..
call vercel --prod

echo.
echo 🎉 Déploiement terminé !
echo 👉 Vérifiez votre application sur Vercel
pause