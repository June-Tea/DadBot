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

// Array of stopwords
var stopwords = [
    'a',
    'about',
    'above',
    'after',
    'again',
    'against',
    'all',
    'am',
    'an',
    'and',
    'any',
    'are',
    "aren't",
    "as",
    'at',
    'be',
    'because',
    'been',
    'before',
    'being',
    'below',
    'between',
    'both',
    'but',
    'by',
    "can't",
    'cannot',
    'could',
    "couldn't",
    'did',
    "didn't",
    'do',
    'does',
    "doesn't",
    'doing',
    "don't",
    'down',
    'each',
    'extremely',
    'few',
    'for',
    'from',
    'fucking',
    'fuckin',
    'further',
    'good',
    'had',
    "hadn't",
    'has',
    "hasn't",
    'have',
    "haven't",
    'having',
    'he',
    "he'd",
    "he'll",
    "he's",
    'her',
    'here',
    "here's",
    'hers',
    'herself',
    'him',
    'himself ',
    'his',
    'how',
    "how's",
    'i',
    "i'd",
    "i'll",
    "i'm",
    'im',
    "i've",
    'if',
    'in',
    'into',
    'is',
    "isn't",
    'it',
    "it's",
    'its',
    'itself',
    "let's",
    'me',
    'more',
    'most',
    "mustn't",
    'my',
    'myself',
    'no',
    'nor',
    'not',
    'of',
    'off',
    'on',
    'once',
    'only',
    'or',
    'other',
    'ought',
    'our',
    'ours',
    'ourselves',
    'out',
    'over',
    'own',
    'pretty',
    'really',
    'same',
    "shan't",
    'she',
    "she'd",
    "she'll",
    "she's",
    'should',
    "shouldn't",
    'so',
    'some',
    'such',
    'than',
    'that',
    "that's",
    'the',
    'their',
    'theirs',
    'them',
    'themselves',
    'then',
    'there',
    "there's",
    'these',
    'they',
    "they'd",
    "they'll",
    "they're",
    "they've",
    'this',
    'those',
    'through',
    'to',
    'too',
    'under',
    'until',
    'up',
    'very',
    'was',
    "wasn't",
    'we',
    "we'd",
    "we'll",
    "we're",
    "we've",
    'were',
    "weren't",
    'what',
    "what's",
    'when',
    "when's",
    'where',
    "where's",
    'which',
    'while',
    'who',
    "who's",
    'whom',
    'why',
    "why's",
    'with',
    "won't",
    'would',
    "wouldn't",
    'you',
    "you'd",
    "you'll",
    "you've",
    'your',
    'yours',
    'yourself',
    'yourselves'
];

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
  /*const dbHello = "Hello";
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
  }*/
  let tokens = message.content.split(" ");

    if (tokens.includes("I'm")) {
        const index = tokens.indexOf("I'm");
        if (tokens.length > 1 && index < tokens.length - 1) {
            let keywords = tokens.slice(index, tokens.length);
            let n = 0;
            let resp = "";
            while (n < keywords.length && stopwords.includes(keywords[n].toLowerCase())) {
                n++;
                if (n < keywords.length){
                  resp += keywords[n] + " ";
                }
            }
            message.channel.send('Hello ' + resp + ', I\'M DADBOT!');
        }
    }

    else if (tokens.includes("i'm")) {
        const index = tokens.indexOf("i'm");
        if (tokens.length > 1 && index < tokens.length - 1) {
            let keywords = tokens.slice(index, tokens.length);
            let n = 0;
            let resp = "";
            while (n < keywords.length && stopwords.includes(keywords[n].toLowerCase())) {
                n++;
                if (n < keywords.length){
                  resp += keywords[n] + " ";
                }
            }
            message.channel.send('Hello ' + resp + ', I\'M DADBOT!');
        }
    }

    else if (tokens.includes("Im")) {
        const index = tokens.indexOf("Im");
        if (tokens.length > 1 && index < tokens.length - 1) {
            let keywords = tokens.slice(index, tokens.length);
            let n = 0;
            let resp = "";
            while (n < keywords.length && stopwords.includes(keywords[n].toLowerCase())) {
                n++;
                if (n < keywords.length){
                  resp += keywords[n] + " ";
                }
            }
            message.channel.send('Hello ' + resp + ', I\'M DADBOT!');
        }
    }
    else if (tokens.includes("im")) {
        const index = tokens.indexOf("im");
        if (tokens.length > 1 && index < tokens.length - 1) {
            let keywords = tokens.slice(index, tokens.length);
            let n = 0;
            let resp = "";
            while (n < keywords.length && stopwords.includes(keywords[n].toLowerCase())) {
                n++;
                if (n < keywords.length){
                  resp += keywords[n] + " ";
                }
            }
            message.channel.send('Hello ' + resp + ', I\'M DADBOT!');
        }
    }
});

client.login("ODk4MDI1Njg1MDk0ODkxNTQw.YWeNlw.eHk6mWUTz3WVIaNnyhlJFTGnFrA");
//Dylan's Login = ODkzNTA0NzUxNzQ3MTA0ODM4.YVcbJQ.DDjzjBLMHlVB9F-DK0-ZbxXKdZ4
//Jacob's Login = OODk4MDI1Njg1MDk0ODkxNTQw.YWeNlw.eHk6mWUTz3WVIaNnyhlJFTGnFrA
