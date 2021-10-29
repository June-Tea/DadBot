/*
Jacob Krawitz, Janniel Tejada, Dylan Coyle, Reema Norford
DADBOT

Description:

*/



let Discord = require("discord.js");
let client = new Discord.Client();
var n = 4;
//this is a message event, it will read the message the moment it is sent, if it matches
//the critera of Hello, it will respond.



//Seperate file reader
const fs = require('fs');

// Creates a Discord collection, to store commands in seperate file
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}


// Array of jokes
var jokearray = [
  "What did the computer say to the other after a 16 hour car ride?... Damn that was a hard drive.",
  "Why couldn't the chili practice archery?... He didn't Habanero",
  "My can opener broke...  Now it’s a can’t opener",
  "I hate people who talk about me behind my back...  They discussed me"
];


// Command listener

client.on("message", message => {



  // Hello command
  // If message is "Hello", activates the hello.js command
  if (message.content == "Hello") {
    client.commands.get('hello').execute(message);
  }

  
  // Joke command
  // If message is "Joke", activates the jokes.js command
  if (message.content == "Joke") {
    client.commands.get('jokes').execute(message,n,jokearray,Discord);
    }


});

client.on("message", message => {
  const dbHello = "Hello";
  const dbMessage = ", im DadBot";
  const fakeName = "";
  //var x = 0;
  if (message.content.includes("I'm")) {
    for (var i = 0; i < message.length; i++) {
      //while (x < 1) {
        if (message[i] == "I") {
          if (message[i + 1] == "'") {
            if (message[i + 2] == "m") {
              //x++;
            }
          }
        }
      //}
      fakeName.concat(message[i]);
    }
    const dbPartial = dbHello.concat(fakeName);
    const dbFull = dbPartial.concat(dbMessage);
    message.channel.send(dbFull);
  }
});

client.login("ODk4MDI1Njg1MDk0ODkxNTQw.YWeNlw.eHk6mWUTz3WVIaNnyhlJFTGnFrA");
//Dylan's Login = ODkzNTA0NzUxNzQ3MTA0ODM4.YVcbJQ.DDjzjBLMHlVB9F-DK0-ZbxXKdZ4
//Jacob's Login = OODk4MDI1Njg1MDk0ODkxNTQw.YWeNlw.eHk6mWUTz3WVIaNnyhlJFTGnFrA
