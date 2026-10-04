# Instrucciones para agentes de IA (opencode, etc.)

## El proyecto
Sanatorio 42: web para estudiantes de 42 Madrid. Cuando te atascas en un proyecto ("¿Qué te duele hoy?"), ves quién te puede ayudar: "pacientes como tú" (lo están haciendo) y "especialistas" (ya lo aprobaron), su puesto en el cluster y si están "de guardia".
Web publicada: https://sanatorio-42.vercel.app (se actualiza con cada cambio en `main`).

## Estructura
- `front/`: React + Vite, JavaScript, CSS propio (sin librerías de componentes).
- `front/src/api/`: única capa que habla con el back. `mock.js` tiene los datos de prueba; `client.js` e `index.js` eligen mock o API real según `VITE_USE_MOCK`.
- `front/src/components/`: Login, ProjectSelect, PeerList, AvailabilityToggle, Avatar, Logo.
- `docs/api.md`: contrato con el back. `docs/backend-requirements.md`: requisitos del back.
- `back/`: backend (lo hace otra persona).

## Reglas
- No cambies el contrato (`docs/api.md`) sin acordarlo con el equipo.
- No toques la lógica de autenticación ni `client.js`/`index.js` salvo que se pida explícitamente.
- Los datos mock deben seguir exactamente el formato de `docs/api.md`.
- Regla de guardia: alguien está "de guardia" solo si `available: true` y `location` no es `null`. Está centralizada en la función `onDuty` de `PeerList.jsx`.
- Concepto y tono: clínica cálida y con humor amable. Vocabulario: "de guardia", "fuera de turno", "fuera del centro", "especialista", "paciente como tú", "sala de espera", "terapia de grupo".
- Textos en español, en segunda persona y con lenguaje inclusivo (evitar formas con género como "compañero/a" cuando se pueda).
- Paleta: fondo crema, verdes menta y salvia, turquesa de 42 como acento. "No disponible" en gris neutro, nunca en rojo.
- Comprobar siempre que la cabecera cabe en una sola fila y que todo se ve bien en móvil.
- No hagas commits: los hace la persona.

## Pendiente
- Estados de carga y de error en todas las pantallas (con la API real habrá esperas y fallos).
- Mensaje amable si el usuario no tiene proyectos en curso.
- Revisar la web en móvil.
- Conectar con el back real cuando esté listo (ver la última sección de `docs/backend-requirements.md`). 