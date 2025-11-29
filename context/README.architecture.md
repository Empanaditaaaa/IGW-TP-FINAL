# README — Arquitectura y Guía Rápida

Propósito: proporcionar a desarrolladores y agentes de código una visión práctica y accionable de la arquitectura, flujos de datos, convenciones y puntos de integración detectables en este workspace.

**Qué hay en este repositorio**
- Documentación y requisitos funcionales en el directorio `context/`.
- No contiene el monorepo de frontend/backend ni scripts de build. Pregunta al equipo dónde está el código de la aplicación antes de aplicar cambios de implementación.

**Lectura recomendada (en orden)**
- `context/Documento de Funcionalidades Esenciales para un Sitio Web de una Tienda de Venta de Videojuegos.md` — reglas de negocio y requisitos de ficha/checkout.
- `context/Criterios de Aceptación (Estilo Gherkin).md` — escenarios que deben mapearse a tests y PR acceptance.
- `context/Historias de Usuario para el Sitio Web de Venta de Videojuegos.md` — priorización y flujos de usuario.
- `context/tickets.md` — IDs de tickets que deben referenciarse en PRs (ej.: `P-101`, `D-201`, `C-301`).

**Big picture (componentes y flujos)**
- Flujo principal: búsqueda -> catálogo -> ficha de producto -> carrito -> checkout -> seguimiento/notifications.
- Componentes esperados: Frontend (mobile-first), Search/autocomplete, Sistema de Recomendaciones (SR), Backend/API, Pasarelas de pago, CRM/Soporte (`TecnoCRM`/`TecnoSupport`), CDN para assets, ChatBot/Agente IA (`TecnoBot`).
- Señales críticas: eventos de búsqueda y selección para SR/analytics; eventos de pedido (creado, actualizado, enviado) hacia CRM y notificaciones.

**Convenciones y patrones detectables**
- Mobile-first: todas las vistas y cambios UX se diseñan pensando en móviles.
- Barra de búsqueda global con autocompletado (ticket `D-201`).
- Fichas de producto enriquecidas: multimedia (imágenes/vídeos), reseñas y stock en tiempo real (tickets `D-204`, `D-205`).
- Performance: prioridad a `lazy loading`, compresión a WebP/AVIF y CDN (tickets `P-102`, `P-103`).
- Checkout: registro opcional; teléfono obligatorio en regiones ambiguas (ticket `C-305`).
- SEO técnico: URLs limpias y `schema` en fichas de producto (ticket `G-401`).

**Integraciones y puntos de atención**
- CRM/Soporte: enviar eventos de pedido/usuario a `TecnoCRM` / `TecnoSupport`.
- Recomendaciones (SR): respetar el flujo búsqueda→selección→carrito para alimentar modelos de SR.
- Pagos: soportar múltiples pasarelas; NUNCA almacenar datos de tarjeta en la app — usar proveedores certificados y HTTPS.

**Qué conservar en cambios de diseño/infraestructura**
- Preservar telemetría: búsqueda → selección → añadido a carrito deben seguir emitiendo eventos para analytics/SR.
- Asegurar que los eventos de pedido se notifiquen a CRM/soporte y al sistema de notificaciones por email/SMS.

**Workflows de desarrollo (qué documentar en PRs)**
- Referenciar ticket(s) relevantes (`P-###`, `D-###`, `C-###`).
- Indicar el criterio Gherkin aplicable (enlazar `context/Criterios de Aceptación (Estilo Gherkin).md`).
- Incluir pruebas que mapeen a los escenarios Gherkin cuando sea posible.
- Si afecta performance/assets: pasos de verificación (Lighthouse básico, checks de lazy-loading y tamaños/formatos de imagen).
- Si afecta checkout/datos sensibles: indicar validaciones obligatorias (teléfono) y requisitos de entorno (certificados SSL, keys de pasarela en vault).

**Ejemplos concretos (para PR descriptions)**
- Mejora de rendimiento: "Relacionado a `P-102` — optimiza lazy-loading de imágenes en `product-card` y comprime assets a WebP. CA: `Carga Rápida` en `context/Criterios de Aceptación (Estilo Gherkin).md`. Verificaciones: Lighthouse < 3s en móvil, imágenes convertidas a WebP".
- Nueva búsqueda/autocomplete: "Relacionado a `D-201`. Añade endpoint `GET /search/suggest?q=` y tests unitarios que cubran filtros por `plataforma` y `género`".

**Limitaciones actuales**
- Este workspace solo contiene documentación; no hay instrucciones de build, scripts ni código. Antes de implementar cambios de código, preguntar por la ubicación del monorepo o dar acceso al repositorio de la aplicación.

**Acciones sugeridas para el equipo**
- Añadir un `README.md` del monorepo de la aplicación con comandos de build/test/deploy (si existe en otro repo).
- Añadir una `PR_TEMPLATE.md` con la checklist mínima (ticket, CA/Gherkin, verificación de performance, impacto en integraciones externas).

---

Si quieres, genero ahora una `PR_TEMPLATE.md` y una `README.md` más sintético listo para el root del monorepo (si me indicas dónde está el código). ¿Cuál prefieres primero: plantilla de PR o README del monorepo?

---

## Prototipo T01 — Frontend estático (Maqueta Retro Pixel)

He generado un pequeño prototipo estático para el ticket `T01` dentro de este workspace. Archivos añadidos:

- `index.html` — estructura del layout (header, carrusel de ofertas, géneros, catálogo scrollable, panel de preview).
- `css/styles.css` — estilos con estética retro / pixel-art (fuente Press Start 2P, efectos pixelados, paleta retro).
- `js/script.js` — lógica para carrusel de ofertas, generación del catálogo de ejemplo, filtrado por búsqueda y plataforma, vista previa al pasar el cursor y funcionamiento del botón "AÑADIR" (simula añadir al carrito).

Cómo probar localmente (rápido):

1. Abre `index.html` en un navegador moderno (doble clic o mediante Live Server).
2. Probar: usar la barra de búsqueda para filtrar títulos, seleccionar plataforma en el filtro, pasar el cursor por las miniaturas para ver la preview, y usar el botón `AÑADIR` para incrementar el contador del carrito.

Notas técnicas:

- Es una maqueta estática pensada para demostración visual y pruebas UX; los recursos son SVG dinámicos y contenido de ejemplo en `js/script.js`.
- Para producción: reemplazar datos estáticos por llamadas API, optimizar imágenes a WebP/AVIF y añadir tests/CI.

Si querés, puedo generar ahora una `PR_TEMPLATE.md` o convertir este prototipo en un pequeño paquete dev (`package.json` + `live-server`) para un flujo de trabajo local más cómodo.