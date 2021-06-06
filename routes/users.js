var express = require('express');
const Member = require('../models/Member');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const member = await Member.findOne({lastname: 'Grosz'});
  res.json(member);
});

module.exports = router;
