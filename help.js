module.exports = {

    name: 'help',

    description: 'this displays a list of commands!',

    execute(message){

            message.channel.send("!advice = Gives some life advice, for all your troubles!");
            message.channel.send("!changeprefix = Change !");
            message.channel.send("!hello = Dadbot says hi!");
            message.channel.send("!joke = Guranteed to make you laugh with a hilariously bad joke!");
            message.channel.send("!play url = Plays the song of the url provided. Must be in a voice channel!");
            message.channel.send("!roll = Roll the dice!");
            message.channel.send("!skip = Skip to the next song!");
            message.channel.send("!stop = Shut off the music!");

        }

    }
