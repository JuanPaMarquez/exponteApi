import { Request, Response } from "express";
import { redesSocialesService } from "../services/redesSocialesService";
import { redesSocialesDefaults } from "../lib/redesSociales";

export const crearRedesSociales = async (req: Request, res: Response) => {
  const redesSociales = req.body;
  
  if (!Array.isArray(redesSociales)) {
    res.status(400).json({ error: "Formato de datos inválido" });
    return;
  }

  const resultados = [];

  try {
    for (const redSocial of redesSociales) {

      const { social, usuario_id, activo, usuario } = redSocial;

      if (!social || !usuario_id) {
        res.status(400).json({ error: `Faltan datos obligatorios en la red social ${social ?? '[sin nombre]'}` });
        return;
      }
      const nuevaRedSocial = await redesSocialesService.agregarRedSocial(social, usuario_id, activo, usuario);
      resultados.push(nuevaRedSocial);
    }
    res.status(201).json(resultados);
  } catch (error) {
    console.error("Error al crear red social:", error);
    res.status(500).json({ error: "Error al crear red social" });
  }
}

export const obtenerRedesSocialesPorUsuario = async (req: Request, res: Response) => {
  const { usuarioId } = req.params;

  if (!usuarioId) {
    res.status(400).json({ error: "ID de usuario requerido" });
    return;
  }

  const resultados = [];

  try {
    const redes = await redesSocialesService.obtenerRedesSocialesPorUsuario(Number(usuarioId));
    
    if (redes.length === 0) {
      for (const redSocial of redesSocialesDefaults) {

        const { social, activo, usuario } = redSocial;

        const nuevaRedSocial = await redesSocialesService.agregarRedSocial(social, Number(usuarioId), activo, usuario);
        resultados.push(nuevaRedSocial);
      }
      res.status(201).json(resultados);
      return;
    }

    res.status(200).json(redes);
  } catch (error) {
    console.error("Error al obtener redes sociales:", error);
    res.status(500).json({ error: "Error al obtener redes sociales" });
  }
}

export const modificarRedSocial = async (req: Request, res: Response) => {
  const redesSociales = req.body;

  if (!Array.isArray(redesSociales)) {
    res.status(400).json({ error: "Formato de datos inválido" });
    return;
  }

  const resultados = [];

  try {
    for (const redSocial of redesSociales) {

      const { id, social, activo, usuario } = redSocial;

      if (!social || !id) {
        res.status(400).json({ error: `Faltan datos obligatorios en la red social ${social ?? '[sin nombre]'}` });
        return;
      }

      const nuevaRedSocial = await redesSocialesService.modificarRedSocial(
        id,
        social,
        activo,
        usuario
      );
      resultados.push(nuevaRedSocial);
    }
    res.status(201).json(resultados);
  } catch (error) {
    console.error("Error al crear red social:", error);
    res.status(500).json({ error: "Error al crear red social" });
  }
}
