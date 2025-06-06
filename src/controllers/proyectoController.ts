import { Request, Response } from "express";
import { proyectoService } from "../services/proyectoService";
import { tecnologiaService } from "../services/tecnologiaService";

export const crearProyectos = async (req: Request, res: Response) => {
  const proyectos = req.body;
  
  if (!Array.isArray(proyectos)) {
    res.status(400).json({ error: "Se esperaba un arreglo de proyectos" });
    return;
  }
  
  const resultados = [];
  
  
  try {
    for (const proyecto of proyectos) {
      const { titulo, descripcion, imagen, linkGithub, linkDemo, usuario_id, tecnologias } = proyecto;
      
      if (titulo == null || descripcion == null || usuario_id == null) {
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

      let tecnologiasAgregadas = [];
      
      if (tecnologias && tecnologias.length > 0) {
        for (const tecnologia of tecnologias) {
          const tecnologiaAgregada = await tecnologiaService.agregarTecnologia(result.id, tecnologia.nombre_tecnologia);
          tecnologiasAgregadas.push(tecnologiaAgregada);
        }
      }
      resultados.push({
        ...result,
        tecnologias: tecnologiasAgregadas.map(t => ({ id: t.id, nombre_tecnologia: t.nombre_tecnologia }))
      });
    }

    res.status(201).json({ message: "Proyectos creados", proyectos: resultados });
  } catch (error) {
    console.error("Error al crear los proyectos:", error);
    res.status(500).json({ error: "Error al crear uno o más proyectos" });
  }
};


export const obtenerProyectosPorUsuario = async (req: Request, res: Response) => {
  const usuario_id = parseInt(req.params.usuario_id);

  const proyectosConTecnologias = [];

  try {
    const proyectos = await proyectoService.obtenerProyectosPorUsuarioId(usuario_id);

    if (proyectos.length === 0) {
      const proyectoVacio = await proyectoService.agregarProyecto("","","","","",usuario_id);
      const tecnologia = await tecnologiaService.agregarTecnologia(proyectoVacio.id, "");
      proyectosConTecnologias.push({
        ...proyectoVacio,
        tecnologias: [tecnologia]
      });
      res.status(200).json(proyectosConTecnologias);
      return;
    }

    for (const proyecto of proyectos) {
      const tecnologias = await tecnologiaService.obtenerTecnologiasPorProyectoId(proyecto.id);
      proyectosConTecnologias.push({
        ...proyecto,
        tecnologias: tecnologias.map(t => (
          { id: t.id, nombre_tecnologia: t.nombre_tecnologia }
        ))
      });
    }
    res.status(200).json(proyectosConTecnologias);
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
      const { id, titulo, descripcion, imagen, linkGithub, linkDemo, tecnologias } = proyecto;

      if (id == null || titulo == null || descripcion == null) {
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

      const nuevasTecnologias = [];

      for (const tecnologia of tecnologias || []) {
        const tecnologiaModificada = await tecnologiaService.modificarTecnologia(tecnologia.id, tecnologia.nombre_tecnologia);
        nuevasTecnologias.push(tecnologiaModificada);
      }

      const proyectoConTecnologias = {
        ...result,
        tecnologias: nuevasTecnologias.map(t => ({ id: t.id, nombre_tecnologia: t.nombre_tecnologia }))
      };

      resultados.push(proyectoConTecnologias);
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