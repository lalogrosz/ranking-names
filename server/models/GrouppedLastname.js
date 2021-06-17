const mongoose = require("mongoose")

const schema = mongoose.Schema({
    lastname: String,
	members: [{
        id: String,
        firstname: String,
        picture: String,
        deleted: Boolean
    }]
})

module.exports = mongoose.model("GrouppedLastname", schema);