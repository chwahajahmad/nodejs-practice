export {};
const express = require('express');
const { deleteUser } = require('../controller/users.controller');
const router = express.Router();
import { Request, Response } from 'express';

router.post('/', (req: Request, res: Response) => {
  deleteUser(req, res);
});

module.exports = router;
