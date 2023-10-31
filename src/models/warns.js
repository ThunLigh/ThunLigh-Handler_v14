const { Schema, model } = require("mongoose");

const warnSchema = new Schema({
    guildID: { type: String },
    userID: { type: String },
    warns: { type: Array, default: [] }
})

module.exports = model("warns", warnSchema);