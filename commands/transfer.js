const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transfer')
        .setDescription('Transfer coins to another player')
		.addUserOption(option =>
			option.setName('recipient')
				.setDescription('The name of the player you are sending coins to.')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('amount')
			.setDescription('The amount you would like to send')
			.setRequired(true))
        .addBooleanOption(option => 
            option.setName('hidden')
                .setDescription('Choose if the response is hidden')
                .setRequired(false)),
    async execute(interaction, currency) {

		const currentAmount = currency.getBalance(interaction.user.id);
		const transferAmount = interaction.options.getInteger('amount');
		const transferTarget = interaction.options.getUser('recipient');
        const ephemeral = interaction.options.getBoolean('hidden');

		if (transferAmount > currentAmount) return interaction.reply(`Sorry ${interaction.user} you don't have that much.`);
		if (transferAmount <= 0) return interaction.reply(`Please enter an amount greater than zero, ${interaction.user}`);

		currency.add(interaction.user.id, -transferAmount);
		currency.add(transferTarget.id, transferAmount);

		return interaction.reply({content: `Successfully transferred ${transferAmount} 💰 to ${transferTarget.username}. Your current balance is ${currency.getBalance(interaction.user.id)} 💰` , ephemeral: ephemeral});
    }, //, {ephemeral: interaction.options.getBoolean('visibility')}
};