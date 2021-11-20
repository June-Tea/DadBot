module.exports = {
    name: 'hello',
    description: 'this is a hello command!',
    execute(message){
            //Send a hello command!
            message.channel.send("Hello, Im DadBot");
        }
    }

    