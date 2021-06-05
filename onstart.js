const mongoose = require("mongoose")
const GrouppedFirstname = require('./models/GrouppedFirstname');
const GrouppedLastname = require('./models/GrouppedLastname');
const Member = require('./models/Member');

const firstnames = {};
const lastnames = {};

const removeAccents = (str) => {
    return str && str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
} 

const readMembersFromSlack = async () => {
    
    const { WebClient } = require('@slack/web-api');

    // Read a token from the environment variables
    const token = process.env.SLACK_TOKEN;
    
    // Initialize
    const web = new WebClient(token);
    return await web.users.list();
};

const parseFirstAndLastName = (oneMember) => {
    if (!oneMember.profile.first_name) {
        const splitted = oneMember.profile.real_name.split(/ (.+)/)
        oneMember.profile.first_name = splitted[0];
        oneMember.profile.last_name = splitted[1];
    }
    oneMember.profile.first_name = removeAccents(oneMember.profile.first_name);
    oneMember.profile.last_name = removeAccents(oneMember.profile.last_name);
};

const saveMembers = async (members) => {
    if (members && members.length) {
        for (let oneMember of members) {

            // Only users, no bots and no apps
            parseFirstAndLastName(oneMember);
            if (                 
                !oneMember.profile.first_name &&
                !oneMember.profile.last_name &&
                !oneMember.is_bot && 
                !oneMember.is_app_user &&
                !oneMember.profile.always_active
            ) {
                await saveOneMember(oneMember);
                setGrouppedMembers(oneMember);                
            }
        }
    };

    console.log('Success members created');
}

const saveOneMember = async (oneMember) => {
    try {
        const userData = {
            slack_id: oneMember.id,
            firstname: oneMember.profile.first_name,
            lastname: oneMember.profile.last_name,
            deleted: oneMember.deleted,
            date_in: new Date(2021,1,1).getTime(),
            date_out: oneMember.deleted ? oneMember.updated : null
        };
        const newMember = new Member(userData);
        await newMember.save();
        console.log('Saved ' + oneMember.profile.first_name + ' ' + oneMember.profile.last_name);
    } catch (e) {
        console.log('Error saving user', userData)
    }   
};

const setGrouppedMembers = (oneMember) => {
    if (!oneMember.deleted) {
        if (!firstnames[oneMember.profile.first_name]) {
            firstnames[oneMember.profile.first_name] = {
                id: oneMember.id,
                firstname: oneMember.profile.first_name,
                members: []
            };
        }
        firstnames[oneMember.profile.first_name].members.push({
            lastname: oneMember.profile.last_name,
            picture: oneMember.profile.image_72
        });

        if (!lastnames[oneMember.profile.last_name]) {
            lastnames[oneMember.profile.last_name] = {
                id: oneMember.id,
                lastname: oneMember.profile.last_name,
                members: []
            };
        }
        lastnames[oneMember.profile.last_name].members.push({
            firstname: oneMember.profile.last_name,
            picture: oneMember.profile.image_72
        });
    }
};

const saveGrouppedMembers = async () => {
    let member;
    for (let oneFirstname in firstnames) {
        member = new GrouppedFirstname(firstnames[oneFirstname]);
        await member.save();
        console.log('Saved group firstnames ' + oneFirstname);
    }

    for (let oneLastname in lastnames) {
        member = new GrouppedLastname(lastnames[oneLastname]);
        await member.save();
        console.log('Saved group lastnames ' + oneLastname);
    }

    console.log('Success groups created');
};

const loadMembers = async () => {

    const members = await Member.find();
    // Populate members collection if it is empty
    if (members.length === 0) {
        const results = await readMembersFromSlack();

        const session = await mongoose.startSession();

        await session.withTransaction(async () => {
            await saveMembers(results.members);
            await saveGrouppedMembers();
        });

        session.endSession();
    }
};

module.exports = {loadMembers}; 