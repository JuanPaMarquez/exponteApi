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
    const existeEmail = await usuarioService.existeEmail(email);
    if (existe) {
      res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
      return;
    }
    if (existeEmail) {
      res.status(400).json({ error: 'El email ya está en uso' });
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

  if (!id) {
    res.status(400).json({ error: "El ID del usuario es obligatorio" });
    return; 
  }


  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(parseInt(id));
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
}

export const verificarSesionUsuario = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "Email y contraseña son obligatorios" });
    return; 
  }
  try {
    const usuario = await usuarioService.verificarUsuario(email, password);
    if (usuario) {
      res.status(200).json({ message: "Usuario verificado correctamente", usuario });
    } else {
      res.status(401).json({ error: "Email o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    res.status(500).json({ error: "Error al verificar el usuario" });
  }
};

export const modificarNombreUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre_usuario } = req.body;

  console.log("llego?", id, nombre_usuario);

  if (!id || !nombre_usuario) {
    res.status(400).json({ error: "ID y nombre de usuario son obligatorios" });
    return; 
  }

  try {
    const existe = await usuarioService.existeUsuario(nombre_usuario);
    if (existe) {
      res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
      return;
    }
    const usuarioModificado = await usuarioService.modificarNombreUsuario(parseInt(id), nombre_usuario);
    res.status(200).json(usuarioModificado);
  } catch (error) {
    res.status(500).json({ error: "Error al modificar el usuario" });
  }
};

export const modificarPasswordUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!id || !password) {
    res.status(400).json({ error: "ID y contraseña son obligatorios" });
    return; 
  }

  try {
    const usuarioModificado = await usuarioService.modificarPassword(parseInt(id), password);
    if (!usuarioModificado) {
      res.status(404).json({ error: "Usuario no encontrado o no se pudo modificar la contraseña" });
      return;
    }
    res.status(200).json({ message: "Contraseña modificada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al modificar la contraseña del usuario" });
  }
};

export const obtenerUsuarioPorNombre = async (req: Request, res: Response) => {
  const { nombre_usuario } = req.params;

  if (!nombre_usuario) {
    res.status(400).json({ error: "El nombre de usuario es obligatorio" });
    return; 
  }

  try {
    const usuario = await usuarioService.obtenerUsuarioPorNombre(nombre_usuario);
    if (!usuario) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error al obtener el usuario por nombre:", error);
    res.status(500).json({ error: "Error al obtener el usuario por nombre" });
  }
};