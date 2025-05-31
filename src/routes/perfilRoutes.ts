import { Router } from "express";
import { 
  crearPerfil,
  obtenerPerfilPorUsuarioId,
  modificarPerfil
} from "../controllers/perfilController";

const perfilRouter = Router();

perfilRouter.post("/perfil", crearPerfil);
perfilRouter.get("/perfil/:usuario_id", obtenerPerfilPorUsuarioId);
perfilRouter.put("/perfil/:id", modificarPerfil);

export default perfilRouter;