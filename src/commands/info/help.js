const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require(`discord.js`);
const Discord = require("discord.js");
const emj = require("../../botconfig/emojis.json");
const emb = require("../../botconfig/embed.json");

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Mira mis comandos"),

    async execute(client, interaction) {
        const latenciaBot = client.ws.ping;
        const { latenciaTexto, pingEstado } = estadoBot(client, latenciaBot);

        const cmp = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("menu")
                .setPlaceholder("Selecciona una opción")
                .addOptions([
                    {
                        label: "Inicio",
                        value: "uno",
                        emoji: "⚙️",
                    },
                    {
                        label: "Información",
                        description: "Comandos de Información",
                        value: "dos",
                        emoji: "🔎",
                    },
                    {
                        label: "Moderación",
                        description: "Comandos de Moderacion",
                        value: "tres",
                        emoji: "🛡️",
                    },
                    {
                        label: "Sistemas",
                        description: "Comandos de Sistemas",
                        value: "cuatro",
                        emoji: "🔒",
                    },
                ])
        );

        const embedHelp = new Discord.EmbedBuilder()
            .setColor(emb.color)
            .setTitle(`✅ Menu de ayuda de __${client.user.username}__ ✅`)
            .setDescription(`>>> 👋 Hola **\`${interaction.user.username}\`** me llamo **\`${client.user.username}\`**, soy un bot que ha sido desarrollado por \`thunligh\``)
            .addFields(
                { name: `🗳️ __**Información**__`, value: `>>> **\`💾 Servidores:\`** ${client.guilds.cache.size}\n**\`${pingEstado} Latencia:\`** ${latenciaTexto}\n**\`🛡️ Comandos:\`** ${client.slashCommands.size}` },
                { name: `📢 __**Handler**__`, value: `>>> **Puedes descargar el handler gratis aquí:**\n**[ThunLigh_Handler-v14](https://github.com/ThunLighDev/ThunLigh-Handler_v14)**` }
            )
            .setURL("https://discord.gg/4ZrXpYwT3Q")
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: emb.footer_text, iconURL: emb.footer_icon })

        let mensaje = await interaction.reply({
            embeds: [embedHelp],
            components: [cmp],
        });

        const ifiltro = (i) => interaction.user.id === i.user.id;

        let collector = mensaje.createMessageComponentCollector({
            filter: ifiltro,
        });

        const embed1 = new EmbedBuilder()
            .setTitle("🔎 __Comandos de Información__ 🔎")
            .setDescription("```\nhelp, ping, server\n```")
            .setFooter({ text: emb.footer_text, iconURL: emb.footer_icon })
            .setColor(emb.color)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))

        const embed2 = new EmbedBuilder()
        .setTitle("🛡️ __Comandos de Moderación__ 🛡️")
        .setDescription("```\nban, unban, clear\n```")
        .setFooter({ text: emb.footer_text, iconURL: emb.footer_icon })
        .setColor(emb.color)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))

        const embed3 = new EmbedBuilder()
        .setTitle("🔒 __Comandos de Sistemas__ 🔒")
        .setDescription("```\nsetup-sugerencias, setup-tickets\n```")
        .setFooter({ text: emb.footer_text, iconURL: emb.footer_icon })
        .setColor(emb.color)
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))

        collector.on("collect", async (i) => {
            if (i.values[0] === "uno") {
                await i.deferUpdate();
                i.editReply({
                    embeds: [embedHelp], components: [cmp]
                });
            }

            if (i.values[0] === "dos") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed1], components: [cmp] });
            }

            if (i.values[0] === "tres") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed2], components: [cmp] });
            }
            if (i.values[0] === "cuatro") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed3], components: [cmp] });
            }
        });
    },
};

function estadoBot(client, latenciaBot) {
    let pingEstado = "";
    let latenciaTexto = "";
    if (latenciaBot < 0) {
        latenciaTexto = "Recien encendido"
        pingEstado = "⚪"
    } else if (latenciaBot > 100) {
        pingEstado = "🟠"
    } else if (latenciaBot > 500) {
        pingEstado = "🔴"
    } else if (latenciaBot > 0 && latenciaBot < 100) {
        pingEstado = "🟢"
    }

    if (latenciaBot > 0) {
        latenciaTexto = `${client.ws.ping}ms`
    }

    return { latenciaTexto, pingEstado }
}