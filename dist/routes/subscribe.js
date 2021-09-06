"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { addUser } = require('../controller/users.controller');
const router = express.Router();
router.post('/', (req, res) => {
    addUser(req, res);
});
module.exports = router;
