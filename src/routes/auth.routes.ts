
import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router: Router = Router();

router.post("/register", register, (req, res) => {
  /*
  #swagger.tags = ['Autenticación']
  #swagger.summary = 'Registrar un usuario'
  #swagger.description = 'Registra un nuevo usuario en el sistema de la Clínica Salud Integral. El rol puede ser RECEPCIONISTA, MEDICO o GERENCIA.'

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Datos del usuario. El campo rol debe ser RECEPCIONISTA, MEDICO o GERENCIA.',
    schema: {
      nombre: 'Ana',
      apellido: 'Gimenez',
      email: 'ana.gimenez@email.com',
      password: 'Password123',
      rol: 'RECEPCIONISTA'
    }
  }

  #swagger.responses[201] = {
    description: 'Usuario registrado correctamente'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

router.post("/login", login, (req, res) => {
  /*
  #swagger.tags = ['Autenticación']
  #swagger.summary = 'Iniciar sesión'
  #swagger.description = 'Autentica un usuario mediante su correo electrónico y contraseña y devuelve un token JWT.'

  #swagger.parameters['body'] = {
    in: 'body',
    required: true,
    description: 'Credenciales del usuario',
    schema: {
      email: 'juan.perez@email.com',
      password: 'Password123'
    }
  }

  #swagger.responses[200] = {
    description: 'Inicio de sesión exitoso. Devuelve un token JWT.'
  }

  #swagger.responses[401] = {
    description: 'Credenciales inválidas'
  }

  #swagger.responses[500] = {
    description: 'Error interno del servidor'
  }
  */
});

export default router;
