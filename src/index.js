require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User,
        Partials.Channel,
    ],
});

client.login(process.env.BOT_TOKEN);

client.on("ready", () => {
    console.log("\n[discord-bot]: Bot started with success!");
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content === "!ping") {
        message.channel.send(
            `The bot's ping is estimated at ${client.ws.ping}ms`
        );
    }

    if (message.content === "!solicitações abertas") {
        message.reply("Hi, Dear!");
    }
});
