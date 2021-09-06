"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { updateCity } = require('../controller/users.controller');
const router = express.Router();
router.post('/', (req, res) => {
    updateCity(req, res);
});
module.exports = router;
