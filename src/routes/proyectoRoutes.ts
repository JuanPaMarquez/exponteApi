import { Router } from "express";
import { 
  crearProyecto,
  obtenerProyectosPorUsuario,
  modificarProyecto,
  eliminarProyecto
} from "../controllers/proyectoController";

const proyectoRouter = Router();

proyectoRouter.post("/proyecto", crearProyecto);
proyectoRouter.get("/proyecto/:usuario_id", obtenerProyectosPorUsuario);
proyectoRouter.put("/proyecto/:id", modificarProyecto);
proyectoRouter.delete("/proyecto/:id", eliminarProyecto);

export default proyectoRouter;