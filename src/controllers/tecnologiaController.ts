import { Request, Response } from "express";
import { tecnologiaService } from "../services/tecnologiaService";

export const eliminarTecnologia = async (req: Request, res: Response) => {
  const tecnologiaId = parseInt(req.params.id);

  if (isNaN(tecnologiaId)) {
    res.status(400).json({ error: "ID de tecnología inválido" });
    return;
  }

  try {
    const tecnologiaEliminada = await tecnologiaService.eliminarTecnologia(tecnologiaId);
    
    if (!tecnologiaEliminada) {
      res.status(404).json({ error: "Tecnología no encontrada" });
      return;
    }

    res.status(200).json({ message: "Tecnología eliminada correctamente", tecnologia: tecnologiaEliminada });
  } catch (error) {
    console.error("Error al eliminar la tecnología:", error);
    res.status(500).json({ error: "Error al eliminar la tecnología" });
  }
}