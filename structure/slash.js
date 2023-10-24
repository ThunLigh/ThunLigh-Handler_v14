const { SlashCommandBuilder } = require('discord.js')
const Discord = require("discord.js");
const emj = require("../../botconfig/emojis.json");
const emb = require("../../botconfig/embed.json");
module.exports = {
    cmd: new SlashCommandBuilder()
        .setName('')
        .setDescription(''),

    owner: true,
    permissions_bot: [],
    permissions_member: [],
    requiredroles: [],

    async execute(client, interaction) {
    }
}