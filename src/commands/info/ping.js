const { EmbedBuilder } = require('discord.js')
const os = require('node:os');

const Excellent_Conection = '<:conection_good:969397647720984616>'
const medium_Connection = '<:conection_medium:969397647754543144>'
const bad_Conection = '<:conection_bad:969397647662268456>'
const zero_Connection = '<:icons_pings:969405245560082552>'

const hight = `700`
const low = `400`

module.exports._src = {
  async newCommand(client, message, args) {
    try {
      const msg = await message.reply(`Pinging....`)

      msg.edit("\u200B")
      msg.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:icons_pings:969405245560082552> Synix Status Info')
            .setDescription('hai')
            .addFields([
              {
                name: '<:timeout:1001286442208727113> Uptime',
                value: `<:timeout:1001286442208727113> • <t:${Math.floor(client.readyAt / 1000)}` + ':R>',
                inline: false
              },
              {
                name: '<:icons_pings:969405245560082552> Server',
                value: `${msg.createdTimestamp - message.createdTimestamp < low ? Excellent_Conection : msg.createdTimestamp - message.createdTimestamp < hight && msg.createdTimestamp - message.createdTimestamp > low ? medium_Connection : bad_Conection} • \`${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\``,
                inline: true
              },
              {
                name: '<:icons_pings:969405245560082552> Discord API',
                value: `${client.ws.ping < low ? Excellent_Conection : client.ws.ping < hight && client.ws.ping > low ? medium_Connection : bad_Conection} • \`${Math.round(client.ws.ping)}ms\``,
                inline: true
              },
              {
                name: '<:icons_pings:969405245560082552> DataBase',
                value: `${Excellent_Conection} • \`${Math.round(Math.random() * (4 - 1) + 1)}ms\``,
                inline: true
              }
            ],
            )
            .setTimestamp()
            .setFooter({ text: 'Hello World!' })
            .setColor(client.config.embeds._colors.default)
        ]
      });

    } catch (err) {
      client.log.error(`${err}`)
      throw new Error(err)
    }
  },

  async newSlashCmd(client, interaction) {
    try {
      console.log(os.cpus())
      await interaction.reply({ content: "Pinging...", ephemeral: true }).catch(() => { });
      await interaction.fetchReply();

      await interaction.editReply({ content: "\u200B", ephemeral: false }).catch(() => { });
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setTitle('<:icons_pings:969405245560082552> Synix Status Info')
            .setDescription('hai')
            .addFields([
              {
                name: '<:timeout:1001286442208727113> Uptime',
                value: `<:timeout:1001286442208727113> • <t:${Math.floor(client.readyAt / 1000)}` + ':R>',
                inline: false
              },
              {
                name: '<:icons_pings:969405245560082552> Server',
                value: `${Date.now() - interaction.createdTimestamp < low ? Excellent_Conection : Date.now() - interaction.createdTimestamp < hight && Date.now() - interaction.createdTimestamp > low ? medium_Connection : bad_Conection} • \`${Math.floor(Date.now() - interaction.createdTimestamp)}ms\``,
                inline: true
              },
              {
                name: '<:icons_pings:969405245560082552> Discord API',
                value: `${client.ws.ping < low ? Excellent_Conection : client.ws.ping < hight && client.ws.ping > low ? medium_Connection : bad_Conection} • \`${Math.round(client.ws.ping)}ms\``,
                inline: true
              },
              {
                name: '<:icons_pings:969405245560082552> DataBase',
                value: `${Excellent_Conection} • \`${Math.round(Math.random() * (4 - 1) + 1)}ms\``,
                inline: true
              }
            ],
            )
            .setTimestamp()
            .setFooter({ text: 'Hello World!' })
            .setColor(client.config.embeds._colors.default)
        ], ephemeral: false
      }).catch(() => { });
    } catch (err) {
      client.log.error(`${err}`)
      throw new Error(err)
    }
  }
}


module.exports.newStructure = {
  name: "ping", // Name (Command/Slash Name)
  descriptions: [ // Desc (Command)
    "Return My Stats"
  ],
  aliases: [ // Aliases (Command)
    "stats"
  ],
  category: "Info", // Category (Command)
  _command: { // Command Settings
    isEnabled: true// isCommand Enabled
  },
  _slash: { // Slash Settings
    isSlashCmd: true, // isSlash Enabled
    ephemeral: true, // ephmeral ???
    name: 'ping',
    description: "returns ping",
    options: [ // Slash options
    ],
  },
  _timeout: { // timeout
    isEnabled: true, // isTimeout Enabled
    timeout: {
      count: 15,
      _premium: {
        enabledBypass: true,
        discount: 50,
      }
    } // timeout time
  },
  _premiumOnly: {
    isGuildPremiumOnly: false,
    isUserPremiumOnly: false,
  }, // premiumOnly Command
  _permissions: {
    ownerOnly: false, // onwerOnly Command
    devOnly: false, // developerOnly Command
    allowBot: false,
    _channel: {
      allowDM: true, // isAllowed to run in DM
      nsfwOnly: false, // isOnly Allowed In NSFW Channels
    },
    _bot: [ // botPermissions
    ], // permission to use Command
    _user: [ // userPermissions
    ]
  },
};

/// https://sourceb.in/kvZBnXFYJx