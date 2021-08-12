const express = require('express');
const router = express.Router();
const time = require('./functions');

router.get('/getlist', async function (req, res) {
  try {
    let result = await time();
    return res.json({
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      msg: 'something went wrong',
      e,
    });
  }
});
module.exports = router;
