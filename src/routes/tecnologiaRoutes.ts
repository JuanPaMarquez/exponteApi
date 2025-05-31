import { Router } from 'express';
import { eliminarTecnologia } from '../controllers/tecnologiaController';

const tecnologiaRouter = Router();

tecnologiaRouter.delete('/tecnologias/:id', eliminarTecnologia);

export default tecnologiaRouter;
