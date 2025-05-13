# Survey.io Frontend

Frontend de la aplicación **Survey.io**, una plataforma de encuestas en tiempo real con estadísticas en vivo, autenticación con roles y una interfaz moderna desarrollada en **React 19**.

NOTA: requieres tanto del backend como del frontend, descargalo desde aqui 
Github: [@survey.io](https://github.com/apps10/survey.io)
---

## 🚀 Tecnologías

- React 19 (App Router)
- TypeScript
- Redux Toolkit + Redux Persist
- WebSockets (real-time updates)
- Tailwind CSS + shadcn/ui + daisyUI
- JWT Authentication
- Axios
- React Router DOM
- ESLint + Prettier + Lint-staged

---

## 📦 Instalación

```bash
pnpm install
# o
npm install
```


## ▶️ Ejecución en desarrollo
```bash
pnpm dev
# o
npm run dev
```


## 🏗️ Estructura del proyecto
```bash
src/
├── app/                # Layout general y configuración de rutas
├── assets/             # Imágenes y recursos estáticos
├── components/         # Componentes compartidos reutilizables
├── features/
│   ├── auth/           # Lógica y vistas de autenticación
│   ├── survey/         # Encuestas y lógica relacionada
│   └── shared/         # Hooks, tipos y helpers globales
├── store/              # Redux store y slices
├── utils/              # Utilidades generales
└── main.tsx            # Punto de entrada
```



## 🔐 Autenticación
La app utiliza JWT, guardado en redux de forma no persistente, y se accede vía middleware PrivateRoute. Usa useAuth para acceder al estado del usuario y sus roles.


## 🌐 WebSockets
La app se conecta automáticamente al servidor de WebSockets una vez el usuario se autentica. Los eventos de actualizaciones de votos se escuchan y reflejan en tiempo real en la UI con Redux.

## 🧑‍💻 Autor
Desarrollado por Alfonso Contreras.