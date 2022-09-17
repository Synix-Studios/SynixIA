const fs = require('fs');
module.exports = async (client) => {
    let nFiles = 0, nFolders = 0, arrayOfSlashCommands = [];;
    fs.readdirSync("./src/commands/").forEach((folder) => {
        nFolders++
        const slashCommands = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));
        for (const file of slashCommands) {
            try {
                const slashFiles = require(`../commands/${folder}/${file}`);
                if (!slashFiles.newStructure || !slashFiles.newStructure.name) {
                    client.log.error(`[/${folder}/${file}] => This Command Ins't Configured.`)
                    continue;
                }
                if (slashFiles.newStructure.name) {
                    if (slashFiles.newStructure._slash.isSlashCmd === true) {
                        client.slashCommands.set(slashFiles.newStructure.name, slashFiles);
                        arrayOfSlashCommands.push({
                            name: slashFiles.newStructure.name,
                            description: slashFiles.newStructure._slash.description,
                            options: slashFiles.newStructure._slash.options
                        })
                        nFiles++
                        client.log.log(`Loaded ${file}.`)
                    }
                }
            } catch (err) { client.log.error(err) }
        }
    });
    client.on("ready", async () => {
        await client.application.commands.set(arrayOfSlashCommands)
    })
    client.log.success(`Successfully Loaded ${nFiles} Files && ${nFolders} Folders.`);
}