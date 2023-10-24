const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
    guildID: { type: String },
    autor: { type: String, default: "" },
    canal: { type: String, default: "" },
    cerrado: { type: Boolean, default: false }
})

module.exports = model('tickets_creados', ticketSchema)