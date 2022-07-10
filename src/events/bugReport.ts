import { Message, TextChannel } from "discord.js"
import { bug_channel } from "../config.json"

const BUG_REPORT_MESSAGE = 
"Hi! Welcome to bug reports!\n\n\
This thread was created in order for us to be able to track your \
issue more reliably. The WynnBuilder team will make sure to look \
into the issue and fix it as soon as possible.\n\n\
Once the issue is resolved, either you or a staff member will close the \
issue using the /close command."

module.exports = {
    name: 'messageCreate',
    async execute(interaction: Message) {
        if (interaction.author.bot) {
            return;
        }
        if (!interaction.content) {
            await interaction.reply('Please describe your issue in text.')
                .then(msg => {
                    setTimeout(() => msg.delete(), 5000);
                });
            await interaction.delete();
            return;
        }
        const channel = interaction.channel
        const name = (interaction.content.length < 100) ? interaction.content : interaction.content.slice(0, 100).concat('...');
        if (channel.isText() && (channel as TextChannel).name == bug_channel) {
            const thread = await interaction.startThread({ name: name });
            if (thread) {
                thread.send(BUG_REPORT_MESSAGE);
            }
        }
    }
}
