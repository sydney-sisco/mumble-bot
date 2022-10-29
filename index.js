require('dotenv').config()
const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const PREFIX = "!clear";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
  let role = oldState.guild.roles.cache.find(role => role.name === process.env.ROLE_NAME);
  let member = oldState.member;

  // user joined voice, add role
  if (!oldState.channelId && newState.channelId) {
    let time = new Date();
    console.log(`${time.toISOString()}: ${member.user.username}#${member.user.discriminator} (${member.nickname }) connected.`);
    member.roles.add(role).catch(console.error);
    return;
  }
  
  // user left voice, remove role
  if (oldState.channelId && !newState.channelId) {
    let time = new Date();
    console.log(`${time.toISOString()}: ${member.user.username}#${member.user.discriminator} (${member.nickname }) disconnected.`);
    member.roles.remove(role).catch(console.error);
    return;
  }
});

client.on('messageCreate', async message => {
  // ignore messages sent by bots
  if (message.author.bot) {
    return;
  }

  if (message.content.startsWith(PREFIX)) {
    const channel = message.channel; // TextChannel object

    // don't clear messages in other channels
    if (channel.id !== process.env.CHANNEL_ID) {
      return;
    }

    const messageManager = channel.messages; // MessageManager object

    messageManager.fetch({ limit: 100 }).then((messages) => {
      // `messages` is a Collection of Message objects
      messages.forEach((message) => {
        message.delete();
      });

      
    })
      .then(() => { channel.send("100 messages have been deleted!"); });
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
