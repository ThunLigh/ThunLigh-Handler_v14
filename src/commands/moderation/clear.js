const { SlashCommandBuilder } = require('discord.js')
const Discord = require("discord.js");
const emj = require("../../botconfig/emojis.json");
const emb = require("../../botconfig/embed.json");
module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Elimina una cantidad de mensajes')
        .addIntegerOption(option => option.setName("cantidad").setDescription("Ingresa la cantidad de mensajes a eliminar").setRequired(true)),

    owner: true,
    permissions_bot: ["ManageMessages"],
    permissions_member: ["Administrator"],
    requiredroles: [],

    async execute(client, interaction) {
        const { options } = interaction;

        const cantidad = options.getInteger("cantidad");
        if (cantidad > 100 || cantidad < 1) return interaction.reply(`${emj.utility.error} Imposible eliminar una cantdidad así`)

        await interaction.deferReply({ ephemeral: true });

        const mensajes = await interaction.channel.bulkDelete(cantidad, true)

        await interaction.editReply({ content: `${emj.utility.hecho} Se han eliminado ${mensajes.size} mensaje` })
    }
}