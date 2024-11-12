# TechTest - Prueba técnica

## Descripción

**TechTest** es un proyecto diseñado como parte de una evaluación técnica orientada a medir habilidades en el desarrollo de aplicaciones fullstack. Construido sobre **Next.js** y **TypeScript**, integra una serie de bibliotecas y herramientas avanzadas, entre las que destacan **Prisma**, **Apollo** **Server**, **NextAuth** y **TailwindCSS**, para la gestión de usuarios y el control de movimientos financieros. La configuración de TechTest facilita tanto el desarrollo en un entorno local como su despliegue rápido y sencillo en Vercel.

## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** (v16 o superior)
- **npm** (v7 o superior)
- Una base de datos compatible con **Prisma** (PostgreSQL, MySQL, SQLite, etc.) recomendable el uso de plataformas como **Supabase**

## Configuración del Proyecto

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/madebygarzon/techtest.git
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
    NEXT_PUBLIC_NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_SUPABASE_URL=<url_del_proyecto_de_supabase>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<tu_clave_de_supabase>
    AUTH0_CLIENT_ID=<tu_id_de_cliente_de_auth0>
    AUTH0_CLIENT_SECRET=<tu_secreto_de_auth0>
    AUTH0_ISSUER=<tu_issuer_de_auth0>
    AUTH0_BASE_URL=<tu_url_base_de_auth0>
    NODE_ENV=<url_del_proyecto>
    ```

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
- **Shadcn**: Componentes UI accesibles.
- **Jest** y **Testing Library**: Para pruebas unitarias e integración.
- **Authjs** con **Auth0** para autenticación.

## Pruebas unitarias

Este proyecto implementa un conjunto de pruebas unitarias utilizando **Jest** y **React Testing Library** para validar la funcionalidad de los componentes React críticos. Estas pruebas cubren los principales flujos de la aplicación, como el inicio de sesión, registro de usuarios y la obtención de la lista de usuarios.

## Ejecución de Pruebas

1. Para ejecutar las pruebas unitarias, utiliza el comando:

    ```bash
    npm test
    ```

Este comando ejecutará automáticamente todas las pruebas ubicadas en los directorios designados para pruebas. Las pruebas específicas actualmente incluidas en el proyecto se encuentran en:

`src/components/user/__tests__/getuser.test.tsx`
`src/components/auth/__tests__/registerform.test.tsx`
`src/components/auth/__tests__/loginform.test.tsx`

## Cobertura de Pruebas

Las pruebas actuales están diseñadas para evaluar los siguientes aspectos:

### Obtener lista de usuarios
- **Funcionalidad**: Valida que el componente de usuarios obtenga y muestre correctamente la lista de usuarios desde el backend mediante Apollo Client.
- **Escenarios**: Se simulan escenarios exitosos y de error para asegurar que el componente responda adecuadamente a ambos casos.
- **Filtro**: Se agrega un filtro de búsqueda para encontrar usuarios por nombre.

### Registro de usuarios
- **Validación de errores**: Prueba la funcionalidad de registro, verificando que se muestren los mensajes de error apropiados cuando los datos ingresados son incorrectos.
- **Mensaje de éxito**: Asegura que se muestre un mensaje de éxito cuando el registro es exitoso.
- **Interacción con Apollo Client**: Verifica que la interacción con Apollo Client y el uso de mutaciones para registrar nuevos usuarios funcionan según lo esperado.

### Inicio de sesión
- **Validación de credenciales**: Verifica el flujo de inicio de sesión, evaluando que se muestre un mensaje de error cuando las credenciales son incorrectas.
- **Mensaje de éxito y redirección**: Asegura que se muestre un mensaje de éxito cuando el inicio de sesión es exitoso y que la redirección se realiza correctamente.
- **Comportamiento de NextAuth**: Evalúa que la función `signIn` de NextAuth se comporte de acuerdo con los resultados esperados.

## Configuración de Pruebas

- **Mocks de Apollo Client**: Las consultas y mutaciones de GraphQL están mockeadas usando `MockedProvider` de Apollo Client para simular respuestas de la API.
- **Mocks de SweetAlert2 y bcryptjs**: Se ha utilizado Jest para mockear `SweetAlert2` y `bcryptjs`, lo que permite verificar llamadas de alertas sin mostrar modales y controlar el hashing de contraseñas en el entorno de prueba.
- **Configuración de Jest**: La configuración de Jest en `jest.config.js` utiliza el entorno `jsdom` y establece rutas de alias para las importaciones.