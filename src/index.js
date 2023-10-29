const fs = require("fs");
const Discord = require("discord.js");
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const client = new Discord.Client({
    shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildVoiceStates
        // 3276799
    ]
});
require("../slashCommands")
require("colors")

client.cluster = new ClusterClient(client);
client.slashCommands = new Discord.Collection();

fs.readdirSync("./src/commands").forEach(subFolder => {
    const commmandFiles = fs.readdirSync(`./src/commands/${subFolder}`).filter(file => file.endsWith(".js"))
    for (const file of commmandFiles) {
        const command = require(`./commands/${subFolder}/${file}`)
        client.slashCommands.set(command.cmd.name, command)
    }
})
console.log(`${client.slashCommands.size} slashCommands cargados`.green)

console.log('Cargando handlers...'.yellow);

const handlerFiles = fs.readdirSync("./src/handlers").filter(file => file.endsWith(".js"));

for (const file of handlerFiles) {
    const handler = require(`./handlers/${file}`);
    try {
        handler(client);
    } catch (e) {
        console.log(`ERROR AL CARGAR EL HANDLER ${file}`.bgRed.bold);
        console.log(e);
    }
}

console.log(`${handlerFiles.length} Handlers cargados`.green);

console.log('Cargando eventos...'.yellow);

let totalHandlersLoaded = 0;

fs.readdirSync("./src/events").forEach(subFolder => {
    const eventFiles = fs.readdirSync(`./src/events/${subFolder}/`).filter((file) => file.endsWith(".js"))
    for (const file of eventFiles) {
        try {
            const events = require(`./events/${subFolder}/${file}`)
            if (events.once) {
                client.once(events.name, (...args) => events.execute(...args))
            } else {
                client.on(events.name, (...args) => events.execute(client, ...args))
            }
            totalHandlersLoaded++;
        } catch (e) {
            console.log(`ERROR AL CARGAR EL EVENTO ${file}`.bgRed.bold);
            console.log(e);
        }
    }
})

console.log(`${totalHandlersLoaded} Eventos cargados`.green);

client.login(process.env.TOKEN)