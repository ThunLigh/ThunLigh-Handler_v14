const { SlashCommandBuilder } = require('discord.js')
const setupSchema = require("../../models/setups.js");
const { asegurar_db } = require("../../functions/Database/seversData.js");
const emj = require("../../botconfig/emojis.json");

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('setup-sugerencias')
        .setDescription('Establece un canal de sugerencias')
        .addChannelOption(option => option.setName("canal").setDescription("Canal de sugerencias").setRequired(true)),

        owner: false,
        permissions_bot: [],
        permissions_member: [],
        requiredroles: [],

    async execute(client, interaction) {

        await asegurar_db(interaction.guild.id, interaction.user.id);

        const { options, guild } = interaction;

        const canal = options.getChannel("canal");
        const logs = options.getChannel("logs");
        const roladmin = options.getRole("role");

        let dataSug = await setupSchema.findOne({ guildID: guild.id });
        if(dataSug.sugerencias.canal == canal.id) return interaction.reply(`${emj.utility.error} **Este canal de sugerencias ya ha sido establecido, escoge otro.**`)

        let options_db = {
            canal: canal.id,
            canalLogs: logs.id,
            adminRol: roladmin.id
        }

        await setupSchema.findOneAndUpdate({ guildID: guild.id }, {
            sugerencias: options_db
        })


        interaction.reply(`${emj.utility.hecho} **Ahora ${canal} es el nuevo canal de sugerencias.**`)
    }
}
