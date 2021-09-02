const express = require('express');
const { updateFiqah } = require('../controller/users.controller');

const router = express.Router();

router.post('/', (req, res) => {
  updateFiqah(req, res);
});

module.exports = router;
