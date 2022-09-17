const { Collection, EmbedBuilder, ChannelType } = require('discord.js')
const cooldowns = new Map();
module.exports = async (client, message) => {
    try {

        if (message.content === `<@!${message.client.user.id}>` || message.content === `<@${message.client.user.id}>`) {
            message.reply({ content: `Oh!? You're Calling Me? Forgot The Prefix? It's \`${client.config.main._default._prefix}\` Or You Need Another Help? Use Help Command`, allowedMentions: { repliedUser: true } });
            return;
        }

        if (!message.content.toLowerCase().startsWith(client.config.main._default._prefix)) return;

        const args = message.content.slice(client.config.main._default._prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.newStructure.aliases && cmd.newStructure.aliases.includes(commandName));

        if (!cmd) return;

        if (cmd.newStructure._command.isEnabled !== true) {
            message.reply({ content: `This Command Is Currently Disabled Or Disabled.`, allowedMentions: { repliedUser: true } });
            return;
        }

        if (message.author.bot && cmd._permissions.allowBot !== true) return;

        const _userData = await client.fetchUser_(message.author)

        if (![4, 5].includes(_userData._datas._roles._isIntern.type)) {
            client.log.event(`${message.author.id} Has Run The ${commandName} But He Isn't Whitelisted.`)
            message.reply({ content: `The bot is currently in development, you should be developer or aks any developer to get the "Tester Priviligiates".`, allowedMentions: { repliedUser: true } })
            return;
        }


        if (cmd.newStructure._timeout.isEnabled === true) {

            if (!cooldowns.has(cmd.newStructure.name)) {
                cooldowns.set(cmd.newStructure.name, new Collection());
            }

            const _dateNow = Date.now();
            const timeStamps = cooldowns.get(cmd.newStructure.name);
            let timeout = (cmd.newStructure._timeout.timeout.count) * 1000;

            if (_userData._datas._roles._isPremium.isPremium && cmd.newStructure._timeout.timeout._premium.enabledBypass === true) {
                timeout = (cmd.newStructure._timeout.timeout.count) * 1000 * (100 - cmd.newStructure._timeout.timeout._premium.discount) / 100;
                if (timeout < 0) { timeout = 0 }
            }
            if ([4, 5].includes(_userData._datas._roles._isIntern.type)) {
                timeout = 0
            }

            if (timeStamps.has(message.author.id)) {
                const TimeExpires = timeStamps.get(message.author.id) + timeout;

                if (_dateNow < TimeExpires) {
                    const remainingTime = (TimeExpires - _dateNow) / 1000;
                    const FotterTips = {
                        0: `WHY: ¿Why Cooldown? The Cooldown Is To Not Overload The Server.`,
                        1: `TIP: Use ' ${client.config.main._default._prefix}avatar ' To Get Any User Avatar In Diferent Types.`
                    }
                    message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({ name: '¡Cooldown!', iconURL: message.author.avatarURL() })
                                .addFields([
                                    { name: '\u200B', value: `Please Wait \`${remainingTime.toFixed(2)}\` before using \`${commandName}\`` },
                                ])
                                .setFooter({ text: `${FotterTips[Math.floor(Math.random() * 2)]}`, iconURL: message.author.avatarURL() })
                                .setColor(0xff0000)
                        ]
                    })
                    return;
                }
            }

            timeStamps.set(message.author.id, _dateNow);
            setTimeout(() => timeStamps.delete(message.author.id), timeout);
        }

        if (_userData._datas._roles._isBanned.isBanned) {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: 'BlackListed', iconURL: message.author.avatarURL() })
                        .addFields([
                            { name: '\u200B', value: `Uh-Oh! You\'re Blacklisted From My Notes, Sorry. \n\n • Reason: \`${_userData._datas._roles._isBanned.reason}\` \n • Date: \`${_userData._datas._roles._isBanned._date}\` \n • Expires: \`${_userData._datas._roles._isBanned._expires}\`` },
                            { name: '\u200B', value: `If You Think This Is An Error Or Want An Appeal [Contact Us](https://contact.synix.tech), [Discord](https://discord.gg/RfBbmrmegw)` },
                        ])
                        .setColor(0xff0000)
                ]
            }).then(message => setTimeout(() => message.delete(), 15 * 1000)) // seconds * ms => converter
            return;
        }

        if (cmd.newStructure._permissions.ownerOnly === true && ![5].includes(_userData._datas._roles._isIntern.type)) {
            message.reply({ content: `Uhmmm, My Creator Said That I Should't Talk About This.`, allowedMentions: { repliedUser: true } })
            return;
        }
        if (cmd.newStructure._permissions.devOnly === true && ![4, 5].includes(_userData._datas._roles._isIntern.type)) {
            message.reply({ content: `Uhm, I am Not Allowed To Talk About This Except My Dev Or Owner.`, allowedMentions: { repliedUser: true } })
            return;
        }
        if (cmd.newStructure._premiumOnly.isUserPremiumOnly === true && _userData._datas._roles._isPremium.isPremium !== true) {
            message.reply({ content: `Uhm, This is an Premium Command. You Can't Use It.`, allowedMentions: { repliedUser: true } })
            return;
        }
        if (message.channel.type === ChannelType.DM && cmd.newStructure._permissions._channel.allowDM !== true) {
            message.reply({ content: `Uh-Oh! My Creator Said That I Should't Respond In DM.`, allowedMentions: { repliedUser: true } });
            return;
        }

        if (!message.channel.nsfw && cmd.newStructure._permissions._channel.nsfwOnly === true) {
            message.reply({ content: `Uhmm! You May Be In An Wrong Channel, I Cannot Send NSFW Content Here. I Could Be Arrested.`, allowedMentions: { repliedUser: true } })
            return;
        }

        if (message.channel.type !== ChannelType.DM) {
            if ((!message.member.permissions?.has(cmd.newStructure._permissions?._user || []))) {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Missing Permisssion")
                            .setDescription("You Do Not Have The Required Permission To Use This Function")
                            .addField([{ name: `Required Permissions`, value: `\`\`\`${cmd.newStructure._permissions?._user.map((perms) => client.nicerPermission(perms)).join(", ").replace(/\_/g, " ")}\`\`\`` }])
                            .setColor(0xff0000)
                    ],
                });
                return;
            }

            if ((!message.guild.members.me.permissions?.has(cmd.newStructure._permissions?._bot || []))) {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle("Missing Permisssion")
                            .setDescription("I Am Messing Permissions")
                            .addField([{ name: `Required Permissions`, value: `\`\`\`${cmd.newStructure._permissions?._bot.map((perms) => client.nicerPermission(perms)).join(", ").replace(/\_/g, " ")}\`\`\`` }])
                            .setColor(0xff0000)
                    ]
                })
                return;
            }
        }
        await cmd._src.newCommand(client, message, args)
    } catch (err) {
        message.channel.send({ content: "An Error Had Been Ocurred, This Error Had Sent To Developers." })
        client.log.error(`${err}`)
        throw new Error(err)
    }
}