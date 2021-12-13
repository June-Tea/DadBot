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
let stopwords = require('./stopwords');
const guildCommandPrefixes = new Map();
const client = new Discord.Client();
let connection;
let advicearray;
let a;
let jokearray;
let n;
const queue = new Map();

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
  client.guilds.cache.forEach(guild => {
    connection.query(
        `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
    ).then(result => {
        guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
    }).catch(err => console.log(err));
    // Array of jokes
    connection.query(
      `SELECT * FROM jokes`
    ).then(result => {
        jokearray = result[0];
        console.log(jokearray);
    }).catch(err => console.log(err));

    //Variable to keep track of the number of jokes in the array (to iterate)
    connection.query(
        `SELECT MAX(jokeId) AS jokeId FROM jokes`
    ).then(result => {
        n = result[0][0].jokeId;
        console.log(n);
    }).catch(err => console.log(err));
    //Array of advice
    connection.query(
      `SELECT * FROM advice`
     ).then(result => {
      advicearray = result[0];
     }).catch(err => console.log(err));

    // Number of advice, to iterate through the list
    connection.query(
      `SELECT MAX(adviceId) AS adviceId FROM advice`
  ).then(result => {
      a = result[0][0].adviceId;
  }).catch(err => console.log(err));
});
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
  //get the prefix from the database
  const prefix = guildCommandPrefixes.get(message.guild.id);
  //Check to see if the message is a command 
  if (message.content.startsWith(prefix)) 
  {

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
    
    //if the message starts with !help, execute the help cmd
    else if(message.content.startsWith(`${prefix}help`)) {
      client.commands.get('help').execute(message);
      return;
    }

    //if the message starts with !jokes, execute the jokes cmd
    else if(message.content.startsWith(`${prefix}joke`)) {
      client.commands.get('jokes').execute(message,Discord,jokearray,n);
      return;
    }

    //if the message starts with !advice, execute the advice cmd
    else if(message.content.startsWith(`${prefix}advice`)) {
      client.commands.get('advice').execute(message,Discord,advicearray,a);
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
    //if the message starts with !changeprefix execute changeprefix
    else if (message.content.toLowerCase().startsWith(prefix + 'changeprefix')) {
      changeprefix(message);
      return;
    }
    else if (message.content.startsWith(`${prefix}roll`)){
    client.commands.get('roll').execute(message);
    }
    //if the commands doesn't exist, say so
    else {
      message.channel.send("I dont understand you (Try Another Command)!");
    }
  } //if it's not a command check to see if it includes im or i'm
  
  else 
  {
    let tokens = message.content.toLowerCase().split(" ");

    if (tokens.includes("i'm")) {
      const index = tokens.indexOf("i'm");
      if (tokens.length > 1 && index < tokens.length - 1) {
        let keywords = tokens.slice(index, tokens.length);
        let n = 0;
        let resp = "";
        while (n < keywords.length && stopwords.includes(keywords[n].toLowerCase())) {
          n++;
          if (n < keywords.length) {
            resp += keywords[n] + " ";
          }
        }
        message.channel.send('Hello ' + resp + ' I\'m Dadbot!');
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
          if (n < keywords.length) {
            resp += keywords[n] + " ";
          }
        }
        message.channel.send('Hello ' + resp + ' I\'m Dadbot!');
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
    return message.channel.send(`${song.title} added to queue, I'll spin it up later.`);
  }
}

//Skip function
function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "I can't skip the song unless you're in the voice channel!"
    );
  if (!serverQueue)
    return message.channel.send("I couldn't find another record to skip onto!");
  serverQueue.connection.dispatcher.end();
}

//Stop function
function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You can't stop the music unless you're in the voice channel!"
    );
    
  if (!serverQueue)
    return message.channel.send("Stop what? I'm not spinning a record!");
    
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

//Changeprefix function
async function changeprefix(message) {
  //Only the server owner can change the prefix
  if(message.member.id === message.guild.ownerID) {
    const [cmdName, newPrefix] = message.content.split(" ");
    //make sure the user provides the correct number of arguments
    if(newPrefix) {
      try { //tries to update the database with this server's prefix
        await connection.query(
          `UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildID = '${message.guild.id}'` 
        ); //updates guildcommandprefixes so the new prefix is immediately usable
          guildCommandPrefixes.set(message.guild.id, newPrefix);
          message.channel.send(`Updated the prefix to ${newPrefix}`);
      } 
      catch(err) { //in case of any error let the user know the prefix wasn't changed
        console.log(err)
        message.channel.send(`Failed to update the prefix to ${newPrefix}`);
      }
    } 
    else {
      message.channel.send('Incorrect amount of arguments');
    }
} //Let non owners know they don't have permission to alter the prefix
else {
  message.channel.send('You do not have permission to use that command');
}
}
//assigns the server id and user id to the database when the bot joins
client.on('guildCreate', async (guild) => {
  try {
      await connection.query(
          `INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerID}')`
      );
      await connection.query(
          `INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
      );
  } catch(err) {
      console.log(err);
  } //Adds the prefix to guildcommandprefixes so the bot can use it
  connection.query(
    `SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
  ).then(result => {
    guildCommandPrefixes.set(guild.id, result[0][0].cmdPrefix);
  }).catch(err => console.log(err));
});

//Bot login on the token defined earlier (always comes at the end)
(async () =>{
  connection = await require('./database/db');
  await client.login(token);
})();
