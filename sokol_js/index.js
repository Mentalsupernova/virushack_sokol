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


client.on("message", async message => {
        const prefix = "~";


        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        console.log(args);
    if (cmd === "ping"){
        const msg = await message.channel.send("123");
        msg.edit('Pong\n');
    }
    if (cmd === "join"){
        if (message.member.voice.channel){
            const conn = await message.member.voice.channel.join();
        } else {
           message.reply("errr"); 
        }
    }
});

client.login(process.env.TOKEN);
