module.exports = {
    name: 'roll',
    description: 'This rolls a specified dice',
    execute(message,Discord)
  {
    let tokens = message.content.toLowerCase().split(" ");



    if(tokens[1]!=null)
    {
      let prompt = tokens[1].split("d");


      let numDice = parseInt(prompt[0]);
      let face = parseInt(prompt[1]);

      if(numDice > 1)
      {
        let total = 0;
        let diceRolled = [];

        for(let i = 0; i < numDice; i++)
        {
          let dice = Math.floor(Math.random() * (face - 1 + 1) + 1);
          diceRolled.push(dice);
          total += dice;
        }

        let outputString = " ";
        diceRolled.forEach(num => outputString += num.toString() + " ");
        message.channel.send(total.toString() + " (" + outputString + ")");

              /*
              for(let i =0; i < diceRolled.length; i++)
              {
                if(i == (diceRolled.length-1))
                {
                  outputString += diceRolled[i].toString() + "";
                }
                outputString += diceRolled[i].toString() + ", "
              }
              */
                    
        
              
            
  
      }
      else
      {
        let total = 0;

        for(let i = 0; i < numDice; i++)
        {
          total += Math.floor(Math.random() * (face - 1 + 1) + 1);
        }
        
        message.channel.send(total);
      }
    }
    else
    {
      message.channel.send("Nah");
    }

  }
}
      