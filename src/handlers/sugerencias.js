const Discord = require("discord.js");
const setupSchema = require("../models/setups.js");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;

        try {
            const data = await setupSchema.findOne({ guildID: message.guild.id })

            if (!data.guildID || !data.sugerencias || !message.guild.id || !message.channel.id || message.channelId !== data.sugerencias.canal) return;

            message.delete();

            const embed = new Discord.EmbedBuilder()
                .setTitle(`Sugerencia de: ${message.author.username}`)
                .setDescription("```" + message.content + "```")
                .setColor("Orange")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

            let Channel = client.channels.cache.get(data.sugerencias.canal);

            const mensaje = await Channel.send({ embeds: [embed] })
            mensaje.react("👍")
            mensaje.react("👎")
        } catch (err) { console.log(err) }
    })
}
