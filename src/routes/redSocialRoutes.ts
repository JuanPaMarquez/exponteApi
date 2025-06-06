import { Router } from 'express';
import { 
  crearRedesSociales,
  obtenerRedesSocialesPorUsuario,
  modificarRedSocial

} from '../controllers/redSocialController';

const redSocialRoutes = Router();

redSocialRoutes.post('/redes-sociales', crearRedesSociales);
redSocialRoutes.get('/redes-sociales/:usuarioId', obtenerRedesSocialesPorUsuario);
redSocialRoutes.put('/redes-sociales', modificarRedSocial);

export default redSocialRoutes;