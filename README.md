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
