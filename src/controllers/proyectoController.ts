import { Request, Response } from "express";
import { proyectoService } from "../services/proyectoService";

export const crearProyecto = async (req: Request, res: Response) => {
  const { titulo, descripcion, imagen, linkGithub, linkDemo, usuario_id } = req.body;

  if (!titulo || !descripcion || !usuario_id) {
    res.status(400).json({ error: "Faltan datos obligatorios" });
    return;
  }

  try {
    const result = await proyectoService.agregarProyecto(
      titulo,
      descripcion,
      imagen,
      linkGithub,
      linkDemo,
      usuario_id
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    res.status(500).json({ error: "Error al crear el proyecto" });
  }
}

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

export const modificarProyecto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descripcion, imagen, linkGithub, linkDemo } = req.body;

  if (!titulo || !descripcion) {
    res.status(400).json({ error: "Faltan datos obligatorios" });
    return;
  }

  try {
    const result = await proyectoService.modificarProyecto(
      parseInt(id),
      titulo,
      descripcion,
      imagen,
      linkGithub,
      linkDemo
    );

    if (!result) {
      res.status(404).json({ error: "Proyecto no encontrado" });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error al modificar el proyecto:", error);
    res.status(500).json({ error: "Error al modificar el proyecto" });
  }
}

export const eliminarProyecto = async (req: Request, res: Response) => {
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