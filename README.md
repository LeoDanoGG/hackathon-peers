# Sanatorio 42 🩺

> ¿Te has atascado? Pasa a consulta: aquí siempre hay alguien de guardia.

Proyecto para la Hackathon de la Semana del Emprendimiento de 42 Madrid (octubre de 2026).
🌐 **Web:** https://sanatorio-42.vercel.app

## Equipo

| Login | Responsabilidades |
|---|---|
| albrodri | Backend |
| legomez | frontend: revisión y cambios en UI |
| plopez-l | Frontend: estructura del repositorio, diseño e interfaz |

## El dolor

En 42 aprendemos peer to peer, pero cuando te atascas en un proyecto no es fácil saber quién lo está haciendo ahora mismo, quién está en el campus y quién tiene tiempo para echarte una mano. Acabas preguntando en Slack o dando vueltas por los clusters.

## La solución

Sanatorio 42 es una web en la que, con tu cuenta de 42:

- Eliges el proyecto que se te resiste ("¿Qué te duele hoy?").
- Ves qué compañeros lo están haciendo, en qué puesto del cluster están y si están "de guardia", es decir, disponibles para ayudar.
- Te puedes poner de guardia tú para ayudar a otros.

Los datos de proyectos y ubicaciones se obtienen de la API de 42.

## Metodología de ideación y prototipado

_Pendiente de completar en equipo._

## Gestión del proyecto

- Repositorio en GitHub con una rama por área (`front`, `back`) y `main` como versión estable.
- Los cambios llegan a `main` mediante pull requests.
- El contrato entre front y back está en `docs/api.md`, para que ambas partes trabajen en paralelo. Mientras el back no está listo, el front usa datos de prueba (mock) con el mismo formato.
- _Pendiente: herramientas de organización y reparto de tareas._

## Arquitectura

- `front/`: React + Vite.
- `back/`: _Pendiente_. Gestiona el login con la API de 42 (OAuth), de modo que el client secret nunca llega al navegador.
- `docs/api.md`: contrato de endpoints entre front y back.

## Cómo levantar el proyecto

### Frontend

```bash
cd front
cp .env.example .env
npm install
npm run dev
```

Variables de `front/.env`:

- `VITE_USE_MOCK`: con `true` usa datos de prueba; con `false`, el back real.
- `VITE_MOCK_LOGGED_IN`: en modo mock, con `true` entra directamente sin pasar por el login.
- `VITE_API_URL`: URL del back.

### Backend

_Pendiente._

## Herramientas

- opencode, asistente de programación con IA, para generar y modificar el frontend.
- GitHub Codespaces como entorno de desarrollo en la nube.

## Seguridad

No hay claves ni secretos en el repositorio: los archivos `.env` están en el `.gitignore`, y las variables necesarias se documentan en los `.env.example`.

## Registro de problemas técnicos

| Problema | Solución |
|---|---|
| Node.js y opencode no arrancaban en un Mac con macOS 10.15, porque sus versiones actuales necesitan macOS 13 o posterior. | Desarrollo en GitHub Codespaces, un entorno en la nube con un sistema actualizado. |
| La web de Node.js redirigía la descarga del instalador a su blog. | Descarga directa del instalador con `curl` desde la terminal. |
| La traducción automática del navegador traducía los nombres de los archivos en el editor (`back` aparecía como "De vuelta"). | Desactivar la traducción en el dominio del Codespace. |
| El navegador bloqueaba pegar texto en la terminal del Codespace. | Escribir las instrucciones largas en un archivo dentro del editor y pedir al asistente que lo lea. |
| La carpeta `dist/`, generada al compilar, aparecía como pendiente de subir. | Añadirla al `.gitignore`. |
| Al añadir el nombre del producto, la cabecera no cabía en una sola fila. | `flex-wrap: nowrap`, textos más cortos y elementos decorativos ocultos en el móvil. |
| El Codespace tardaba varios minutos en arrancar. | Hacer los cambios pequeños desde la web de GitHub, y hacer `git pull` antes de volver a trabajar en el Codespace. |
| En moviles se colapsaban varias herramientas de la interfaz. | Se ha implementado `topbar-brand` y `topbar-user` junto a `user-login` para controlar que todo sea visible en dos filas. |
| El botón para volver a la ventana principal no es intuitivo. | Se ha implementado la clase `back-btn`, así como su `:hover` y `:focus-visible` para controlar su visibilidad. |
| El título se sentía muy simple. | Se ha implemenado el login del usuario en el título cuando inicia sesión. |

## Memoria de trabajo

| Fecha | Login | Horas | Trabajo realizado |
|---|---|---|---|
| 03/10 | plopez-l | 3,5 h | Creación del repositorio y su estructura, contrato de API, entorno en Codespaces, frontend completo con datos de prueba, diseño de Sanatorio 42 y PR #1. |
| 03/10 | plopez-l | 2 h | README, requisitos del backend, publicación en Vercel, especialistas, filtros por tipo, terapia de grupo y regla de guardia en el campus. |
| 04/10 | legomez | 1h | Configuración de interfaz y ajustes en el css para hacerla responsiva para móviles o pantallas pequeñas. |
| 05/10 | legomez | 1h | Configuración del botón de "Volver a la sala de espera" para hacerlo más visible |
| 06/10 | legomez | 1h | Añadido el login del usuario en el título |
| 03/10 | plopez-l | 2 h | README, requisitos del backend, publicación en Vercel, especialistas, filtros por tipo, terapia de grupo y regla de guardia en el campus.
| 04/10 | plopez-l | 1 h | AGENTS, Relevo front.
| 05/10 | plopez-l | 3 h | Conexió del front con el backk en producción, configuración de Vercel, Turso y la app de la intra, arreglo de las migraciones para Turso.
