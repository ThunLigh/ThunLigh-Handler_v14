const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('owner')
        .setDescription('Comando de dueño'),
    owner: true,
    permissions_bot: [],
    permissions_member: [],

    async execute(client, interaction) {
        await interaction.reply({ content: `Hola ${interaction.user} estás en la lista de dueños del bot`, ephemeral: true })
    }
}