const { ActivityType } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
    name: "ready",
    async execute(client, prefix) {

        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("Se ha conectado con la DataBase".magenta)).catch((err) => console.error("Error al conectar con la DataBase", err));

        console.log(` Conectado como ${client.user.tag} `.bgBlue.bold)
        client.user.setActivity({ name: process.env.STATUS, type: ActivityType[process.env.STATUS_TYPE] ?? ActivityType.Playing });
    }
}