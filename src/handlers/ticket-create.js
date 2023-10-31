const { asegurar_db } = require("../functions/Database/seversData.js");
const setupSchema = require(`../models/setups.js`);
const ticketSchema = require(`../models/ticket.js`);
const emj = require("../botconfig/emojis.json")
const Discord = require('discord.js');
const html = require('discord-html-transcripts')

module.exports = client => {
    client.on("interactionCreate", async interaction => {
        try {

            if (!interaction.guild || !interaction.channel || !interaction.isButton() || interaction.message.author.id !== client.user.id || interaction.customId !== "create-ticket") return;

            await asegurar_db(interaction.guild.id);

            const setup = await setupSchema.findOne({ guildID: interaction.guild.id });

            if (!setup || !setup.sistema_tickets || !setup.sistema_tickets.canal || interaction.channelId !== setup.sistema_tickets.canal || interaction.message.id !== setup.sistema_tickets.mensaje) return;

            let ticket_data = await ticketSchema.find({ guildID: interaction.guild.id, autor: interaction.user.id, cerrado: false });

            for (const ticket of ticket_data) {
                if (interaction.guild.channels.cache.get(ticket.canal)) return interaction.reply({ content: `${emj.utility.error} **Ya tienes un ticket creado en <#${ticket.canal}>**`, ephemeral: true });
            }

            await interaction.reply({ content: "⌛ **Creando tu ticket...**", ephemeral: true });

            const channel = await interaction.guild.channels.create({
                name: `🎫-${interaction.member.user.username}`.substring(0, 30),
                type: 0,
                parent: interaction.channel.parent ?? null,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["ViewChannel"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["ViewChannel"]
                    }
                ]
            });

            channel.send({
                embeds: [new Discord.EmbedBuilder()
                    .setTitle(`Ticket de ${interaction.member.user.tag}`)
                    .setDescription(`Bienvenido al soporte ${interaction.member}\n\`\`\`🔒 > Cerrar Ticket\n🗑️ > Eliminar Ticket\n💾 > Guardar Ticket\`\`\``)
                    .setColor("Green")
                ],
                components: [new Discord.ActionRowBuilder().addComponents(
                    [
                        new Discord.ButtonBuilder().setStyle('Danger').setEmoji("🔒").setCustomId("cerrar_ticket"),
                        new Discord.ButtonBuilder().setStyle("Secondary").setEmoji("🗑").setCustomId("borrar_ticket"),
                        new Discord.ButtonBuilder().setStyle('Primary').setEmoji("💾").setCustomId("guardar_ticket"),
                    ]
                )]
            });

            let data = new ticketSchema({
                guildID: interaction.guild.id,
                autor: interaction.user.id,
                canal: channel.id,
                cerrado: false,
            });
            data.save();
            await interaction.editReply({ content: `${emj.utility.hecho} **Ticket creado en ${channel}**`, ephemeral: true })

        } catch (e) {
            console.log(e)
        }
    })

    client.on("interactionCreate", async interaction => {
        try {

            if (!interaction.guild || !interaction.channel || !interaction.isButton() || interaction.message.author.id !== client.user.id) return;

            await asegurar_db(interaction.guild.id);

            let ticket_data = await ticketSchema.findOne({ guildID: interaction.guild.id, canal: interaction.channel.id })
            switch (interaction.customId) {
                case "cerrar_ticket": {
                    if (ticket_data && ticket_data.cerrado) return interaction.reply({ content: `${emj.utility.error} **El ticket ya está cerrado**`, ephemeral: true });
                    interaction.deferUpdate();

                    ticket_data.cerrado = true;
                    ticket_data.save();

                    interaction.channel.permissionOverwrites.edit(ticket_data.autor, { ViewChannel: false });
                    interaction.channel.send(`${emj.utility.hecho} **Ticket cerrado por \`${interaction.user.tag}\`**`)
                }
                    break;

                case "borrar_ticket": {
                    interaction.deferUpdate();
                    interaction.channel.delete();
                }
                    break;

                case "guardar_ticket": {
                    interaction.deferUpdate();

                    const adjunto = await html.createTranscript(interaction.channel, {
                        limit: -1,
                        returnBuffer: false,
                        fileName: `${interaction.channel.name}.html`
                    })

                    interaction.channel.send({
                        files: [adjunto]
                    })
                }
                    break;

                default:
                    break;
            }

        } catch (e) {
            console.log(e)
        }
    })
}