const { SlashCommandBuilder } = require('discord.js')
const Discord = require("discord.js");
const emj = require("../../botconfig/emojis.json");
const emb = require("../../botconfig/embed.json");
const { asegurar_db } = require("../../functions/Database/seversData.js");
const { intrc_paginacion } = require("../../functions/utility.js");
const warnSchema = require("../../models/warns.js");
module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Opciones de warns')
        .addSubcommand(subCommand => subCommand.setName("agregar").setDescription("Agregar un warn a un usuario")
            .addUserOption(option => option.setName("usuario").setDescription("Usuario que recibirá el warn").setRequired(true))
            .addStringOption(option => option.setName("razon").setDescription("Razón del warn").setRequired(false))
        )
        .addSubcommand(subCommand => subCommand.setName("eliminar").setDescription("Eliminar un warn a un usuario")
            .addUserOption(option => option.setName("usuario").setDescription("Usuario del que verás sus warns").setRequired(true))
            .addIntegerOption(option => option.setName("warn-id").setDescription("Id del warn a remover").setRequired(true))
        )
        .addSubcommand(subCommand => subCommand.setName("lista").setDescription("Ver la lista de warn del usuario")
            .addUserOption(option => option.setName("usuario").setDescription("Usuario del que verás sus warns").setRequired(false))
        ),

    owner: true,
    permissions_bot: [],
    permissions_member: [],
    requiredroles: [],

    async execute(client, interaction) {

        await asegurar_db(interaction.guild.id, interaction.user.id);

        const { options, guild } = interaction;
        const subCommands = options.getSubcommand();

        const embedHecho = new Discord.EmbedBuilder()
            .setColor(emb.correcto)

        const embedError = new Discord.EmbedBuilder()
            .setColor(emb.error)

        const usuario = options.getUser("usuario") || interaction.user;
        const id_warn = options.getInteger("warn-id")

        switch (subCommands) {
            case "agregar":
                const razon = options.getString("razon") || "No se ha especificado la razón";

                if (usuario.bot) return interaction.reply({ embeds: [embedError.setDescription(`*\`❌\` \`|\` El usuario no puede ser un bot*`)] })
                if (usuario.id === interaction.user.id) return interaction.reply({ embeds: [embedError.setDescription(`*\`❌\` \`|\` No puedes advertirte a ti mismo*`)] })
                if (usuario.id === interaction.guild.ownerId) return interaction.reply({ embeds: [embedError.setDescription(`*\`❌\` \`|\` No puedes advertir al dueño del servidor*`)] })

                let objeto_warn = {
                    fecha: Date.now(),
                    autor: interaction.user.id,
                    razon
                }

                await warnSchema.findOneAndUpdate({ guildID: interaction.guild.id, userID: usuario.id }, {
                    $push: {
                        warns: objeto_warn
                    }
                })

                interaction.reply({ embeds: [embedHecho.setDescription(`*\`✅\` \`|\` Warn agregado para ${usuario} por la razón: ${razon}*`)] });
                break;
            case "eliminar":
                if (usuario.bot) return interaction.reply({ embeds: [embedError.setDescription(`*\`❌\` \`|\` El usuario no puede ser un bot*`)] })

                let dataRemove = await warnSchema.findOne({ guildID: guild.id, userID: usuario.id });
                if (dataRemove.warns.length === 0) return interaction.reply({ embeds: [embedError.setDescription(`*\`❌\` \`|\` El usuario ${usuario} no tiene advertencias*`)] });
                if (id_warn < 0 || id_warn > dataRemove.warns.length - 1) return interaction.reply({ embeds: [embedError.setDescription(`*\`❌\` \`|\` La id del warn que has especificado no es válida*`)] });

                interaction.reply({ embeds: [embedHecho.setDescription(`*\`✅\` \`|\` El warn \`${id_warn}\` del usuario ${usuario} ha sido eliminado*`)] });

                dataRemove.warns.splice(id_warn, 1);
                dataRemove.save();

                break;
            case "lista":
                if (usuario.bot) return interaction.reply({ embeds: [embedError.setDescription(`*\`❌\` \`|\` El usuario no puede ser un bot*`)] })

                let dataList = await warnSchema.findOne({ guildID: guild.id, userID: usuario.id });
                if (dataList.warns.length === 0) return interaction.reply({ embeds: [embedError.setDescription(`*\`❌\` \`|\` El usuario ${usuario} no tiene advertencias*`)] })
                interaction.reply({ embeds: [embedHecho.setDescription(`*\`✅\` \`|\` Mostrando las advertencias de ${usuario}*`)], ephemeral: true });
                const warnList = dataList.warns.map((warn, index) => `> **ID:** ${index}\n> **Usuario:** ${usuario} (\`${usuario.id}\`)\n> **Fecha & Hora:** <t:${Math.round(warn.fecha / 1000)}>\n> **Razón:** ${warn.razon}\n> **Por:** <@${warn.autor}>\n---------------------------------\n`);
                intrc_paginacion(client, interaction, warnList, `Advertencias de ${usuario.username} [\`${dataList.warns.length}\`]`, 5)
                break;
        }
    }
}