var express = require('express');
const GrouppedFirstname = require('../models/GrouppedFirstname');
const GrouppedLastname = require('../models/GrouppedLastname');
const Member = require('../models/Member');
var router = express.Router();

const deleteUser = async (user) => {
    const member = await Member.findOneAndUpdate(
        {slack_id: user.id},
        {deleted: true, date_out: new Date().getTime()},
        {new: true}
    );

    const grouppedFirst = GrouppedFirstname.findOne({firstname: member.firstname});
    grouppedFirst.members = grouppedFirst.members.filter(member => member.id !== user.id);
    grouppedFirst.save();

    const grouppedLast = GrouppedLastname.findOne({lastname: member.lastname});
    grouppedLast.members = grouppedLast.members.filter(member => member.id !== user.id);
    grouppedLast.save();
};

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('New Event',req.body);

    const event = req.body.event;
    switch (event.type) {
        case 'user_change':
            event.user.deleted && deleteUser(event.user);
            break;
    }

    res.json({"challenge":req.body.challenge});
});

module.exports = router;
