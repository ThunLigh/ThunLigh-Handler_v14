const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping del bot'),

    owner: false,
    permissions_bot: [],
    permissions_member: [],
    requiredroles: [],
    async execute(client, interaction) {
        await interaction.reply({ content: `**🏓 Pong!** ${client.ws.ping}ms`, ephemeral: true })
    }
}