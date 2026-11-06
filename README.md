# Web del emprendimiento de invitaciones digitales

Página para mostrar el catálogo de invitaciones, recibir cotizaciones y contactos por WhatsApp.
React + Vite + TypeScript + Tailwind (mismo stack que las invitaciones).

## Secciones

1. **Portada**: mensaje principal, botones "Cotiza tu invitación" y "Ver diseños".
2. **Cómo funciona**: 4 pasos.
3. **Diseños**: tarjetas con captura de cada invitación. "Ver demo" abre la invitación real
   dentro de un celular (iframe); "La quiero" lleva al cotizador con la temática ya escrita.
4. **Qué incluye**: funciones (RSVP, cuenta regresiva, música, mapa, juegos…).
5. **Paquetes**: Esencial / Mágica / Personalizada (precios en `src/config.ts`).
6. **Cotizador**: formulario que arma un mensaje ordenado y lo abre en WhatsApp.
7. **Preguntas frecuentes**.
8. **Contáctanos**: WhatsApp, correo, redes y formulario (envía por WhatsApp o correo).
9. **Botón flotante de WhatsApp** en todas las pantallas.

## Editar

Todo está en **`src/config.ts`** (busca `TODO`): nombre de la marca, número de WhatsApp
(`51` + número, sin espacios), correo, redes, precios de los paquetes y la lista de proyectos.

### Agregar una invitación nueva al catálogo

1. Publica la invitación (GitHub Pages) y copia su URL.
2. Guarda una captura vertical (400×820 aprox.) en `public/proyectos/<id>.jpg`.
3. Agrega un objeto al arreglo `proyectos` en `src/config.ts`, con su campo
   `categorias` (una o varias; la primera es la que se preselecciona en el cotizador):
   `categorias: ["primer-anito", "ninos"]`.

### Categorías y paginación

- Las categorías están en `categorias` (`src/config.ts`): nombre, ícono y orden. También
  son los "Tipos de evento" del cotizador.
- Las categorías sin diseños muestran una tarjeta "lo creamos a tu medida" con botón para cotizar.
- Diseños por página: `disenosPorPagina` (6 en computadora, 4 en celular).
- Link directo a una categoría: `https://tuweb/#disenos?categoria=quinceaneros`.

## Comandos

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # genera dist/
```

## Publicar

Crea un repositorio en GitHub, sube este proyecto y activa **Settings → Pages → Source: GitHub Actions**.
El workflow `.github/workflows/deploy.yml` construye y publica en cada push a `master`.
Para un dominio propio (ej. `tumarca.pe`), agrégalo en Settings → Pages → Custom domain.
