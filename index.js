/*
Jacob Krawitz, Janniel Tejada, Dylan Coyle, Reema Norford
DADBOT
Description: This is the Discord bot named DadBot! DadBot can play music
in voice channels, give jokes and advice on command, and more!

*/


//Bring in modules discord.js, ytdl-core, and config file
const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");

const client = new Discord.Client();

const queue = new Map();

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
    'big',
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

//Bring in filesystem module as 
const fs = require('fs');



//Creates a Discord collection, to store commands in seperate file
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

//Taking in the command files, set those to different commands
for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//Once the bot comes online, say something
client.once("ready", () => {
  console.log("Lets Get This Victory Royale!");
});

//Once the bot loses connection and comes back, say something
client.once("reconnecting", () => {
  console.log("I Am Lost!");
});

//Once the bot disconnects, say something
client.once("disconnect", () => {
  console.log("Very Lost!");
});


//Message listener (if a message contains something, do a command)
client.on("message", async message => {

  //if the bot sends the message, ignore it
  if (message.author.bot) return;

  //if the message does not start with "!", ignore it
  //if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  //if the message starts with !play, execute that command
  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } 

  //if the message starts with !hello, execute the hello cmd
  else if(message.content.startsWith(`${prefix}hello`)) {
    client.commands.get('hello').execute(message);
    return;
  }

  //if the message starts with !jokes, execute the jokes cmd
  else if(message.content.startsWith(`${prefix}joke`)) {
    client.commands.get('jokes').execute(message,Discord);
    return;
  }

  //if the message starts with !advice, execute the advice cmd
  else if(message.content.startsWith(`${prefix}advice`)) {
    client.commands.get('advice').execute(message,Discord);
  return;
  }

  //if the message starts with !skip, execute the skip cmd
  else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } 

  //if the message starts with !stop, execute the stop cmd
  else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  }

  //if the command doesn't exist check for im
  else {
    let tokens = message.content.toLowerCase().split(" ");

    if (tokens.includes("i'm")) {
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
  }
});

//Execute (play music) command
async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Go into a voice channel so I can play some music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} added to queue, Ill spin it up later.`);
  }
}

//Skip function
function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "I cant skip the song unless your in the voice channel!"
    );
  if (!serverQueue)
    return message.channel.send("I couldnt find another record to skip onto!");
  serverQueue.connection.dispatcher.end();
}

//Stop function
function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You cant stop the music unless your in the voice channel!"
    );
    
  if (!serverQueue)
    return message.channel.send("stop what? im not spining a record!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

//Play function
function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

//Bot login on the token defined earlier (always comes at the end)
client.login(token);
