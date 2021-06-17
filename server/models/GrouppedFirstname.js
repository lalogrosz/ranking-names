const mongoose = require("mongoose")

const schema = mongoose.Schema({
    firstname: String,
	members: [{
        id: String,
        lastname: String,
        picture: String,
        deleted: Boolean
    }]
})

module.exports = mongoose.model("GrouppedFirstname", schema);