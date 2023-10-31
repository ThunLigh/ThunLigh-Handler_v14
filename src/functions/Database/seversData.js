const Discord = require("discord.js");
const setupSchema = require("../../models/setups.js");
const guildSchema = require("../../models/guildSchema.js");
const warnSchema = require("../../models/warns.js");
require("colors");

module.exports = { asegurar_db }

async function asegurar_db(guildid, userid) {
    if (guildid) {
        let guildsData = await guildSchema.findOne({ guildID: guildid });
        if (!guildsData) {
            console.log(`Servidor asegurado: ${guildid}`.blue);
            guildsData = await new guildSchema({
                guildID: guildid
            });
            await guildsData.save();
        }
        let setupsData = await setupSchema.findOne({ guildID: guildid });
        if (!setupsData) {
            console.log(`Setups asegurado: ${guildid}`.green);
            setupsData = await new setupSchema({
                guildID: guildid
            });
            await setupsData.save()
        }
    }
    if (guildid && userid) {
        let warnData = await warnSchema.findOne({ guildID: guildid, userID: userid })
        if (!warnData) {
            console.log(`Asegurado: Warnings de ${userid} en ${guildid}`.green);
            warnData = await new warnSchema({
                guildID: guildid,
                userID: userid,
                warns: [],
            });
            await warnData.save();
        }
    }
}