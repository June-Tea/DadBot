module.exports = {
    name: 'roll',
    description: 'This rolls a specified dice',
    execute(message,Discord)
  {
    //Split message into !roll, *n*d*n*, +modifier
    //                  ^tokens[0] ^tokens[1]  ^tokens[2]
    let tokens = message.content.toLowerCase().split(" ");

    // If the user does not follow format, tell them
    if(tokens.length > 3)
    {
      message.channel.send("Please follow the format *!roll n*d*n +modifier* and try again!");
    }
    
    else if(tokens[1]!=null) //If the dice is present...
    {
      let prompt = tokens[1].split("d");//Split the *n*d*n* part into before the d and after 

      let numDice = parseInt(prompt[0]);  //number of dice is before d
      let face = parseInt(prompt[1]); //type of dice is after d

      //if d0 is input, say so and exit
      if(face == 0)
      {
        message.channel.send("Can't roll a d0!");
      }
      else if(numDice > 1) //if there is more than one dice...
      {
        if(tokens[2] != null) // if there was a modifier...
        {
         let modWithSign = tokens[2].split("");  //split that modifer into the sign and value

         let total = 0;
         let diceRolled = [];

          for(let i = 0; i < numDice; i++)  //for each die...
          {
            //generate a random number using face# of dice, and push it onto array
            //to keep track of each roll. Add to a total
            let dice = Math.floor(Math.random() * (face - 1 + 1) + 1);
            diceRolled.push(dice);
            total += dice;
          }

          let outputString = " ";
          //for each element in dice rolled (amount of dice), add that number to a string (array --> string)
          diceRolled.forEach(num => outputString += num.toString() + " ");
          //print the total and the rolls that added to it
          if(modWithSign[0] == '-')
          {
            completeTotal = total - parseInt(modWithSign[1]);
            message.channel.send(completeTotal.toString() + "\n( (" + outputString + ") " + modWithSign[0] + " " + modWithSign[1] + " )");
          }
          else
          {
            completeTotal = total + parseInt(modWithSign[1]);
            message.channel.send(completeTotal.toString() + "\n( (" + outputString + ") " + modWithSign[0] + " " + modWithSign[1] + " )");
          }
        }
        //if there is no modifier
        else
        {
         let total = 0;
         let diceRolled = [];

          for(let i = 0; i < numDice; i++)  //for each die...
          {
            //generate a random number using face# of dice, and push it onto array
            //to keep track of each roll. Add to a total
            let dice = Math.floor(Math.random() * (face - 1 + 1) + 1);
            diceRolled.push(dice);
            total += dice;
          }

          let outputString = " ";
          //for each element in dice rolled (amount of dice), add that number to a string (array --> string)
          diceRolled.forEach(num => outputString += num.toString() + " ");
          //print the total and the rolls that added to it
          message.channel.send(total.toString() + "\n(" + outputString + ")");
        }
      }
      else  //otherwise, there was only one die rolled
      {
        if(tokens[2] != null) // if there was a modifier...
        {
          let modWithSign = tokens[2].split("");  //split that modifer into the sign and value

          let total = 0;

          //generate random number given face of dice
          total += Math.floor(Math.random() * (face - 1 + 1) + 1);
    
          //if the sign was negative...
          if(modWithSign[0] == '-')
          {
            //subtract the value by the total and output what the og roll was
            completeTotal = total - parseInt(modWithSign[1]);
            message.channel.send(completeTotal.toString() + "\n( ( " + total.toString() + " ) " + modWithSign[0] + " " + modWithSign[1] + " )");
          }
          //otherwise, assume the modifier was +
          else
          {
            completeTotal = total + parseInt(modWithSign[1]);
            message.channel.send(completeTotal.toString() + "\n( ( " + total.toString() + " ) " + modWithSign[0] + " " + modWithSign[1] + " )");          }
        }
        //if there was no modifier, just send the total 
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
    }
    //if there was no valid dice given, say so
    else
    {
      message.channel.send("Nah, you didn't enter a dice roll!");
    }

  }
}
      