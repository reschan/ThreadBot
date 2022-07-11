import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, Permissions, GuildMember } from 'discord.js';
import { bug_channel } from '../config.json'


const SOLVE_PERMS = '17179877432';
const ADMIN_PERMS = 8;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription("Mark an issue as closed and archive it.")
        .setDMPermission(false)
        .setDefaultMemberPermissions('0'),

    async execute(interaction: CommandInteraction) {
        const thread = interaction.channel;
        const member = interaction.member as GuildMember;
        const perms = member.permissions;

        if (!thread || !thread.isThread() || !thread.parent || thread.archived) { // if not thread
            console.log("Something went very wrong. Command interaction wasn't sent from a valid thread, or the channel got removed.");
            await interaction.reply("You can't call this command from here.");
        } else if (thread.parent.name !== bug_channel) { // if not in bug reports channel
            await interaction.reply(`This command is only accessible from threads created in the \`${bug_channel}\` channel`);
        } else if (interaction.user.id !== (await thread.fetchStarterMessage()).author.id
                    && !(perms?.has(Permissions.FLAGS.ADMINISTRATOR) || perms?.has(Permissions.FLAGS.MANAGE_THREADS))) {
            // if command issuer id != thread message starter
            await interaction.reply("This command can only be issued by the creator of the issue or a moderator.");
        } else {
            await interaction.reply("Archiving thread...");
            await thread.setName("✅-".concat(thread.name));
            await thread.setLocked();
            await thread.setArchived();
        }
    }
}
