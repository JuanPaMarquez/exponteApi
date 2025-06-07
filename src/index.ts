import express from 'express';
import usuarioRouter from './routes/usuarioRoutes';
import perfilRouter from './routes/perfilRoutes';
import proyectoRouter from './routes/proyectoRoutes';
import tecnologiaRouter from './routes/tecnologiaRoutes';
import redSocialRoutes from './routes/redSocialRoutes';
import coloresRouter from './routes/coloresRoutes';

const app = express();
const cors = require('cors');
const PORT = 3001;

const corsOptions = {
  origin: 'https://exponte.vercel.app', 
  // origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', usuarioRouter);
app.use('/api', perfilRouter);
app.use('/api', proyectoRouter);
app.use('/api', tecnologiaRouter);
app.use('/api', redSocialRoutes);
app.use('/api', coloresRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});