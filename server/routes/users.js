var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const { WebClient } = require('@slack/web-api');

  // Read a token from the environment variables
  const token = process.env.SLACK_TOKEN;
  
  // Initialize
  const web = new WebClient(token);
  const members = (await web.users.list()).members.filter(m => m.is_restricted);
  res.json(members);
});

module.exports = router;
