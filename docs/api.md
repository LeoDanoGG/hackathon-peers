# Contrato API (front <-> back)

Borrador para acordar con el equipo de back. Todas las respuestas son JSON.
La autenticación con la API de 42 (OAuth) la gestiona el back; el front
nunca ve el client secret. La sesión va en una cookie.

## Autenticación
- GET /auth/login → redirige al login de la intra de 42
- GET /auth/callback → uso interno del back; al terminar vuelve al front con sesión iniciada
- GET /auth/me → usuario logueado, o 401 si no hay sesión
  { "login": "plopez-l", "image": "https://..." }
- POST /auth/logout

## Mis proyectos en curso
GET /me/projects
[{ "id": 1314, "name": "ft_printf" }]

## Gente del proyecto (campus Madrid)
GET /projects/:id/peers

Devuelve a quienes tienen el proyecto en curso y a quienes ya lo han aprobado ("especialistas").

[{
  "login": "jdoe",
  "image": "https://...",
  "location": "c2r4s6",     // null si no está en el cluster
  "available": true,
  "status": "in_progress"   // "in_progress": lo está haciendo; "finished": ya lo aprobó (especialista)
}]

## Marcarme como disponible
PUT /me/availability
{ "available": true }