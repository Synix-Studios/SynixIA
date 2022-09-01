const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const os = require('node:os');
const client = new Client({
  restTimeOffset: 0,
  partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.GuildMember, Partials.User, Partials.ThreadMember],
  intents: [GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  disableMentions: 'everyone',
});

global.client = client

client.commands = new Collection();
client.slashCommands = new Collection();
client.events = new Collection();
client.aliases = new Collection();

client.os = os
client.config = require("../config.js");
client.log = require('./utils/tools/logger');
client.fetchUser = require('./utils/tools/fetchUser');
client.randomString = require('./utils/tools/randomString');
client.nicerPermission = require('./utils/tools/convertPermissions.js')
client.encrypt = require('./utils/tools/encrypt')
client.decrypt = require('./utils/tools/decrypt')
client.replace = require('./utils/tools/replace.js')

require(`./handlers/call`)(client);
