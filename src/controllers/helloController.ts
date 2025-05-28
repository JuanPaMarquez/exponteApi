import { Request, Response } from 'express';

export const helloWorld = (req: Request, res: Response) => {
  res.json({ message: 'Hola mundo desde TypeScript y Node.js' });
};