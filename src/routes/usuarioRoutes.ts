import { Router } from "express";
import { 
  crearUsuario,
  obtenerUsuarioPorId,
  verificarSesionUsuario,
  modificarNombreUsuario,
  modificarPasswordUsuario,
  obtenerUsuarioPorNombre
} from "../controllers/usuarioController";

const usuarioRouter = Router();

usuarioRouter.post("/usuario", crearUsuario);
usuarioRouter.get("/usuario/:id", obtenerUsuarioPorId);
usuarioRouter.post("/usuario/verificar", verificarSesionUsuario);
usuarioRouter.put("/usuario/nombre/:id", modificarNombreUsuario);
usuarioRouter.put("/usuario/password/:id", modificarPasswordUsuario);
usuarioRouter.get("/usuario/nombre/:nombre_usuario", obtenerUsuarioPorNombre);

export default usuarioRouter;
