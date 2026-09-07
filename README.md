# api-clinica-salud-integral

API RESTful para la gestión de la Clínica Salud Integral, desarrollada como proyecto de backend persistente con Express, TypeScript, PostgreSQL y Prisma ORM.

El sistema busca reemplazar la gestión basada en hojas de cálculo y centralizar la información de pacientes, médicos, especialidades y citas, además de proporcionar reportes para la gerencia.

# Tecnologías

* Node.js
* Express
* TypeScript
* PostgreSQL
* Prisma ORM
* Zod
* JWT
* bcryptjs
* Swagger UI

# Funcionalidades

### Recepción (Pacientes y Directorio)

* **Alta de paciente:** Registrar nuevos pacientes y validar sus datos.
* **Búsqueda de especialistas:** Consultar médicos de la clínica y filtrar médicos por especialidad.
* **Consulta de expedientes:** Consultar el expediente de un paciente y su historial de citas.

### Consultorio (Agendamiento y Atención)

* **Programación de citas:** Agendar citas entre pacientes y médicos.
* **Validación de fechas:** Impedir el agendamiento de citas en fechas pasadas.
* **Agenda del médico:** Consultar la agenda de un médico por rango de fechas.
* **Gestión de estados:** Actualizar el estado de una cita (Programada, Completada o Cancelada).

### Gerencia (Análisis de Datos)

* **Rentabilidad por área:** Obtener el volumen de citas agrupado por especialidad.
* **Corte operativo diario:** Consultar la cantidad de citas completadas y canceladas en una fecha determinada.

# Base de datos

PostgreSQL como motor de base de datos y Prisma ORM para:

* Modelar las entidades.
* Crear y ejecutar migraciones.
* Generar Prisma Client.
* Realizar operaciones sobre la base de datos.
* Gestionar las relaciones entre entidades.

# Autenticación y autorización

El sistema utiliza autenticación mediante **JWT (JSON Web Token)** y autorización según el rol del usuario.

Roles contemplados:

* `RECEPCIONISTA`
* `MEDICO`
* `GERENCIA`

Los endpoints protegidos requieren un token JWT válido.

Además, el acceso a determinados recursos se controla mediante el rol del usuario.

Si no se proporciona un token válido, la API responde con:

```text
401 Unauthorized
```

Si el usuario está autenticado pero no posee permisos suficientes para acceder al recurso:

```text
403 Forbidden
```

# Documentación de la API

La API cuenta con documentación interactiva mediante **Swagger UI**.

Una vez iniciado el servidor, estará disponible en:

```text
http://localhost:3000/api-docs
```

Desde Swagger es posible consultar y probar los diferentes endpoints de la API.

### Autorización en Swagger

Para probar los endpoints protegidos:

1. Iniciar sesión mediante el endpoint:

```text
POST /api/auth/login
```

2. Copiar el token JWT obtenido en la respuesta.

3. En Swagger, presionar el botón **Authorize**.

4. Ingresar el token con el siguiente formato:

```text
Bearer TU_TOKEN_JWT
```

5. Presionar **Authorize**.

A partir de ese momento, Swagger enviará el token en las solicitudes a los endpoints protegidos.

# Instalación

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

* Node.js
* pnpm
* PostgreSQL

## 1. Clonar el repositorio

```bash
git clone https://github.com/pamelasessa-dev/api-clinica-salud-integral.git

cd api-clinica-salud-integral
```

## 2. Instalar las dependencias

El proyecto utiliza **pnpm** como gestor de paquetes:

```bash
pnpm install
```

Si pnpm solicita aprobar scripts de construcción de Prisma, ejecutar:

```bash
pnpm approve-builds
```

Seleccionar:

* `@prisma/engines`
* `prisma`

Luego ejecutar:

```bash
pnpm prisma generate
```

## 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto y configurar la conexión a PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_de_datos"
```

También se puede configurar el puerto del servidor:

```env
PORT=3000
```

No subir el archivo `.env` al repositorio. Este archivo contiene información sensible y debe estar incluido en `.gitignore`.

## 4. Ejecutar las migraciones

Para crear o actualizar la estructura de la base de datos:

```bash
pnpm prisma migrate dev
```

## 5. Ejecutar el proyecto

Para iniciar el servidor en modo desarrollo:

```bash
pnpm dev
```

La API estará disponible en:

```text
http://localhost:3000
```

La documentación de Swagger estará disponible en:

```text
http://localhost:3000/api-docs
```

## 6. Regenerar la documentación de Swagger

Cuando se realicen modificaciones en los endpoints o en su documentación, se puede regenerar el archivo de Swagger mediante:

```bash
pnpm swagger
```

Luego se debe reiniciar el servidor y acceder nuevamente a:

```text
http://localhost:3000/api-docs
```

# Base de datos y Prisma Studio

Para visualizar y gestionar los registros de la base de datos mediante Prisma Studio:

```bash
pnpm prisma studio
```

Prisma Studio permitirá consultar las entidades y los datos almacenados en la base de datos.

# Principales endpoints

### Autenticación

```text
POST /api/auth/register
POST /api/auth/login
```

### Pacientes

```text
GET    /api/pacientes
GET    /api/pacientes/:CI
GET    /api/pacientes/:CI/expediente
POST   /api/pacientes
PUT    /api/pacientes/:CI
DELETE /api/pacientes/:CI
```

El endpoint de expediente permite consultar los datos completos de un paciente junto con su historial de citas, incluyendo el médico y la especialidad correspondiente.


### Especialidades

```text
GET    /api/especialidades
GET    /api/especialidades/:id
POST   /api/especialidades
PUT    /api/especialidades/:id
DELETE /api/especialidades/:id
```

### Médicos

```text
GET    /api/medicos
GET    /api/medicos/:id
GET    /api/medicos/citas
POST   /api/medicos
PUT    /api/medicos/:id
DELETE /api/medicos/:id
```

### Citas

```text
GET    /api/citas
GET    /api/citas/:id
POST   /api/citas
PUT    /api/citas/:id
PATCH  /api/citas/:id/status
DELETE /api/citas/:id
```

### Reportes

```text
GET    /api/reports/appointments-by-specialty 
GET   /api/reports/daily-cutoff
```

Los endpoints de reportes requieren autenticación y el rol GERENCIA.

La documentación completa de cada endpoint, sus parámetros, respuestas y requisitos de autenticación se encuentra disponible en Swagger.

# Seguridad

* Las contraseñas se gestionan mediante `bcryptjs`.
* Los endpoints protegidos requieren un JWT válido.
* El acceso a los recursos se controla mediante roles.
* El archivo `.env` no debe subirse al repositorio.
* No se deben publicar tokens JWT ni credenciales reales.
