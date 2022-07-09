import path from 'path';
import fs from "fs"
import { ThreadBotClient } from '../ThreadBot';

export default function handleEvents(client: ThreadBotClient) {
    const eventsPath = path.resolve(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}
