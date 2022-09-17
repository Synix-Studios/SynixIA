const Discord = require('discord.js')

module.exports._src = {
    // Command
    async newCommand(client, message, args) {
        let UserData = await client.users.cache.get(message.author.id)
        if (UserData.User.Roles.isDeveloper.isDeveloper === true) {
            await message.reply({ content: `ShuttingDown... ${client.user.username}`, allowedMentions: { repliedUser: true } });
            client.log.warn(`Client Has Been ShutDowned In [${message.guild.name}] (${message.guild.id}) By [${message.author.username}#${message.author.discriminator}] (${message.author.id})`)
            process.exit();
        }
    },

    // Slash Command
    async slash(client, interaction) {
        let UserData = await client.users.cache.get(interaction.user.id)
        if (UserData.User.isDeveloper.isDeveloper === true) {
            await interaction.reply({ content: `No, Denegado Por gai`, ephemeral: true });
        }
    }
}

module.exports.newStructure = {
    name: "shutdown", // Name (Command/Slash Name)
    descriptions: [ // Desc (Command)
        "ShutDown My Computer"
    ],
    aliases: [ // Aliases (Command)
    ],
    category: "Developers", // Category (Command)
    _command: { // Command Settings
        isEnabled: true// isCommand Enabled
    },
    _slash: { // Slash Settings
        isSlashCmd: false, // isSlash Enabled
        ephemeral: true, // ephmeral ???
        name: 'echo',
        description: "Return Echo",
        options: [ // Slash options
            {
                name: 'echo',
                type: 6,
                description: "Return Echo",
                required: false
            }
        ],
    },
    _timeout: { // timeout
        isEnabled: false, // isTimeout Enabled
        timeout: {
            count: 0,
            _premium: {
                enabledBypass: true,
                discount: 10,
            }
        } // timeout time
    },
    _premiumOnly: {
        isGuildPremiumOnly: false,
        isUserPremiumOnly: false,
    }, // premiumOnly Command
    _permissions: {
        ownerOnly: true, // onwerOnly Command
        devOnly: true, // developerOnly Command
        allowBot: false,
        _channel: {
            allowDM: false, // isAllowed to run in DM
            nsfwOnly: false, // isOnly Allowed In NSFW Channels
        },
        _bot: [ // botPermissions
        ], // permission to use Command
        _user: [ // userPermissions
        ]
    },
};