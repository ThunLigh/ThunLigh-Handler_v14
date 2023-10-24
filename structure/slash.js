const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('')
        .setDescription(''),

    owner: true,
    permissions_bot: [],
    permissions_member: [],
    requiredroles: [],

    async execute(client, interaction) {
    }
}