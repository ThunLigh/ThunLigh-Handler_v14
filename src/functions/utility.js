const Discord = require("discord.js");
const emb = require("../botconfig/embed.json")
const emj = require("../botconfig/emojis.json")

module.exports = { intrc_paginacion }

async function intrc_paginacion(client, interaction, texto, titulo = "Paginación", elementos_por_pagina = 5) {
    var embeds = [];
    var dividido = elementos_por_pagina;
    for (let i = 0; i < texto.length; i += dividido) {
        let desc = texto.slice(i, i + dividido);
        let embed = new Discord.EmbedBuilder()
            .setTitle(titulo.toString())
            .setDescription(desc.join(" "))
            .setColor(emb.color)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
        embeds.push(embed);
    }

    let paginaActual = 0;

    if (embeds.length === 1) return interaction.channel.send({ embeds: [embeds[0]] }).catch(() => { });
    let boton_atras = new Discord.ButtonBuilder().setStyle('Secondary').setCustomId('atras_pag').setLabel('⬅️');
    let boton_inicio = new Discord.ButtonBuilder().setStyle('Primary').setCustomId('inicio_pag').setLabel('🏠');
    let boton_cerrar = new Discord.ButtonBuilder().setStyle('Danger').setCustomId("cerrar_pag").setLabel('❌');
    let boton_avanzar = new Discord.ButtonBuilder().setStyle('Secondary').setCustomId('avanzar_pag').setLabel('➡️');
    let row = new Discord.ActionRowBuilder()
        .addComponents([boton_atras, boton_inicio, boton_cerrar, boton_avanzar]);

    let embedpaginas = await interaction.channel.send({
        content: `***\`Usa los botones para pasar de página!\`***`,
        embeds: [embeds[0].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })],
        components: [row]
    });

    const collector = embedpaginas.createMessageComponentCollector({ time: 180e3 });

    collector.on("collect", async b => {
        if (b.user.id !== interaction.user.id) return b.reply({ content: "No puedes usar este menú, ya que no lo creaste.", ephemeral: true });

        switch (b.customId) {
            case "atras_pag": {
                collector.resetTimer();
                if (paginaActual !== 0) {
                    paginaActual -= 1;
                    await b?.deferUpdate();
                } else {
                    paginaActual = embeds.length - 1;
                    await b?.deferUpdate();
                }
                break;
            }

            case "inicio_pag": {
                collector.resetTimer();
                paginaActual = 0;
                await b?.deferUpdate();
                break;
            }

            case "avanzar_pag": {
                collector.resetTimer();
                if (paginaActual < embeds.length - 1) {
                    paginaActual++;
                    await b?.deferUpdate();
                } else {
                    paginaActual = 0;
                    await b?.deferUpdate();
                }
                break;
            }

            case "cerrar_pag": {
                embedpaginas.delete();
                collector.stop();
                break;
            }

            default:
                break;
        }

        await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Página ${paginaActual + 1} / ${embeds.length}` })], components: [row] }).catch(() => { });
    });

    collector.on("end", () => {
        row.components.forEach(component => component.setDisabled(true));
        embedpaginas.edit({ content: `***\`¡El tiempo de uso ha expirado!\`***`, components: [row] }).catch(() => { });
    });
}
