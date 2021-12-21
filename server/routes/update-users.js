var express = require("express");
const GrouppedFirstname = require("../models/GrouppedFirstname");
const GrouppedLastname = require("../models/GrouppedLastname");
const Member = require("../models/Member");
var router = express.Router();

const DAYS_UPDATED_DIFF = 31;

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const { WebClient } = require("@slack/web-api");

  // Read a token from the environment variables
  const token = process.env.SLACK_TOKEN;

  // Initialize
  const web = new WebClient(token);
  const allUsers = await web.users.list();
  const now = new Date();
  const members = allUsers.members.filter((m) => {
    // Only real users
    if (!m.is_restricted && !m.is_bot && !m.is_app_user && !m.profile.always_active) {
      // But only who has change their status recently (to ignore old deleted users)
      const diffDays = parseInt((now / 1000 - m.updated) / (60 * 60 * 24), 10);
      return diffDays < DAYS_UPDATED_DIFF;
    }
    return false;
  });

  for (let m of members) {
    await Member.findOneAndUpdate({ slack_id: m.id }, { picture: m.profile.image_72, deleted: m.deleted });

    const grouppedCondition = {
      "members.id": m.id
    };
    const grouppedUpdate = {
      $set: {
        "members.$.picture": m.profile.image_72,
        "members.$.deleted": m.deleted
      }
    };

    await GrouppedFirstname.updateOne(grouppedCondition, grouppedUpdate, { multi: true });

    await GrouppedLastname.updateOne(grouppedCondition, grouppedUpdate, { multi: true });
  }
  res.json(members);
});

module.exports = router;
