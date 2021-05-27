require('dotenv').config()
const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  console.log('voiceStateUpdate old:', oldState);
  console.log('voiceStateUpdate new:', newState);

  if (!oldState.channelID && newState.channelID) {
    // add role
    // process.env.MUMBLE_ROLE_ID
    return;
  }

  if (oldState.channelID && !newState.channelID) {
    // remove role

    return;
  } 

});

client.login(process.env.DISCORD_BOT_TOKEN);
