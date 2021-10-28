module.exports = {
    name: 'jokes',
    description: 'this is a joke command!',
    execute(message, n, jokearray,Discord)
  {
            message.channel.send(jokearray[Math.floor(Math.random() * n)]);
            let photo = new Discord.MessageAttachment(
              "https://d3thpuk46eyjbu.cloudfront.net/uploads/production/8285/1497701973/original/Laughing_(59303979).jpg?1497701973",
              "Daddy.png"
            );
            message.channel.send(photo);
          }
        }