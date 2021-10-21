const { SlashCommandBuilder } = require('@discordjs/builders');

// Exports the module to be used in app.js
module.exports = {
    // Create new slash command
    data: new SlashCommandBuilder() 
        .setName('balance') // Set the name of the command to be balance
        .setDescription('Shows your Balance'), // Creates the description of the command
    // Executes when the command gets called
    async execute(interaction, currency) { // Takes in the interaction and the currency variables
		const target = interaction.options.getUser('user') ?? interaction.user; // Creates a variable for the user that triggered the interaction
		await interaction.reply(`${target.username} has ${currency.getBalance(target.id)} loonies`); // Show the balance of the user who triggered the interaction
    },
};