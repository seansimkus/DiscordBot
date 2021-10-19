const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collection, MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js')

// Sets the options that be chosen as the key pair as what loses to them
const choices = {'rock':'scissors',
				'paper': 'rock',
				'scissors':'paper'};

// Create a variable based on the keys from choices
const keys = (Object.keys(choices));

// Exports the module to be used in app.js
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps') // Set the name of the command to be rps
        .setDescription('Take your chances at rock, paper, scissors!'), // Creates the description of the command
    async execute(interaction, currency) { //Takes in the interaction and the currency variables
    
    //Create a new row of buttons
    const row = new MessageActionRow()  
        .addComponents(
            // Create first button
            new MessageButton()
                .setCustomId('rock') // Set id of button to rock
                .setLabel('Rock') // Set the label on the button to rock
                .setStyle('DANGER'), // Set the colour to red
            // Create Second button
            new MessageButton() // Create new button
                .setCustomId('paper') // Set id of button to paper
                .setLabel('Paper') // Set the labl on the button to paper
                .setStyle('PRIMARY'), // Set the colour to blue
            // Create Third button    
            new MessageButton() 
                .setCustomId('scissors') // Set id of button to scissors
                .setLabel('Scissors') // Set the labl on the button to scissors
                .setStyle('SECONDARY') // Set the colour to grey
    );
    // Sets what the bot replies with when the slash command is first used
    interaction.reply({ content: 'Which shall you choose? Rock, Paper, or Scissors', components: [row]});
    
    // Initalize the collector which collects the button interactions
    const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON'});
    
    //Executes when a button is pressed
    collector.on('collect', async clicked =>{
        const outcome = choices[keys[Math.floor(Math.random()*keys.length)]]; // Picks rock, paper, or scissors for the bot and saves it as a variable
        // Check if the button the user clicked is the same as what beats the bot pick
        if (choices[outcome] === clicked.customId ){
            currency.add(clicked.user.id, 1); // Gives the player 1 currency for being correct
            clicked.update(`Your **${clicked.customId}** beat Fortuna's **${outcome}**. You win! you gained 1 coin.\nPlay Again?`); // updates the original message with a new win message
            
        } 
        // Check if the option the user clicked is the same as the one the bot picked
        else if(outcome === clicked.customId){
            clicked.update(`You both threw **${clicked.customId}**. It is a tie!\nPlay Again?`); // updates the original message with a new tie message
        } 
        // Check if the button the user clicked is not the same as what beats the bot pick or is the same as the one the bot picked
        else {
            clicked.update(`Your **${clicked.customId}** lost to Fortuna's **${outcome}**. You lost!\nPlay Again?`) // updates the original message with a new lose message
        };
    });
    }
};