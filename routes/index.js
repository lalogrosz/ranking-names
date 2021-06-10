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
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}

/* GET home page. */
router.get('/', async function (req, res, next) {
  const grouppedFirstnames = sortMembersBySizeAndName(await GrouppedFirstname.find(), 'firstname');
  const grouppedLastnames = sortMembersBySizeAndName(await GrouppedLastname.find(), 'lastname');

  const newMembers = await Member.find({
    date_in: {
      $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
    },
    deleted: false
  }).sort({ "date_in": -1 });

  /*const newLeaves = await Member.find({
    date_out: {
      $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
    },
    deleted: true
  }).sort({ "date_out": -1 }); */
  const filterFirstnames = grouppedFirstnames.filter(oneGroup => oneGroup.members.length > 1);
  const duplicatedFirstnames = {
    labels: filterFirstnames.map(oneGroup => oneGroup.firstname),
    values: filterFirstnames.map(oneGroup => oneGroup.members.length)
  }

  const filterLastnames = grouppedLastnames.filter(oneGroup => oneGroup.members.length > 1);
  const duplicatedLastnames = {
    labels: filterLastnames.map(oneGroup => oneGroup.lastname),
    values: filterLastnames.map(oneGroup => oneGroup.members.length)
  }

  res.render('index', { 
    title: 'Ranking Names',
    topFirstname: {name: grouppedFirstnames[0].firstname, members: grouppedFirstnames[0].members},
    topLastname: {name: grouppedLastnames[0].lastname, members: grouppedLastnames[0].members},
    lastIncomes: newMembers,
    duplicatedFirstnames,
    duplicatedLastnames,
    //duplicatedFirstnamesMembers: filterFirstnames.map(oneGroup => oneGroup.members),
    //duplicatedLastnamesMembers: filterLastnames.map(oneGroup => oneGroup.members),
    grouppedFirstnames,
    grouppedLastnames 
  });

});

module.exports = router;
