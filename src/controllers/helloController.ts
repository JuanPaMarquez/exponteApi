import { Request, Response } from 'express';

export const helloWorldController = (req: Request, res: Response) => {

  res.json({ message: 'Hola mundo desde TypeScript y Node.js y juan pa' });

};