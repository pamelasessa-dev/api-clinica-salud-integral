import prisma from "../config/prisma";


export const medicoModel = {

// Obtener todos los médicos

findAll: async (
nombre?: string,
apellido?: string,
id_especialidad?: number,
) => {
return await prisma.medico.findMany({
where: {
...(nombre && {
nombre: {
contains: nombre,
mode: "insensitive",
},
}),
    ...(apellido && {
      apellido: {
        contains: apellido,
        mode: "insensitive",
      },
    }),

    ...(id_especialidad && {
      id_especialidad,
    }),
  },

  orderBy: {
    apellido: "asc",
  },

  select: {
    id_medico: true,
    nombre: true,
    apellido: true,

    especialidad: {
      select: {
        id_especialidad: true,
        nombre: true,
      },
    },
  },
});

},


// Obtener médico por ID

findById: async (id_medico: number) => {
return await prisma.medico.findUnique({
where: {
id_medico,
},


  select: {
    id_medico: true,
    nombre: true,
    apellido: true,

    especialidad: {
      select: {
        id_especialidad: true,
        nombre: true,
      },
    },
  },
});


},

// Crear médico

create: async (
nombre: string,
apellido: string,
id_especialidad: number,
id_usuario: number,
) => {
return await prisma.medico.create({
data: {
nombre,
apellido,
id_especialidad,
id_usuario,
},

  select: {
    id_medico: true,
    nombre: true,
    apellido: true,

    especialidad: {
      select: {
        id_especialidad: true,
        nombre: true,
      },
    },
  },
});
},

// Actualizar médico


update: async (
id_medico: number,
nombre: string,
apellido: string,
id_especialidad: number,
id_usuario: number,
) => {
return await prisma.medico.update({
where: {
id_medico,
},

  data: {
    nombre,
    apellido,
    id_especialidad,
    id_usuario,
  },

  select: {
    id_medico: true,
    nombre: true,
    apellido: true,

    especialidad: {
      select: {
        id_especialidad: true,
        nombre: true,
      },
    },
  },
});
},

// Eliminar médico

delete: async (id_medico: number) => {
return await prisma.medico.delete({
where: {
id_medico,
},
});
},
};
