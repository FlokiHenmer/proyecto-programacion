# Sistema Integral de Control de Flotas

## Descripción
Este proyecto es una aplicación web full-stack diseñada para centralizar la gestión y el mantenimiento preventivo de flotas de vehículos en entornos corporativos. La plataforma resuelve la falta de monitoreo técnico en tiempo real y previene fallas mecánicas críticas mediante la implementación de cuestionarios periódicos (checklists digitales) completados por los usuarios operativos. Al detectar anomalías, el sistema genera alertas automáticas y permite coordinar una agenda estructurada de turnos de servicio técnico.

## Tecnologías
El proyecto se desarrolla bajo una arquitectura desacoplada utilizando el siguiente stack tecnológico:

* **Frontend:** React (Single Page Application) administrado con Vite para un entorno de desarrollo rápido.
* **Backend:** Django y Django REST Framework para la construcción de una API REST robusta y predecible.
* **Base de Datos:** PostgreSQL (Planificada para el almacenamiento relacional de vehículos, usuarios y checklists en etapas posteriores).
* **Control de Versiones:** Git & GitHub (Utilizando un flujo de trabajo basado en ramas y Pull Requests).
* **Entorno de Ejecución:** Node.js (Requerido exclusivamente para la gestión de paquetes y dependencias en el ecosistema del frontend).

## Instalación
Sigue los pasos a continuación para clonar el proyecto y configurar el entorno de desarrollo local de manera desacoplada:

### 1. Clonar el repositorio
Abre una terminal en tu computadora (Git Bash, CMD o la terminal de VS Code) en la carpeta donde quieras guardar tu proyecto y ejecuta el comando de clonado:

git clone [https://github.com/FlokiHenmer/proyecto-programacion.git]

cd proyecto-programacion

### 2. Configurar el Frontend (React + Vite)
Muévete a la carpeta del cliente e instala todos los paquetes y dependencias necesarios provistos en el archivo de configuración de Node:

cd frontend

npm install

*(Nota: Este comando descargará las librerías necesarias y creará de forma local la carpeta node_modules).*

### 3. Configurar el Backend (Django)
Regresa a la raíz o abre una nueva terminal en paralelo para inicializar el entorno aislado de Python:

cd backend

python -m venv .venv

### 4.a- Activar el entorno virtual (Si usas Windows - Git Bash):
source .venv/Scripts/activate

### 4.b- Activar el entorno virtual (Si usas Windows - CMD):
.venv\Scripts\activate.bat

### 4.c- Activar el entorno virtual (Si usas Mac o Linux):
source .venv/bin/activate

### 5. Instalar el listado de requerimientos y dependencias oficiales:
pip install -r requirements.txt

## Estructura
El repositorio se encuentra organizado de manera desacoplada bajo la siguiente estructura de carpetas principales:

* **`/frontend`**: Contiene todo el código fuente de la interfaz de usuario desarrollado en React, incluyendo componentes, vistas y estilos administrados por Vite.
* **`/backend`**: Contiene la lógica del servidor desarrollada en Django. Incluye la configuración de las rutas, lógica de negocio y la estructura de la API REST que expone los datos en formato JSON.
* **`/docs`**: Documentación técnica, requerimientos, guías de diseño y manuales del sistema.

## Equipo
* **Victoria Henzenn**
* **Florencia Mereles**
