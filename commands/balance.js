const { Op } = require('sequelize');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { executionAsyncResource } = require('async_hooks');
const { Users, CurrencyShop } = require('../dbObjects.js');
const { Collection } = require('discord.js');
//const { balance } = require('../app_copy.js')

const currency = new Collection();


// client.once('ready', async () => {
// 	const storedBalances = await Users.findAll();
// 	storedBalances.forEach(b => currency.set(b.user_id, b));
// 	console.log(`Logged in as ${client.user.tag}!`);
// });

Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Shows your Balance'),
    async execute(interaction) {
        	// [gamma]
		const target = interaction.options.getUser('user') || interaction.user;
		await interaction.reply(`${target.tag} has ${currency.getBalance(target.id)}`);
    },
};

//client.login(token);