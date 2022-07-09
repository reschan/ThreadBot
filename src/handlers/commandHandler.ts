import fs from 'fs'
import path from 'node:path';
import { clientId, token } from '../config.json';
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v10'
import { ThreadBotClient } from '../ThreadBot'
import { CommandObject } from '../ThreadBotTypes'


export default async function handleCommands(client: ThreadBotClient) {
    const commandsPath = path.resolve(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
    const commands: Array<CommandObject> = [];

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(token);

    rest.put(Routes.applicationCommands(clientId), { body: commands })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });
}
