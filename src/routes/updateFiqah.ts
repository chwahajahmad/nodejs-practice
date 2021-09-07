import express, { NextFunction, Request, Response } from 'express';
import { updateFiqah } from '../controller/users.controller';
const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  updateFiqah(req, res, next);
});

export default router;
