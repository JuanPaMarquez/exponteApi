import { db } from "../db";
import { usuario } from "../db/schemas";
import { and, eq } from 'drizzle-orm'

export class UsuarioService {

  // Agregar un nuevo usuario
  async agregarUsuario(nombre_usuario: string, email: string, password: string) {
    const nuevoUsuario = {
      nombre_usuario,
      email,
      password
    };

    const result = await db.insert(usuario).values(nuevoUsuario).returning();
    return result[0];
  }

  // Verificar si un nombre de usuario ya existe
  async existeUsuario(nombre_usuario: string) {

    const result = await db
      .select({ nombre_usuario: usuario.nombre_usuario })
      .from(usuario)
      .where(eq(usuario.nombre_usuario, nombre_usuario));

    return result.length > 0;
  }

   async obtenerUsuarioPorId(id: number) {
    return await db
      .select({
        nombre: usuario.nombre_usuario,
        email: usuario.email,
      })
      .from(usuario)
      .where(eq(usuario.id, id))
  }
}

export const usuarioService = new UsuarioService();