let Discord = require("discord.js");
let client = new Discord.Client();
var n = 4;
var jokearray = [
  "What did the computer say to the other after a 16 hour car ride?... Damn that was a hard drive.",
  "Why couldn't the chili practice archery?... He didn't Habanero",
  "My can opener broke...  Now it’s a can’t opener",
  "I hate people who talk about me behind my back...  They discussed me"
];

//this is a message event, it will read the message the moment it is sent, if it matches
//the critera of Hello, it will respond.
client.on("message", message => {
  if (message.content == "Hello") {
    message.channel.send("Hello, im DadBot");
  }
});

client.on("message", message => {
  if (message.content == "Joke") {
    message.channel.send(jokearray[Math.floor(Math.random() * n)]);
  }
});

client.on("message", message => {
  //const dbHello = "Hello";
  //const dbMessage = ", im DadBot";
  //const dbFull = dbHello.concat(dbMessage);
  if (message.content.includes("I'm")) {
    message.channel.send("Hello [insert here], im DadBot");
  }
});

client.login("ODk4MDI1Njg1MDk0ODkxNTQw.YWeNlw.dfGl8kPZhKSKBVTNp5KFZN7askw");
//Dylan's Login = ODkzNTA0NzUxNzQ3MTA0ODM4.YVcbJQ.ntX7H8aVeJZ8KLGPUG9ORst4-w8
//Jacob's Login = ODk4MDI1Njg1MDk0ODkxNTQw.YWeNlw.dfGl8kPZhKSKBVTNp5KFZN7askw