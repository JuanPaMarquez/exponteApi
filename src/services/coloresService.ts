import { db } from "../db";
import { colores } from "../db/schemas";
import { eq } from 'drizzle-orm';

export class ColoresService {

  async crearColores(
    usuario_id: number, 
    color_texto: string, 
    color_titulo: string, 
    fondo_navegacion: string, 
    fondo_presentacion: string, 
    fondo_proyectos: string, 
    fondo_redes: string) {
    // Lógica para crear colores
    const nuevoColor = {
      usuario_id,
      color_texto,
      color_titulo,
      fondo_navegacion,
      fondo_presentacion,
      fondo_proyectos,
      fondo_redes
    };
    const result = await db.insert(colores).values(nuevoColor).returning();
    return result[0];
  }

  async obtenerColoresPorUsuarioId(usuario_id: number) {
    // Lógica para obtener colores por ID de usuario
    const result = await db
      .select()
      .from(colores)
      .where(eq(colores.usuario_id, usuario_id));

    return result.length > 0 ? result[0] : null;
  }

  async modificarColores(
    id: number, 
    color_texto: string, 
    color_titulo: string, 
    fondo_navegacion: string, 
    fondo_presentacion: string, 
    fondo_proyectos: string, 
    fondo_redes: string) {
    // Lógica para modificar colores
    const result = await db
      .update(colores)
      .set({
        color_texto,
        color_titulo,
        fondo_navegacion,
        fondo_presentacion,
        fondo_proyectos,
        fondo_redes
      })
      .where(eq(colores.id, id))
      .returning();

    return result[0];
  }
}

export const coloresService = new ColoresService();