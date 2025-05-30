import { Router } from "express";
import { 
  crearPerfil,
  obtenerPerfilPorUsuarioId
} from "../controllers/perfilController";

const perfilRouter = Router();

perfilRouter.post("/perfil", crearPerfil);
perfilRouter.get("/perfil/:usuario_id", obtenerPerfilPorUsuarioId);

export default perfilRouter;