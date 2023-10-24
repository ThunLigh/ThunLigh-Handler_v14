const { Schema, model } = require("mongoose");

const setupSchema = new Schema({
    guildID: { type: String },
    sugerencias: { type: Object, default: { canal: "", canalLogs: "", adminRol: "" } },
    sistema_tickets: { type: Object, default: { canal: "", mensaje: "" } },
})

module.exports = model("setups", setupSchema);