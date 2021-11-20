module.exports = {
    name: 'jokes',
    description: 'this is a joke command!',
    execute(message,Discord)
  {
    var n = 4;
    var jokearray = [
    "What did the computer say to the other after a 16 hour car ride?... Damn that was a hard drive.",
    "Why couldn't the chili practice archery?... He didn't Habanero",
    "My can opener broke...  Now it’s a can’t opener",
    "I hate people who talk about me behind my back...  They discussed me"];

            message.channel.send(jokearray[Math.floor(Math.random() * n)]);
            let photo = new Discord.MessageAttachment(
              "https://d3thpuk46eyjbu.cloudfront.net/uploads/production/8285/1497701973/original/Laughing_(59303979).jpg?1497701973",
              "Daddy.png"
            );
            message.channel.send(photo);
          }
        }
      