require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', msg => {
  console.log('voiceStateUpdate:', msg)


});

client.login(process.env.DISCORD_BOT_TOKEN);
