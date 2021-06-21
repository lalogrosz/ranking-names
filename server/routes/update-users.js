var express = require('express');
const GrouppedFirstname = require('../models/GrouppedFirstname');
const GrouppedLastname = require('../models/GrouppedLastname');
const Member = require('../models/Member');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const { WebClient } = require('@slack/web-api');

  // Read a token from the environment variables
  const token = process.env.SLACK_TOKEN;
  
  // Initialize
  const web = new WebClient(token);
  const members = (await web.users.list()).members.filter(
      m => !m.is_restricted && !m.is_bot && !m.is_app_user && !m.is_restricted
  );

  for (let m of members) {
    console.log('Updating user ', m.profile);

    const updatedData = {picture: m.profile.image_72, deleted: m.deleted};

    await Member.findOneAndUpdate(
        {slack_id: m.id},
        updatedData
    );

    await GrouppedFirstname.findOneAndUpdate(
        {id: m.id},
        updatedData
    );

    await GrouppedLastname.findOneAndUpdate(
        {id: m.id},
        updatedData
    );
  }
  res.json({success: true});
});

module.exports = router;
