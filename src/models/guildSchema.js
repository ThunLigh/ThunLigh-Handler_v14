const { Schema, model } = require("mongoose");

const guildSchema = new Schema({
    guildID: { type: String }
})

module.exports = model("guilds", guildSchema)