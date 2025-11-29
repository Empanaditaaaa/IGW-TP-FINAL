---

## **Tickets de Desarrollo (Priorización por Fase)**

### **Fase 1: Fundación y Rendimiento (Mínimo Viable)**

Esta fase se centra en asegurar la base técnica y la velocidad del sitio, cruciales para evitar el abandono del usuario.

| ID | Título del Ticket | Historia de Usuario (HU) | Criterios de Aceptación (CA) Mínimos |
| ----- | ----- | ----- | ----- |
| **P-101** | **Diseño Responsivo (*Mobile First*)** | Como **Usuario Móvil**, quiero que el diseño sea **compatible y atractivo** en mi dispositivo móvil o tableta. | Dado que soy un **Usuario Móvil**, el diseño debe ser **compatible y atractivo** en dispositivos móviles y tabletas (*Mobile First*). |
| **P-102** | **Optimización de Velocidad de Carga** | Como **Usuario del Sitio**, quiero que la **velocidad de carga** sea inmediata y eficiente. | Cuando accedo a cualquier página, la página debe cargar **en menos de tres segundos**. |
| **P-103** | **Implementación de Lazy Loading y Compresión** | Como **Usuario del Sitio**, quiero que se implemente la **carga diferida (lazy loading)** y la **compresión de imágenes**. | Cuando se cargan elementos multimedia, se debe implementar la **carga diferida** y la **compresión de imágenes**. |

### **Fase 2: Descubrimiento de Productos y Catálogo**

Esta fase asegura que los usuarios puedan encontrar, filtrar y evaluar los productos de manera efectiva.

| ID | Título del Ticket | Historia de Usuario (HU) | Criterios de Aceptación (CA) Mínimos |
| ----- | ----- | ----- | ----- |
| **D-201** | **Barra de Búsqueda Avanzada** | Como **Gamer**, quiero que la barra de búsqueda sea **prominente** y con **autocompletado y sugerencias automáticas**. | Cuando utilizo la **Barra de Búsqueda**, debe ser **prominente** y mostrar **autocompletado y sugerencias automáticas**. |
| **D-202** | **Navegación por Filtros de Juegos (Plataforma y Género)** | Como **Visitante**, quiero usar **filtros y opciones de ordenación avanzados** por plataforma o género. | Cuando navego en una categoría de **Juegos**, debo poder filtrar los resultados por **Plataforma y Género**. |
| **D-203** | **Implementación de Rastro de Navegación (*Breadcrumbs*)** | Como **Gamer**, quiero ver el **rastro de navegación (*breadcrumbs*)** en la página. | Cuando navego a una subcategoría de producto, se debe mostrar el **rastro de navegación**. |
| **D-204** | **Plantilla de Ficha de Producto Enriquecida** | Como **Gamer**, quiero ver **imágenes de alta calidad, videos y *trailers***, y **descripciones detalladas** con información específica. | Cuando reviso el contenido, se deben mostrar **descripciones detalladas** y completas junto con **imágenes de alta calidad** y **videos o *trailers***. |
| **D-205** | **Indicador de Stock en Tiempo Real** | Como **Comprador Potencial**, quiero ver la **disponibilidad y stock en tiempo real** en la ficha de producto. | Si un producto está disponible, el sistema debe mostrar un indicador de **Disponibilidad y Stock en tiempo real**. |
| **D-206** | **Sistema Básico de Reseñas y Calificaciones** | Se deben mostrar **reseñas y calificaciones** de clientes. | Cuando reviso la Ficha de Producto, se debe ver la **Sección de Usuarios** con **reseñas y calificaciones**. |

### **Fase 3: Conversión y Seguridad (Checkout y Logística)**

Esta fase garantiza que el cliente pueda pagar de forma segura y transparente, y que se capture la información necesaria para el envío.

