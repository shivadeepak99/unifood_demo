@echo off
REM 🚀 UniFood Development Launcher
REM Starts both Vite dev server and Email server

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║         🍽️  UniFood Development Environment  🍽️           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo [1/2] Starting Email Server (SMTP)...
echo [2/2] Starting Vite Dev Server (React App)...
echo.
echo 📧 Email Server: http://localhost:3001
echo 🌐 Frontend App: http://localhost:5173
echo.
echo 💡 Press Ctrl+C to stop all servers
echo.

npm run dev:full
