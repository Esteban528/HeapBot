import type { SlashCommandBuilder, Interaction } from 'discord.js';

/**
 * Defines the structure for a slash command.
 */
export interface SlashCommand {

	/**
	 * The slash command's definition, typically created using `SlashCommandBuilder`.
	 * It includes the command's name, description, options, etc.
	 */
	data: SlashCommandBuilder;

	/**
	docs(scope): title
	 
	  * The function to be executed when the slash command is invoked.
	 * @param interaction - The Discord.js Interaction object representing the command invocation.
	 * @returns A Promise that resolves when the command execution is complete.
	 */
	execute: (interaction: Interaction) => Promise<void>;
}
