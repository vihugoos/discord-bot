require("dotenv").config();

const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs.readdirSync(commandsPath);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, (c) => {
    console.log(`\n[discord-bot]: Bot is ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0];

        if (selected == "javascript") {
            await interaction.reply(
                "Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            );
        } else if (selected == "python") {
            await interaction.reply(
                "Documentação do Python: https://www.python.org"
            );
        } else if (selected == "csharp") {
            await interaction.reply(
                "Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/"
            );
        } else if (selected == "discordjs") {
            await interaction.reply(
                "Documentação do Discord.js: https://discordjs.guide/#before-you-begin"
            );
        }
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.log("Command not found!");
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        interaction.reply("There was an error executing this command!");
    }
});

client.login(process.env.TOKEN);
