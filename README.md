# TechTest - Prueba técnica

## Descripción

**TechTest** es un proyecto basado en **Next.js** que utiliza varias bibliotecas y herramientas para la gestión de usuarios y movimientos financieros, tales como **Prisma**, **Apollo Server**, **NextAuth**, y **TailwindCSS**. Este proyecto está configurado para desarrollarse en local y para ser fácilmente desplegado en **Vercel**.

## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (v16 o superior)
- **npm** (v7 o superior)
- Una base de datos compatible con **Prisma** (PostgreSQL, MySQL, SQLite, etc.)

## Configuración del Proyecto

1. **Clona el repositorio**:

    ```bash
    git clone <URL-del-repositorio>
    cd techtest
    ```

2. **Instala las dependencias**:

    Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias listadas en `package.json`.

    ```bash
    npm install
    ```

3. **Configura el entorno**:

    Crea un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias. Aquí hay algunas variables que probablemente necesites:

    ```env
    DATABASE_URL=<tu_url_de_base_de_datos>
    NEXTAUTH_SECRET=<tu_secreto_para_nextauth>
    NEXTAUTH_URL=http://localhost:3000
    ```

    Asegúrate de configurar la URL de la base de datos (`DATABASE_URL`) y el secreto de autenticación (`NEXTAUTH_SECRET`).

4. **Genera el cliente de Prisma**:

    Ejecuta el siguiente comando para generar el cliente de Prisma, que permitirá interactuar con la base de datos.

    ```bash
    npm run prisma:generate
    ```

5. **Realiza las migraciones** (si tienes modelos configurados en Prisma):

    ```bash
    npx prisma migrate dev --name init
    ```

## Scripts

En `package.json`, tienes los siguientes scripts disponibles:

- `npm run dev`: Inicia el servidor de desarrollo en `localhost:3000`.
- `npm run build`: Compila el proyecto para producción. Incluye la generación del cliente de Prisma y la construcción de Next.js.
- `npm start`: Inicia el servidor en modo de producción.
- `npm run lint`: Ejecuta ESLint para encontrar y arreglar problemas de estilo en el código.
- `npm test`: Ejecuta las pruebas en modo interactivo.
- `npm run test:ci`: Ejecuta las pruebas en modo continuo para integración continua.

## Ejecución en Local

Para ejecutar el proyecto en tu entorno local, sigue estos pasos:

1. Asegúrate de que el archivo `.env` está configurado correctamente.
2. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

3. Abre tu navegador y ve a [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

Este proyecto está preparado para ser desplegado en **Vercel**, una plataforma optimizada para aplicaciones basadas en Next.js.

1. **Sube tu código a un repositorio en GitHub, GitLab o Bitbucket**.
2. **Conéctate a Vercel**:
   - Inicia sesión en [Vercel](https://vercel.com) y selecciona **Importar Proyecto**.
   - Conecta tu repositorio.
3. **Configura las variables de entorno en Vercel**:
   - Ve a la configuración del proyecto en Vercel y añade las mismas variables de entorno que tienes en tu archivo `.env` (por ejemplo, `DATABASE_URL` y `NEXTAUTH_SECRET`).
4. **Despliega**:
   - Vercel detectará automáticamente que es un proyecto de Next.js y configurará el despliegue.
   - Una vez que el despliegue esté completo, tendrás una URL donde tu aplicación estará disponible en producción.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para renderizado híbrido (estático y dinámico).
- **Prisma**: ORM para el manejo de la base de datos.
- **Apollo Server**: Para el manejo de GraphQL.
- **NextAuth**: Autenticación para Next.js.
- **TailwindCSS**: Framework de utilidades para estilos.
- **Radix UI** y **NextUI**: Componentes UI accesibles.
- **Jest** y **Testing Library**: Para pruebas unitarias e integración.

## Estructura de Carpetas

Explica aquí brevemente la estructura de carpetas si lo consideras necesario. Por ejemplo:

