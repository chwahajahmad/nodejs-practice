import e, { request } from 'express';

export {};
const express = require('express');
const { addUser } = require('../controller/users.controller');
const router = express.Router();
import { Request, Response } from 'express';

router.post('/', (req: Request, res: Response) => {
  addUser(req, res);
});
module.exports = router;
