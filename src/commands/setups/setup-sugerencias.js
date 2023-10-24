const { SlashCommandBuilder } = require('discord.js')
const setupSchema = require("../../models/setups.js");
const { asegurar_db } = require("../../functions/Database/seversData.js");

module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('setup-sugerencias')
        .setDescription('Establece un canal de sugerencias')
        .addChannelOption(option => option.setName("canal").setDescription("Canal de sugerencias").setRequired(true))
        .addChannelOption(option => option.setName("logs").setDescription("Canal de registros").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("Rol que moderará las sugerencias").setRequired(true)),

    async execute(client, interaction) {

        await asegurar_db(interaction.guild.id, interaction.user.id);

        const { options, guild } = interaction;

        const canal = options.getChannel("canal");
        const logs = options.getChannel("logs");
        const roladmin = options.getRole("role");

        let options_db = {
            canal: canal.id,
            canalLogs: logs.id,
            adminRol: roladmin.id
        }

        await setupSchema.findOneAndUpdate({ guildID: guild.id }, {
            sugerencias: options_db
        })


        interaction.reply(`Hecho! el canal de sugerencias es: ${canal}`)
    }
}
