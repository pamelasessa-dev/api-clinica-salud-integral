# api-clinica-salud-integral

API RESTful para la gestión de la Clínica Salud Integral, desarrollada como proyecto de backend persistente con Express, TypeScript, PostgreSQL y Prisma ORM.

El sistema busca reemplazar la gestión basada en hojas de cálculo y centralizar la información de pacientes, médicos, especialidades y citas, además de proporcionar reportes para la gerencia.

# Tecnologías

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- JWT
- bcryptjs
- Swagger UI


# Funcionalidades

- Recepción (Pacientes y Directorio)
  
Alta de paciente: Registrar nuevos pacientes y validar los datos de los pacientes.
Búsqueda de Especialistas: Consultar médicos de la clínica y filtrar médicos por especialidad.
Consulta de expedientes: Consultar el expediente de un paciente y su historial de citas.

- Consultorio (Agendamiento y Atención)
  
Programación de citas: Agendar citas entre pacientes y médicos.
Impedir el agendamiento de citas en fechas pasadas.
Agenda del médico: Consultar la agenda de un médico por rango de fechas.
Gestionar estados: Actualizar el estado de una cita (Programada, Completada o Cancelada).

- Gerencia (Análisis de Datos)
  
Rentabilidad por área: Obtener el volumen de citas agrupado por especialidad.
Corte operativo diario: Consultar la cantidad de citas completadas y canceladas en una fecha determinada.

# Base de datos

PostgreSQL como motor de base de datos y Prisma ORM para:

- Modelar las entidades.
- Crear y ejecutar migraciones.
- Generar Prisma Client.
- Realizar operaciones sobre la base de datos.
- Gestionar las relaciones entre entidades.

# Autenticación

El sistema contará con autenticación mediante JWT y autorización según el rol del usuario.

Roles contemplados:

RECEPCIONISTA
MEDICO
GERENCIA

# Documentación de la API

La API contará con documentación interactiva mediante Swagger UI.
Una vez iniciado el servidor, estará disponible en:

/api/docs

## Instalación

### Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

* Node.js
* pnpm
* PostgreSQL

### 1. Clonar el repositorio

```bash
git clone https://github.com/pamelasessa-dev/api-clinica-salud-integral.git
cd api-clinica-salud-integral
```

### 2. Instalar las dependencias

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

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto y configurar la variable de conexión a PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_de_datos"
```

> No subir el archivo `.env` al repositorio. Este archivo contiene información sensible y debe estar incluido en `.gitignore`.

### 4. Ejecutar las migraciones

Para crear/actualizar la estructura de la base de datos:

```bash
pnpm prisma migrate dev
```

### 5. Ejecutar el proyecto

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
