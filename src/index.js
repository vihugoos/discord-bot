require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");

const commandHandling = require("./commandHandling");
const eventHandling = require("./eventHandling");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

commandHandling(client);

eventHandling(client);

client.login(process.env.TOKEN);
