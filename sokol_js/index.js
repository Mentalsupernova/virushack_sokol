const { Client } = require("discord.js");
const { config } = require("dotenv");
const fs = require('fs');
const avro = require('avro-js');
const  createBuffer = require('audio-buffer-from')
const toArray = require('stream-to-array')
const assert = require('assert')
const util = require('util')
var stream = require('stream');
const Pulsar = require('pulsar-client');





var type = avro.parse({
  type: "record",
  namespace: "event",
  name: "voice",
  doc: "Событие Sokol",
  fields: [{  doc: "Участиник конференции",  name: "userid",  type: "string"},
  {  name: "datetime",  doc: "Время события",type: {  type: "long",  logicalType: "timestamp-millis"  }  },
    { name: "payload",  doc: "Звук",  type: "bytes"  }  ]

});
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
           const connection = await message.member.voice.channel.join()
        //    var voice =  type.random();
//  var buf = type.toBuffer(voice);
//  console.log(voice);
//    console.log(buf);

  connection.on('speaking', (user, speaking) => {
    if (speaking) {
      console.log('m listening to ${user.id.toString()}')
      var date_1 = new Date().getDate();


      console.log(date_1);
        const audio = connection.receiver.createStream(user, {mode: 'pcm'});

        var converter = new stream.Writable();
          converter.data = []; // We'll store all the data inside this array
          converter._write = function (chunk) {
            this.data.push(chunk);
          };
          converter.on('finish', function(err) { // Will be emitted when the input stream has ended, ie. no more data will be provided
            var b = Buffer.concat(this.data); // Create a buffer from all the received chunks
            // Insert your business logic here
            var user_audio = {userid: user.id,datetime: date_1, payload:b};
            //var user_audio =  type.random();
            var buf = type.toBuffer(user_audio);
            console.log(user_audio);

         console.log(buf);
          });



    audio.pipe(converter);











        //    console.log(typeof audio);
    } else {
      console.log('I stopped listening to ${user}')
    }
  })
        } else {
           message.reply("errr");
        }
    }
});



client.login(process.env.TOKEN);
