import { Request, Response } from "express";
import { tecnologiaService } from "../services/tecnologiaService";

export const crearTecnologia = async (req: Request, res: Response) => {
  const { proyecto_id, nombre_tecnologia } = req.body;

  if (!proyecto_id || !nombre_tecnologia) {
    res.status(400).json({ error: "Faltan datos obligatorios" });
    return;
  }

  try {
    const nuevaTecnologia = await tecnologiaService.agregarTecnologia(proyecto_id, nombre_tecnologia);
    res.status(201).json(nuevaTecnologia);
  } catch (error) {
    console.error("Error al crear la tecnología:", error);
    res.status(500).json({ error: "Error al crear la tecnología" });
  }
}

