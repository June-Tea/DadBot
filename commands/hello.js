module.exports = {
    name: 'hello',
    description: 'this is a hello command!',
    execute(message){
            message.channel.send("Hello, Im DadBot");
        }
    }

    