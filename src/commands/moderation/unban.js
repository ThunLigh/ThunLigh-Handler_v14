const { SlashCommandBuilder } = require('discord.js')
const Discord = require("discord.js");
const emj = require("../../botconfig/emojis.json");
const emb = require("../../botconfig/embed.json");
module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Desbanea a un usaurio del servidor')
        .addUserOption(option => option.setName('usuario').setDescription('El usuario que quieres desbanear.').setRequired(true))
        .addStringOption(option => option.setName('razón').setDescription('La razón por la que quieres desbanear al usuario.').setRequired(false)),

    owner: false,
    permissions_bot: ["BanMembers"],
    permissions_member: ["BanMembers"],
    requiredroles: [],

    async execute(client, interaction) {
        const { options, guild } = interaction;

        const user = options.getUser('usuario');
        const reason = options.getString('razón') || 'No especificado';

        try {
            const bannedUsers = await guild.bans.fetch();
            if (!bannedUsers.has(user.id)) return interaction.reply(`${emj.utility.error} **El usuario no se encuentra baneado**`)

            await guild.members.unban(user, { reason });
            return interaction.reply({ content: `Usuario ${user.tag} desbaneado por ${interaction.user.tag}. Razón: ${reason}`, ephemeral: true });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Ocurrió un error al intentar desbanear al usuario.', ephemeral: true });
        }
    }
}