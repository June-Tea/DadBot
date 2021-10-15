let Discord = require("discord.js");
let client = new Discord.Client();
var n = 4;
//this is a message event, it will read the message the moment it is sent, if it matches
//the critera of Hello, it will respond.

var jokearray = [
  "What did the computer say to the other after a 16 hour car ride?... Damn that was a hard drive.",
  "Why couldn't the chili practice archery?... He didn't Habanero",
  "My can opener broke...  Now it’s a can’t opener",
  "I hate people who talk about me behind my back...  They discussed me"
];

client.on("message", message => {
  if (message.content == "Hello") {
    message.channel.send("Hello, Im DadBot");
  }
  if (message.content == "Joke") {
    message.channel.send(jokearray[Math.floor(Math.random() * n)]);
    let photo = new Discord.MessageAttachment(
      "https://d3thpuk46eyjbu.cloudfront.net/uploads/production/8285/1497701973/original/Laughing_(59303979).jpg?1497701973",
      "Daddy.png"
    );
    message.channel.send(photo);
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

client.login("ODkzNTA0NzUxNzQ3MTA0ODM4.YVcbJQ.DDjzjBLMHlVB9F-DK0-ZbxXKdZ4");
//Dylan's Login = ODkzNTA0NzUxNzQ3MTA0ODM4.YVcbJQ.DDjzjBLMHlVB9F-DK0-ZbxXKdZ4
//Jacob's Login = ODk4MDI1Njg1MDk0ODkxNTQw.YWeNlw.yWjQB6zC-4UcMdD0xefc5vydbtE
