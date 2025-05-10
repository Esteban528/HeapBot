import type { Client, ClientEvents } from 'discord.js';
import path from 'node:path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

export interface EventHandler<K extends keyof ClientEvents = keyof ClientEvents> {
	name: K;
	once?: boolean;
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
