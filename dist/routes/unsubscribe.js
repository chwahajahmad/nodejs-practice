"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { deleteUser } = require('../controller/users.controller');
const router = express.Router();
router.post('/', (req, res) => {
    deleteUser(req, res);
});
module.exports = router;
