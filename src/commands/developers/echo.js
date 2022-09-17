const { PermissionsBitField } = require('discord.js')

module.exports._src = {
    // Command
    async newCommand(client, message, args) {
        message.reply("Echo")
    },

    // Slash Command
    async slash(client, interaction) {
        interaction.reply("Echo")
    }

}

module.exports.newStructure = {
    name: "echo", // Name (Command/Slash Name)
    descriptions: [ // Desc (Command)
        "Just Return \`Echo\`"
    ],
    aliases: [ // Aliases (Command)
        "test",
        "test1"
    ],
    category: "Developers", // Category (Command)
    _command: { // Command Settings
        isEnabled: true// isCommand Enabled
    },
    _slash: { // Slash Settings
        isSlashCmd: false, // isSlash Enabled
        ephemeral: true, // ephmeral ???
        options: [ // Slash options
            {
                name: 'echo',
                description: "Return Echo",
                type: 6,
                required: false
            }
        ],
    },
    _timeout: { // timeout
        isEnabled: true, // isTimeout Enabled
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
        ownerOnly: false, // onwerOnly Command
        devOnly: false, // developerOnly Command
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