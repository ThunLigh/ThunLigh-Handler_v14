const { SlashCommandBuilder } = require('discord.js');
const Discord = require("discord.js");
const setupSchema = require("../../models/setups.js");
const { asegurar_db } = require("../../functions/Database/seversData.js");
const emj = require("../../botconfig/emojis.json");

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('setup-tickets')
        .setDescription('Sistema de tickets')
        .addChannelOption(option => option.setName("canal").setDescription("Establece un canal de tickets").setRequired(true)),

    owner: false,
    permissions_bot: [],
    permissions_member: [],
    requiredroles: [],

    async execute(client, interaction) {

        await asegurar_db(interaction.guild.id, interaction.user.id);

        const { options, guild } = interaction;

        const canal = options.getChannel("canal");

        let dataTicket = await setupSchema.findOne({ guildID: guild.id });

        let options_db = {
            canal: canal.id,
            mensaje: ""
        }

        const ticket_button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('create-ticket')
                    .setStyle('Primary')
                    .setLabel('Crear ticket')
                    .setEmoji('🎫')
            )

        const emb_ticket = new Discord.EmbedBuilder()
            .setTitle('Tickets Support')
            .setDescription(`Presiona el botón para crear un ticket`)
            .setColor('#2b2d31')

        const msg = await interaction.guild.channels.cache.get(canal.id).send({
            embeds: [emb_ticket],
            components: [ticket_button]
        })

        options_db.mensaje = msg.id;

        await setupSchema.findOneAndUpdate({ guildID: interaction.guild.id }, {
            sistema_tickets: options_db,
        });

        await interaction.reply(`${emj.utility.hecho} **El sistema de tickets se ha activado correctamente en el canal de:** ${canal}`)

    }
}