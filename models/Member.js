const mongoose = require("mongoose")

const schema = mongoose.Schema({
	slack_id: {
        type: String,
        index: true,
        unique: true
    },
    firstname: String,
	lastname: String,
    deleted: Boolean,
    picture: String,
    date_in: Date,
    date_out: Date
})

module.exports = mongoose.model("Member", schema);