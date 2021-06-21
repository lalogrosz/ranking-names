var express = require('express');
var GrouppedFirstname = require('../models/GrouppedFirstname');
const GrouppedLastname = require('../models/GrouppedLastname');
const Member = require('../models/Member');
var router = express.Router();

const filterRemoved = (collection) => {
  collection.forEach(oneGroup => {
      oneGroup.members = oneGroup.members.filter(m => !m.deleted);
  });
  return collection.filter(oneGroup => oneGroup.members.length > 0);
};

const sortMembersBySizeAndName = (group, key, deleted) => {
    if (!deleted) {
      group = filterRemoved(group);
    }
    return group.sort((a, b) => {
      // Sort by members size
      if (a.members.length < b.members.length) return 1;
      if (a.members.length > b.members.length) return -1;
  
      // And by firstname
      if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;
      if (a[key].toLowerCase() > b[key].toLowerCase()) return 1;
      return 0;
    });
  }
  
  const getAllUsers = async (deleted) => {
    
    const grouppedFirstnames = sortMembersBySizeAndName(await GrouppedFirstname.find(), 'firstname', deleted);
    const grouppedLastnames = sortMembersBySizeAndName(await GrouppedLastname.find(), 'lastname', deleted);
  
    const newMembers = await Member.find({
      date_in: {
        $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
      },
      deleted
    }).sort({ "date_in": -1 });
    return {grouppedFirstnames, grouppedLastnames, newMembers}
  };

  const getDuplicatedGroup = (group, key) => {
    const filteredGroup = group.filter(oneGroup => oneGroup.members.length > 1);
    return {
      labels: filteredGroup.map(oneGroup => oneGroup[key]),
      values: filteredGroup.map(oneGroup => oneGroup.members.length)
    };
  };

  /* GET home page. */
  router.get('/active-users', async function (req, res, next) {
    let {grouppedFirstnames, grouppedLastnames, newMembers} = await getAllUsers(false);    

    res.json({
        newMembers,
        grouppedFirstnames,
        grouppedLastnames,
        duplicatedFirstnames: getDuplicatedGroup(grouppedFirstnames, 'firstname'),
        duplicatedLastnames: getDuplicatedGroup(grouppedLastnames, 'lastname')
    });
  
  });

  router.get('/historical-users', async function (req, res, next) {
    let {grouppedFirstnames, grouppedLastnames, newMembers} = await getAllUsers(true);
    

    res.json({
        newMembers,
        grouppedFirstnames,
        grouppedLastnames,
        duplicatedFirstnames: getDuplicatedGroup(grouppedFirstnames, 'firstname'),
        duplicatedLastnames: getDuplicatedGroup(grouppedLastnames, 'lastname')
    });
  
  });
  
  module.exports = router;
  