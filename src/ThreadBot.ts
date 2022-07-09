import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import { token } from './config.json'
import handleEvents from './handlers/eventHandler';
import handleCommands from './handlers/commandHandler'
import { CommandObject } from './ThreadBotTypes'

export class ThreadBotClient extends Client {
    commands: Collection<string, CommandObject>;
    constructor(ops: ClientOptions) {
        super(ops);
        this.commands = new Collection()
    }

    run() {
        client.once('ready', () => {
            console.log('ThreadBot activated');
        });

        handleCommands(client);
        handleEvents(client);

        client.login(token);
    }
}

const client = new ThreadBotClient({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.run();

