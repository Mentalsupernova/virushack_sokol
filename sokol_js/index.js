const { Client } = require("discord.js");
const { config } = require("dotenv"); 

const client = new Client({
    disableEveryone: true
});


config({
    path: __dirname + "/.env"

});

client.on("ready", () => {
    console.log("I am alive!");
});

client.on("message", async mesage => {
    console.log('${message.author.username} said: ${message.content}');
});

client.on("message", async message => {
    const prefix = "~";

        if (!message.author.bot) return;
        if (!message.guild) return;
        if (!messgae.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

    if (cmd === "ping"){
        const msg = await message.channel.send("123");
        msg.edit('Pong\n');
    }
});

client.login(process.env.TOKEN);
