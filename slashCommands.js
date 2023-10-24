const fs = require('fs')
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10");
const clientID = (process.env.CLIENT_ID)
const commandFolders = fs.readdirSync('./src/commands');
const commands = []

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const slash = require(`./src/commands/${folder}/${file}`)
            commands.push(slash.cmd.toJSON())
    }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN)
createSlash()

async function createSlash() {
    try {
        await rest.put(
            Routes.applicationCommands(clientID), {
            body: commands
        })
        console.log("SlashCommands publicados".blue)
    } catch (err) {
        console.error(err)
    }
}