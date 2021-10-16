const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gamble')
        .setDescription('take your chances my child'),
    async execute(interaction) {
        let result = Math.floor(Math.random() * 10);

        await interaction.reply('Pong!');
    },
};