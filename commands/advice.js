
  module.exports = {
    name: 'advice',
    description: 'The Advice Command',
    execute(message,Discord)
  {
    // Number of advice, to iterate through the list
    var a = 19;

    //Array of advice
    var advicearray = [
        "Wise men don’t need advice. Fools won’t take it",
        "Never bet your money on another man’s game","It’s easier to advise than be advised.",
        "Try to be a rainbow in someone’s cloud.",
        "Believe you can and you’re halfway there.",
        "Think before you speak. Read before you think.",
        "Yield to all and you will soon have nothing to yield.",
        "If you can’t bite, better not show your teeth.",
        "Speak humbly, listen respectfully, smile gently.",
        "Keep your eyes on the stars and your feet on the ground.",
        "Live like you were dying, Love because you are.",
        "Seek advice but use your own common sense.",
        "If it is not right do not do it; if it is not true do not say it.",
        "The best way to predict your future is to create it.",
        "Life’s too mysterious to take too serious.",
        "Never miss a good chance to shut up.",
        "Better three hours too soon than a minute too late.",
        "Never trust the advice of a man in difficulties.",
        "If you want to go fast, go alone. If you want to go far, go together.",
        "Go wisely and slowly. Those who rush stumble and fall.",
        "I always advise people never to give advice.",
        "Dont light yourself on fire trying to brighten someone else’s existence."
      ];
            //Send a message of a random element in the array of list
            message.channel.send(advicearray[Math.floor(Math.random() * a)]);
          }
        }