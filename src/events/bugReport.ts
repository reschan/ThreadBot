import { Message, TextChannel } from "discord.js"
import { bug_channel } from "../config.json"

const BUG_REPORT_MESSAGE = 
"Hi! Welcome to bug reports.\n\
This thread was created in order for us to be able to track your \
issue more reliabley. If you've got any more information on the \
particular bug you've experienced, you're welcomed to share it \
right here. The WynnBuilder team will make sure to look into the issue \
and fix it as soon as possible.\
Once the issue is resolved, either you a staff member will close the \
issue using the /close command."

module.exports = {
    name: 'messageCreate',
    async execute(interaction: Message) {
        if (interaction.author.bot) {
            return;
        }
        const channel = interaction.channel
        const name = (interaction.content.length < 100) ? interaction.content : interaction.content.slice(0, 100).concat('...')
        if (channel.isText() && (channel as TextChannel).name == bug_channel) {
            const thread = await interaction.startThread({ name: name })
            if (thread) {
                thread.send(BUG_REPORT_MESSAGE)
            }
        }
    }
}
