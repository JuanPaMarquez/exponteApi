import { Router } from 'express';
import { 
  crearColores,
  obtenerColoresPorUsuario,
  modificarColores
} from '../controllers/coloresController';

const coloresRouter = Router();

// coloresRouter.post('/colores', crearColores);
coloresRouter.get('/colores/:usuario_id', obtenerColoresPorUsuario);
coloresRouter.put('/colores', modificarColores);

export default coloresRouter;
