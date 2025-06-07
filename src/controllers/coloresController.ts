import { Request, Response } from "express";
import { coloresService } from "../services/coloresService";

export const crearColores = async (req: Request, res: Response) => {
  const { usuario_id, color_texto, color_titulo, fondo_navegacion, fondo_presentacion, fondo_proyectos, fondo_redes } = req.body;

  try {
    const nuevoColor = await coloresService.crearColores(
      usuario_id,
      color_texto,
      color_titulo,
      fondo_navegacion,
      fondo_presentacion,
      fondo_proyectos,
      fondo_redes
    );
    res.status(201).json(nuevoColor);
  } catch (error) {
    console.error("Error al crear colores:", error);
    res.status(500).json({ error: "Error al crear colores" });
  }
};

export const obtenerColoresPorUsuario = async (req: Request, res: Response) => {
  const usuario_id = parseInt(req.params.usuario_id);

  try {
    const colores = await coloresService.obtenerColoresPorUsuarioId(usuario_id);
    if (!colores) {
      const coloresDefault = await coloresService.crearColores(
        usuario_id,
        "#ffffff",
        "#8fdaff",
        "#287dbe",
        "#0d2a3f",
        "#21689e",
        "#0d2a3f"
      );
      res.status(201).json(coloresDefault);
      return;
    }
    res.status(200).json(colores);
  } catch (error) {
    console.error("Error al obtener colores:", error);
    res.status(500).json({ error: "Error al obtener colores" });
  }
};

export const modificarColores = async (req: Request, res: Response) => {
  const { id, color_texto, color_titulo, fondo_navegacion, fondo_presentacion, fondo_proyectos, fondo_redes } = req.body;

  console.log("modificarColores", id, color_texto, color_titulo, fondo_navegacion, fondo_presentacion, fondo_proyectos, fondo_redes);

  try {
    const coloresModificados = await coloresService.modificarColores(
      id,
      color_texto,
      color_titulo,
      fondo_navegacion,
      fondo_presentacion,
      fondo_proyectos,
      fondo_redes
    );

    if (!coloresModificados) {
      res.status(404).json({ error: "Colores no encontrados" });
      return;
    }
    res.status(200).json(coloresModificados);
  } catch (error) {
    console.error("Error al modificar colores:", error);
    res.status(500).json({ error: "Error al modificar colores" });
  }
};