# Frontend (Vite + React + TypeScript)

Aplicación de tablero Kanban con drag & drop y realtime.

## Scripts

```bash
npm run dev       # desarrollo
npm run build     # build producción
npm run preview   # previsualización
npm run lint      # linter
```

## Variables de entorno (Vite)

- `VITE_API_URL` (por defecto `http://localhost:3000/api`)
- `VITE_WS_URL` (por defecto `http://localhost:3000`)

## Funcionalidades

- Ver columnas y tarjetas del Kanban.
- Crear, mover (drag & drop via @dnd-kit) y eliminar tareas.
- Realtime con Socket.io client.
- Estilos en `src/App.css` (sin inline styles en componentes).
