import { Message, TextChannel, ThreadChannel } from "discord.js"
import { bug_channel } from "../config.json"

module.exports = {
    name: 'threadUpdate',
    async execute(oldThread: ThreadChannel, newThread: ThreadChannel) {
        if (newThread.parent) {
            if (newThread.parent.name == bug_channel && (!newThread.archived && oldThread.archived)) {
                await newThread.setName(newThread.name.slice(2));
            }
        }
    }
}
