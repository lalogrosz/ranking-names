var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log('New Event',req.body);
    res.json({"challenge":req.body.challenge});
});

module.exports = router;
