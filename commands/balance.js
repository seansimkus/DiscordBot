const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Shows your Balance'),
    async execute(interaction, currency) {
        	// [gamma]
		const target = interaction.options.getUser('user') || interaction.user;
		console.log(target)
		await interaction.reply(`${target.username} has ${currency.getBalance(target.id)} loonies`);
    },
};