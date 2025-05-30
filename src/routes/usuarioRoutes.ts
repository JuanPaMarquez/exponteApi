import { Router } from "express";
import { 
  crearUsuario,
  obtenerUsuarioPorId
} from "../controllers/usuarioController";

const usuarioRouter = Router();

usuarioRouter.post("/usuario", crearUsuario);
usuarioRouter.get("/usuario/:id", obtenerUsuarioPorId);

export default usuarioRouter;
