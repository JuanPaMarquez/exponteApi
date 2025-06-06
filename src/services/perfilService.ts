import { db } from "../db";
import { perfil } from "../db/schemas";
import { eq } from 'drizzle-orm';


export class PerfilService {

  // Agregar un nuevo perfil
  async agregarPerfil(nombre: string, foto: string, titulos: string, usuario_id: number) {
    const nuevoPerfil = {
      nombre,
      foto,
      titulos,
      usuario_id
    };

    const result = await db.insert(perfil).values(nuevoPerfil).returning();
    return result[0];
  }

  // Obtener perfil por ID de usuario
  async obtenerPerfilPorUsuarioId(usuario_id: number) {
    const result = await db
      .select({
        id: perfil.id,
        nombre: perfil.nombre,
        foto: perfil.foto,
        titulos: perfil.titulos,
      })
      .from(perfil)
      .where(eq(perfil.usuario_id, usuario_id));

    return result.length > 0 ? result[0] : null;
  }

  async modificarPerfil(id: number, nombre: string, foto: string, titulos: string) {
    const result = await db
      .update(perfil)
      .set({ nombre, foto, titulos })
      .where(eq(perfil.id, id))
      .returning();

    return result[0];
  }

}

export const perfilService = new PerfilService();