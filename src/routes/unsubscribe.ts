import express, { NextFunction, Request, Response } from 'express';
import { deleteUser } from '../controller/users.controller';
const router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  deleteUser(req, res, next);
});

export default router;