| ID | Título del Ticket | Historia de Usuario (HU) | Criterios de Aceptación (CA) Mínimos |
| ----- | ----- | ----- | ----- |
| **C-301** | **Implementación de Certificados SSL** | Como **Comprador**, quiero que el **proceso de pago sea rápido y seguro** con **Certificados SSL**. | Cuando envío mis datos de pago, la plataforma debe estar protegida con **Certificados SSL**. |
| **C-302** | **Transparencia de Costes en Checkout** | Como **Comprador**, quiero que se muestren claramente los costes de envío, IVA y descuentos. | Cuando reviso el resumen antes de pagar, todos los **costes de envío, IVA y descuentos** deben mostrarse claramente. |
| **C-303** | **Integración de Múltiples Opciones de Pago** | Como **Comprador**, se deben ofrecer **múltiples opciones de pago** (Tarjetas, PayPal, transferencias). | Cuando estoy en la selección de pago, se deben ofrecer **múltiples opciones de pago**. |
| **C-304** | **Checkout con Registro Opcional** | Como **Comprador**, quiero que el **registro e inicio de sesión sean opcionales** durante la compra. | Si decido no crear una cuenta al llegar al *checkout*, se me debe permitir continuar con el proceso de compra (registro e inicio de sesión deben ser **opcionales**). |
| **C-305** | **Campo de Teléfono Obligatorio para Envío** | Como **Cliente**, quiero que se me solicite mi **número de teléfono como obligatorio**. | Cuando intento avanzar completando la información de envío, el sistema debe solicitar el **número de teléfono como obligatorio**. |
| **C-306** | **Sistema de Seguimiento y Notificaciones** | Como **Cliente**, quiero tener acceso al **seguimiento de pedidos en tiempo real** y recibir **notificaciones automáticas**. | Cuando se procesa el envío, el cliente debe tener acceso al **seguimiento de pedidos en tiempo real** y recibir **notificaciones automáticas**. |

### **Fase 4: Crecimiento, Soporte y Gestión (Post-Lanzamiento)**

Esta fase se enfoca en la retención, la visibilidad a largo plazo y la eficiencia operativa.

| ID | Título del Ticket | Historia de Usuario (HU) | Criterios de Aceptación (CA) Mínimos |
| ----- | ----- | ----- | ----- |
| **G-401** | **Optimización SEO Estructural** | Como **Especialista SEO**, quiero optimizar **URLs limpias** y emplear **datos estructurados *schema***. | Cuando un motor de búsqueda rastrea una ficha de producto, se deben utilizar **URLs limpias** y **datos estructurados *schema***. |
| **G-402** | **Implementación de Sistema de Recomendaciones (SR)** | Como **Gamer**, quiero ver **recomendaciones personalizadas** de productos (SR). | Cuando un usuario navega o realiza una compra, el sitio debe mostrar **Recomendaciones Personalizadas**. |
| **G-403** | **Integración de Soporte Inmediato (Chat/AI Bot)** | Como **Cliente**, quiero recibir **Atención al Cliente Inmediata** mediante **Chat en Vivo** o **TecnoBot para Comercio Electrónico**. | Un cliente debe recibir atención mediante **Chat en Vivo** o un **Asistente IA por Chat**. |
| **G-404** | **Configuración de Herramientas de Análisis de Datos** | Como **Gerente de Ventas**, quiero implementar **herramientas de análisis de datos** e **Inteligencia de Negocio**. | \- (Esta es una tarea de gestión interna y configuración). |
| **G-405** | **Integración de Sistemas de Gestión (CRM/Support)** | Como **Personal de Gestión**, quiero integrar sistemas como **TecnoCRM y TecnoSupport**. | \- (Esta es una tarea de integración de *backend*). |
| **G-406** | **Automatización de Carrito Abandonado** | Como **Cliente**, quiero que se me envíe un correo electrónico automático si abandono mi carrito. | \- (No hay CA de Gherkin asociado, pero es un requisito de HU). |
| **G-407** | **Implementación de Lista de Deseos y Comparación de Productos** | Como **Cliente Fiel**, quiero tener una **Lista de Deseos**. Como **Comprador Indeciso**, quiero una herramienta de **Comparación de Productos**. | \- (Funcionalidades adicionales de catálogo). |

