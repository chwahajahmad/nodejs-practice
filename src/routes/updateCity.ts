import express, { NextFunction, Request, Response } from 'express';
import { updateCity } from '../controller/users.controller';
const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  updateCity(req, res, next);
});

export default router;
