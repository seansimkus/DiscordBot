const { SlashCommandBuilder } = require('@discordjs/builders');
const { Users } = require('../dbObjects.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Shows your inventory'),
    async execute(interaction) {
        // [gamma]
        const target = interaction.options.getUser('user') ?? interaction.user;
        const user = await Users.findOne({ where: {user_id: target.id } });
        const items = await user.getItems();

        if (!items.length) return interaction.reply(`${target.tag} has nothing!`)
		return interaction.reply(`${target.tag}  currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
    },
};