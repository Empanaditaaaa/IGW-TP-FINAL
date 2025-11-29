---

## **Criterios de Aceptación (Estilo Gherkin)**

### **F1. Rendimiento y Diseño Responsivo (*Mobile First*)**

**Objetivo:** Asegurar que el sitio es compatible con dispositivos móviles y la velocidad de carga es óptima para evitar el abandono.

| Escenario | Dado que | Cuando | Entonces | Citas Clave |
| ----- | ----- | ----- | ----- | ----- |
| **Carga Rápida** | soy un **Usuario del Sitio** | accedo a cualquier página | la página debe cargar **en menos de tres segundos** |  |
| **Optimización Móvil** | soy un **Usuario Móvil** | accedo al sitio desde mi dispositivo | el diseño debe ser **compatible y atractivo** en dispositivos móviles y tabletas (*Mobile First*) |  |
| **Optimización de Recursos** | se cargan elementos multimedia en la página | se debe implementar la **carga diferida** (**lazy loading**) y la **compresión de imágenes** (a formatos modernos) | para reducir la latencia y asegurar la máxima velocidad |  |

### **F2. Búsqueda y Navegación Fundamental**

**Objetivo:** Facilitar la exploración y la localización rápida de productos.

| Escenario | Dado que | Cuando | Entonces | Citas Clave |
| ----- | ----- | ----- | ----- | ----- |
| **Búsqueda Esencial** | estoy en cualquier página del sitio | utilizo la **Barra de Búsqueda** | la barra debe ser **prominente** y mostrar **autocompletado y sugerencias automáticas** al escribir |  |
| **Navegación por Filtros** | navego en una categoría de **Juegos** | utilizo los **filtros y la ordenación avanzada** | debo poder filtrar los resultados por **Plataforma y Género** |  |
| **Rastro de Navegación** | navego a una subcategoría de producto | se debe mostrar el **rastro de navegación (*breadcrumbs*)** | para saber dónde me encuentro y regresar a categorías anteriores |  |

### **F3. Ficha de Producto y Disponibilidad**

**Objetivo:** Asegurar que el cliente tenga toda la información necesaria y sepa el estado del *stock* en tiempo real.

| Escenario | Dado que | Cuando | Entonces | Citas Clave |
| ----- | ----- | ----- | ----- | ----- |
| **Información Completa** | navego a la Ficha de Producto | reviso el contenido | se deben mostrar **descripciones detalladas** y completas junto con **imágenes de alta calidad** y **videos o *trailers*** |  |
| **Stock en Tiempo Real** | un producto está disponible | el sistema debe mostrar un indicador de **Disponibilidad y Stock en tiempo real** | para saber si el artículo está listo para su compra inmediata |  |
| **Sistema de Reseñas** | reviso la Ficha de Producto | se debe ver la **Sección de Usuarios** | se deben mostrar **reseñas y calificaciones** de clientes |  |

### **F4. Proceso de Pago (*Checkout*) y Seguridad**

**Objetivo:** Garantizar un proceso de pago seguro y con total transparencia de costes, sin fricciones.

| Escenario | Dado que | Cuando | Entonces | Citas Clave |
| ----- | ----- | ----- | ----- | ----- |
| **Seguridad de la Transacción** | estoy en el **Proceso de Pago** | envío mis datos de pago | la plataforma debe estar protegida con **Certificados SSL** |  |
| **Transparencia de Costes** | reviso el resumen antes de pagar | todos los **costes de envío, IVA y descuentos** deben mostrarse claramente | para evitar **cargos ocultos** |  |
| **Opciones de Pago** | estoy en la selección de pago | se deben ofrecer **múltiples opciones de pago** (Tarjetas, PayPal, transferencias) | para completar la compra de manera flexible |  |

### **F5. Gestión de Clientes y Entrega**

**Objetivo:** Obtener la información de contacto esencial para la logística y ofrecer seguimiento del pedido.

| Escenario | Dado que | Cuando | Entonces | Citas Clave |
| ----- | ----- | ----- | ----- | ----- |
| **Contacto Obligatorio** | estoy completando la información de envío en una región con direcciones ambiguas | intento avanzar | el sistema debe solicitar el **número de teléfono como obligatorio** |  |
| **Opción de Cuenta** | llego al *checkout* | decido no crear una cuenta | se me debe permitir continuar con el proceso de compra (registro e inicio de sesión deben ser **opcionales**) |  |
| **Seguimiento del Pedido** | he finalizado la compra | se procesa el envío | el cliente debe tener acceso al **seguimiento de pedidos en tiempo real** y recibir **notificaciones automáticas** sobre el estado por teléfono o correo electrónico |  |

### **F6. Posicionamiento Digital y Personalización**

**Objetivo:** Asegurar la visibilidad en motores de búsqueda y la personalización para mejorar la conversión.

| Escenario | Dado que | Cuando | Entonces | Citas Clave |
| ----- | ----- | ----- | ----- | ----- |
| **Optimización SEO** | un motor de búsqueda rastrea una ficha de producto | se deben utilizar **URLs limpias** y **datos estructurados *schema*** | para mejorar el *rich snippet* y el posicionamiento (TecnoSEO) |  |
| **Recomendaciones SR** | un usuario navega o realiza una compra | el sitio debe mostrar **Recomendaciones Personalizadas** | para centrar el foco del usuario en productos de mayor interés |  |
| **Soporte Inmediato** | un cliente necesita ayuda | se debe ofrecer atención mediante **Chat en Vivo** o un **Asistente IA por Chat** | para acelerar el soporte al cliente |  |

