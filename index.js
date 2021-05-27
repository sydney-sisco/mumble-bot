require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  let role = oldState.guild.roles.cache.find(role => role.name === process.env.ROLE_NAME);
  let member = oldState.member;

  // user joiced voice, add role
  if (!oldState.channelID && newState.channelID) {
    member.roles.add(role).catch(console.error);
    return;
  }
  
  // user left voice, remove role
  if (oldState.channelID && !newState.channelID) {
    member.roles.remove(role).catch(console.error);
    return;
  } 

});

client.login(process.env.DISCORD_BOT_TOKEN);
