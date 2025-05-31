import { db } from "../db";
import { proyectos } from "../db/schemas";
import { eq } from "drizzle-orm";


export class ProyectoService {
  // Agregar un nuevo proyecto
  async agregarProyecto(
    titulo: string, 
    descripcion: string, 
    imagen: string, 
    linkGithub: string, 
    linkDemo: string, 
    usuario_id: number
  ) {
    const nuevoProyecto = {
      titulo,
      descripcion,
      imagen,
      linkGithub,
      linkDemo,
      usuario_id
    };

    const result = await db.insert(proyectos).values(nuevoProyecto).returning();
    return result[0];
  }

  // Obtener proyectos por ID de usuario
  async obtenerProyectosPorUsuarioId(usuario_id: number) {
    const result = await db
      .select({
        id: proyectos.id,
        titulo: proyectos.titulo,
        descripcion: proyectos.descripcion,
        imagen: proyectos.imagen,
        linkGithub: proyectos.linkGithub,
        linkDemo: proyectos.linkDemo,
      })
      .from(proyectos)
      .where(eq(proyectos.usuario_id, usuario_id));

    return result;
  }

  // Modificar un proyecto
  async modificarProyecto(
    id: number, 
    titulo: string, 
    descripcion: string, 
    imagen: string, 
    linkGithub: string, 
    linkDemo: string
  ) {
    const result = await db
      .update(proyectos)
      .set({ titulo, descripcion, imagen, linkGithub, linkDemo })
      .where(eq(proyectos.id, id))
      .returning();

    return result[0];
  }

  // Eliminar un proyecto
  async eliminarProyecto(id: number) {
    const result = await db
      .delete(proyectos)
      .where(eq(proyectos.id, id))
      .returning();

    return result[0];
  }
}

export const proyectoService = new ProyectoService();