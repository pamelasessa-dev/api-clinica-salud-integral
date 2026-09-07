import prisma from "../config/prisma";

// Reporte: total de citas agrupadas por especialidad
export const getAppointmentsBySpecialty = async () => {
  return await prisma.$queryRaw`
    SELECT
      e.nombre AS especialidad,
      COUNT(c.id_cita)::int AS total_citas
    FROM citas c
    INNER JOIN medicos m
      ON m.id_medico = c.id_medico
    INNER JOIN especialidades e
      ON e.id_especialidad = m.id_especialidad
    GROUP BY e.nombre
    ORDER BY total_citas DESC
  `;
};

// Reporte: corte operativo diario
export const getDailyCutoff = async (date: string) => {
  const startOfDay = new Date(`${date}T00:00:00`);
  const endOfDay = new Date(`${date}T23:59:59`);

  return await prisma.cita.groupBy({
    by: ["estado"],
    where: {
      fecha_hora: {
        gte: startOfDay,
        lte: endOfDay,
      },
      estado: {
        in: ["COMPLETADA", "CANCELADA"],
      },
    },
    _count: {
      estado: true,
    },
  });
};
