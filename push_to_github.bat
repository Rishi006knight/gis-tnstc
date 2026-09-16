@echo off
echo ========================================================
echo Pushing TNSTC GIS Portal to GitHub (Rishi006knight/gis-tnstc)
echo ========================================================

cd /d "%~dp0"

git status
git add .
git commit -m "feat: complete 57 motels, 17 IRT driver training institutes, official fare calculator, satellite view and Neon PostGIS setup"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/Rishi006knight/gis-tnstc.git
git push -u origin main

echo ========================================================
echo Push complete!
echo ========================================================
pause
