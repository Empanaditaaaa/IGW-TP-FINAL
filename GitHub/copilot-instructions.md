# Instrucciones para agentes de código (Copilot)

Propósito: permitir a un agente de código ser productivo rápidamente leyendo los documentos presentes y entendiendo las decisiones funcionales y técnicas encontradas en `context/`.

**Resumen Rápido**
- **Producto:** Tienda online B2C de videojuegos (catálogo, fichas, carrito, checkout, notificaciones).
- **Estado del workspace:** contiene especificaciones y tickets en `context/` pero *no* el monorepo de frontend/backend. Antes de cambiar código, confirmar ubicación del repositorio de la aplicación.

**Dónde empezar (lectura obligatoria)**
- `context/Documento de Funcionalidades Esenciales...md`: reglas de negocio del catálogo y checkout.
- `context/Criterios de Aceptación (Estilo Gherkin).md`: escenarios concretos para tests y PR acceptance.
- `context/Historias de Usuario for the site.md`: prioridades de usuario y flujos.
- `context/tickets.md`: IDs de referencia para PRs (ej.: `P-101`, `P-102`, `D-201`, `C-301`).

**Big picture (arquitectura y flujos detectables en la documentación)**
- Flujo principal: **búsqueda -> catálogo -> ficha de producto -> carrito -> checkout -> seguimiento**.
- Componentes esperados: Frontend (mobile-first), motor de búsqueda/autocomplete, SR (recomendaciones), pasarelas de pago, CRM/soporte (`TecnoCRM`/`TecnoSupport`), CDN para assets y ChatBot (`TecnoBot`).
- Señales críticas a preservar: eventos de búsqueda y selección (para SR/analytics); eventos de pedido (crear/actualizar/enviado) hacia CRM y sistemas de notificación.

**Convenciones y patrones específicos de este proyecto**
- **Mobile-first**: todas las vistas deben priorizar UX en móviles.
- **Búsqueda**: barra visible en todas las páginas con autocompletado (ticket `D-201`).
- **Fichas**: multimedia + reseñas + indicador de stock en tiempo real (tickets `D-204`, `D-205`).
- **Performance**: implementar `lazy loading`, compresión a WebP/AVIF y uso de CDN (ticket `P-102`, `P-103`).
- **Checkout**: registro opcional; `telefono` obligatorio en regiones ambiguas (ticket `C-305`).
- **SEO técnico**: URLs limpias y `schema` en fichas (ticket `G-401`).

**Workflows de desarrollo y PRs (qué incluir en una PR)**
- Siempre referencia el/los ticket(s) relevantes (`P-###`, `D-###`, `C-###`) en la descripción.
- Indica el archivo de requisitos y el criterio Gherkin pertinente (por ejemplo, enlaza `context/Criterios de Aceptación...md` y el escenario correspondiente).
- Si cambias performance o assets: lista pasos de verificación (p. ej. comprobación manual de lazy loading, tamaños de imagen y Lighthouse básico).
- Si tocas checkout o datos sensibles: documenta validaciones (teléfono obligatorio), y añade nota sobre certificados SSL/entorno de pagos.

**Integraciones externas y puntos de atención**
- **CRM/Soporte:** enviar eventos de pedido/usuario a `TecnoCRM` / `TecnoSupport`.
- **Recomendaciones (SR):** respetar el flujo búsqueda→selección→carrito para alimentar modelos de SR.
- **Pagos:** diseño para múltiples pasarelas (tarjeta, PayPal, transferencias). No almacenar datos de tarjetas en el app; usar proveedores certificados.

**Limitaciones detectadas en este workspace**
- No hay código fuente ni scripts de build aquí. Pregunta explícita al autor: ¿dónde está el monorepo (frontend/backend)?

**Acciones rápidas para el agente**
- Si necesitas buscar convenciones de agentes previas, corre esta búsqueda en el repo de código fuente: `**/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,README.md}`.
- Para proponer cambios: crear PR que incluya: ticket ID, criterios Gherkin aplicados, pruebas manuales de verificación y checklist de integraciones afectadas.

**Checklist mínima al cambiar código (PR template mínimo)**
- **Ticket:** `P-###|D-###|C-###`.
- **Cambios clave:** lista breve.
- **Criterio Gherkin vinculado:** archivo + escenario.
- **Impactos externos:** CRM, pagos, SR, CDN.
- **Verificaciones realizadas:** Lighthouse / manual / unit tests (si aplican).

Si quieres que genere un `README.architecture.md` o una plantilla de PR/issue basada en estos puntos, dime y la creo.
