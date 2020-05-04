const { Client } = require("discord.js");
const { config } = require("dotenv"); 
const fs = require('fs');
const client = new Client({
    disableEveryone: true
});


config({
    path: __dirname + "/.env"

});

client.on("ready", () => {
    console.log("I am alive!");
});


function generateOutputFile(channel, member) {
  // use IDs instead of username cause some people have stupid emojis in their name
  const fileName = `./recordings/${member.id}-${Date.now()}.pcm`;
  return fs.createWriteStream(fileName);
}

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
           const connection = await message.member.voice.channel.join()
  connection.on('speaking', (user, speaking) => {
    if (speaking) {
      console.log(`I'm listening to ${user}`)
      const audio = connection.receiver.createStream(user, {mode: 'pcm'});
      console.log(audio);        

    } else {
      console.log(`I stopped listening to ${user}`)
    }
  })
        } else {
           message.reply("errr"); 
        }
    }
});

        

client.login(process.env.TOKEN);
