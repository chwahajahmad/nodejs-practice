import express, { NextFunction, Request, Response } from 'express';
import { addUser } from '../controller/users.controller';
const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  addUser(req, res, next);
});

export default router;
