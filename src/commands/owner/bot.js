const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Informacion del bot'),
    owner: true,
    permissions_bot: [],
    permissions_member: [],

    async execute(client, interaction) {
        await interaction.reply({ content: `${client.user.tag}`, ephemeral: true })
    }
}