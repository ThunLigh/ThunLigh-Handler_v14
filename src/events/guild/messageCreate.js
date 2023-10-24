const Discord = require("discord.js");
const { asegurar_db } = require("../../functions/Database/seversData.js")
module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        await asegurar_db(message.guild.id, message.author.id);
    }
}