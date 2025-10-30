# 🧠 GOU! – Aplicación de Carpooling Inteligente

**Versión:** 1.0.0  
**Framework:** React Native + Expo  
**Lenguaje principal:** TypeScript  
**Plataformas:** Android / iOS  

---

## 📦 Descripción General

**GOU!** es una aplicación móvil desarrollada con **Expo** y **React Native**, escrita en **TypeScript**, orientada a la gestión de viajes compartidos (carpooling).  
Su arquitectura prioriza modularidad, rendimiento y escalabilidad, integrando librerías modernas para autenticación, navegación, animaciones, comunicación con APIs y control de estado asíncrono.

---

## ⚙️ Scripts Disponibles

| Comando | Descripción |
|----------|-------------|
| `npm start` | Inicia el servidor de desarrollo de Expo. |
| `npm run android` | Compila y ejecuta la app en un emulador o dispositivo Android. |
| `npm run ios` | Compila y ejecuta la app en un simulador de iOS (solo macOS). |

---

## 🧩 Dependencias Principales

### 🔹 Core
| Paquete | Versión | Descripción |
|----------|----------|-------------|
| `react` | 19.1.0 | Librería principal para la interfaz de usuario. |
| `react-native` | 0.81.4 | Framework móvil nativo para Android/iOS. |
| `expo` | 54.0.13 | Entorno de desarrollo simplificado para React Native. |

---

### 🔹 Navegación
| Paquete | Versión | Descripción |
|----------|----------|-------------|
| `@react-navigation/native` | ^7.0.14 | Navegación principal entre pantallas. |
| `@react-navigation/bottom-tabs` | ^7.2.0 | Pestañas inferiores (Bottom Tabs). |
| `@react-navigation/native-stack` | ^7.2.0 | Navegación tipo stack nativo. |
| `@react-navigation/stack` | ^7.2.2 | Pilas de navegación avanzadas. |

---

### 🔹 Estado y Datos
| Paquete | Versión | Descripción |
|----------|----------|-------------|
| `@tanstack/react-query` | ^5.76.1 | Manejo de estado asíncrono y fetching de datos. |
| `@react-native-async-storage/async-storage` | 2.2.0 | Almacenamiento persistente en el dispositivo. |
| `axios` | ^1.8.4 | Cliente HTTP para llamadas a APIs REST. |
| `graphql-request` | ^7.1.2 | Cliente liviano para consumir APIs GraphQL. |

---

### 🔹 UI / UX y Componentes
| Paquete | Versión | Descripción |
|----------|----------|-------------|
| `lucide-react` | ^0.515.0 | Íconos vectoriales modernos. |
| `lottie-react-native` | ~7.3.1 | Animaciones con archivos Lottie. |
| `react-native-vector-icons` | ^10.2.0 | Íconos nativos populares. |
| `@react-native-picker/picker` | ^2.11.1 | Selector desplegable para formularios. |
| `@react-native-community/datetimepicker` | 8.4.4 | Selector de fecha/hora nativo. |

---

### 🔹 Cámara y Autenticación Biométrica
| Paquete | Versión | Descripción |
|----------|----------|-------------|
| `expo-camera` | ~17.0.8 | Captura de imágenes y escaneo de documentos. |
| `react-native-vision-camera` | ^4.6.4 | API avanzada de cámara para reconocimiento. |
| `expo-local-authentication` | ~17.0.7 | Autenticación biométrica (huella, rostro). |

---

### 🔹 Utilidades
| Paquete | Versión | Descripción |
|----------|----------|-------------|
| `dayjs` | ^1.11.13 | Manipulación de fechas. |
| `dotenv` | ^16.5.0 | Manejo de variables de entorno. |
| `laravel-echo` | ^2.2.4 | Comunicación en tiempo real con backend Laravel. |
| `pusher-js` | ^8.4.0 | Soporte para websockets y eventos en tiempo real. |
| `@react-native-community/netinfo` | ^11.4.1 | Detección de conexión a Internet. |

---

## 🧱 Dependencias de Desarrollo

| Paquete | Descripción |
|----------|-------------|
| `typescript` | Compilador TypeScript. |
| `@types/react`, `@types/react-native` | Tipados para desarrollo con TypeScript. |
| `eslint`, `eslint-plugin-react`, `eslint-plugin-react-native` | Reglas de linting. |
| `eslint-plugin-prettier`, `eslint-config-prettier` | Integración de Prettier con ESLint. |
| `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` | Reglas y parser específicos para TypeScript. |
| `@babel/core` | Transpilación de código JSX/TSX. |

---

## 🏗️ Arquitectura del Proyecto

El proyecto está estructurado de forma modular, separando capas de navegación, pantallas, componentes y lógica de negocio.

GOU-App/
│
├── App.js / index.tsx # Punto de entrada principal
├── navigation/ # Rutas y stacks de navegación
├── screens/ # Vistas principales (Onboarding, Home, Viajes, etc.)
├── components/ # Componentes UI reutilizables
├── contexts/ # Contextos globales (AuthContext, etc.)
├── assets/ # Imágenes, íconos y animaciones
├── utils/ # Funciones auxiliares y helpers
└── package.json

yaml
Copy code

---

## 🚀 Ejecución del Proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/GOU-App.git
cd GOU-App
2️⃣ Instalar dependencias
bash
Copy code
npm install
3️⃣ Crear archivo .env
Configurar variables de entorno (por ejemplo, URLs de API o claves de Pusher):

ini
Copy code
API_URL=https://api.midominio.com
PUSHER_KEY=xxxxxxxxxx
4️⃣ Iniciar entorno de desarrollo
bash
Copy code
npm start
5️⃣ Ejecutar en Android o iOS
bash
Copy code
npm run android
npm run ios
🧪 Lint y Tipado
Para mantener la consistencia del código:

bash
Copy code
npx eslint .
npx tsc --noEmit
🔐 Requisitos Previos
Node.js >= 18

npm >= 10

Expo CLI instalado globalmente:

bash
Copy code
npm install -g expo-cli
Emulador Android Studio o Xcode configurado (según el sistema operativo).

🧭 Estado del Proyecto
Módulo	Estado
Configuración base de Expo	✅
Navegación principal	✅
Autenticación y contexto global	✅
Escaneo de DNI	✅
Comunicación con backend	🔄 En desarrollo
Chat en tiempo real	🔜 Planificado
Integración de pagos	🔜 Planificado

🪪 Licencia
Este proyecto se distribuye bajo la Licencia MIT.
Podés utilizarlo, modificarlo y redistribuirlo libremente con atribución al autor original.

👨‍💻 Autores
Ignacio G. Ruiz
📍 Córdoba, Argentina
💻 Desarrollo móvil con React Native y Expo
📧 ignacioguillermoruiz@gmail.com

Marco Taliente
📍 Córdoba, Argentina
💻 Desarrollo móvil con React Native y Expo
📧 marcotaliente123@gmail.com