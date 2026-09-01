## Entidades

## Entidad: Paciente

| Atributo          | Tipo           | Notas       |
|-------------------|----------------|-------------|
| CI                | Número Entero  | [PK]        |
| nombre            | Texto          | Obligatorio |
| apellido          | Texto          | Obligatorio |
| fecha_nacimiento  | Fecha          | Obligatorio |
| direccion         | Texto          | Obligatorio |
| telefono          | Texto          | Obligatorio |            


## Entidad: Cita

| Atributo      | Tipo           | Notas       |
|---------------|----------------|-------------|
| id_cita       | Número Entero  | [PK]        |
| fecha_hora    | Fecha/Hora     | Obligatorio |
| estado        | ENUM           | Obligatorio |
| CI_paciente   | Número Entero  | [FK]        |
| id_medico     | Número Entero  | [FK]        |



## Entidad: Medico

| Atributo        | Tipo           | Notas       |
|-----------------|----------------|-------------|
| id_medico       | Número Entero  | [PK]        |
| nombre          | Texto          | Obligatorio |
| apellido        | Texto          | Obligatorio |
| id_especialidad | Número Entero  | [FK]        |



## Entidad: Especialidad

| Atributo        | Tipo           | Notas       |
|-----------------|----------------|-------------|
| id_especialidad | Número Entero  | [PK]        |
| nombre          | Texto          | Obligatorio |



## Relaciones:
- Un paciente puede tener muchas citas, pero una cita pertenece a un solo paciente (1:N)
- Un médico puede tener muchas citas, pero una cita pertenece a un solo médico (1:N)
- Una especialidad puede tener muchos médicos, pero un médico pertenece a una sola especialidad. (1:N)
- Las citas tienen un estado restringido a: Programada, completada, cancelada.