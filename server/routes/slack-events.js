var express = require('express');
const GrouppedFirstname = require('../models/GrouppedFirstname');
const GrouppedLastname = require('../models/GrouppedLastname');
const Member = require('../models/Member');
const { parseFirstAndLastName } = require('../utils');
var router = express.Router();


const addUser = async function (user) {
    console.log('New user', JSON.stringify(user.profile));
    parseFirstAndLastName(user.profile);

    console.log("real name parsed");
    if (!user.profile.first_name ||
        !user.profile.last_name ||
        user.is_bot || 
        user.is_app_user ||
        user.is_restricted
    ) {
        console.log("not a valid user", user);
        return false;
    }

    try {

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
            picture: user.profile.image_72 || null,
            deleted: false
        });
        await grouppedFirst.save();


        // Saving in lastname group
        let grouppedLast = await GrouppedLastname.findOne({lastname: user.profile.last_name});
        // Create if not exists
       // console.log("Has group last?", grouppedLast);
        if (!grouppedLast) {
            grouppedLast = new GrouppedLastname({
                lastname: user.profile.last_name,
                members: []
            });
        }
        grouppedLast.members.push({
            id: user.id,
            firstname: user.profile.first_name,
            picture: user.profile.image_72,
            deleted: false
        });
        await grouppedLast.save();
    } catch (e) {
        console.error('ERROR: ', e);
    }
};

/* GET users listing. */
router.post('/', async function(req, res, next) {    

    const event = req.body.event;
    if (event) {
        switch (event.type) {

            case 'team_join':
                await addUser(event.user);
                break;
        }
    }
    res.json({"challenge":req.body.challenge});    
});

module.exports = router;
