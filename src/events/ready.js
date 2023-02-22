const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`\n[discord-bot]: Ready! Logged in as ${client.user.tag}`);
    },
};
