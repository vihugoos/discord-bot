require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commandsPath = path.join(__dirname, "commands");

const commandsFiles = fs.readdirSync(commandsPath);

const commands = [];

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log(
            `\n[discord-bot]: Resetting ${commands.length} commands...`
        );

        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });

        console.log("\n[discord-bot]: Commands registered successfully!");
    } catch (error) {
        console.error(error);
    }
})();
