@echo off


REM Esperar un momento antes de iniciar la aplicación React
timeout /t 5

REM Iniciar la aplicación React
cd Desktop\urkupiña\client\frontend
serve -s dist
