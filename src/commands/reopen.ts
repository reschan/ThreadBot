import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js';
import { bug_channel } from '../config.json'

module.exports = {
    data: new SlashCommandBuilder().setName('reopen').setDescription('Re-open a closed issue')
}
