const { SlashCommandBuilder } = require('discord.js')
const Discord = require("discord.js");
const emj = require("../../botconfig/emojis.json");
const emb = require("../../botconfig/embed.json");
module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Banea a un usuario del servidor')
        .addUserOption(option => option.setName('usuario').setDescription('El usuario que quieres banear.').setRequired(true))
        .addStringOption(option => option.setName('razón').setDescription('La razón por la que quieres banear al usuario.').setRequired(false)),

    owner: false,
    permissions_bot: ["BanMembers"],
    permissions_member: ["BanMembers"],
    requiredroles: [],

    async execute(client, interaction) {
        const { options, guild } = interaction;

        const user = interaction.options.getUser('usuario');
        const reason = interaction.options.getString('razón') || 'No especificado';

        try {
            const bannedUsers = await guild.bans.fetch();
            if (bannedUsers.has(user.id)) return interaction.reply(`${emj.utility.error} **El usuario ya se encuentra baneado**`)

            await interaction.guild.members.ban(user, { reason });
            return interaction.reply({ content: `Usuario ${user.tag} baneado por ${interaction.user.tag}. Razón: ${reason}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Ocurrió un error al intentar desbanear al usuario.', ephemeral: true });
        }
    }
}