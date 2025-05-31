import { db } from "../db";
import { tecnologia } from "../db/schemas";
import { eq } from "drizzle-orm";

export class TecnologiaService {
  // Agregar una nueva tecnología a un proyecto
  async agregarTecnologia(proyecto_id: number, nombre_tecnologia: string) {
    const nuevaTecnologia = {
      proyecto_id,
      nombre_tecnologia
    };

    const result = await db.insert(tecnologia).values(nuevaTecnologia).returning();
    return result[0];
  }

  // Obtener tecnologías por ID de proyecto
  async obtenerTecnologiasPorProyectoId(proyecto_id: number) {
    const result = await db
      .select({
        id: tecnologia.id,
        nombre_tecnologia: tecnologia.nombre_tecnologia,
      })
      .from(tecnologia)
      .where(eq(tecnologia.proyecto_id, proyecto_id));

    return result;
  }

  // Modificar una tecnología
  async modificarTecnologia(id: number, nombre_tecnologia: string) {
    const result = await db
      .update(tecnologia)
      .set({ nombre_tecnologia })
      .where(eq(tecnologia.id, id))
      .returning();

    return result[0];
  }

  // Eliminar una tecnología
  async eliminarTecnologia(id: number) {
    const result = await db
      .delete(tecnologia)
      .where(eq(tecnologia.id, id))
      .returning();

    return result[0];
  }
}

export const tecnologiaService = new TecnologiaService();