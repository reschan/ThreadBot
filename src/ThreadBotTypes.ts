import { CommandInteraction } from "discord.js";

export type CommandObject = {
    data: Object;
    execute(interaction: CommandInteraction): Promise<any>;
}
