const cooldowns = new Map();

module.exports = async (client, interaction) => {
    try {
        if (!interaction.isCommand()) {
            return;
        }

        //Get Data
        let UserData = await client.users.cache.get(interaction.user.id)
        console.log(UserData)

        //Get Command Name
        const slash = client.slashCommands.get(interaction.commandName)

        if (!slash) return interaction.reply({ content: "An error has occured" });

        await client.fetchUser(interaction.user)

        if (UserData.User.Roles.isDeveloper.isDeveloper !== true) {
            if (UserData.User.Roles.isBanned.isBanned === true) {
                let Reason;
                if (UserData.User.Roles.isBanned.Reason === '') {
                    Reason = 'No Reason'
                } else {
                    Reason = UserData.User.Roles.isBanned.Reason
                }

                const Blacklist_Embed = new Discord.EmbedBuilder()
                    .setColor('#FF0000')
                    .setAuthor({ name: 'BlackListed', iconURL: interaction.user.avatarURL() })
                    .addFields(
                        { name: '\u200B', value: `Uh-Oh! You\'re Blacklisted From My Notes, Sorry. \n\n • Reason: \`${Reason}\` \n • Date: \`${UserData.User.Roles.isBanned.Date}\`` },
                        { name: '\u200B', value: `If You Think This Is An Error Or Want An Appeal [Contact Us](https://contact.synix.tech), [Discord](https://discord.gg/RfBbmrmegw)` },
                    )

                interaction.reply({ embeds: [Blacklist_Embed], ephemeral: true }).catch(() => { });
                return;
            }
        }

        //If cooldowns map doesn't have a slash.info.name key then create one.
        if (!cooldowns.has(slash.info.name)) {
            cooldowns.set(slash.info.name, new Discord.Collection());
        }

        const now = Date.now();
        const time_stamps = cooldowns.get(slash.info.name);
        let timeout;

        // if user is developer
        if (UserData.User.Roles.isDeveloper.isDeveloper === true) {
            timeout = 0
        }
        //if user is premium
        if (UserData.User.Roles.isPremium.isPremium === true) {
            if (slash.info.timeoutBypass === true) {
                timeout = (slash.info.timeout) * 500;
            } else {
                timeout = (slash.info.timeout) * 1000;
            }
        }
        //if user isn't premium or developeer
        if (UserData.User.Roles.isPremium.isPremium !== true && UserData.User.Roles.isDeveloper.isDeveloper !== true) {
            timeout = (slash.info.timeout) * 1000;
        }

        //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
        if (time_stamps.has(interaction.user.id)) {
            const expiration_time = time_stamps.get(interaction.user.id) + timeout;

            if (now < expiration_time) {
                const time_left = (expiration_time - now) / 1000;
                interaction.reply({ content: `Please wait \`${time_left.toFixed(1)}\` more seconds before using \`${slash.info.name}\``, ephemeral: true }).catch(() => { });
                return;
            }
        }

        //If the author's id is not in time_stamps then add them with the current time.
        time_stamps.set(interaction.user.id, now);
        //Delete the user's id once the cooldown is over.
        setTimeout(() => time_stamps.delete(interaction.user.id), timeout);

        // Dm Function
        if (interaction.channel.type === "DM") {
            if (slash.info.allowDM !== true) {
                interaction.reply({ content: "Uh-Oh! My Creator Said That I Should't Respond In DM.", ephemeral: true }).catch(() => { });
                return;
            }
        }

        if (slash.info.premiumOnly === true && UserData.User.Roles.isPremium.isPremium !== true) {
            interaction.reply({ content: "Uhm, This is an Premium Command. You Can't Use It.", ephemeral: true }).catch(() => { });
            return;
        }

        //If command is owner only and author isn't owner return
        if (slash.info.ownerOnly === true && UserData.User.Roles.isDeveloper.isDeveloper !== true) {
            interaction.reply({ content: "Uhmmm, My Creator Said That I Should't Talk To People That I Don't Know", ephemeral: true }).catch(() => { });
            return;
        }

        //If channel isn't nsfwOnly and command is return error
        if (!interaction.channel.nsfw && slash.info.nsfwOnly === true) {
            interaction.reply({ content: "Uhmm! You May Be In An Wrong Channel, This Isn't An NSFW Channel For This Command.`", ephemeral: true }).catch(() => { });
            return;
        }

        try {
        } catch (err) {
            client.log.error(`${err}`)
        }
    } catch (err) {
        client.log.error(`${err}`)
    }
};