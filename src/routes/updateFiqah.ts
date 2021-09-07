export {};
const express = require('express');
const { updateFiqah } = require('../controller/users.controller');
const router = express.Router();
import { Request, Response } from 'express';

router.post('/', (req: Request, res: Response) => {
  updateFiqah(req, res);
});

module.exports = router;
