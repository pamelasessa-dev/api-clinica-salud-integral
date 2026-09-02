import { Request, Response, NextFunction } from 'express'
import { AuthPayload } from './auth.middleware.js'

export function authorize(...roles: AuthPayload['rol'][]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a este recurso' })
    }
    next()
  }
}

