export {};
const express = require('express');
const { updateCity } = require('../controller/users.controller');
const router = express.Router();
import { Request, Response } from 'express';

router.post('/', (req: Request, res: Response) => {
  updateCity(req, res);
});

module.exports = router;
