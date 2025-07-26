# De Todo E-commerce

Este repositorio contiene el código fuente de "De Todo E-commerce", un proyecto de tienda online desarrollado como parte del curso de React en Coderhouse. El objetivo principal de este proyecto es demostrar las habilidades adquiridas en el desarrollo de aplicaciones web interactivas con React, incluyendo la gestión de estado, enrutamiento, y la integración con una base de datos.

## Características Principales

"De Todo E-commerce" ofrece una experiencia de compra completa con las siguientes funcionalidades:

* **Gestión de Productos:**
    * Visualización de un listado de productos.
    * Páginas de detalle para cada producto con información ampliada.
    * Opción de "Ver más" para acceder a los detalles del producto.
    * Filtrado de productos por categoría.

* **Carrito de Compras:**
    * Funcionalidad para agregar productos al carrito.
    * Ajuste de la cantidad de productos en el carrito.
    * Eliminación de productos del carrito.
    * Opción para vaciar completamente el carrito.

* **Proceso de Compra (Checkout):**
    * Transición al proceso de checkout desde el carrito.
    * Formulario de checkout para ingresar la información del comprador.
    * Generación y confirmación de la orden de compra.

## Tecnologías Utilizadas

El proyecto está construido con un stack de tecnologías modernas y eficientes:

* **[React.js](https://react.dev/):** Una biblioteca de JavaScript para construir interfaces de usuario.
* **[Vite](https://vitejs.dev/):** Un entorno de desarrollo frontend rápido y ligero.
* **[Tailwind CSS](https://tailwindcss.com/docs):** Un framework CSS de primera clase para construir diseños personalizados rápidamente.
* **[Firebase (Firestore)](https://firebase.google.com/docs/firestore):** Utilizado como base de datos NoSQL para almacenar y gestionar los datos de los productos y las órdenes de compra.
* **[React Router](https://reactrouter.com/en/main/start/overview):** Para la gestión de rutas y navegación entre las diferentes secciones de la aplicación.
* **[Sonner](https://sonner.emilkowal.ski/):** Una librería para mostrar notificaciones "toast" de forma elegante.

## Instalación y Uso

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/MNSCORZA/Scorza-Maximiliano.git](https://github.com/MNSCORZA/Scorza-Maximiliano.git)
    cd Scorza-Maximiliano
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o si usas yarn
    # yarn install
    ```

3.  **Configura Firebase:**
    Asegúrate de tener tu configuración de Firebase (clave API, ID del proyecto, etc.) en el archivo de configuración correspondiente dentro de `src/`.

### Uso

* **Iniciar en modo de desarrollo:**
    ```bash
    npm run dev
    # o si usas yarn
    # yarn dev
    ```
    Esto iniciará el servidor de desarrollo y abrirá la aplicación en tu navegador predeterminado (generalmente en `http://localhost:5173`).

* **Construir para producción:**
    ```bash
    npm run build
    # o si usas yarn
    # yarn build
    ```
    Esto generará los archivos optimizados en la carpeta `dist/`, listos para ser desplegados.

## Despliegue

Este proyecto está desplegado en Vercel. Puedes ver la aplicación en vivo aquí:

[De Todo E-commerce en Vercel](https://de-todo-e-commerce.vercel.app/)

## Autor

**Maximiliano Scorza**

## Licencia

Este proyecto no tiene una licencia específica.