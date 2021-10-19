const { SlashCommandBuilder } = require('@discordjs/builders');
const { Collection, MessageActionRow, MessageButton, ButtonInteraction } = require('discord.js')

const choices = {'rock':'scissors',
				'paper': 'rock',
				'scissors':'paper'};

const keys = (Object.keys(choices));


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Take your chances at rock, paper, scissors!'),
    async execute(interaction, currency) {
    

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('rock')
                .setLabel('Rock')
                .setStyle('DANGER'),
            new MessageButton()
                .setCustomId('paper')
                .setLabel('Paper')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('scissors')
                .setLabel('Scissors')
                .setStyle('SECONDARY')
    );

    interaction.reply({ content: 'Which shall you choose? Rock, Paper, or Scissors', components: [row]});

    const collector = interaction.channel.createMessageComponentCollector();

    collector.on('collect', async clicked =>{
        const outcome = choices[keys[Math.floor(Math.random()*keys.length)]];
        if (choices[outcome] === clicked.customId ){
            currency.add(clicked.user.id, 1);
            clicked.reply(`Your **${clicked.customId}** beat Fortuna's **${outcome}**. You win! you gained 1 coin.`);
            
        } else if(outcome === clicked.customId){
            clicked.reply(`You both threw **${clicked.customId}**. It is a tie!`);
        } else {
            clicked.reply(`Your **${clicked.customId}** lost to Fortuna's **${outcome}**. You lost!`)
        };
    });
    collector.on('end', collected => console.log('worked'))
    }
};