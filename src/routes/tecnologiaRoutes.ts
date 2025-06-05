import { Router } from 'express';
import { 
  eliminarTecnologia,
  agregarTecnologia 
} from '../controllers/tecnologiaController';

const tecnologiaRouter = Router();

tecnologiaRouter.post('/tecnologias', agregarTecnologia)
tecnologiaRouter.delete('/tecnologias/:id', eliminarTecnologia);

export default tecnologiaRouter;
