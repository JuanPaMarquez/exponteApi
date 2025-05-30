import { Request, Response } from "express";
import { usuarioService } from "../services/usuarioService";

export const crearUsuario = async (req: Request, res: Response) => {
  const { nombre_usuario, email, password } = req.body;

  if (!nombre_usuario || !email || !password) {
    res.status(400).json({ error: "Hay datos que faltan" });
    return; 
  }

  try {
    const existe = await usuarioService.existeUsuario(nombre_usuario);
    if (existe) {
      res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
      return;
    }

    const nuevoUsuario = await usuarioService.agregarUsuario(nombre_usuario, email, password);
    res.status(201).json(nuevoUsuario);

  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
  
  const { id } = req.params;

  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(parseInt(id));
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
}