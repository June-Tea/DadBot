module.exports = {
    name: 'jokes',
    description: 'this is a joke command!',
    execute(message,Discord)
  {

    //Variable to keep track of the number of jokes in the array (to iterate)
    var n = 4;

    // Array of jokes
    var jokearray = [
    "What did the computer say to the other after a 16 hour car ride?... Damn that was a hard drive.",
    "Why couldn't the chili practice archery?... He didn't Habanero",
    "My can opener broke...  Now it’s a can’t opener",
    "I hate people who talk about me behind my back...  They discussed me"];

            //Send a random element of the joke array to the channel
            message.channel.send(jokearray[Math.floor(Math.random() * n)]);

            //Send this picture of laughing dad
            let photo = new Discord.MessageAttachment(
              "https://d3thpuk46eyjbu.cloudfront.net/uploads/production/8285/1497701973/original/Laughing_(59303979).jpg?1497701973",
              "Daddy.png"
            );
            //Send the photo
            message.channel.send(photo);
          }
        }
      