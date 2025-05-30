import { Request, Response } from "express";
import { perfilService } from "../services/perfilService";

export const crearPerfil = async (req: Request, res: Response) => {
  const { nombre, foto, titulos, usuario_id } = req.body;

  if (!nombre || !usuario_id) {
    res.status(400).json({ error: "Nombre y usuario_id son obligatorios" });
    return;
  }

  try {

    const nuevoPerfil = await perfilService.agregarPerfil(nombre, foto, titulos, usuario_id);
    res.status(201).json(nuevoPerfil);

  } catch (error) {
    console.error("Error al crear perfil:", error);
    res.status(500).json({ error: "Error al crear perfil" });
  }
};

export const obtenerPerfilPorUsuarioId = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  if (!usuario_id) {
    res.status(400).json({ error: "usuario_id es obligatorio" });
    return; 
  }

  try {
    const perfil = await perfilService.obtenerPerfilPorUsuarioId(parseInt(usuario_id));

    if (!perfil) {
      res.status(404).json({ error: "Perfil no encontrado" });
      return;
    }

    res.status(200).json(perfil);

  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};