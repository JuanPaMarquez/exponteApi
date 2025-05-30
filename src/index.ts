import express from 'express';
import usuarioRouter from './routes/usuarioRoutes';
import perfilRouter from './routes/perfilRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', usuarioRouter);
app.use('/api', perfilRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});