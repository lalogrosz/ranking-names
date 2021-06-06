var express = require('express');
const GrouppedFirstname = require('../models/GrouppedFirstname');
const GrouppedLastname = require('../models/GrouppedLastname');
const Member = require('../models/Member');
const { parseFirstAndLastName } = require('../utils');
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

const addUser = async (user) => {
    parseFirstAndLastName(user.profile);

    if (!user.profile.first_name ||
        !user.profile.last_name ||
        user.is_bot || 
        user.is_app_user
    ) {
        return false;
    }

    const userData = {
        slack_id: user.id,
        firstname: user.profile.first_name,
        lastname: user.profile.last_name,
        deleted: user.deleted,
        date_in: new Date().getTime(),
        date_out: null
    };
    const newMember = new Member(userData);
    await newMember.save();

    
    // Saving in firstname group
    let grouppedFirst = await GrouppedFirstname.findOne({firstname: user.profile.first_name});
    // Create if not exists
    if (!grouppedFirst) {
        grouppedFirst = new GrouppedFirstname({
            firstname: user.profile.first_name,
            members: []
        });
    }
    grouppedFirst.members.push({
        id: user.id,
        lastname: user.profile.last_name,
        picture: user.profile.image_72
    });
    await grouppedFirst.save();


    // Saving in lastname group
    let grouppedLast = await GrouppedLastname.findOne({lastname: user.profile.last_name});
    // Create if not exists
    if (!grouppedLast) {
        grouppedLast = new GrouppedLastname({
            lastname: user.profile.last_name,
            members: []
        });
    }
    grouppedLast.members.push({
        id: user.id,
        firstname: user.profile.first_name,
        picture: user.profile.image_72
    });
    await grouppedLast.save();
};

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('New Event',req.body);

    const event = req.body.event;
    switch (event.type) {
        case 'user_change':
            event.user.deleted && deleteUser(event.user);
            break;

        case 'team_join':
            addUser(event.user);
            break;
    }

    res.json({"challenge":req.body.challenge});
});

module.exports = router;
