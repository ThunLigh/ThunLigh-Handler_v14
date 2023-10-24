const Discord = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {

        const embErr = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setColor("Red")

        if (!interaction.isChatInputCommand()) return;

        const command = client.slashCommands.get(interaction.commandName)
        if (!command) return;

        else if (command) {
            if (command.owner) {
                if (!process.env.OWNER_IDS.split(" ").includes(interaction.user.id)) return interaction.reply({
                    embeds: [embErr.setDescription(`> Este comando solo esta **disponible** para **dueños** del bot`)],
                    ephemeral: true
                })
            }

            if (command.permissions_bot) {
                if (!interaction.guild.members.me.permissions.has(command.permissions_bot)) return interaction.reply({
                    embeds: [embErr.setDescription(`> **Necesito los siguientes permisos:** ${command.permissions_bot.map(permiso => `${permiso}`).join(", ")}`)],
                    ephemeral: true
                })
            }

            if (command.permissions_member) {
                if (!interaction.member.permissions.has(command.permissions_member)) return interaction.reply({
                    embeds: [embErr.setDescription(`> **Necesitas los siguientes permisos:** ${command.permissions_member.map(permiso => `${permiso}`).join(", ")}`)],
                    ephemeral: true
                })
            }

            if (command.requiredroles && command.requiredroles.length > 0 && interaction.member.roles.cache.size > 0 && !interaction.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
                return interaction.reply({ embeds: [embErr.setDescription(`> No tienes el **rol** necesario para **ejecutar** esta acción`)] })
            }

            await command.execute(client, interaction).catch((err) => {
                console.error(err);
                interaction.reply({ content: 'Error al ejecutar la interacción', ephemeral: true })
            })
        }
    },
}