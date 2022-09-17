const { Collection, EmbedBuilder, ChannelType } = require('discord.js')
const cooldowns = new Map();
module.exports = async (client, interaction) => {
    try {
        if (!interaction.isCommand()) {
            return;
        }

        const _userData = await client.fetchUser_(interaction.user)

        const slash = client.slashCommands.get(interaction.commandName)
        if (!slash) return interaction.reply({ content: "This Isn't An Command, This Would Be An Error." });

        if (![4, 5].includes(_userData._datas._roles._isIntern.type)) {
            client.log.event(`${interaction.user.id} Has Run The ${interaction.commandName} But He Isn't Whitelisted.`)
            interaction.reply({ content: `The bot is currently in development, you should be developer or aks any developer to get the "Tester Priviligiates".`, allowedMentions: { repliedUser: true } })
            return;
        }

        if (slash.newStructure._timeout.isEnabled === true) {

            if (!cooldowns.has(slash.newStructure.name)) {
                cooldowns.set(slash.newStructure.name, new Collection());
            }

            const _dateNow = Date.now();
            const timeStamps = cooldowns.get(slash.newStructure.name);
            let timeout = (slash.newStructure._timeout.timeout.count) * 1000;

            if (_userData._datas._roles._isPremium.isPremium && slash.newStructure._timeout.timeout._premium.enabledBypass === true) {
                timeout = (slash.newStructure._timeout.timeout.count) * 1000 * (100 - slash.newStructure._timeout.timeout._premium.discount) / 100;
                if (timeout < 0) { timeout = 0 }
            }
            if ([4, 5].includes(_userData._datas._roles._isIntern.type)) {
                timeout = 0
            }

            if (timeStamps.has(interaction.user.id)) {
                const TimeExpires = timeStamps.get(interaction.user.id) + timeout;

                if (_dateNow < TimeExpires) {
                    const remainingTime = (TimeExpires - _dateNow) / 1000;
                    const FotterTips = {
                        0: `WHY: ¿Why Cooldown? The Cooldown Is To Not Overload The Server.`,
                        1: `TIP: Use ' ${client.config.main._default._prefix}avatar ' To Get Any User Avatar In Diferent Types.`
                    }
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setuser({ name: '¡Cooldown!', iconURL: interaction.user.avatarURL() })
                                .addFields([
                                    { name: '\u200B', value: `Please Wait \`${remainingTime.toFixed(2)}\` before using \`${commandName}\`` },
                                ])
                                .setFooter({ text: `${FotterTips[Math.floor(Math.random() * 2)]}`, iconURL: interaction.user.avatarURL() })
                                .setColor(0xff0000)
                        ]
                    })
                    return;
                }
            }

            timeStamps.set(interaction.user.id, _dateNow);
            setTimeout(() => timeStamps.delete(interaction.user.id), timeout);

            await slash._src.newSlashCmd(client, interaction);
        }
    } catch (err) {
        client.log.error(err)
    }
}