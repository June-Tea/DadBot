const Discord = require('discord.js');
const {Client, Intents} = require('discord.js');
const client = new Discord.Client({intents: [
    'GUILDS',
    'GUILD_VOICE_STATES',
    'GUILD_MESSAGES',
],
});
const DisTube = require("distube");
client.setMaxListeners(10);
const distube = new DisTube.default(client, {
    emitNewSongOnly: true
}); 
const {
    token
} = require('./info.json');
const prefix = 'DadBot';

client.on("ready", () => {
    console.log(`${client.user.tag} has logged in.`)
});

client.on("message", async (message) => {
    //console.log("Test",message);
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    // Queue status template
    const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

    // DisTube event listeners, more in the documentation page
    distube
        .on("playSong", (message, queue, song) => message.channel.send(
            `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
        ))
        .on("addSong", (message, queue, song) => message.channel.send(
            `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        ))
        .on("playList", (message, queue, playlist, song) => message.channel.send(
            `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
        ))
        .on("addList", (message, queue, playlist) => message.channel.send(
            `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
        ))
        // DisTubeOptions.searchSongs = true
        .on("searchResult", (message, result) => {
            let i = 0;
            message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
        })
        // DisTubeOptions.searchSongs = true
        .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
        .on("error", (message, e) => {
            console.error(e)
            message.channel.send("An error encountered: " + e);
        });
    if (command == "play"){
        if (!message.member.voice.channel) return message.channel.send('you need to be in a voice channel.');
        if (!args[0]) return message.channel.send('what should i play?');
        distube.play(message, agrs.join(" "));
    }
    if (command == "stop"){
        const bot = message.guild.members.cache.get(client.user.id);
        if (!message.member.voice.channel) return message.channel.send('you need to be in a voice channel.');
        if (bot.voice.channel !== message.member.voice.channel) return message.channel.send('you are not in the same voice channel as the bot');
        distube.stop(message);
        message.channel.send('you have stopped the music.');
    }
}); 

client.login(token);