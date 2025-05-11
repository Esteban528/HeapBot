import type { Client, ClientEvents } from 'discord.js';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

/**
 * @interface EventHandler
 * Defines the structure for an event handler module.
 * Each event handler file should export a default object conforming to this interface.
 */
export interface EventHandler<K extends keyof ClientEvents = keyof ClientEvents> {
    /**
     * The Discord.js client event to listen for.
     * @example Events.MessageCreate
     * @type {ClientsEvents}
     */
    name: K;
    /**
     * Optional. If true, the event handler will be registered using `client.once`
     * and will only be executed a single time for the event.
     * If false or undefined, it will be registered using `client.on`.
     * @type {boolean}
     * @defaultvalue false
     */
    once?: boolean;
    /**
     * The function to execute when the specified event is emitted.
     * It receives the arguments specific to that Discord.js event.
     *
     * @param {...ClientEvents[K]} args - The arguments emitted by the Discord.js event.
     * @returns {void | Promise<void>} Can be synchronous or asynchronous.
     */
    execute: (...args: ClientEvents[K]) => void | Promise<void>;
}

export async function eventLoader(client: Client) {
	const foldersPath = path.join(__dirname, '..', 'events');
	const eventDirectory = fs.readdirSync(foldersPath);
	console.log("Loading events...")
	for (const folder of eventDirectory) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));

		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const fileUrl = pathToFileURL(filePath).href;

			try {
				const eventModule = await import(fileUrl);
				const event:EventHandler = eventModule.default;
				client.on(event.name, (...args) => event.execute(...args));
				console.log(`Event ${event.name} loaded`);
			} catch (error) {
				console.error(`❌ Failed to load command at ${filePath}:`, error);
			}
		}
	}
}
