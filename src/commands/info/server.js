const { SlashCommandBuilder } = require('discord.js')
const Discord = require("discord.js");
const emj = require("../../botconfig/emojis.json");
const emb = require("../../botconfig/embed.json");
module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Información del servidor')
        .addSubcommand(subCommand =>
            subCommand.setName("info").setDescription("Información del servidor"))
        .addSubcommand(subCommand =>
            subCommand.setName("icon").setDescription("Icono del servidor")),

    owner: true,
    permissions_bot: [],
    permissions_member: [],
    requiredroles: [],

    async execute(client, interaction) {
        const { options, guild, member } = interaction;
        const subCommands = options.getSubcommand();

        switch (subCommands) {
            case "icon":
                try {
                    const embedIcon = new Discord.EmbedBuilder()
                        .setImage(guild.iconURL({ extension: "png", size: 4096 }))
                        .setColor(emb.color)
                        .setAuthor({ name: `Pedido por: ${member.user.username}`, iconURL: member.displayAvatarURL({ extension: "png" }) })

                    interaction.reply({ embeds: [embedIcon] })
                } catch (e) { console.log(e) }
                break;
            case "info":
                let svowner = await guild.fetchOwner();
                const creationDate = guild.createdAt;
                const formattedDate = `${creationDate.getDate().toString().padStart(2, '0')}/${(creationDate.getMonth() + 1).toString().padStart(2, '0')}/${creationDate.getFullYear().toString().slice(2)}`;
                const embed = new Discord.EmbedBuilder()
                    .setAuthor({ name: `Información del servidor: ${guild.name}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setThumbnail(guild.iconURL())
                    .setColor(emb.color)
                    .setFooter({ text: emb.footer_text, iconURL: emb.footer_icon })
                    .setTimestamp()
                    .addFields(
                        {
                            name: "🛡️ Importante:", value: [
                                `> 👑**Owner:** ${svowner.user.username} (\`${svowner.id}\`)`,
                                `> 🆔 **Servidor:** ${guild.name} (\`${guild.id}\`)`,
                                `> 🗓️ **Creación:** ${formattedDate}`
                            ].join("\n")
                        },
                        {
                            name: `😀 Usuarios:`, value: [
                                `> 👤 **Miembros:** ${guild.members.cache.filter(member => !member.user.bot).size}`,
                                `> 🤖 **Bots:** ${guild.members.cache.filter(member => member.user.bot).size}`,
                                `> 👥 **Total:** ${guild.memberCount}`
                            ].join("\n")
                        },
                        {
                            name: `💣 Otros:`, value: [
                                `> 💬 **Canales:** ${guild.channels.cache.size}`,
                                `> 🔨 **Roles:** ${guild.roles.cache.size}`,
                                `> 😀 **Emojis:** ${guild.emojis.cache.size}`,
                                `> ✨ **Nivel Boost:** ${guild.premiumSubscriptionCount.toString()}`
                            ].join("\n")
                        }
                    )
                interaction.reply({ embeds: [embed] });
        }
    }
}