var express = require('express');
var GrouppedFirstname = require('../models/GrouppedFirstname');
const GrouppedLastname = require('../models/GrouppedLastname');
const Member = require('../models/Member');
var router = express.Router();

const sortMembersBySizeAndName = (group, key) => {
  return group.sort((a, b) => {
    // Sort by members size
    if (a.members.length < b.members.length) return 1;
    if (a.members.length > b.members.length) return -1;

    // And by firstname
    if (a[key] < b[key]) return 1;
    if (a[key] > b[key]) return -1;
    return 0;
  });
}

/* GET home page. */
router.get('/', function (req, res, next) {
  /*const grouppedFirstnames = sortMembersBySizeAndName(await GrouppedFirstname.find());
  const grouppedLastnames = sortMembersBySizeAndName(await GrouppedLastname.find());

  const newMembers = await Member.find({
    date_in: {
      $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
    },
    deleted: false
  }).sort({ "date_in": -1 });

  const newLeaves = await Member.find({
    date_out: {
      $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
    },
    deleted: true
  }).sort({ "date_out": -1 })

  */

  res.send("Deploy con exito");

});

module.exports = router;
