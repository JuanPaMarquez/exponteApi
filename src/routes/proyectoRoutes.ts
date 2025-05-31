import { Router } from "express";
import { 
  crearProyectos,
  obtenerProyectosPorUsuario,
  modificarProyectos,
  eliminarProyectos
} from "../controllers/proyectoController";

const proyectoRouter = Router();

proyectoRouter.post("/proyecto", crearProyectos);
proyectoRouter.get("/proyecto/:usuario_id", obtenerProyectosPorUsuario);
proyectoRouter.put("/proyecto/:id", modificarProyectos);
proyectoRouter.delete("/proyecto/:id", eliminarProyectos);

export default proyectoRouter;