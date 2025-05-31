import { Request, Response } from "express";
import { proyectoService } from "../services/proyectoService";

export const crearProyectos = async (req: Request, res: Response) => {
  const proyectos = req.body;

  if (!Array.isArray(proyectos)) {
    res.status(400).json({ error: "Se esperaba un arreglo de proyectos" });
    return;
  }

  const resultados = [];

  try {
    for (const proyecto of proyectos) {
      const { titulo, descripcion, imagen, linkGithub, linkDemo, usuario_id } = proyecto;

      if (!titulo || !descripcion || !usuario_id) {
        res.status(400).json({ error: `Faltan datos obligatorios en el proyecto ${titulo ?? '[sin título]'}` });
        return;
      }

      const result = await proyectoService.agregarProyecto(
        titulo,
        descripcion,
        imagen ?? "",
        linkGithub ?? "",
        linkDemo ?? "",
        usuario_id
      );

      resultados.push(result);
    }

    res.status(201).json({ message: "Proyectos creados", proyectos: resultados });
  } catch (error) {
    console.error("Error al crear los proyectos:", error);
    res.status(500).json({ error: "Error al crear uno o más proyectos" });
  }
};


export const obtenerProyectosPorUsuario = async (req: Request, res: Response) => {
  const usuario_id = parseInt(req.params.usuario_id);

  try {
    const proyectos = await proyectoService.obtenerProyectosPorUsuarioId(usuario_id);
    res.status(200).json(proyectos);
  } catch (error) {
    console.error("Error al obtener los proyectos:", error);
    res.status(500).json({ error: "Error al obtener los proyectos" });
  }
}

export const modificarProyectos = async (req: Request, res: Response) => {
  const proyectos = req.body;

  if (!Array.isArray(proyectos)) {
    res.status(400).json({ error: "Se esperaba un arreglo de proyectos" });
    return;
  }

  const resultados = [];
  try {
    for (const proyecto of proyectos) {
      const { id, titulo, descripcion, imagen, linkGithub, linkDemo } = proyecto;

      if (!id || !titulo || !descripcion) {
        res.status(400).json({ error: `Faltan datos obligatorios en el proyecto ${titulo ?? '[sin título]'}` });
        return;
      }

      const result = await proyectoService.modificarProyecto(
        parseInt(id),
        titulo,
        descripcion,
        imagen ?? "",
        linkGithub ?? "",
        linkDemo ?? ""
      );

      if (!result) {
        res.status(404).json({ error: `Proyecto con ID ${id} no encontrado` });
        return;
      }

      resultados.push(result);
    }

    res.status(200).json({ message: "Proyectos modificados", proyectos: resultados });
  } catch (error) {
    console.error("Error al modificar los proyectos:", error);
    res.status(500).json({ error: "Error al modificar uno o más proyectos" });
  }
}

export const eliminarProyectos = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await proyectoService.eliminarProyecto(parseInt(id));

    if (!result) {
      res.status(404).json({ error: "Proyecto no encontrado" });
      return;
    }

    res.status(200).json({ message: "Proyecto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el proyecto:", error);
    res.status(500).json({ error: "Error al eliminar el proyecto" });
  }
}